import { getApiKey } from "./settings.js";

const GEMINI_MODEL = "gemini-2.0-flash-001";
const DEFAULT_SYSTEM_PROMPT_PARTS = [
  // システム側の固定指示を配列で管理
  "あなたは公式ドキュメントの内容を解説する専門家です。",
  "ユーザーのレベルや追加の指示に合わせて、提供されたドキュメントの本文を説明してください。",
  "回答はマークダウン形式で、見出し、リスト、太字などを効果的に使用し、構造的に分かりやすく記述してください。",
  "回答には、前置きや定型的な挨拶、感謝の言葉などは一切含めず、説明内容のみを出力してください。",
];

async function fetchArticleContentInternal(url, jinaApiKey) {
  if (!jinaApiKey) {
    return { error: "Jina APIキーが設定されていません。" };
  }
  const readerApiUrl = `https://r.jina.ai/${url}`;
  try {
    const response = await fetch(readerApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jinaApiKey}`,
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      return {
        error: `Jina APIからのコンテンツ取得に失敗しました: ${errorData.message || response.status}`,
      };
    }
    const data = await response.json();
    if (data && data.data && data.data.content) {
      return { content: data.data.content, title: data.data.title || null };
    }
    return { error: "Jina APIが期待されるコンテンツ構造を返しませんでした。" };
  } catch (e) {
    console.error("fetchArticleContentInternal error:", e);
    return {
      error: "記事コンテンツの取得中にネットワークエラーが発生しました。",
    };
  }
}

async function generateSummaryWithGeminiInternal(
  textToSummarize,
  userSettings,
  geminiApiKey
) {
  // internal
  if (!geminiApiKey) {
    return { error: "Gemini APIキーが設定されていません。" };
  }
  const modelToUse = userSettings.geminiModel || GEMINI_MODEL;
  // --- ここでプロンプトエンジニアリングを行う ---
  let promptParts = [...DEFAULT_SYSTEM_PROMPT_PARTS];

  // ユーザーレベルに応じた指示を追加
  if (userSettings.userLevel) {
    let levelDescription = "";
    switch (userSettings.userLevel) {
      case 1:
        levelDescription =
          "対象読者はプログラミング完全初学者です。専門用語は避け、非常に基本的な概念から丁寧に説明してください。";
        break;
      case 2:
        levelDescription =
          "対象読者はプログラミング初学者です。基本的な用語は使っても良いですが、平易な言葉で説明してください。";
        break;
      case 3:
        levelDescription =
          "対象読者はプログラミング中級者です。ある程度の専門用語や抽象的な概念も理解できます。";
        break;
      case 4:
        levelDescription =
          "対象読者はプログラミング上級者です。簡潔かつ技術的に正確な説明を好みます。";
        break;
      case 5:
        levelDescription =
          "対象読者は非常に経験豊富なプログラミングエキスパートです。詳細な技術的背景やニュアンスまで踏み込んだ説明を期待しています。";
        break;
    }
    if (levelDescription) promptParts.push(levelDescription);
  }
  if (userSettings.userLevelText) {
    // ユーザーの自由記述レベルは、そのままLLMに伝える情報として追加
    // ここでサニタイズやバリデーションをかけることも検討できる
    promptParts.push(
      `ユーザーからの補足情報（レベル感など）: 「${userSettings.userLevelText}」`
    );
  }

  // 追加の指示
  if (userSettings.additionalPrompt) {
    // こちらもサニタイズやバリデーションを検討
    promptParts.push(
      `ユーザーからの追加の指示: 「${userSettings.additionalPrompt}」`
    );
  }

  promptParts.push("\n--- ドキュメント本文 ---");
  promptParts.push(textToSummarize);
  promptParts.push("--- 説明開始 ---");

  const finalPrompt = promptParts.join("\n");
  console.log("Final prompt to Gemini:", finalPrompt); // デバッグ用

  // --- Gemini API 呼び出し ---
  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${geminiApiKey}`;
  const requestBody = { contents: [{ parts: [{ text: finalPrompt }] }] };

  try {
    const response = await fetch(geminiApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      return {
        error: `Gemini APIエラー: ${errorData.error ? errorData.error.message : response.status}`,
      };
    }
    const data = await response.json();
    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      return {
        summaryMarkdown: data.candidates[0].content.parts[0].text,
        actualPromptSentToLLM: finalPrompt,
      };
    }
    return { error: "Gemini APIが期待される要約構造を返しませんでした。" };
  } catch (e) {
    console.error("generateSummaryWithGeminiInternal error:", e);
    return { error: "要約生成中にネットワークエラーが発生しました。" };
  }
}

/**
 * 指定されたURLのドキュメント内容を取得し、ユーザー設定に基づいて要約を生成する。
 * @param {string} url - 要約対象のドキュメントURL
 * @param {object} userSettings - ユーザー設定オブジェクト (settings.jsから取得したもの)
 * @returns {Promise<object>} { title?: string, summaryMarkdown?: string, error?: string } 形式のオブジェクト
 */
export async function getDocumentSummary(url, userSettings) {
  const jinaApiKey = getApiKey("jina"); // main.jsがgetSettings()で取得したものを渡す
  const geminiApiKey = getApiKey("gemini");

  // 1. 本文取得
  const articleResult = await fetchArticleContentInternal(url, jinaApiKey);
  if (articleResult.error) {
    return { error: articleResult.error };
  }
  if (!articleResult.content) {
    return { error: "記事の本文コンテンツが見つかりませんでした。" };
  }

  // 2. 要約生成
  const summaryResult = await generateSummaryWithGeminiInternal(
    articleResult.content,
    userSettings,
    geminiApiKey
  );
  if (summaryResult.error) {
    return { error: summaryResult.error, title: articleResult.title }; // エラーでもタイトルは返す
  }

  return {
    title: articleResult.title,
    summaryMarkdown: summaryResult.summaryMarkdown,
    actualPromptSentToLLM: summaryResult.actualPromptSentToLLM,
  };
}

export async function getFollowUpResponse(
  conversationHistory,
  newQuestionText,
  userSettings
) {
  const geminiApiKey = getApiKey("gemini"); // settings.jsから
  if (!geminiApiKey) {
    return { error: "Gemini APIキーが設定されていません。" };
  }
  const modelToUse = userSettings.geminiModel || GEMINI_MODEL;

  // conversationHistory は [{role, parts:[{text}]}, ...] の形式を期待
  const contentsForApi = conversationHistory.map((turn) => ({
    role: turn.role,
    parts: turn.parts.map((part) => ({ text: part.text })), // text以外のpartもあれば考慮
  }));
  contentsForApi.push({ role: "user", parts: [{ text: newQuestionText }] });

  // --- (任意) トークン数管理: ここで contentsForApi が長すぎる場合の処理 ---
  // 例: const limitedContents = limitConversationTurns(contentsForApi, 10); // 最新10ターン
  // finalContents = limitedContents;

  // --- プロンプトエンジニアリング (追加質問用) ---
  // 初回要約時とは異なり、システム指示は conversationHistory の先頭に既にある想定か、
  // あるいは毎回付与するか。Gemini APIは会話履歴をそのまま渡せば文脈を理解するはず。
  // 必要なら、userSettingsから得られる指示をここでも考慮して
  // contentsForApi の末尾 (ユーザーの質問の前) に model ロールでシステムメッセージを挟むこともできる。
  // 今回はシンプルに会話履歴 + 新しい質問とする。

  const requestBody = {
    contents: contentsForApi,
    // generationConfig や safetySettings も userSettings から取得して設定可能
    generationConfig: {
      /* ... */
    },
    safetySettings: [
      /* ... */
    ],
  };
  // ログで確認
  console.log(
    "Sending to Gemini (follow-up):",
    JSON.stringify(requestBody, null, 2)
  );

  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${geminiApiKey}`;
  try {
    const response = await fetch(geminiApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      return {
        error: `Gemini APIエラー (追加質問): ${errorData.error ? errorData.error.message : response.status}`,
      };
    }
    const data = await response.json();
    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      // 実際には、新しいユーザーの質問と、モデルの応答の両方を返す必要がある
      return {
        userQuestion: newQuestionText, // 保存用
        modelResponseMarkdown: data.candidates[0].content.parts[0].text,
      };
    }
    return {
      error: "Gemini APIが期待される応答構造を返しませんでした (追加質問)。",
    };
  } catch (e) {
    console.error("getFollowUpResponse error:", e);
    return {
      error: "追加質問の応答生成中にネットワークエラーが発生しました。",
    };
  }
}
