import DOMPurify from "dompurify";
import { marked } from "marked";
import MicroModal from "micromodal";

// --- グローバル変数・定数 ---
let JINA_API_KEY = "";
let GEMINI_API_KEY = "";
const DEFAULT_SUMMARY_PROMPT =
  "この記事の内容を、見出し、リスト、太字などを使ったマークダウン形式で、日本語で要点をまとめてください。";
const GEMINI_MODEL = "gemini-2.5-flash-preview-04-17";
const SETTINGS_STORAGE_KEY = "explaInfySettings";

// --- DOM要素のキャッシュ (ページロード時に一度だけ取得) ---
// 主要なセクション
const urlInputSection = document.getElementById("url-input-section");
const responseSection = document.getElementById("response-section");
// const settingsSection = document.getElementById("settings-section"); // メインページ内の設定セクションは不要になったのでコメントアウト

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
const userLevelRadios = document.querySelectorAll(
  'input[name="user-level-radio"]'
);
const userLevelText = document.getElementById("user-level-text");
const modalAdditionalPromptInput = document.getElementById(
  // IDを変更 (追加質問とモーダル内のものとを区別)
  "modal-additional-prompt-input"
);
const modalTabs = document.querySelectorAll(".modal-tabs .tab-item");
const tabContents = document.querySelectorAll(".modal__content .tab-content");

// 履歴関連 (まだ本格的には使わないが、要素だけ取得しておく)
const historySidebar = document.getElementById("history-sidebar");
const historyList = document.getElementById("history-list");

// --- 初期化処理 ---
document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  initializeModal();
  initializeTextareaAutoHeight(urlTextarea, 2);
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
      loadSettingsToModal();
      MicroModal.show("modal-settings");
    });
  }

  if (saveModalSettingsButton) {
    saveModalSettingsButton.addEventListener("click", () => {
      saveSettingsFromModal();
    });
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
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        submitButton.click();
      }
    });
  }

  if (submitAdditionalQuestionButton && additionalQuestionTextarea) {
    // submitAdditionalQuestionButton.addEventListener('click', handleAdditionalQuestion); // 後で実装
    additionalQuestionTextarea.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        // submitAdditionalQuestionButton.click(); // 後で実装
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
  // submitButtonの処理を関数に分離
  const urlToProcess = urlTextarea.value.trim();
  if (!urlToProcess) {
    alert("URLを入力してください。");
    return;
  }

  responseOutput.innerHTML = "<p>処理中...</p>";
  showPage(responseSection);

  try {
    const articleContent = await fetchArticleContent(urlToProcess);
    if (!articleContent) {
      responseOutput.innerHTML = "<p>記事の本文を取得できませんでした。</p>";
      return;
    }
    const markdownSummary = await summarizeTextWithGemini(articleContent);
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

async function fetchArticleContent(url) {
  // Jina AI Reader API (jina.ai/reader) は GET リクエストで URL を `https://r.jina.ai/` の後に続ける
  // ヘッダーに Authorization: Bearer YOUR_JINA_API_KEY が必要
  const readerApiUrl = `https://r.jina.ai/${url}`;
  console.log(`Fetching content from: ${readerApiUrl}`); // デバッグ用

  const response = await fetch(readerApiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JINA_API_KEY}`,
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
    return data.data.content;
  } else {
    console.warn("Jina API did not return expected content structure.");
    return null; // または適切なエラー処理
  }
}

async function summarizeTextWithGemini(textToSummarize) {
  const savedSettings = JSON.parse(
    localStorage.getItem(SETTINGS_STORAGE_KEY) || "{}"
  );
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

  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

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
function loadSettings() {
  const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    JINA_API_KEY = settings.jinaApiKey || ""; // デフォルト値
    GEMINI_API_KEY = settings.geminiApiKey || ""; // デフォルト値
    console.log("設定を読み込みました:", settings);
  } else {
    console.log("保存された設定はありません。デフォルト値を使用します。");
  }
  // APIキーが空の場合のハンドリングをAPI呼び出し前に追加する方が良いかも
  if (!JINA_API_KEY || !GEMINI_API_KEY) {
    console.warn("APIキーが設定されていません。設定画面から設定してください。");
    // 必要であれば、ユーザーに通知するUIを表示
  }
}

function loadSettingsToModal() {
  const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    modalGeminiApiKeyInput.value = settings.geminiApiKey || "";
    modalJinaApiKeyInput.value = settings.jinaApiKey || "";
    const savedLevelRadio = Array.from(userLevelRadios).find(
      (radio) => radio.value === String(settings.userLevel)
    );
    if (savedLevelRadio) savedLevelRadio.checked = true;
    else userLevelRadios[0].checked = true;
    userLevelText.value = settings.userLevelText || "";
    if (modalAdditionalPromptInput) {
      // 要素が存在するか確認
      modalAdditionalPromptInput.value = settings.additionalPrompt || "";
    }
  } else {
    modalGeminiApiKeyInput.value = GEMINI_API_KEY;
    modalJinaApiKeyInput.value = JINA_API_KEY;
    userLevelRadios[0].checked = true;
    userLevelText.value = "";
    if (modalAdditionalPromptInput) modalAdditionalPromptInput.value = "";
  }
}

function saveSettingsFromModal() {
  let selectedLevel = "1"; // デフォルト
  userLevelRadios.forEach((radio) => {
    if (radio.checked) {
      selectedLevel = radio.value;
    }
  });

  const settings = {
    geminiApiKey: modalGeminiApiKeyInput.value.trim(),
    jinaApiKey: modalJinaApiKeyInput.value.trim(),
    userLevel: parseInt(selectedLevel, 10),
    userLevelText: userLevelText.value.trim(),
    additionalPrompt: modalAdditionalPromptInput.value.trim(),
  };
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  console.log("設定を保存しました:", settings);
  loadSettings(); // 保存後すぐに設定を再読み込みして適用
  alert("設定を保存しました。"); // ユーザーへのフィードバック
}
