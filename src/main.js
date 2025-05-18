import * as api from "./api.js";
import * as db from "./db.js";
import {
  getApiKey,
  getSettings,
  initializeSettings,
  saveSettings,
} from "./settings.js";
import * as ui from "./ui.js";

// 追加質問管理用GeminiAPI応答待ちフラグ
let isWaitingForAIResponse = false;

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
let currentActiveSession = null;

// --- 初期化処理 ---
document.addEventListener("DOMContentLoaded", async () => {
  initializeSettings(); // settings.js の初期化を呼ぶ
  ui.initializeUI(); // ui.js のUI初期化を呼ぶ
  ui.setupDocumentClickListenerForPopups();
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
  // 設定ボタン押下時イベント
  if (settingButton) {
    settingButton.addEventListener("click", () => {
      ui.populateModalFormWithSettings(getSettings());
      ui.openSettingsModal();
    });
  }

  // モーダルウィンドウ保存ボタン押下時イベント
  if (saveModalSettingsButton) {
    saveModalSettingsButton.addEventListener("click", handleSaveSettings);
  }

  // ページ左上ExplAInfyロゴ押下時イベント
  if (logoLink) {
    logoLink.addEventListener("click", (event) => {
      event.preventDefault();
      ui.showPage(urlInputSection);
    });
  }

  // 履歴ポップアップ設定イベント
  if (historyListElement) {
    // 履歴アイテム内のメニューボタンクリック
    historyListElement.addEventListener("click", (event) => {
      const menuButton = event.target.closest(".history-item-menu-button");
      if (menuButton) {
        event.stopPropagation(); // 他のクリックリスナーへの伝播を防ぐ
        const sessionId = menuButton.dataset.sessionId;
        const popupElement = document.getElementById(`popup-${sessionId}`);
        if (popupElement) {
          if (popupElement.style.display === "block") {
            ui.hideActiveHistoryPopup();
          } else {
            ui.showHistoryItemPopup(menuButton, popupElement);
          }
        }
        return; // メニューボタンクリック時は以降の処理をしない
      }

      // 削除ボタンクリック
      const deleteButton = event.target.closest(".popup-delete-button");
      if (deleteButton) {
        event.stopPropagation();
        const sessionIdToDelete = deleteButton.dataset.sessionId;
        handleDeleteSession(sessionIdToDelete);
        ui.hideActiveHistoryPopup(); // 削除後はポップアップを隠す
        return;
      }

      // 履歴アイテム本体のクリック (既存のロジック)
      const link = event.target.closest("a.history-link[data-session-id]");
      if (link && !menuButton && !deleteButton) {
        // メニューや削除ボタン以外がクリックされた場合
        // ... (既存の履歴読み込み処理) ...
        ui.hideActiveHistoryPopup(); // 他のポップアップが開いていれば隠す
      }
    });
  }
  // 履歴押下時イベント
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
        if (sessionData) {
          currentActiveSession = sessionData;
          ui.renderConversationTurns(
            currentActiveSession.turns,
            currentActiveSession.originalUrl
          );
          ui.updateResponseTitle(
            currentActiveSession.originalTitle || "説明結果",
            currentActiveSession.originalUrl
          );
        } else {
          ui.displayErrorMessage("選択された履歴の読み込みに失敗しました。");
          currentActiveSession = null;
        }
      } catch (error) {
        console.error("履歴の読み込み中にエラー:", error);
        ui.displayErrorMessage("履歴の読み込み中にエラーが発生しました。");
        currentActiveSession = null;
      }
    });
  }

  // URL入力画面送信ボタン押下時イベント
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

  // 追加質問送信ボタン押下時イベント
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

  // モーダルウィンドウタブ押下時イベント
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

// 履歴更新＆表示用関数
async function updateAndRenderHistory() {
  try {
    const summaries = await db.getAllSessionSummaries();
    console.log(summaries);
    ui.renderHistoryList(summaries);
  } catch (error) {
    console.error("履歴の取得または表示に失敗しました:", error);
    // ui.renderHistoryList([]); // 空のリストを表示するなどのフォールバック
  }
}

// URL送信時間数
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
  try {
    const userSettings = getSettings();
    const summaryResult = await api.getDocumentSummary(
      urlToProcess,
      userSettings
    );

    if (summaryResult.error) {
      ui.displayErrorMessage(summaryResult.error);
    } else {
      const userTurnContent =
        summaryResult.actualPromptSentToLLM ||
        `ドキュメント: ${urlToProcess} の説明を依頼`;
      const modelTurnContent = summaryResult.summaryMarkdown;

      const initialTurns = [
        { role: "user", parts: [{ text: userTurnContent }] },
        { role: "model", parts: [{ text: modelTurnContent }] },
      ];
      currentActiveSession = {
        id: newSessionId,
        originalUrl: urlToProcess,
        originalTitle: summaryResult.title || "説明結果",
        createdAt: Date.now(),
        turns: initialTurns,
      };
      await db.saveOrUpdateSession(currentActiveSession); // lastUpdatedAtはここで付与される
      ui.updateResponseTitle(
        currentActiveSession.originalTitle,
        currentActiveSession.originalUrl
      );
      ui.renderConversationTurns(
        currentActiveSession.turns,
        currentActiveSession.originalUrl
      );
      await updateAndRenderHistory();
    }
  } catch (error) {
    console.error("getDocumentSummary 呼び出し中にエラー:", error);
    ui.displayErrorMessage("予期せぬエラーが発生しました。");
  }
}

// 設定保存用関数
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

// 追加質問送信用関数
async function handleAdditionalQuestion() {
  if (isWaitingForAIResponse) {
    console.log("現在AIの応答待ちです。連続送信はできません。");
    return; // 処理中なら何もしない
  }
  if (!currentActiveSession) {
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
  isWaitingForAIResponse = true;
  submitAdditionalQuestionButton.disabled = true;
  // UIにユーザーの質問を即時反映 (送信中であることが分かるように)
  const userTurnForMemory = {
    role: "user",
    parts: [{ text: newQuestionText }],
  };
  currentActiveSession.turns.push(userTurnForMemory);
  ui.renderConversationTurns(
    currentActiveSession.turns,
    currentActiveSession.originalUrl
  );
  additionalQuestionTextarea.value = ""; // 入力欄クリア
  ui.displayLoadingMessage("<p>AIが応答を考えています...</p>"); // ローディング表示を応答エリアの末尾に

  try {
    const historyForApi = currentActiveSession.turns
      .slice(0, -1)
      .map((turn) => ({
        role: turn.role,
        parts: turn.parts.map((p) => ({ text: p.text })),
      }));

    const result = await api.getFollowUpResponse(
      historyForApi,
      newQuestionText,
      getSettings()
    );

    if (result.error) {
      ui.displayErrorMessage(result.error);
      currentActiveSession.turns.pop(); // 送信失敗したのでメモリから削除
      ui.renderConversationTurns(
        currentActiveSession.turns,
        currentActiveSession.originalUrl
      );
    } else {
      const modelTurnForMemory = {
        role: "model",
        parts: [{ text: result.modelResponseMarkdown }],
      };
      currentActiveSession.turns.push(modelTurnForMemory); // メモリ上のセッションを更新
      await db.saveOrUpdateSession(currentActiveSession); // 更新されたセッション全体をDBに保存
      ui.renderConversationTurns(
        currentActiveSession.turns,
        currentActiveSession.originalUrl
      );
      await updateAndRenderHistory();
    }
  } catch (error) {
    console.error("追加質問処理中にエラー:", error);
    ui.displayErrorMessage("追加質問の処理中に予期せぬエラーが発生しました。");
    // 必要なら currentTurns から最後のユーザー質問を削除
  } finally {
    isWaitingForAIResponse = false;
    submitAdditionalQuestionButton.disabled = false;
  }
}

// 履歴消去用関数
async function handleDeleteSession(sessionId) {
  if (!sessionId) return;

  const sessionToDelete = await db.getSession(sessionId); // 削除対象の情報を取得 (タイトル確認用)
  const title = sessionToDelete
    ? sessionToDelete.originalTitle || "このセッション"
    : "選択されたセッション";

  if (confirm(`「${title}」を削除してもよろしいですか？`)) {
    try {
      await db.deleteSession(sessionId);
      console.log(`Session ${sessionId} deleted.`);
      await updateAndRenderHistory(); // 履歴リストを更新

      // もし削除したセッションが現在表示中のものだったら、UIをクリアする
      if (currentActiveSession && currentActiveSession.id === sessionId) {
        currentActiveSession = null;
        // currentTurns = []; // currentTurnsもリセットした方が安全
        ui.showPage(urlInputSection); // URL入力画面に戻すなど
        ui.updateResponseTitle("説明結果"); // タイトルリセット
        ui.renderConversationTurns([]); // 応答エリアクリア
      }
      alert(`「${title}」を削除しました。`);
    } catch (error) {
      console.error("セッションの削除中にエラー:", error);
      alert("セッションの削除中にエラーが発生しました。");
    }
  }
}
