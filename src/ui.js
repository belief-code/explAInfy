import DOMPurify from "dompurify";
import { marked } from "marked";
import MicroModal from "micromodal";

// --- DOM要素のキャッシュ ---
const urlInputSection = document.getElementById("url-input-section");
const responseSection = document.getElementById("response-section");
const responseOutput = document.getElementById("response-output");
const responseTitle = document.getElementById("response-title");
const logoLink = document.getElementById("logo-link");

// モーダル関連の要素 (モーダル制御とフォーム値設定に使う)
const modalGeminiApiKeyInput = document.getElementById(
  "modal-gemini-api-key-input"
);
const modalJinaApiKeyInput = document.getElementById(
  "modal-jina-api-key-input"
);
const modalUserLevelRadios = document.querySelectorAll(
  'input[name="user-level-radio"]'
);
const modalUserLevelText = document.getElementById("user-level-text");
const modalAdditionalPromptInput = document.getElementById(
  "modal-additional-prompt-input"
);
const modalTabs = document.querySelectorAll(".modal-tabs .tab-item");
const tabContents = document.querySelectorAll(".modal__content .tab-content");

// --- UI制御関数 ---
export function showPage(pageElementToShow) {
  urlInputSection.classList.remove("active");
  responseSection.classList.remove("active");

  if (pageElementToShow) {
    pageElementToShow.classList.add("active");
  }

  // ロゴ表示制御もここで行う
  if (logoLink) {
    if (pageElementToShow && pageElementToShow.id === "url-input-section") {
      logoLink.classList.add("hidden-on-main");
    } else {
      logoLink.classList.remove("hidden-on-main");
    }
  }
}

export function initializeModal() {
  MicroModal.init({
    /* 今は無いけどオプション入れられる */
  });
  // モーダル内のタブ切り替えイベントリスナーもここで設定
  setupModalTabsInternal(); // 内部関数として
}

function setupModalTabsInternal() {
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

export function openSettingsModal() {
  MicroModal.show("modal-settings");
}

export function closeSettingsModal() {
  MicroModal.close("modal-settings");
}
export function getSettingsFromModalForm() {
  let selectedUserLevel = "1";
  modalUserLevelRadios.forEach((radio) => {
    if (radio.checked) selectedUserLevel = radio.value;
  });
  return {
    geminiApiKey: modalGeminiApiKeyInput.value.trim(),
    jinaApiKey: modalJinaApiKeyInput.value.trim(),
    userLevel: parseInt(selectedUserLevel, 10),
    userLevelText: modalUserLevelText.value.trim(),
    additionalPrompt: modalAdditionalPromptInput.value.trim(),
  };
}
export function populateModalFormWithSettings(settings) {
  modalGeminiApiKeyInput.value = settings.geminiApiKey || "";
  modalJinaApiKeyInput.value = settings.jinaApiKey || "";
  modalUserLevelRadios.forEach((radio) => {
    radio.checked = radio.value === String(settings.userLevel);
  });
  modalUserLevelText.value = settings.userLevelText || ""; // settings.js のキー名と合わせる
  if (modalAdditionalPromptInput) {
    modalAdditionalPromptInput.value = settings.additionalPrompt || "";
  }
}
export function highlightEmptyApiKeysInModal() {
  if (!modalGeminiApiKeyInput.value.trim()) {
    modalGeminiApiKeyInput.style.borderColor = "red";
  } else {
    modalGeminiApiKeyInput.style.borderColor = "";
  }
  if (!modalJinaApiKeyInput.value.trim()) {
    modalJinaApiKeyInput.style.borderColor = "red";
  } else {
    modalJinaApiKeyInput.style.borderColor = "";
  }
}
export function clearApiKeyErrorStylesInModal() {
  modalGeminiApiKeyInput.style.borderColor = "";
  modalJinaApiKeyInput.style.borderColor = "";
}

export function initializeTextareaAutoHeight(textareaElement, initialRows) {
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

export function renderResponse(markdownText) {
  if (markdownText === null || typeof markdownText === "undefined") {
    responseOutput.innerHTML = "<p>有効な応答がありませんでした。</p>";
    return;
  }
  try {
    const dirtyHtml = marked.parse(markdownText);
    const cleanHtml = DOMPurify.sanitize(dirtyHtml);
    responseOutput.innerHTML = cleanHtml;
  } catch (e) {
    console.error("Markdown parsing/sanitizing error:", e);
    responseOutput.innerHTML = "<p>応答の表示中にエラーが発生しました。</p>";
  }
}

export function updateResponseTitle(titleText) {
  if (responseTitle) {
    // responseTitle要素がHTMLに存在することを確認
    responseTitle.textContent = titleText;
  } else {
    console.warn("#response-title element not found.");
  }
}

export function displayLoadingMessage(message = "<p>処理中...</p>") {
  responseOutput.innerHTML = message;
}

export function displayErrorMessage(errorMessageText) {
  responseOutput.innerHTML = `<p style="color: red;">エラー: ${errorMessageText}</p>`;
}

// アプリケーション起動時に行うUI関連の初期化 (main.js から呼び出す)
export function initializeUI() {
  initializeModal();
  // 他のUI初期化があればここに
}
