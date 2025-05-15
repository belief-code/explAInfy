import DOMPurify from "dompurify";
import { marked } from "marked";
import MicroModal from "micromodal";
import { getApiKey, getSettings, saveSettings } from "./settings.js";

// --- グローバル変数・定数 ---
const DEFAULT_SUMMARY_PROMPT =
  "以下のユーザーレベルと指示に従い、マークダウン形式で回答のみを生成してください。前置きや定型的な挨拶は不要です。";
const GEMINI_MODEL = "gemini-2.5-flash-preview-04-17";

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
    const articleData = await fetchArticleContent(
      urlToProcess,
      JINA_API_KEY_FOR_REQUEST
    );
    if (!articleData || !articleData.content) {
      responseOutput.innerHTML = "<p>記事の本文を取得できませんでした。</p>";
      return;
    }
    const articleContent = articleData.content;
    const articleTitle = articleData.title || "説明結果"; // titleがなければデフォルト

    document.querySelector("#response-section h2").textContent = articleTitle; // タイトルを設定
    const markdownSummary = await summarizeTextWithGemini(
      articleContent,
      GEMINI_API_KEY_FOR_REQUEST
    );
    if (markdownSummary) {
      const dirtyHtml = marked.parse(markdownSummary);
      const cleanHtml = DOMPurify.sanitize(dirtyHtml);
      responseOutput.innerHTML = cleanHtml;
    } else {
      responseOutput.innerHTML = "<p>要約を取得できませんでした。</p>";
    }
  } catch (error) {
    console.error("処理中にエラーが発生しました:", error);
    responseOutput.innerHTML = `<p>エラーが発生しました: ${error.message}</p>`;
  }
}

async function fetchArticleContent(url, jinaApiKey) {
  // Jina AI Reader API (jina.ai/reader) は GET リクエストで URL を `https://r.jina.ai/` の後に続ける
  // ヘッダーに Authorization: Bearer YOUR_JINA_API_KEY が必要
  const readerApiUrl = `https://r.jina.ai/${url}`;
  console.log(`Fetching content from: ${readerApiUrl}`); // デバッグ用

  const response = await fetch(readerApiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jinaApiKey}`,
      Accept: "application/json", // JSON形式で結果を受け取ることを期待 (API仕様的に多分行ける)
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    console.error("Jina API Error:", errorData); // デバッグ用
    throw new Error(
      `Jina APIからのコンテンツ取得に失敗しました: ${errorData.message || response.status}`
    );
  }

  const data = await response.json();
  console.log("Jina API Response Data:", data); // デバッグ用
  // Jina Reader APIのレスポンス構造に合わせて本文を取得する
  // 通常、data.data.content や data.content などに本文が含まれるはず
  // ここでは仮に data.data.content とする
  if (data && data.data && data.data.content) {
    return data.data;
  } else {
    console.warn("Jina API did not return expected content structure.");
    return null; // または適切なエラー処理
  }
}

async function summarizeTextWithGemini(textToSummarize, geminiApiKey) {
  const savedSettings = getSettings();
  let finalPrompt = DEFAULT_SUMMARY_PROMPT; // 基本プロンプト

  // ユーザーレベルに応じたプロンプト調整
  if (savedSettings.userLevel) {
    let levelDescription = "";
    switch (savedSettings.userLevel) {
      case 1:
        levelDescription = "私はプログラミング完全初学者です。";
        break;
      case 2:
        levelDescription = "私はプログラミング初学者です。";
        break;
      case 3:
        levelDescription = "私はプログラミング中級者です。";
        break;
      case 4:
        levelDescription = "私はプログラミング上級者です。";
        break;
      case 5:
        levelDescription =
          "私は非常に経験豊富なプログラミングエキスパートです。";
        break;
    }
    if (levelDescription) {
      finalPrompt += `\n${levelDescription}`;
    }
  }
  if (savedSettings.userLevelText) {
    finalPrompt += `\nユーザーの自己申告レベル: ${savedSettings.userLevelText}`;
  }
  // 追加プロンプト
  if (savedSettings.additionalPrompt) {
    finalPrompt += `\n追加の指示: ${savedSettings.additionalPrompt}`;
  }

  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `${finalPrompt}\n\n${textToSummarize}`, // プロンプトと本文を結合
          },
        ],
      },
    ],
    // generationConfig や safetySettings も必要に応じて追加➝多分期間内には無理
  };

  const response = await fetch(geminiApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    console.error("Gemini API Error:", errorData);
    throw new Error(
      `Gemini APIからの要約取得に失敗しました: ${errorData.error ? errorData.error.message : response.status}`
    );
  }

  const data = await response.json();
  console.log("Gemini API Response Data:", data); // デバッグ用

  // Gemini APIのレスポンス構造に合わせて要約テキストを取得
  // 通常、data.candidates[0].content.parts[0].text に含まれるっぽい。
  if (
    data.candidates &&
    data.candidates.length > 0 &&
    data.candidates[0].content &&
    data.candidates[0].content.parts &&
    data.candidates[0].content.parts.length > 0
  ) {
    return data.candidates[0].content.parts[0].text;
  } else {
    console.warn("Gemini API did not return expected summary structure.");
    return "要約を取得できませんでした。";
  }
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
  if (!getApiKey("jina") || !getApiKey("gemini")) {
    alert("APIキーがまだ設定されていません。一部機能が利用できません。");
  }
}
