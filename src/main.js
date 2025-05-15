import DOMPurify from "dompurify";
import { marked } from "marked";
import MicroModal from "micromodal";
import { getDocumentSummary } from "./api.js";
import { getApiKey, getSettings, saveSettings } from "./settings.js";

// --- DOM要素のキャッシュ (ページロード時に一度だけ取得) ---
// 主要なセクション
const urlInputSection = document.getElementById("url-input-section");
const responseSection = document.getElementById("response-section");

// URL入力関連
const urlTextarea = document.getElementById("url-input");
const submitButton = document.getElementById("submit-button");

// 応答関連
const responseOutput = document.getElementById("response-output");
const additionalQuestionTextarea = document.getElementById(
  "additional-question-input"
);
const submitAdditionalQuestionButton = document.getElementById(
  "submit-additional-question-button"
);
const responseTitle = document.getElementById("response-title");

// ヘッダー関連
const logoLink = document.getElementById("logo-link");
const settingButton = document.getElementById("setting-button");

// モーダル関連
const modalGeminiApiKeyInput = document.getElementById(
  "modal-gemini-api-key-input"
);
const modalJinaApiKeyInput = document.getElementById(
  "modal-jina-api-key-input"
);
const saveModalSettingsButton = document.getElementById(
  "save-modal-settings-button"
);
const modalUserLevelRadios = document.querySelectorAll(
  'input[name="user-level-radio"]'
);
const modalUserLevelText = document.getElementById("user-level-text");
const modalAdditionalPromptInput = document.getElementById(
  // IDを変更 (追加質問とモーダル内のものとを区別)
  "modal-additional-prompt-input"
);
const modalTabs = document.querySelectorAll(".modal-tabs .tab-item");
const tabContents = document.querySelectorAll(".modal__content .tab-content");
// モーダルの設定関連やり取り用のオブジェクト
const modalFormElements = {
  modalGeminiApiKeyInput,
  modalJinaApiKeyInput,
  modalUserLevelRadios,
  modalUserLevelText,
  modalAdditionalPromptInput,
};

// --- 初期化処理 ---
document.addEventListener("DOMContentLoaded", () => {
  initializeModal();
  initializeTextareaAutoHeight(urlTextarea, 1);
  initializeTextareaAutoHeight(additionalQuestionTextarea, 1);
  setupEventListeners();
  showPage(urlInputSection); // 初期表示
});
// --- 関数定義 ---

function initializeModal() {
  MicroModal.init({
    onShow: (modal) => console.info(`${modal.id} is shown`),
    onClose: (modal) => console.info(`${modal.id} is hidden`),
    disableScroll: true,
    disableFocus: false,
    awaitCloseAnimation: true,
  });
}

function initializeTextareaAutoHeight(textareaElement, initialRows) {
  if (!textareaElement) return;

  const lineHeight = parseFloat(getComputedStyle(textareaElement).lineHeight);
  const initialHeight = lineHeight * initialRows;
  textareaElement.style.height = `${initialHeight}px`;

  textareaElement.addEventListener("input", () => {
    textareaElement.style.height = "auto";
    let newHeight = textareaElement.scrollHeight;

    if (newHeight > initialHeight) {
      textareaElement.classList.add("expanded");
    } else {
      textareaElement.classList.remove("expanded");
    }
    textareaElement.style.height = `${newHeight}px`;
  });
}

function setupEventListeners() {
  if (settingButton) {
    settingButton.addEventListener("click", () => {
      populateModalForm();
      MicroModal.show("modal-settings");
    });
  }

  if (saveModalSettingsButton) {
    saveModalSettingsButton.addEventListener("click", handleSaveSettings);
  }

  if (logoLink) {
    logoLink.addEventListener("click", (event) => {
      event.preventDefault();
      showPage(urlInputSection);
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
      // Enterキー単独の場合は、デフォルトの改行動作を許可するため、ここでは何もしない
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
      // Enterキー単独の場合は、デフォルトの改行動作を許可
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

function showPage(pageToShow) {
  // まず全てのメインページセクションを非表示にする
  urlInputSection.classList.remove("active");
  responseSection.classList.remove("active");

  // 指定されたページセクションを表示
  if (pageToShow) {
    pageToShow.classList.add("active");
  }

  if (logoLink) {
    if (pageToShow && pageToShow.id === "url-input-section") {
      logoLink.classList.add("hidden-on-main");
    } else {
      logoLink.classList.remove("hidden-on-main");
    }
  }
}

async function handleSubmit() {
  const JINA_API_KEY_FOR_REQUEST = getApiKey("jina");
  const GEMINI_API_KEY_FOR_REQUEST = getApiKey("gemini");
  if (!JINA_API_KEY_FOR_REQUEST || !GEMINI_API_KEY_FOR_REQUEST) {
    alert("APIキーを入力してください");
    MicroModal.show("modal-settings");
    return;
  }
  // submitButtonの処理を関数に分離
  const urlToProcess = urlTextarea.value.trim();
  if (!urlToProcess) {
    alert("URLを入力してください。");
    return;
  }

  responseOutput.innerHTML = "<p>処理中...</p>";
  showPage(responseSection);

  try {
    const userSettings = getSettings(); // settings.js から現在の設定を取得
    const summaryResult = await getDocumentSummary(urlToProcess, userSettings); // api.js の新しい高レベル関数

    if (summaryResult.error) {
      displayErrorMessage(summaryResult.error);
    } else {
      updateResponseTitle(summaryResult.title || "説明結果");
      renderResponse(summaryResult.summaryMarkdown);
    }
  } catch (error) {
    // getDocumentSummary内で予期せぬエラーが起きた場合
    console.error("getDocumentSummary 呼び出し中にエラー:", error);
    displayErrorMessage("予期せぬエラーが発生しました。");
  }
}

function displayErrorMessage(responseError) {
  responseOutput.innerHTML = `<p>${responseError}</p>`;
}
function updateResponseTitle(articleTitle) {
  responseTitle.textContent = articleTitle;
}
function renderResponse(responseMarkdown) {
  const dirtyHtml = marked.parse(responseMarkdown);
  const cleanHtml = DOMPurify.sanitize(dirtyHtml);
  responseOutput.innerHTML = cleanHtml;
}

// --- 設定関連の関数 ---

function populateModalForm() {
  const current = getSettings();
  modalFormElements.modalGeminiApiKeyInput.value = current.geminiApiKey;
  modalFormElements.modalJinaApiKeyInput.value = current.jinaApiKey;
  modalFormElements.modalUserLevelRadios.forEach((radio) => {
    radio.checked = radio.value === String(current.userLevel);
  });
  modalFormElements.modalUserLevelText.value = current.userLevelText;
  modalFormElements.modalAdditionalPromptInput.value = current.additionalPrompt;
}
function handleSaveSettings() {
  let selectedUserLevel = "1";
  modalFormElements.modalUserLevelRadios.forEach((radio) => {
    if (radio.checked) selectedUserLevel = radio.value;
  });
  const newSettings = {
    geminiApiKey: modalFormElements.modalGeminiApiKeyInput.value.trim(),
    jinaApiKey: modalFormElements.modalJinaApiKeyInput.value.trim(),
    userLevel: parseInt(selectedUserLevel, 10),
    userLevelText: modalFormElements.modalUserLevelText.value.trim(),
    additionalPrompt: modalFormElements.modalAdditionalPromptInput.value.trim(),
  };
  saveSettings(newSettings);
  alert("設定を保存しました。");
  if (!getApiKey("gemini")) {
    modalFormElements.modalGeminiApiKeyInput.style.borderColor = "red";
  } else {
    modalFormElements.modalGeminiApiKeyInput.style.borderColor = ""; // エラー解除
  }
  if (!getApiKey("jina")) {
    modalFormElements.modalJinaApiKeyInput.style.borderColor = "red";
  } else {
    modalFormElements.modalJinaApiKeyInput.style.borderColor = ""; // エラー解除
  }
  if (!getApiKey("jina") || !getApiKey("gemini")) {
    alert("APIキーがまだ設定されていません。一部機能が利用できません。");
  }
}
