const SETTINGS_STORAGE_KEY = "ExplAInfySettings";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";

// モジュール内のプライベートな状態として設定を保持
let currentSettings = {
  jinaApiKey: "",
  geminiApiKey: "",
  geminiModel: DEFAULT_GEMINI_MODEL,
  userLevel: 1,
  userLevelText: "",
  additionalPrompt: "",
};

// デフォルト設定
const defaultSettings = {
  jinaApiKey: "",
  geminiApiKey: "",
  geminiModel: DEFAULT_GEMINI_MODEL,
  userLevel: 1,
  userLevelText: "",
  additionalPrompt: "",
};

/**
 * アプリケーション起動時にローカルストレージから設定を読み込む。
 * 保存された設定がなければデフォルト値（または空）で初期化。
 */
export function initializeSettings() {
  const savedSettingsString = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (savedSettingsString) {
    try {
      const savedSettings = JSON.parse(savedSettingsString);
      currentSettings = { ...defaultSettings, ...savedSettings };
      if (currentSettings.geminiModel === "") {
        currentSettings.geminiModel = DEFAULT_GEMINI_MODEL;
      }
    } catch (e) {
      console.error("Failed to parse settings from localStorage", e);
      currentSettings = { ...defaultSettings };
    }
  } else {
    currentSettings = { ...defaultSettings };
  }
  console.log("Settings initialized:", currentSettings);
}

/**
 * 現在の全ての設定オブジェクトのコピーを返す。
 * @returns {object} 設定オブジェクト
 */
export function getSettings() {
  return { ...currentSettings }; // 外部で直接変更できないようにコピーを返す
}

/**
 * 特定のAPIキーを取得する。
 * @param {'jina' | 'gemini'} type - 取得したいAPIキーのタイプ
 * @returns {string} APIキー
 */
export function getApiKey(type) {
  if (type === "jina") {
    return currentSettings.jinaApiKey;
  }
  if (type === "gemini") {
    return currentSettings.geminiApiKey;
  }
  return "";
}
// Geminiモデル名を取得する
export function getGeminiModel() {
  // 空文字列の場合はデフォルトを返すようにする
  return currentSettings.geminiModel || DEFAULT_GEMINI_MODEL;
}

/**
 * 新しい設定オブジェクトを受け取り、現在の設定を更新してローカルストレージに保存する。
 * @param {object} newSettings - 保存する新しい設定オブジェクト
 */
export function saveSettings(newSettings) {
  if (newSettings.geminiModel === "") {
    newSettings.geminiModel = DEFAULT_GEMINI_MODEL;
  }
  // newSettings の中身を検証・サニタイズしてもいい
  currentSettings = { ...currentSettings, ...newSettings }; // 部分的な更新も許容
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(currentSettings));
    console.log("Settings saved:", currentSettings);
  } catch (e) {
    console.error("Failed to save settings to localStorage", e);
    // ストレージがいっぱいの場合などのエラーハンドリング
    alert("設定の保存に失敗しました。ストレージの空き容量を確認してください。");
  }
}

/**
 * 全ての設定をデフォルトに戻す（ローカルストレージからも削除）
 */
export function resetSettings() {
  currentSettings = { ...defaultSettings };
  localStorage.removeItem(SETTINGS_STORAGE_KEY);
  console.log("Settings reset to default.");
}

// 初期化をこのモジュールが読み込まれた時に行う
initializeSettings();
