import { getDocumentSummary } from "./api.js";
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

// --- 初期化処理 ---
document.addEventListener("DOMContentLoaded", () => {
  initializeSettings(); // settings.js の初期化を呼ぶ
  ui.initializeUI(); // ui.js のUI初期化を呼ぶ
  ui.initializeTextareaAutoHeight(urlTextarea, 1);
  ui.initializeTextareaAutoHeight(
    document.getElementById("additional-question-input"),
    1
  );
  setupEventListeners();
  ui.showPage(urlInputSection); // 初期表示

  if (!getApiKey("jina") || !getApiKey("gemini")) {
    alert("APIキーが設定されていません。設定画面を開きます。");
    ui.populateModalFormWithSettings(getSettings()); // 現在の設定をモーダルに反映
    ui.openSettingsModal();
  }
});
// --- 関数定義 ---
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
    additionalQuestionTextarea.addEventListener("keydown", (event) => {
      // Ctrl + Enter (または Meta + Enter for Mac) で送信
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        // submitAdditionalQuestionButton.click(); // 追加質問の送信処理 (後で実装)
        console.log(
          "追加質問送信 (Ctrl+Enter):",
          additionalQuestionTextarea.value
        ); // 仮の処理
        // ここで handleAdditionalQuestion() のような関数を呼び出す
      }
    });
    // submitAdditionalQuestionButton.addEventListener('click', handleAdditionalQuestion); // 後で実装
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
  try {
    const userSettings = getSettings();
    const summaryResult = await getDocumentSummary(urlToProcess, userSettings);

    if (summaryResult.error) {
      ui.displayErrorMessage(summaryResult.error);
    } else {
      ui.updateResponseTitle(summaryResult.title || "説明結果");
      ui.renderResponse(summaryResult.summaryMarkdown);
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
