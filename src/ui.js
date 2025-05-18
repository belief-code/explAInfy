import DOMPurify from "dompurify";
import { marked } from "marked";
import MicroModal from "micromodal";

let activeHistoryPopup = null; // 現在開いているポップアップを管理
// --- DOM要素のキャッシュ ---
const urlInputSection = document.getElementById("url-input-section");
const historyListElement = document.getElementById("history-list");
const responseSection = document.getElementById("response-section");
const responseOutput = document.getElementById("response-output");
const responseTitleLink = document.getElementById("response-title-link");
const responseTitleHeading = document.getElementById("response-title");
const logoLink = document.getElementById("logo-link");

// モーダル関連の要素 (モーダル制御とフォーム値設定に使う)
const modalGeminiApiKeyInput = document.getElementById(
  "modal-gemini-api-key-input"
);
const modalGeminiModelInput = document.getElementById(
  "modal-gemini-model-input"
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
    geminiModel: modalGeminiModelInput.value.trim(),
    userLevel: parseInt(selectedUserLevel, 10),
    userLevelText: modalUserLevelText.value.trim(),
    additionalPrompt: modalAdditionalPromptInput.value.trim(),
  };
}
export function populateModalFormWithSettings(settings) {
  modalGeminiApiKeyInput.value = settings.geminiApiKey || "";
  modalGeminiModelInput.value = settings.geminiModel || "";
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
export function updateResponseTitle(titleText, url = null) {
  // urlも引数で受け取る
  if (responseTitleHeading) {
    responseTitleHeading.textContent = titleText || "説明結果";
  } else {
    console.warn("#response-title (h2) element not found.");
  }

  if (responseTitleLink) {
    if (url) {
      responseTitleLink.href = url;
      responseTitleLink.style.display = "block"; // 表示する
    } else {
      responseTitleLink.href = "#"; // URLがない場合はリンクを無効化（または非表示）
      responseTitleLink.style.display = "none"; // URLがないならリンクごと隠すのも手
    }
  } else {
    console.warn("#response-title-link (a) element not found.");
  }
}
export function displayLoadingMessage(message = "<p>処理中...</p>") {
  responseOutput.innerHTML += message;
}

export function displayErrorMessage(errorMessageText) {
  responseOutput.innerHTML = `<p style="color: red;">エラー: ${errorMessageText}</p>`;
}

// アプリケーション起動時に行うUI関連の初期化 (main.js から呼び出す)
export function initializeUI() {
  initializeModal();
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
        <li class="history-item">
            <a href="#" class="history-link" data-session-id="${summary.id}">
                <span class="history-title">${summary.title || "無題のセッション"}</span>
                <span class="history-timestamp">${new Date(summary.lastUpdatedAt).toLocaleString()}</span>
            </a>
            <button class="history-item-menu-button" aria-label="メニューを開く" data-session-id="${summary.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
            </button>
            <div class="history-item-popup" id="popup-${summary.id}" style="display: none;">
                <ul>
                    <li><button class="popup-delete-button" data-session-id="${summary.id}">削除</button></li>
                    <!-- 他のメニュー項目も追加可能 -->
                </ul>
            </div>
        </li>
    `
    )
    .join("");
}
// ポップアップを表示する関数 (位置調整もここで行う)
export function showHistoryItemPopup(buttonElement, popupElement) {
  if (activeHistoryPopup && activeHistoryPopup !== popupElement) {
    activeHistoryPopup.style.display = "none";
  }

  popupElement.style.display = "block";
  activeHistoryPopup = popupElement;

  // --- 表示位置調整ロジック ---
  const viewportHeight = window.innerHeight;
  const historyItemElement = buttonElement.closest(".history-item"); // ★ 親のli要素を取得

  if (!historyItemElement) {
    // 親要素が見つからない場合は何もしない
    console.error("Could not find parent .history-item for popup positioning.");
    return;
  }

  popupElement.style.top = `${buttonElement.offsetHeight + 20}px`; // ボタンの高さ + 少しオフセット
  popupElement.style.bottom = "auto"; // bottom指定をリセット
  popupElement.style.left = "auto"; // left指定をリセット (right:0で制御)

  // 再度、表示後のポップアップの位置を取得して、下にはみ出ていないかチェック
  const finalPopupRect = popupElement.getBoundingClientRect();

  if (finalPopupRect.bottom > viewportHeight - 40) {
    // 下に40px以上の余裕がない場合
    // ポップアップの下端をボタンの上端に合わせる
    popupElement.style.top = "auto";
    popupElement.style.bottom = `${buttonElement.offsetHeight + 20}px`;
  }
}

// ポップアップを隠す関数
export function hideActiveHistoryPopup() {
  if (activeHistoryPopup) {
    activeHistoryPopup.style.display = "none";
    activeHistoryPopup = null;
  }
}

// ドキュメント全体のクリックでポップアップを閉じるイベントリスナー (initializeUIなどで一度だけ設定)
export function setupDocumentClickListenerForPopups() {
  document.addEventListener(
    "click",
    (event) => {
      if (activeHistoryPopup) {
        const popup = activeHistoryPopup; // 参照を保持
        const isClickInsidePopup = popup.contains(event.target);
        const isClickOnMenuButton = event.target.closest(
          ".history-item-menu-button"
        );

        if (!isClickInsidePopup && !isClickOnMenuButton) {
          hideActiveHistoryPopup();
        }
      }
    },
    true
  ); // キャプチャフェーズで実行して、他のクリックより先に判定する
}

export function renderConversationTurns(turnsArray, sessionUrl) {
  // originalUrlを引数で受け取る
  if (!turnsArray || turnsArray.length === 0) {
    responseOutput.innerHTML = "";
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
          displayContent = `${sessionUrl}の内容について説明してください。`;
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
