import DOMPurify from "dompurify";
import { marked } from "marked";
import MicroModal from "micromodal";

// --- DOM要素のキャッシュ ---
const urlInputSection = document.getElementById("url-input-section");
const historyListElement = document.getElementById("history-list");
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
  const modalOverlay = document.querySelector(
    "#modal-settings .modal__overlay"
  );
  if (modalOverlay) {
    modalOverlay.addEventListener("mousedown", (event) => {
      // クリックされた要素がオーバーレイ自身であるかを確認
      // (targetがoverlayで、かつcontainer内をクリックした結果のバブリングではないことを確認)
      if (event.target === modalOverlay) {
        MicroModal.close("modal-settings");
      }
    });
  }
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

export function renderHistoryList(sessionSummaries) {
  if (!historyListElement) return;
  if (!sessionSummaries || sessionSummaries.length === 0) {
    historyListElement.innerHTML = "<li>履歴はありません。</li>";
    return;
  }

  historyListElement.innerHTML = sessionSummaries
    .map(
      (summary) => `
        <li>
            <a href="#" data-session-id="${summary.id}">
                <span class="history-title">${summary.title || "無題のセッション"}</span>
                <span class="history-timestamp">${new Date(summary.lastUpdatedAt).toLocaleString()}</span>
            </a>
        </li>
    `
    )
    .join("");
}
export function renderConversationTurns(turnsArray) {
  // originalUrlを引数で受け取る
  if (!turnsArray || turnsArray.length === 0) {
    responseOutput.innerHTML = "<p>まだ会話がありません。</p>";
    return;
  }

  let conversationHtml = "";
  turnsArray.forEach((turn, index) => {
    // forEachの第2引数でインデックスを取得
    if (
      turn.role &&
      turn.parts &&
      turn.parts.length > 0 &&
      turn.parts[0].text
    ) {
      const textContent = turn.parts[0].text;
      let turnHtml = "";
      let displayContent = ""; // 表示用のコンテンツ

      if (turn.role === "user") {
        if (index === 0) {
          // finalPromptそのまま出すと長すぎる
          displayContent = "提示したドキュメントについて説明してください。";
          const sanitizedText = DOMPurify.sanitize(
            displayContent.replace(/\n/g, "<br>")
          );
          turnHtml = `<div class="chat-message user-message initial-request"><div class="message-bubble">${sanitizedText}</div></div>`;
        } else {
          // 2ターン目以降のユーザーの質問はそのまま表示
          displayContent = textContent;
          const sanitizedText = DOMPurify.sanitize(
            displayContent.replace(/\n/g, "<br>")
          );
          turnHtml = `<div class="chat-message user-message"><div class="message-bubble">${sanitizedText}</div></div>`;
        }
      } else if (turn.role === "model") {
        // モデルの応答はマークダウンとして処理
        try {
          const dirtyHtml = marked.parse(textContent);
          const cleanHtml = DOMPurify.sanitize(dirtyHtml);
          turnHtml = `<div class="chat-message model-message"><div class="message-bubble">${cleanHtml}</div></div>`;
        } catch (e) {
          console.error(
            "Markdown parsing/sanitizing error for model message:",
            e
          );
          const sanitizedText = DOMPurify.sanitize(
            textContent.replace(/\n/g, "<br>")
          );
          turnHtml = `<div class="chat-message model-message error-rendering"><div class="message-bubble">表示エラー: ${sanitizedText}</div></div>`;
        }
      }
      conversationHtml += turnHtml;
    }
  });
  responseOutput.innerHTML = conversationHtml;
}
