import { openDB } from "idb";

const DB_NAME = "ExplAInfyDB";
const DB_VERSION = 1;
const SESSIONS_STORE_NAME = "sessions";

let dbPromise = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, newVersion, _transaction) {
        console.log(`Upgrading DB from version ${oldVersion} to ${newVersion}`);
        if (!db.objectStoreNames.contains(SESSIONS_STORE_NAME)) {
          const store = db.createObjectStore(SESSIONS_STORE_NAME, {
            keyPath: "id", // セッションIDを主キーとする
          });
          // 履歴一覧のソート用にインデックスを作成 (例: 最終更新日時)
          store.createIndex("lastUpdatedAt", "lastUpdatedAt");
          console.log(`Object store ${SESSIONS_STORE_NAME} created.`);
        }
        // ここらへんよくわからんけど、スキーマの変更する場合は頑張って
      },
    });
  }
  return dbPromise;
}

/**
 * 新しい会話セッション、または更新されたセッションを保存する。
 * idbのputは、キーが存在すれば更新、なければ追加を行う。
 * @param {object} sessionData - 保存するセッションデータ
 * @returns {Promise<IDBValidKey>} 保存されたアイテムのキー (sessionId)
 */
export async function saveOrUpdateSession(sessionData) {
  if (!sessionData || !sessionData.id) {
    throw new Error("Session data must have an id.");
  }
  // 最終更新日時を自動で設定
  sessionData.lastUpdatedAt = Date.now();

  const db = await getDB();
  const tx = db.transaction(SESSIONS_STORE_NAME, "readwrite");
  const store = tx.objectStore(SESSIONS_STORE_NAME);
  const result = await store.put(sessionData);
  await tx.done;
  console.log("Session saved/updated:", sessionData.id);
  return result;
}

/**
 * 指定されたIDのセッションを取得する。
 * @param {string} sessionId
 * @returns {Promise<object|undefined>} セッションデータ、または見つからなければ undefined
 */
export async function getSession(sessionId) {
  const db = await getDB();
  const tx = db.transaction(SESSIONS_STORE_NAME, "readonly");
  const store = tx.objectStore(SESSIONS_STORE_NAME);
  const session = await store.get(sessionId);
  await tx.done;
  return session;
}

/**
 * 全てのセッションの概要（ID、タイトル、最終更新日時など）を最終更新日時の降順で取得する。
 * @returns {Promise<Array<object>>} セッション概要の配列
 */
export async function getAllSessionSummaries() {
  const db = await getDB();
  const tx = db.transaction(SESSIONS_STORE_NAME, "readonly");
  const store = tx.objectStore(SESSIONS_STORE_NAME);
  const index = store.index("lastUpdatedAt"); // インデックスを使用
  const allSessions = await index.getAll(); // lastUpdatedAt でソートされた状態で取得
  allSessions.reverse(); // 降順にする (もしindexが昇順なら)

  return allSessions.map((session) => ({
    // 必要な情報だけを抽出
    id: session.id,
    title: session.originalTitle,
    lastUpdatedAt: session.lastUpdatedAt,
    // turns は重いから含めない
  }));
}

/**
 * 指定されたIDのセッションを削除する。
 * @param {string} sessionId
 * @returns {Promise<void>}
 */
export async function deleteSession(sessionId) {
  const db = await getDB();
  const tx = db.transaction(SESSIONS_STORE_NAME, "readwrite");
  const store = tx.objectStore(SESSIONS_STORE_NAME);
  await store.delete(sessionId);
  await tx.done;
  console.log("Session deleted:", sessionId);
}
