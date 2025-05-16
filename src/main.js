import * as api from "./api.js";
import * as db from "./db.js";
import {
  getApiKey,
  getSettings,
  initializeSettings,
  saveSettings,
} from "./settings.js";
import * as ui from "./ui.js";

// --- DOM要素のキャッシュ (ページロード時に一度だけ取得) ---
// 主要なセクション
const urlInputSection = document.getElementById("url-input-section");
const historyListElement = document.getElementById("history-list");

// URL入力関連
const urlTextarea = document.getElementById("url-input");
const submitButton = document.getElementById("submit-button");

// 応答関連
const additionalQuestionTextarea = document.getElementById(
  "additional-question-input"
);
const submitAdditionalQuestionButton = document.getElementById(
  "submit-additional-question-button"
);

// ヘッダー関連
const logoLink = document.getElementById("logo-link");
const settingButton = document.getElementById("setting-button");

// モーダル関連
const saveModalSettingsButton = document.getElementById(
  "save-modal-settings-button"
);
const modalTabs = document.querySelectorAll(".modal-tabs .tab-item");
const tabContents = document.querySelectorAll(".modal__content .tab-content");
let currentActiveSessionId = null;
let currentTurns = []; //現在の会話のターンを保持する配列

// --- 初期化処理 ---
document.addEventListener("DOMContentLoaded", async () => {
  initializeSettings(); // settings.js の初期化を呼ぶ
  ui.initializeUI(); // ui.js のUI初期化を呼ぶ
  ui.initializeTextareaAutoHeight(urlTextarea, 1);
  ui.initializeTextareaAutoHeight(
    document.getElementById("additional-question-input"),
    1
  );
  await updateAndRenderHistory();
  setupEventListeners();
  ui.showPage(urlInputSection); // 初期表示
  if (!getApiKey("jina") || !getApiKey("gemini")) {
    alert("APIキーが設定されていません。設定画面を開きます。");
    ui.populateModalFormWithSettings(getSettings()); // 現在の設定をモーダルに反映
    ui.openSettingsModal();
  }
});
// --- 関数定義 ---

// イベントリスナー関係
function setupEventListeners() {
  if (settingButton) {
    settingButton.addEventListener("click", () => {
      ui.populateModalFormWithSettings(getSettings());
      ui.openSettingsModal();
    });
  }

  if (saveModalSettingsButton) {
    saveModalSettingsButton.addEventListener("click", handleSaveSettings);
  }

  if (logoLink) {
    logoLink.addEventListener("click", (event) => {
      event.preventDefault();
      ui.showPage(urlInputSection);
    });
  }
  if (historyListElement) {
    historyListElement.addEventListener("click", async (event) => {
      const link = event.target.closest("a[data-session-id]");
      if (!link) return;

      event.preventDefault();
      const sessionId = link.dataset.sessionId;
      if (!sessionId) return;

      ui.displayLoadingMessage("<p>履歴を読み込んでいます...</p>"); // ローディング表示
      ui.showPage(document.getElementById("response-section")); // 先に応答画面に切り替え

      try {
        const sessionData = await db.getSession(sessionId);
        if (sessionData && sessionData.turns) {
          currentActiveSessionId = sessionId;
          currentTurns = sessionData.turns;
          ui.renderConversationTurns(currentTurns);
          ui.updateResponseTitle(sessionData.originalTitle || "説明結果");
        } else {
          ui.displayErrorMessage("選択された履歴の読み込みに失敗しました。");
          currentActiveSessionId = null;
          currentTurns = [];
        }
      } catch (error) {
        console.error("履歴の読み込み中にエラー:", error);
        ui.displayErrorMessage("履歴の読み込み中にエラーが発生しました。");
        currentActiveSessionId = null;
        currentTurns = [];
      }
    });
  }

  if (submitButton && urlTextarea) {
    submitButton.addEventListener("click", handleSubmit);
    urlTextarea.addEventListener("keydown", (event) => {
      // Ctrl + Enter (または Meta + Enter for Mac) で送信
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault(); // デフォルトのEnterキーの動作（改行）をキャンセル
        submitButton.click(); // 送信ボタンのクリックイベントを発火
      }
    });
  }

  if (submitAdditionalQuestionButton && additionalQuestionTextarea) {
    submitAdditionalQuestionButton.addEventListener(
      "click",
      handleAdditionalQuestion
    );
    additionalQuestionTextarea.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        handleAdditionalQuestion(); // Ctrl+Enterでも同じ関数を呼ぶ
      }
    });
  }

  modalTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      modalTabs.forEach((t) => t.classList.remove("active-tab"));
      tabContents.forEach((c) => c.classList.remove("active-tab-content"));
      tab.classList.add("active-tab");
      const targetContentId = tab.dataset.tabTarget;
      document
        .querySelector(targetContentId)
        .classList.add("active-tab-content");
    });
  });
}
async function updateAndRenderHistory() {
  try {
    const summaries = await db.getAllSessionSummaries();
    ui.renderHistoryList(summaries);
  } catch (error) {
    console.error("履歴の取得または表示に失敗しました:", error);
    // ui.renderHistoryList([]); // 空のリストを表示するなどのフォールバック
  }
}

async function handleSubmit() {
  if (!getApiKey("jina") || !getApiKey("gemini")) {
    alert("APIキーを入力してください");
    ui.populateModalFormWithSettings(getSettings());
    ui.openSettingsModal();
    return;
  }
  const urlToProcess = urlTextarea.value.trim();
  if (!urlToProcess) {
    alert("URLを入力してください。");
    return;
  }

  ui.displayLoadingMessage();
  ui.showPage(document.getElementById("response-section"));
  const newSessionId = crypto.randomUUID(); // UUIDを生成
  currentActiveSessionId = newSessionId; // 現在のセッションIDとして保持 (main.js内の変数)
  try {
    const userSettings = getSettings();
    const summaryResult = await api.getDocumentSummary(
      urlToProcess,
      userSettings
    );

    if (summaryResult.error) {
      ui.displayErrorMessage(summaryResult.error);
    } else {
      ui.updateResponseTitle(summaryResult.title || "説明結果");
      const userTurnContent =
        summaryResult.actualPromptSentToLLM ||
        `ドキュメント: ${urlToProcess} の説明を依頼`;
      const modelTurnContent = summaryResult.summaryMarkdown;

      currentTurns = [
        { role: "user", parts: [{ text: userTurnContent }] },
        { role: "model", parts: [{ text: modelTurnContent }] },
      ];
      const sessionData = {
        id: currentActiveSessionId,
        originalUrl: urlToProcess,
        originalTitle: summaryResult.title,
        createdAt: Date.now(),
        turns: currentTurns, // 現在のturnsを保存
      };
      await db.saveOrUpdateSession(sessionData);
      ui.renderConversationTurns(currentTurns); // UIにも反映
      await updateAndRenderHistory();
    }
  } catch (error) {
    console.error("getDocumentSummary 呼び出し中にエラー:", error);
    ui.displayErrorMessage("予期せぬエラーが発生しました。");
  }
}

function handleSaveSettings() {
  const newSettings = ui.getSettingsFromModalForm();
  if (newSettings) {
    saveSettings(newSettings);
    alert("設定を保存しました。");
    // APIキーが保存されたかどうかの再チェックとUIへのフィードバック
    if (!getApiKey("jina") || !getApiKey("gemini")) {
      alert("APIキーがまだ設定されていません。一部機能が利用できません。");
      ui.highlightEmptyApiKeysInModal();
      return;
    } else {
      ui.clearApiKeyErrorStylesInModal();
    }
  } else {
    // getSettingsFromModalForm で問題があった場合 (通常は起こらないはず)
    console.error("モーダルからの設定取得に失敗しました。");
  }
  ui.closeSettingsModal();
}
async function handleAdditionalQuestion() {
  if (!currentActiveSessionId) {
    alert("まず最初の質問を行うか、履歴から会話を選択してください。");
    return;
  }
  const newQuestionText = additionalQuestionTextarea.value.trim();
  if (!newQuestionText) {
    alert("追加の質問を入力してください。");
    return;
  }

  if (!getApiKey("gemini")) {
    // Jinaはここでは不要
    alert("Gemini APIキーが設定されていません。");
    ui.populateModalFormWithSettings(getSettings());
    ui.openSettingsModal();
    return;
  }

  // UIにユーザーの質問を即時反映 (送信中であることが分かるように)
  const userTurnForUI = {
    role: "user",
    parts: [{ text: newQuestionText }],
    timestamp: Date.now(),
  };
  currentTurns.push(userTurnForUI);
  ui.renderConversationTurns(currentTurns); // 新しい質問をUIに追加
  additionalQuestionTextarea.value = ""; // 入力欄クリア
  ui.displayLoadingMessage("<p>AIが応答を考えています...</p>"); // ローディング表示を応答エリアの末尾に

  try {
    const userSettings = getSettings();
    // APIに渡す履歴からはtimestampを除く
    const historyForApi = currentTurns.slice(0, -1).map((turn) => ({
      // 最後に追加したUI用ユーザーターンを除く
      role: turn.role,
      parts: turn.parts.map((p) => ({ text: p.text })),
    }));

    const result = await api.getFollowUpResponse(
      historyForApi,
      newQuestionText,
      userSettings
    );

    if (result.error) {
      ui.displayErrorMessage(result.error);
      currentTurns.pop(); // 送信失敗したのでUIからユーザーの質問を削除 (またはエラー表示に置き換える)
      ui.renderConversationTurns(currentTurns); // UI更新
    } else {
      const modelTurnForStorage = {
        role: "model",
        parts: [{ text: result.modelResponseMarkdown }],
        timestamp: Date.now(),
      };
      // currentTurns の最後の要素 (UIに表示したユーザーの質問) の後にモデルの応答を追加
      // currentTurns.pop(); // UI用に追加したユーザーの質問を一度削除し、API応答と一緒にDB保存用の形式で再追加する
      // 上記だとtimestampがずれるので、メモリ上のcurrentTurnsはそのままにして、
      // DB保存時はAPIに送ったnewQuestionTextとAPIからの応答をペアにする
      currentTurns[currentTurns.length - 1] = {
        // 最後にUIに追加したユーザーの質問を更新(timestampはそのまま)
        role: "user",
        parts: [{ text: newQuestionText }],
        timestamp: userTurnForUI.timestamp, // 送信した質問を確定
      };
      currentTurns.push(modelTurnForStorage);

      // DBに保存
      const sessionToUpdate = await db.getSession(currentActiveSessionId);
      if (sessionToUpdate) {
        sessionToUpdate.turns = currentTurns.map((turn) => ({
          // DB保存用にはtimestampを含める
          role: turn.role,
          parts: turn.parts, // partsはそのまま
          timestamp: turn.timestamp || Date.now(), // なければ現在の時刻
        }));
        await db.saveOrUpdateSession(sessionToUpdate);
      }
      ui.renderConversationTurns(currentTurns); // 全体を再描画
      await updateAndRenderHistory(); // 履歴リストも更新
    }
  } catch (error) {
    console.error("追加質問処理中にエラー:", error);
    ui.displayErrorMessage("追加質問の処理中に予期せぬエラーが発生しました。");
    // 必要なら currentTurns から最後のユーザー質問を削除
  } finally {
    // ローディング解除 (エラーでも成功でも responseOutput は上書きされるので不要かも)
  }
}
