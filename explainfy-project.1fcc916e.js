// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"9sVWG":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 8080;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "47f455d51fcc916e";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"fILKw":[function(require,module,exports,__globalThis) {
var _apiJs = require("./api.js");
var _dbJs = require("./db.js");
var _settingsJs = require("./settings.js");
var _uiJs = require("./ui.js");
// --- DOM要素のキャッシュ (ページロード時に一度だけ取得) ---
// 主要なセクション
const urlInputSection = document.getElementById("url-input-section");
const historyListElement = document.getElementById("history-list");
// URL入力関連
const urlTextarea = document.getElementById("url-input");
const submitButton = document.getElementById("submit-button");
// 応答関連
const additionalQuestionTextarea = document.getElementById("additional-question-input");
const submitAdditionalQuestionButton = document.getElementById("submit-additional-question-button");
// ヘッダー関連
const logoLink = document.getElementById("logo-link");
const settingButton = document.getElementById("setting-button");
// モーダル関連
const saveModalSettingsButton = document.getElementById("save-modal-settings-button");
const modalTabs = document.querySelectorAll(".modal-tabs .tab-item");
const tabContents = document.querySelectorAll(".modal__content .tab-content");
let currentActiveSessionId = null;
let currentTurns = []; //現在の会話のターンを保持する配列
// --- 初期化処理 ---
document.addEventListener("DOMContentLoaded", async ()=>{
    (0, _settingsJs.initializeSettings)(); // settings.js の初期化を呼ぶ
    _uiJs.initializeUI(); // ui.js のUI初期化を呼ぶ
    _uiJs.initializeTextareaAutoHeight(urlTextarea, 1);
    _uiJs.initializeTextareaAutoHeight(document.getElementById("additional-question-input"), 1);
    await updateAndRenderHistory();
    setupEventListeners();
    _uiJs.showPage(urlInputSection); // 初期表示
    if (!(0, _settingsJs.getApiKey)("jina") || !(0, _settingsJs.getApiKey)("gemini")) {
        alert("API\u30AD\u30FC\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u8A2D\u5B9A\u753B\u9762\u3092\u958B\u304D\u307E\u3059\u3002");
        _uiJs.populateModalFormWithSettings((0, _settingsJs.getSettings)()); // 現在の設定をモーダルに反映
        _uiJs.openSettingsModal();
    }
});
// --- 関数定義 ---
function setupEventListeners() {
    if (settingButton) settingButton.addEventListener("click", ()=>{
        _uiJs.populateModalFormWithSettings((0, _settingsJs.getSettings)());
        _uiJs.openSettingsModal();
    });
    if (saveModalSettingsButton) saveModalSettingsButton.addEventListener("click", handleSaveSettings);
    if (logoLink) logoLink.addEventListener("click", (event)=>{
        event.preventDefault();
        _uiJs.showPage(urlInputSection);
    });
    if (historyListElement) historyListElement.addEventListener("click", async (event)=>{
        const link = event.target.closest("a[data-session-id]");
        if (!link) return;
        event.preventDefault();
        const sessionId = link.dataset.sessionId;
        if (!sessionId) return;
        _uiJs.displayLoadingMessage("<p>\u5C65\u6B74\u3092\u8AAD\u307F\u8FBC\u3093\u3067\u3044\u307E\u3059...</p>"); // ローディング表示
        _uiJs.showPage(document.getElementById("response-section")); // 先に応答画面に切り替え
        try {
            const sessionData = await _dbJs.getSession(sessionId);
            if (sessionData && sessionData.turns) {
                currentActiveSessionId = sessionId;
                currentTurns = sessionData.turns;
                _uiJs.renderConversationTurns(currentTurns);
                _uiJs.updateResponseTitle(sessionData.originalTitle || "\u8AAC\u660E\u7D50\u679C");
            } else {
                _uiJs.displayErrorMessage("\u9078\u629E\u3055\u308C\u305F\u5C65\u6B74\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002");
                currentActiveSessionId = null;
                currentTurns = [];
            }
        } catch (error) {
            console.error("\u5C65\u6B74\u306E\u8AAD\u307F\u8FBC\u307F\u4E2D\u306B\u30A8\u30E9\u30FC:", error);
            _uiJs.displayErrorMessage("\u5C65\u6B74\u306E\u8AAD\u307F\u8FBC\u307F\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002");
            currentActiveSessionId = null;
            currentTurns = [];
        }
    });
    if (submitButton && urlTextarea) {
        submitButton.addEventListener("click", handleSubmit);
        urlTextarea.addEventListener("keydown", (event)=>{
            // Ctrl + Enter (または Meta + Enter for Mac) で送信
            if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                event.preventDefault(); // デフォルトのEnterキーの動作（改行）をキャンセル
                submitButton.click(); // 送信ボタンのクリックイベントを発火
            }
        });
    }
    if (submitAdditionalQuestionButton && additionalQuestionTextarea) {
        submitAdditionalQuestionButton.addEventListener("click", handleAdditionalQuestion);
        additionalQuestionTextarea.addEventListener("keydown", (event)=>{
            if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                handleAdditionalQuestion(); // Ctrl+Enterでも同じ関数を呼ぶ
            }
        });
    }
    modalTabs.forEach((tab)=>{
        tab.addEventListener("click", ()=>{
            modalTabs.forEach((t)=>t.classList.remove("active-tab"));
            tabContents.forEach((c)=>c.classList.remove("active-tab-content"));
            tab.classList.add("active-tab");
            const targetContentId = tab.dataset.tabTarget;
            document.querySelector(targetContentId).classList.add("active-tab-content");
        });
    });
}
async function updateAndRenderHistory() {
    try {
        const summaries = await _dbJs.getAllSessionSummaries();
        _uiJs.renderHistoryList(summaries);
    } catch (error) {
        console.error("\u5C65\u6B74\u306E\u53D6\u5F97\u307E\u305F\u306F\u8868\u793A\u306B\u5931\u6557\u3057\u307E\u3057\u305F:", error);
    // ui.renderHistoryList([]); // 空のリストを表示するなどのフォールバック
    }
}
async function handleSubmit() {
    if (!(0, _settingsJs.getApiKey)("jina") || !(0, _settingsJs.getApiKey)("gemini")) {
        alert("API\u30AD\u30FC\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044");
        _uiJs.populateModalFormWithSettings((0, _settingsJs.getSettings)());
        _uiJs.openSettingsModal();
        return;
    }
    const urlToProcess = urlTextarea.value.trim();
    if (!urlToProcess) {
        alert("URL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
        return;
    }
    _uiJs.displayLoadingMessage();
    _uiJs.showPage(document.getElementById("response-section"));
    const newSessionId = crypto.randomUUID(); // UUIDを生成
    currentActiveSessionId = newSessionId; // 現在のセッションIDとして保持 (main.js内の変数)
    try {
        const userSettings = (0, _settingsJs.getSettings)();
        const summaryResult = await _apiJs.getDocumentSummary(urlToProcess, userSettings);
        if (summaryResult.error) _uiJs.displayErrorMessage(summaryResult.error);
        else {
            _uiJs.updateResponseTitle(summaryResult.title || "\u8AAC\u660E\u7D50\u679C");
            const userTurnContent = summaryResult.actualPromptSentToLLM || `\u{30C9}\u{30AD}\u{30E5}\u{30E1}\u{30F3}\u{30C8}: ${urlToProcess} \u{306E}\u{8AAC}\u{660E}\u{3092}\u{4F9D}\u{983C}`;
            const modelTurnContent = summaryResult.summaryMarkdown;
            currentTurns = [
                {
                    role: "user",
                    parts: [
                        {
                            text: userTurnContent
                        }
                    ]
                },
                {
                    role: "model",
                    parts: [
                        {
                            text: modelTurnContent
                        }
                    ]
                }
            ];
            const sessionData = {
                id: currentActiveSessionId,
                originalUrl: urlToProcess,
                originalTitle: summaryResult.title,
                createdAt: Date.now(),
                turns: currentTurns
            };
            await _dbJs.saveOrUpdateSession(sessionData);
            _uiJs.renderConversationTurns(currentTurns); // UIにも反映
            await updateAndRenderHistory();
        }
    } catch (error) {
        console.error("getDocumentSummary \u547C\u3073\u51FA\u3057\u4E2D\u306B\u30A8\u30E9\u30FC:", error);
        _uiJs.displayErrorMessage("\u4E88\u671F\u305B\u306C\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002");
    }
}
function handleSaveSettings() {
    const newSettings = _uiJs.getSettingsFromModalForm();
    if (newSettings) {
        (0, _settingsJs.saveSettings)(newSettings);
        alert("\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F\u3002");
        // APIキーが保存されたかどうかの再チェックとUIへのフィードバック
        if (!(0, _settingsJs.getApiKey)("jina") || !(0, _settingsJs.getApiKey)("gemini")) {
            alert("API\u30AD\u30FC\u304C\u307E\u3060\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u4E00\u90E8\u6A5F\u80FD\u304C\u5229\u7528\u3067\u304D\u307E\u305B\u3093\u3002");
            _uiJs.highlightEmptyApiKeysInModal();
            return;
        } else _uiJs.clearApiKeyErrorStylesInModal();
    } else // getSettingsFromModalForm で問題があった場合 (通常は起こらないはず)
    console.error("\u30E2\u30FC\u30C0\u30EB\u304B\u3089\u306E\u8A2D\u5B9A\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002");
    _uiJs.closeSettingsModal();
}
async function handleAdditionalQuestion() {
    if (!currentActiveSessionId) {
        alert("\u307E\u305A\u6700\u521D\u306E\u8CEA\u554F\u3092\u884C\u3046\u304B\u3001\u5C65\u6B74\u304B\u3089\u4F1A\u8A71\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
        return;
    }
    const newQuestionText = additionalQuestionTextarea.value.trim();
    if (!newQuestionText) {
        alert("\u8FFD\u52A0\u306E\u8CEA\u554F\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
        return;
    }
    if (!(0, _settingsJs.getApiKey)("gemini")) {
        // Jinaはここでは不要
        alert("Gemini API\u30AD\u30FC\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002");
        _uiJs.populateModalFormWithSettings((0, _settingsJs.getSettings)());
        _uiJs.openSettingsModal();
        return;
    }
    // UIにユーザーの質問を即時反映 (送信中であることが分かるように)
    const userTurnForUI = {
        role: "user",
        parts: [
            {
                text: newQuestionText
            }
        ],
        timestamp: Date.now()
    };
    currentTurns.push(userTurnForUI);
    _uiJs.renderConversationTurns(currentTurns); // 新しい質問をUIに追加
    additionalQuestionTextarea.value = ""; // 入力欄クリア
    _uiJs.displayLoadingMessage("<p>AI\u304C\u5FDC\u7B54\u3092\u8003\u3048\u3066\u3044\u307E\u3059...</p>"); // ローディング表示を応答エリアの末尾に
    try {
        const userSettings = (0, _settingsJs.getSettings)();
        // APIに渡す履歴からはtimestampを除く
        const historyForApi = currentTurns.slice(0, -1).map((turn)=>({
                // 最後に追加したUI用ユーザーターンを除く
                role: turn.role,
                parts: turn.parts.map((p)=>({
                        text: p.text
                    }))
            }));
        const result = await _apiJs.getFollowUpResponse(historyForApi, newQuestionText, userSettings);
        if (result.error) {
            _uiJs.displayErrorMessage(result.error);
            currentTurns.pop(); // 送信失敗したのでUIからユーザーの質問を削除 (またはエラー表示に置き換える)
            _uiJs.renderConversationTurns(currentTurns); // UI更新
        } else {
            const modelTurnForStorage = {
                role: "model",
                parts: [
                    {
                        text: result.modelResponseMarkdown
                    }
                ],
                timestamp: Date.now()
            };
            // currentTurns の最後の要素 (UIに表示したユーザーの質問) の後にモデルの応答を追加
            // currentTurns.pop(); // UI用に追加したユーザーの質問を一度削除し、API応答と一緒にDB保存用の形式で再追加する
            // 上記だとtimestampがずれるので、メモリ上のcurrentTurnsはそのままにして、
            // DB保存時はAPIに送ったnewQuestionTextとAPIからの応答をペアにする
            currentTurns[currentTurns.length - 1] = {
                // 最後にUIに追加したユーザーの質問を更新(timestampはそのまま)
                role: "user",
                parts: [
                    {
                        text: newQuestionText
                    }
                ],
                timestamp: userTurnForUI.timestamp
            };
            currentTurns.push(modelTurnForStorage);
            // DBに保存
            const sessionToUpdate = await _dbJs.getSession(currentActiveSessionId);
            if (sessionToUpdate) {
                sessionToUpdate.turns = currentTurns.map((turn)=>({
                        // DB保存用にはtimestampを含める
                        role: turn.role,
                        parts: turn.parts,
                        timestamp: turn.timestamp || Date.now()
                    }));
                await _dbJs.saveOrUpdateSession(sessionToUpdate);
            }
            _uiJs.renderConversationTurns(currentTurns); // 全体を再描画
            await updateAndRenderHistory(); // 履歴リストも更新
        }
    } catch (error) {
        console.error("\u8FFD\u52A0\u8CEA\u554F\u51E6\u7406\u4E2D\u306B\u30A8\u30E9\u30FC:", error);
        _uiJs.displayErrorMessage("\u8FFD\u52A0\u8CEA\u554F\u306E\u51E6\u7406\u4E2D\u306B\u4E88\u671F\u305B\u306C\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002");
    // 必要なら currentTurns から最後のユーザー質問を削除
    } finally{
    // ローディング解除 (エラーでも成功でも responseOutput は上書きされるので不要かも)
    }
}

},{"./api.js":"38UJz","./settings.js":"1miDW","./ui.js":"4OwKy","./db.js":"jkmVr"}],"38UJz":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 指定されたURLのドキュメント内容を取得し、ユーザー設定に基づいて要約を生成する。
 * @param {string} url - 要約対象のドキュメントURL
 * @param {object} userSettings - ユーザー設定オブジェクト (settings.jsから取得したもの)
 * @returns {Promise<object>} { title?: string, summaryMarkdown?: string, error?: string } 形式のオブジェクト
 */ parcelHelpers.export(exports, "getDocumentSummary", ()=>getDocumentSummary);
parcelHelpers.export(exports, "getFollowUpResponse", ()=>getFollowUpResponse);
var _settingsJs = require("./settings.js");
const GEMINI_MODEL = "gemini-2.5-flash-preview-04-17";
const DEFAULT_SYSTEM_PROMPT_PARTS = [
    // システム側の固定指示を配列で管理
    "\u3042\u306A\u305F\u306F\u516C\u5F0F\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u306E\u5185\u5BB9\u3092\u89E3\u8AAC\u3059\u308B\u5C02\u9580\u5BB6\u3067\u3059\u3002",
    "\u30E6\u30FC\u30B6\u30FC\u306E\u30EC\u30D9\u30EB\u3084\u8FFD\u52A0\u306E\u6307\u793A\u306B\u5408\u308F\u305B\u3066\u3001\u63D0\u4F9B\u3055\u308C\u305F\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u306E\u672C\u6587\u3092\u8AAC\u660E\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
    "\u56DE\u7B54\u306F\u30DE\u30FC\u30AF\u30C0\u30A6\u30F3\u5F62\u5F0F\u3067\u3001\u898B\u51FA\u3057\u3001\u30EA\u30B9\u30C8\u3001\u592A\u5B57\u306A\u3069\u3092\u52B9\u679C\u7684\u306B\u4F7F\u7528\u3057\u3001\u69CB\u9020\u7684\u306B\u5206\u304B\u308A\u3084\u3059\u304F\u8A18\u8FF0\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
    "\u56DE\u7B54\u306B\u306F\u3001\u524D\u7F6E\u304D\u3084\u5B9A\u578B\u7684\u306A\u6328\u62F6\u3001\u611F\u8B1D\u306E\u8A00\u8449\u306A\u3069\u306F\u4E00\u5207\u542B\u3081\u305A\u3001\u8AAC\u660E\u5185\u5BB9\u306E\u307F\u3092\u51FA\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
];
async function fetchArticleContentInternal(url, jinaApiKey) {
    if (!jinaApiKey) return {
        error: "Jina API\u30AD\u30FC\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002"
    };
    const readerApiUrl = `https://r.jina.ai/${url}`;
    try {
        const response = await fetch(readerApiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jinaApiKey}`,
                Accept: "application/json"
            }
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({
                    message: response.statusText
                }));
            return {
                error: `Jina API\u{304B}\u{3089}\u{306E}\u{30B3}\u{30F3}\u{30C6}\u{30F3}\u{30C4}\u{53D6}\u{5F97}\u{306B}\u{5931}\u{6557}\u{3057}\u{307E}\u{3057}\u{305F}: ${errorData.message || response.status}`
            };
        }
        const data = await response.json();
        if (data && data.data && data.data.content) return {
            content: data.data.content,
            title: data.data.title || null
        };
        return {
            error: "Jina API\u304C\u671F\u5F85\u3055\u308C\u308B\u30B3\u30F3\u30C6\u30F3\u30C4\u69CB\u9020\u3092\u8FD4\u3057\u307E\u305B\u3093\u3067\u3057\u305F\u3002"
        };
    } catch (e) {
        console.error("fetchArticleContentInternal error:", e);
        return {
            error: "\u8A18\u4E8B\u30B3\u30F3\u30C6\u30F3\u30C4\u306E\u53D6\u5F97\u4E2D\u306B\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002"
        };
    }
}
async function generateSummaryWithGeminiInternal(textToSummarize, userSettings, geminiApiKey) {
    // internal
    if (!geminiApiKey) return {
        error: "Gemini API\u30AD\u30FC\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002"
    };
    // --- ここでプロンプトエンジニアリングを行う ---
    let promptParts = [
        ...DEFAULT_SYSTEM_PROMPT_PARTS
    ];
    // ユーザーレベルに応じた指示を追加
    if (userSettings.userLevel) {
        let levelDescription = "";
        switch(userSettings.userLevel){
            case 1:
                levelDescription = "\u5BFE\u8C61\u8AAD\u8005\u306F\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u5B8C\u5168\u521D\u5B66\u8005\u3067\u3059\u3002\u5C02\u9580\u7528\u8A9E\u306F\u907F\u3051\u3001\u975E\u5E38\u306B\u57FA\u672C\u7684\u306A\u6982\u5FF5\u304B\u3089\u4E01\u5BE7\u306B\u8AAC\u660E\u3057\u3066\u304F\u3060\u3055\u3044\u3002";
                break;
            case 2:
                levelDescription = "\u5BFE\u8C61\u8AAD\u8005\u306F\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u521D\u5B66\u8005\u3067\u3059\u3002\u57FA\u672C\u7684\u306A\u7528\u8A9E\u306F\u4F7F\u3063\u3066\u3082\u826F\u3044\u3067\u3059\u304C\u3001\u5E73\u6613\u306A\u8A00\u8449\u3067\u8AAC\u660E\u3057\u3066\u304F\u3060\u3055\u3044\u3002";
                break;
            case 3:
                levelDescription = "\u5BFE\u8C61\u8AAD\u8005\u306F\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u4E2D\u7D1A\u8005\u3067\u3059\u3002\u3042\u308B\u7A0B\u5EA6\u306E\u5C02\u9580\u7528\u8A9E\u3084\u62BD\u8C61\u7684\u306A\u6982\u5FF5\u3082\u7406\u89E3\u3067\u304D\u307E\u3059\u3002";
                break;
            case 4:
                levelDescription = "\u5BFE\u8C61\u8AAD\u8005\u306F\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u4E0A\u7D1A\u8005\u3067\u3059\u3002\u7C21\u6F54\u304B\u3064\u6280\u8853\u7684\u306B\u6B63\u78BA\u306A\u8AAC\u660E\u3092\u597D\u307F\u307E\u3059\u3002";
                break;
            case 5:
                levelDescription = "\u5BFE\u8C61\u8AAD\u8005\u306F\u975E\u5E38\u306B\u7D4C\u9A13\u8C4A\u5BCC\u306A\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u30A8\u30AD\u30B9\u30D1\u30FC\u30C8\u3067\u3059\u3002\u8A73\u7D30\u306A\u6280\u8853\u7684\u80CC\u666F\u3084\u30CB\u30E5\u30A2\u30F3\u30B9\u307E\u3067\u8E0F\u307F\u8FBC\u3093\u3060\u8AAC\u660E\u3092\u671F\u5F85\u3057\u3066\u3044\u307E\u3059\u3002";
                break;
        }
        if (levelDescription) promptParts.push(levelDescription);
    }
    if (userSettings.userLevelText) // ユーザーの自由記述レベルは、そのままLLMに伝える情報として追加
    // ここでサニタイズやバリデーションをかけることも検討できる
    promptParts.push(`\u{30E6}\u{30FC}\u{30B6}\u{30FC}\u{304B}\u{3089}\u{306E}\u{88DC}\u{8DB3}\u{60C5}\u{5831}\u{FF08}\u{30EC}\u{30D9}\u{30EB}\u{611F}\u{306A}\u{3069}\u{FF09}: \u{300C}${userSettings.userLevelText}\u{300D}`);
    // 追加の指示
    if (userSettings.additionalPrompt) // こちらもサニタイズやバリデーションを検討
    promptParts.push(`\u{30E6}\u{30FC}\u{30B6}\u{30FC}\u{304B}\u{3089}\u{306E}\u{8FFD}\u{52A0}\u{306E}\u{6307}\u{793A}: \u{300C}${userSettings.additionalPrompt}\u{300D}`);
    promptParts.push("\n--- \u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u672C\u6587 ---");
    promptParts.push(textToSummarize);
    promptParts.push("--- \u8AAC\u660E\u958B\u59CB ---");
    const finalPrompt = promptParts.join("\n");
    console.log("Final prompt to Gemini:", finalPrompt); // デバッグ用
    // --- Gemini API 呼び出し ---
    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`;
    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: finalPrompt
                    }
                ]
            }
        ]
    };
    try {
        const response = await fetch(geminiApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({
                    message: response.statusText
                }));
            return {
                error: `Gemini API\u{30A8}\u{30E9}\u{30FC}: ${errorData.error ? errorData.error.message : response.status}`
            };
        }
        const data = await response.json();
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) return {
            summaryMarkdown: data.candidates[0].content.parts[0].text,
            actualPromptSentToLLM: finalPrompt
        };
        return {
            error: "Gemini API\u304C\u671F\u5F85\u3055\u308C\u308B\u8981\u7D04\u69CB\u9020\u3092\u8FD4\u3057\u307E\u305B\u3093\u3067\u3057\u305F\u3002"
        };
    } catch (e) {
        console.error("generateSummaryWithGeminiInternal error:", e);
        return {
            error: "\u8981\u7D04\u751F\u6210\u4E2D\u306B\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002"
        };
    }
}
async function getDocumentSummary(url, userSettings) {
    const jinaApiKey = (0, _settingsJs.getApiKey)("jina"); // main.jsがgetSettings()で取得したものを渡す
    const geminiApiKey = (0, _settingsJs.getApiKey)("gemini");
    // 1. 本文取得
    const articleResult = await fetchArticleContentInternal(url, jinaApiKey);
    if (articleResult.error) return {
        error: articleResult.error
    };
    if (!articleResult.content) return {
        error: "\u8A18\u4E8B\u306E\u672C\u6587\u30B3\u30F3\u30C6\u30F3\u30C4\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002"
    };
    // 2. 要約生成
    const summaryResult = await generateSummaryWithGeminiInternal(articleResult.content, userSettings, geminiApiKey);
    if (summaryResult.error) return {
        error: summaryResult.error,
        title: articleResult.title
    }; // エラーでもタイトルは返す
    return {
        title: articleResult.title,
        summaryMarkdown: summaryResult.summaryMarkdown,
        actualPromptSentToLLM: summaryResult.actualPromptSentToLLM
    };
}
async function getFollowUpResponse(conversationHistory, newQuestionText) {
    const geminiApiKey = (0, _settingsJs.getApiKey)("gemini"); // settings.jsから
    if (!geminiApiKey) return {
        error: "Gemini API\u30AD\u30FC\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002"
    };
    // 既存の会話履歴からtimestampを除外し、新しい質問を追加
    // conversationHistory は [{role, parts:[{text}]}, ...] の形式を期待
    const contentsForApi = conversationHistory.map((turn)=>({
            role: turn.role,
            parts: turn.parts.map((part)=>({
                    text: part.text
                }))
        }));
    contentsForApi.push({
        role: "user",
        parts: [
            {
                text: newQuestionText
            }
        ]
    });
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
        },
        safetySettings: []
    };
    // ログで確認
    console.log("Sending to Gemini (follow-up):", JSON.stringify(requestBody, null, 2));
    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`;
    try {
        const response = await fetch(geminiApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({
                    message: response.statusText
                }));
            return {
                error: `Gemini API\u{30A8}\u{30E9}\u{30FC} (\u{8FFD}\u{52A0}\u{8CEA}\u{554F}): ${errorData.error ? errorData.error.message : response.status}`
            };
        }
        const data = await response.json();
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) // 実際には、新しいユーザーの質問と、モデルの応答の両方を返す必要がある
        return {
            userQuestion: newQuestionText,
            modelResponseMarkdown: data.candidates[0].content.parts[0].text
        };
        return {
            error: "Gemini API\u304C\u671F\u5F85\u3055\u308C\u308B\u5FDC\u7B54\u69CB\u9020\u3092\u8FD4\u3057\u307E\u305B\u3093\u3067\u3057\u305F (\u8FFD\u52A0\u8CEA\u554F)\u3002"
        };
    } catch (e) {
        console.error("getFollowUpResponse error:", e);
        return {
            error: "\u8FFD\u52A0\u8CEA\u554F\u306E\u5FDC\u7B54\u751F\u6210\u4E2D\u306B\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002"
        };
    }
}

},{"./settings.js":"1miDW","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1miDW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * アプリケーション起動時にローカルストレージから設定を読み込む。
 * 保存された設定がなければデフォルト値（または空）で初期化。
 */ parcelHelpers.export(exports, "initializeSettings", ()=>initializeSettings);
/**
 * 現在の全ての設定オブジェクトのコピーを返す。
 * @returns {object} 設定オブジェクト
 */ parcelHelpers.export(exports, "getSettings", ()=>getSettings);
/**
 * 特定のAPIキーを取得する。
 * @param {'jina' | 'gemini'} type - 取得したいAPIキーのタイプ
 * @returns {string} APIキー
 */ parcelHelpers.export(exports, "getApiKey", ()=>getApiKey);
/**
 * 新しい設定オブジェクトを受け取り、現在の設定を更新してローカルストレージに保存する。
 * @param {object} newSettings - 保存する新しい設定オブジェクト
 */ parcelHelpers.export(exports, "saveSettings", ()=>saveSettings);
/**
 * 全ての設定をデフォルトに戻す（ローカルストレージからも削除）
 */ parcelHelpers.export(exports, "resetSettings", ()=>resetSettings);
const SETTINGS_STORAGE_KEY = "ExplAInfySettings";
// モジュール内のプライベートな状態として設定を保持
let currentSettings = {
    jinaApiKey: "",
    geminiApiKey: "",
    userLevel: 1,
    userLevelText: "",
    additionalPrompt: ""
};
// デフォルト設定
const defaultSettings = {
    jinaApiKey: "",
    geminiApiKey: "",
    userLevel: 1,
    userLevelText: "",
    additionalPrompt: ""
};
function initializeSettings() {
    const savedSettingsString = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (savedSettingsString) try {
        const savedSettings = JSON.parse(savedSettingsString);
        currentSettings = {
            ...defaultSettings,
            ...savedSettings
        };
    } catch (e) {
        console.error("Failed to parse settings from localStorage", e);
        currentSettings = {
            ...defaultSettings
        };
    }
    else currentSettings = {
        ...defaultSettings
    };
    console.log("Settings initialized:", currentSettings);
}
function getSettings() {
    return {
        ...currentSettings
    }; // 外部で直接変更できないようにコピーを返す
}
function getApiKey(type) {
    if (type === "jina") return currentSettings.jinaApiKey;
    if (type === "gemini") return currentSettings.geminiApiKey;
    return "";
}
function saveSettings(newSettings) {
    // newSettings の中身を検証・サニタイズしてもいい
    currentSettings = {
        ...currentSettings,
        ...newSettings
    }; // 部分的な更新も許容
    try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(currentSettings));
        console.log("Settings saved:", currentSettings);
    } catch (e) {
        console.error("Failed to save settings to localStorage", e);
        // ストレージがいっぱいの場合などのエラーハンドリング
        alert("\u8A2D\u5B9A\u306E\u4FDD\u5B58\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u30B9\u30C8\u30EC\u30FC\u30B8\u306E\u7A7A\u304D\u5BB9\u91CF\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
    }
}
function resetSettings() {
    currentSettings = {
        ...defaultSettings
    };
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
    console.log("Settings reset to default.");
}
// 初期化をこのモジュールが読み込まれた時に行う
initializeSettings();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"4OwKy":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// --- UI制御関数 ---
parcelHelpers.export(exports, "showPage", ()=>showPage);
parcelHelpers.export(exports, "initializeModal", ()=>initializeModal);
parcelHelpers.export(exports, "openSettingsModal", ()=>openSettingsModal);
parcelHelpers.export(exports, "closeSettingsModal", ()=>closeSettingsModal);
parcelHelpers.export(exports, "getSettingsFromModalForm", ()=>getSettingsFromModalForm);
parcelHelpers.export(exports, "populateModalFormWithSettings", ()=>populateModalFormWithSettings);
parcelHelpers.export(exports, "highlightEmptyApiKeysInModal", ()=>highlightEmptyApiKeysInModal);
parcelHelpers.export(exports, "clearApiKeyErrorStylesInModal", ()=>clearApiKeyErrorStylesInModal);
parcelHelpers.export(exports, "initializeTextareaAutoHeight", ()=>initializeTextareaAutoHeight);
parcelHelpers.export(exports, "updateResponseTitle", ()=>updateResponseTitle);
parcelHelpers.export(exports, "displayLoadingMessage", ()=>displayLoadingMessage);
parcelHelpers.export(exports, "displayErrorMessage", ()=>displayErrorMessage);
// アプリケーション起動時に行うUI関連の初期化 (main.js から呼び出す)
parcelHelpers.export(exports, "initializeUI", ()=>initializeUI);
parcelHelpers.export(exports, "renderHistoryList", ()=>renderHistoryList);
parcelHelpers.export(exports, "renderConversationTurns", ()=>renderConversationTurns);
var _dompurify = require("dompurify");
var _dompurifyDefault = parcelHelpers.interopDefault(_dompurify);
var _marked = require("marked");
var _micromodal = require("micromodal");
var _micromodalDefault = parcelHelpers.interopDefault(_micromodal);
// --- DOM要素のキャッシュ ---
const urlInputSection = document.getElementById("url-input-section");
const historyListElement = document.getElementById("history-list");
const responseSection = document.getElementById("response-section");
const responseOutput = document.getElementById("response-output");
const responseTitle = document.getElementById("response-title");
const logoLink = document.getElementById("logo-link");
// モーダル関連の要素 (モーダル制御とフォーム値設定に使う)
const modalGeminiApiKeyInput = document.getElementById("modal-gemini-api-key-input");
const modalJinaApiKeyInput = document.getElementById("modal-jina-api-key-input");
const modalUserLevelRadios = document.querySelectorAll('input[name="user-level-radio"]');
const modalUserLevelText = document.getElementById("user-level-text");
const modalAdditionalPromptInput = document.getElementById("modal-additional-prompt-input");
const modalTabs = document.querySelectorAll(".modal-tabs .tab-item");
const tabContents = document.querySelectorAll(".modal__content .tab-content");
function showPage(pageElementToShow) {
    urlInputSection.classList.remove("active");
    responseSection.classList.remove("active");
    if (pageElementToShow) pageElementToShow.classList.add("active");
    // ロゴ表示制御もここで行う
    if (logoLink) {
        if (pageElementToShow && pageElementToShow.id === "url-input-section") logoLink.classList.add("hidden-on-main");
        else logoLink.classList.remove("hidden-on-main");
    }
}
function initializeModal() {
    (0, _micromodalDefault.default).init({
    });
    // モーダル内のタブ切り替えイベントリスナーもここで設定
    setupModalTabsInternal(); // 内部関数として
}
function setupModalTabsInternal() {
    modalTabs.forEach((tab)=>{
        tab.addEventListener("click", ()=>{
            modalTabs.forEach((t)=>t.classList.remove("active-tab"));
            tabContents.forEach((c)=>c.classList.remove("active-tab-content"));
            tab.classList.add("active-tab");
            const targetContentId = tab.dataset.tabTarget;
            document.querySelector(targetContentId).classList.add("active-tab-content");
        });
    });
}
function openSettingsModal() {
    (0, _micromodalDefault.default).show("modal-settings");
}
function closeSettingsModal() {
    (0, _micromodalDefault.default).close("modal-settings");
}
function getSettingsFromModalForm() {
    let selectedUserLevel = "1";
    modalUserLevelRadios.forEach((radio)=>{
        if (radio.checked) selectedUserLevel = radio.value;
    });
    return {
        geminiApiKey: modalGeminiApiKeyInput.value.trim(),
        jinaApiKey: modalJinaApiKeyInput.value.trim(),
        userLevel: parseInt(selectedUserLevel, 10),
        userLevelText: modalUserLevelText.value.trim(),
        additionalPrompt: modalAdditionalPromptInput.value.trim()
    };
}
function populateModalFormWithSettings(settings) {
    modalGeminiApiKeyInput.value = settings.geminiApiKey || "";
    modalJinaApiKeyInput.value = settings.jinaApiKey || "";
    modalUserLevelRadios.forEach((radio)=>{
        radio.checked = radio.value === String(settings.userLevel);
    });
    modalUserLevelText.value = settings.userLevelText || ""; // settings.js のキー名と合わせる
    if (modalAdditionalPromptInput) modalAdditionalPromptInput.value = settings.additionalPrompt || "";
}
function highlightEmptyApiKeysInModal() {
    if (!modalGeminiApiKeyInput.value.trim()) modalGeminiApiKeyInput.style.borderColor = "red";
    else modalGeminiApiKeyInput.style.borderColor = "";
    if (!modalJinaApiKeyInput.value.trim()) modalJinaApiKeyInput.style.borderColor = "red";
    else modalJinaApiKeyInput.style.borderColor = "";
}
function clearApiKeyErrorStylesInModal() {
    modalGeminiApiKeyInput.style.borderColor = "";
    modalJinaApiKeyInput.style.borderColor = "";
}
function initializeTextareaAutoHeight(textareaElement, initialRows) {
    if (!textareaElement) return;
    const lineHeight = parseFloat(getComputedStyle(textareaElement).lineHeight);
    const initialHeight = lineHeight * initialRows;
    textareaElement.style.height = `${initialHeight}px`;
    textareaElement.addEventListener("input", ()=>{
        textareaElement.style.height = "auto";
        let newHeight = textareaElement.scrollHeight;
        if (newHeight > initialHeight) textareaElement.classList.add("expanded");
        else textareaElement.classList.remove("expanded");
        textareaElement.style.height = `${newHeight}px`;
    });
}
function updateResponseTitle(titleText) {
    if (responseTitle) // responseTitle要素がHTMLに存在することを確認
    responseTitle.textContent = titleText;
    else console.warn("#response-title element not found.");
}
function displayLoadingMessage(message = "<p>\u51E6\u7406\u4E2D...</p>") {
    responseOutput.innerHTML = message;
}
function displayErrorMessage(errorMessageText) {
    responseOutput.innerHTML = `<p style="color: red;">\u{30A8}\u{30E9}\u{30FC}: ${errorMessageText}</p>`;
}
function initializeUI() {
    initializeModal();
// 他のUI初期化があればここに
}
function renderHistoryList(sessionSummaries) {
    if (!historyListElement) return;
    if (!sessionSummaries || sessionSummaries.length === 0) {
        historyListElement.innerHTML = "<li>\u5C65\u6B74\u306F\u3042\u308A\u307E\u305B\u3093\u3002</li>";
        return;
    }
    historyListElement.innerHTML = sessionSummaries.map((summary)=>`
        <li>
            <a href="#" data-session-id="${summary.id}">
                <span class="history-title">${summary.title || "\u7121\u984C\u306E\u30BB\u30C3\u30B7\u30E7\u30F3"}</span>
                <span class="history-timestamp">${new Date(summary.lastUpdatedAt).toLocaleString()}</span>
            </a>
        </li>
    `).join("");
}
function renderConversationTurns(turnsArray) {
    // originalUrlを引数で受け取る
    if (!turnsArray || turnsArray.length === 0) {
        responseOutput.innerHTML = "<p>\u307E\u3060\u4F1A\u8A71\u304C\u3042\u308A\u307E\u305B\u3093\u3002</p>";
        return;
    }
    let conversationHtml = "";
    turnsArray.forEach((turn, index)=>{
        // forEachの第2引数でインデックスを取得
        if (turn.role && turn.parts && turn.parts.length > 0 && turn.parts[0].text) {
            const textContent = turn.parts[0].text;
            let turnHtml = "";
            let displayContent = ""; // 表示用のコンテンツ
            if (turn.role === "user") {
                if (index === 0) {
                    // finalPromptそのまま出すと長すぎる
                    displayContent = "\u63D0\u793A\u3057\u305F\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u306B\u3064\u3044\u3066\u8AAC\u660E\u3057\u3066\u304F\u3060\u3055\u3044\u3002";
                    const sanitizedText = (0, _dompurifyDefault.default).sanitize(displayContent.replace(/\n/g, "<br>"));
                    turnHtml = `<div class="chat-message user-message initial-request"><div class="message-bubble">${sanitizedText}</div></div>`;
                } else {
                    // 2ターン目以降のユーザーの質問はそのまま表示
                    displayContent = textContent;
                    const sanitizedText = (0, _dompurifyDefault.default).sanitize(displayContent.replace(/\n/g, "<br>"));
                    turnHtml = `<div class="chat-message user-message"><div class="message-bubble">${sanitizedText}</div></div>`;
                }
            } else if (turn.role === "model") // モデルの応答はマークダウンとして処理
            try {
                const dirtyHtml = (0, _marked.marked).parse(textContent);
                const cleanHtml = (0, _dompurifyDefault.default).sanitize(dirtyHtml);
                turnHtml = `<div class="chat-message model-message"><div class="message-bubble">${cleanHtml}</div></div>`;
            } catch (e) {
                console.error("Markdown parsing/sanitizing error for model message:", e);
                const sanitizedText = (0, _dompurifyDefault.default).sanitize(textContent.replace(/\n/g, "<br>"));
                turnHtml = `<div class="chat-message model-message error-rendering"><div class="message-bubble">\u{8868}\u{793A}\u{30A8}\u{30E9}\u{30FC}: ${sanitizedText}</div></div>`;
            }
            conversationHtml += turnHtml;
        }
    });
    responseOutput.innerHTML = conversationHtml;
}

},{"dompurify":"1IHUz","marked":"fSyEy","micromodal":"fpXyP","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1IHUz":[function(require,module,exports,__globalThis) {
/*! @license DOMPurify 3.2.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.5/LICENSE */ (function(global, factory) {
    module.exports = factory();
})(this, function() {
    'use strict';
    const { entries, setPrototypeOf, isFrozen, getPrototypeOf, getOwnPropertyDescriptor } = Object;
    let { freeze, seal, create } = Object; // eslint-disable-line import/no-mutable-exports
    let { apply, construct } = typeof Reflect !== 'undefined' && Reflect;
    if (!freeze) freeze = function freeze(x) {
        return x;
    };
    if (!seal) seal = function seal(x) {
        return x;
    };
    if (!apply) apply = function apply(fun, thisValue, args) {
        return fun.apply(thisValue, args);
    };
    if (!construct) construct = function construct(Func, args) {
        return new Func(...args);
    };
    const arrayForEach = unapply(Array.prototype.forEach);
    const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
    const arrayPop = unapply(Array.prototype.pop);
    const arrayPush = unapply(Array.prototype.push);
    const arraySplice = unapply(Array.prototype.splice);
    const stringToLowerCase = unapply(String.prototype.toLowerCase);
    const stringToString = unapply(String.prototype.toString);
    const stringMatch = unapply(String.prototype.match);
    const stringReplace = unapply(String.prototype.replace);
    const stringIndexOf = unapply(String.prototype.indexOf);
    const stringTrim = unapply(String.prototype.trim);
    const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
    const regExpTest = unapply(RegExp.prototype.test);
    const typeErrorCreate = unconstruct(TypeError);
    /**
   * Creates a new function that calls the given function with a specified thisArg and arguments.
   *
   * @param func - The function to be wrapped and called.
   * @returns A new function that calls the given function with a specified thisArg and arguments.
   */ function unapply(func) {
        return function(thisArg) {
            if (thisArg instanceof RegExp) thisArg.lastIndex = 0;
            for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)args[_key - 1] = arguments[_key];
            return apply(func, thisArg, args);
        };
    }
    /**
   * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
   *
   * @param func - The constructor function to be wrapped and called.
   * @returns A new function that constructs an instance of the given constructor function with the provided arguments.
   */ function unconstruct(func) {
        return function() {
            for(var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)args[_key2] = arguments[_key2];
            return construct(func, args);
        };
    }
    /**
   * Add properties to a lookup table
   *
   * @param set - The set to which elements will be added.
   * @param array - The array containing elements to be added to the set.
   * @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
   * @returns The modified set with added elements.
   */ function addToSet(set, array) {
        let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
        if (setPrototypeOf) // Make 'in' and truthy checks like Boolean(set.constructor)
        // independent of any properties defined on Object.prototype.
        // Prevent prototype setters from intercepting set as a this value.
        setPrototypeOf(set, null);
        let l = array.length;
        while(l--){
            let element = array[l];
            if (typeof element === 'string') {
                const lcElement = transformCaseFunc(element);
                if (lcElement !== element) {
                    // Config presets (e.g. tags.js, attrs.js) are immutable.
                    if (!isFrozen(array)) array[l] = lcElement;
                    element = lcElement;
                }
            }
            set[element] = true;
        }
        return set;
    }
    /**
   * Clean up an array to harden against CSPP
   *
   * @param array - The array to be cleaned.
   * @returns The cleaned version of the array
   */ function cleanArray(array) {
        for(let index = 0; index < array.length; index++){
            const isPropertyExist = objectHasOwnProperty(array, index);
            if (!isPropertyExist) array[index] = null;
        }
        return array;
    }
    /**
   * Shallow clone an object
   *
   * @param object - The object to be cloned.
   * @returns A new object that copies the original.
   */ function clone(object) {
        const newObject = create(null);
        for (const [property, value] of entries(object)){
            const isPropertyExist = objectHasOwnProperty(object, property);
            if (isPropertyExist) {
                if (Array.isArray(value)) newObject[property] = cleanArray(value);
                else if (value && typeof value === 'object' && value.constructor === Object) newObject[property] = clone(value);
                else newObject[property] = value;
            }
        }
        return newObject;
    }
    /**
   * This method automatically checks if the prop is function or getter and behaves accordingly.
   *
   * @param object - The object to look up the getter function in its prototype chain.
   * @param prop - The property name for which to find the getter function.
   * @returns The getter function found in the prototype chain or a fallback function.
   */ function lookupGetter(object, prop) {
        while(object !== null){
            const desc = getOwnPropertyDescriptor(object, prop);
            if (desc) {
                if (desc.get) return unapply(desc.get);
                if (typeof desc.value === 'function') return unapply(desc.value);
            }
            object = getPrototypeOf(object);
        }
        function fallbackValue() {
            return null;
        }
        return fallbackValue;
    }
    const html$1 = freeze([
        'a',
        'abbr',
        'acronym',
        'address',
        'area',
        'article',
        'aside',
        'audio',
        'b',
        'bdi',
        'bdo',
        'big',
        'blink',
        'blockquote',
        'body',
        'br',
        'button',
        'canvas',
        'caption',
        'center',
        'cite',
        'code',
        'col',
        'colgroup',
        'content',
        'data',
        'datalist',
        'dd',
        'decorator',
        'del',
        'details',
        'dfn',
        'dialog',
        'dir',
        'div',
        'dl',
        'dt',
        'element',
        'em',
        'fieldset',
        'figcaption',
        'figure',
        'font',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'head',
        'header',
        'hgroup',
        'hr',
        'html',
        'i',
        'img',
        'input',
        'ins',
        'kbd',
        'label',
        'legend',
        'li',
        'main',
        'map',
        'mark',
        'marquee',
        'menu',
        'menuitem',
        'meter',
        'nav',
        'nobr',
        'ol',
        'optgroup',
        'option',
        'output',
        'p',
        'picture',
        'pre',
        'progress',
        'q',
        'rp',
        'rt',
        'ruby',
        's',
        'samp',
        'section',
        'select',
        'shadow',
        'small',
        'source',
        'spacer',
        'span',
        'strike',
        'strong',
        'style',
        'sub',
        'summary',
        'sup',
        'table',
        'tbody',
        'td',
        'template',
        'textarea',
        'tfoot',
        'th',
        'thead',
        'time',
        'tr',
        'track',
        'tt',
        'u',
        'ul',
        'var',
        'video',
        'wbr'
    ]);
    const svg$1 = freeze([
        'svg',
        'a',
        'altglyph',
        'altglyphdef',
        'altglyphitem',
        'animatecolor',
        'animatemotion',
        'animatetransform',
        'circle',
        'clippath',
        'defs',
        'desc',
        'ellipse',
        'filter',
        'font',
        'g',
        'glyph',
        'glyphref',
        'hkern',
        'image',
        'line',
        'lineargradient',
        'marker',
        'mask',
        'metadata',
        'mpath',
        'path',
        'pattern',
        'polygon',
        'polyline',
        'radialgradient',
        'rect',
        'stop',
        'style',
        'switch',
        'symbol',
        'text',
        'textpath',
        'title',
        'tref',
        'tspan',
        'view',
        'vkern'
    ]);
    const svgFilters = freeze([
        'feBlend',
        'feColorMatrix',
        'feComponentTransfer',
        'feComposite',
        'feConvolveMatrix',
        'feDiffuseLighting',
        'feDisplacementMap',
        'feDistantLight',
        'feDropShadow',
        'feFlood',
        'feFuncA',
        'feFuncB',
        'feFuncG',
        'feFuncR',
        'feGaussianBlur',
        'feImage',
        'feMerge',
        'feMergeNode',
        'feMorphology',
        'feOffset',
        'fePointLight',
        'feSpecularLighting',
        'feSpotLight',
        'feTile',
        'feTurbulence'
    ]);
    // List of SVG elements that are disallowed by default.
    // We still need to know them so that we can do namespace
    // checks properly in case one wants to add them to
    // allow-list.
    const svgDisallowed = freeze([
        'animate',
        'color-profile',
        'cursor',
        'discard',
        'font-face',
        'font-face-format',
        'font-face-name',
        'font-face-src',
        'font-face-uri',
        'foreignobject',
        'hatch',
        'hatchpath',
        'mesh',
        'meshgradient',
        'meshpatch',
        'meshrow',
        'missing-glyph',
        'script',
        'set',
        'solidcolor',
        'unknown',
        'use'
    ]);
    const mathMl$1 = freeze([
        'math',
        'menclose',
        'merror',
        'mfenced',
        'mfrac',
        'mglyph',
        'mi',
        'mlabeledtr',
        'mmultiscripts',
        'mn',
        'mo',
        'mover',
        'mpadded',
        'mphantom',
        'mroot',
        'mrow',
        'ms',
        'mspace',
        'msqrt',
        'mstyle',
        'msub',
        'msup',
        'msubsup',
        'mtable',
        'mtd',
        'mtext',
        'mtr',
        'munder',
        'munderover',
        'mprescripts'
    ]);
    // Similarly to SVG, we want to know all MathML elements,
    // even those that we disallow by default.
    const mathMlDisallowed = freeze([
        'maction',
        'maligngroup',
        'malignmark',
        'mlongdiv',
        'mscarries',
        'mscarry',
        'msgroup',
        'mstack',
        'msline',
        'msrow',
        'semantics',
        'annotation',
        'annotation-xml',
        'mprescripts',
        'none'
    ]);
    const text = freeze([
        '#text'
    ]);
    const html = freeze([
        'accept',
        'action',
        'align',
        'alt',
        'autocapitalize',
        'autocomplete',
        'autopictureinpicture',
        'autoplay',
        'background',
        'bgcolor',
        'border',
        'capture',
        'cellpadding',
        'cellspacing',
        'checked',
        'cite',
        'class',
        'clear',
        'color',
        'cols',
        'colspan',
        'controls',
        'controlslist',
        'coords',
        'crossorigin',
        'datetime',
        'decoding',
        'default',
        'dir',
        'disabled',
        'disablepictureinpicture',
        'disableremoteplayback',
        'download',
        'draggable',
        'enctype',
        'enterkeyhint',
        'face',
        'for',
        'headers',
        'height',
        'hidden',
        'high',
        'href',
        'hreflang',
        'id',
        'inputmode',
        'integrity',
        'ismap',
        'kind',
        'label',
        'lang',
        'list',
        'loading',
        'loop',
        'low',
        'max',
        'maxlength',
        'media',
        'method',
        'min',
        'minlength',
        'multiple',
        'muted',
        'name',
        'nonce',
        'noshade',
        'novalidate',
        'nowrap',
        'open',
        'optimum',
        'pattern',
        'placeholder',
        'playsinline',
        'popover',
        'popovertarget',
        'popovertargetaction',
        'poster',
        'preload',
        'pubdate',
        'radiogroup',
        'readonly',
        'rel',
        'required',
        'rev',
        'reversed',
        'role',
        'rows',
        'rowspan',
        'spellcheck',
        'scope',
        'selected',
        'shape',
        'size',
        'sizes',
        'span',
        'srclang',
        'start',
        'src',
        'srcset',
        'step',
        'style',
        'summary',
        'tabindex',
        'title',
        'translate',
        'type',
        'usemap',
        'valign',
        'value',
        'width',
        'wrap',
        'xmlns',
        'slot'
    ]);
    const svg = freeze([
        'accent-height',
        'accumulate',
        'additive',
        'alignment-baseline',
        'amplitude',
        'ascent',
        'attributename',
        'attributetype',
        'azimuth',
        'basefrequency',
        'baseline-shift',
        'begin',
        'bias',
        'by',
        'class',
        'clip',
        'clippathunits',
        'clip-path',
        'clip-rule',
        'color',
        'color-interpolation',
        'color-interpolation-filters',
        'color-profile',
        'color-rendering',
        'cx',
        'cy',
        'd',
        'dx',
        'dy',
        'diffuseconstant',
        'direction',
        'display',
        'divisor',
        'dur',
        'edgemode',
        'elevation',
        'end',
        'exponent',
        'fill',
        'fill-opacity',
        'fill-rule',
        'filter',
        'filterunits',
        'flood-color',
        'flood-opacity',
        'font-family',
        'font-size',
        'font-size-adjust',
        'font-stretch',
        'font-style',
        'font-variant',
        'font-weight',
        'fx',
        'fy',
        'g1',
        'g2',
        'glyph-name',
        'glyphref',
        'gradientunits',
        'gradienttransform',
        'height',
        'href',
        'id',
        'image-rendering',
        'in',
        'in2',
        'intercept',
        'k',
        'k1',
        'k2',
        'k3',
        'k4',
        'kerning',
        'keypoints',
        'keysplines',
        'keytimes',
        'lang',
        'lengthadjust',
        'letter-spacing',
        'kernelmatrix',
        'kernelunitlength',
        'lighting-color',
        'local',
        'marker-end',
        'marker-mid',
        'marker-start',
        'markerheight',
        'markerunits',
        'markerwidth',
        'maskcontentunits',
        'maskunits',
        'max',
        'mask',
        'media',
        'method',
        'mode',
        'min',
        'name',
        'numoctaves',
        'offset',
        'operator',
        'opacity',
        'order',
        'orient',
        'orientation',
        'origin',
        'overflow',
        'paint-order',
        'path',
        'pathlength',
        'patterncontentunits',
        'patterntransform',
        'patternunits',
        'points',
        'preservealpha',
        'preserveaspectratio',
        'primitiveunits',
        'r',
        'rx',
        'ry',
        'radius',
        'refx',
        'refy',
        'repeatcount',
        'repeatdur',
        'restart',
        'result',
        'rotate',
        'scale',
        'seed',
        'shape-rendering',
        'slope',
        'specularconstant',
        'specularexponent',
        'spreadmethod',
        'startoffset',
        'stddeviation',
        'stitchtiles',
        'stop-color',
        'stop-opacity',
        'stroke-dasharray',
        'stroke-dashoffset',
        'stroke-linecap',
        'stroke-linejoin',
        'stroke-miterlimit',
        'stroke-opacity',
        'stroke',
        'stroke-width',
        'style',
        'surfacescale',
        'systemlanguage',
        'tabindex',
        'tablevalues',
        'targetx',
        'targety',
        'transform',
        'transform-origin',
        'text-anchor',
        'text-decoration',
        'text-rendering',
        'textlength',
        'type',
        'u1',
        'u2',
        'unicode',
        'values',
        'viewbox',
        'visibility',
        'version',
        'vert-adv-y',
        'vert-origin-x',
        'vert-origin-y',
        'width',
        'word-spacing',
        'wrap',
        'writing-mode',
        'xchannelselector',
        'ychannelselector',
        'x',
        'x1',
        'x2',
        'xmlns',
        'y',
        'y1',
        'y2',
        'z',
        'zoomandpan'
    ]);
    const mathMl = freeze([
        'accent',
        'accentunder',
        'align',
        'bevelled',
        'close',
        'columnsalign',
        'columnlines',
        'columnspan',
        'denomalign',
        'depth',
        'dir',
        'display',
        'displaystyle',
        'encoding',
        'fence',
        'frame',
        'height',
        'href',
        'id',
        'largeop',
        'length',
        'linethickness',
        'lspace',
        'lquote',
        'mathbackground',
        'mathcolor',
        'mathsize',
        'mathvariant',
        'maxsize',
        'minsize',
        'movablelimits',
        'notation',
        'numalign',
        'open',
        'rowalign',
        'rowlines',
        'rowspacing',
        'rowspan',
        'rspace',
        'rquote',
        'scriptlevel',
        'scriptminsize',
        'scriptsizemultiplier',
        'selection',
        'separator',
        'separators',
        'stretchy',
        'subscriptshift',
        'supscriptshift',
        'symmetric',
        'voffset',
        'width',
        'xmlns'
    ]);
    const xml = freeze([
        'xlink:href',
        'xml:id',
        'xlink:title',
        'xml:space',
        'xmlns:xlink'
    ]);
    // eslint-disable-next-line unicorn/better-regex
    const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
    const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
    const TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm); // eslint-disable-line unicorn/better-regex
    const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/); // eslint-disable-line no-useless-escape
    const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
    const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
    );
    const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
    const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
    );
    const DOCTYPE_NAME = seal(/^html$/i);
    const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
    var EXPRESSIONS = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        ARIA_ATTR: ARIA_ATTR,
        ATTR_WHITESPACE: ATTR_WHITESPACE,
        CUSTOM_ELEMENT: CUSTOM_ELEMENT,
        DATA_ATTR: DATA_ATTR,
        DOCTYPE_NAME: DOCTYPE_NAME,
        ERB_EXPR: ERB_EXPR,
        IS_ALLOWED_URI: IS_ALLOWED_URI,
        IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
        MUSTACHE_EXPR: MUSTACHE_EXPR,
        TMPLIT_EXPR: TMPLIT_EXPR
    });
    /* eslint-disable @typescript-eslint/indent */ // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    const NODE_TYPE = {
        element: 1,
        attribute: 2,
        text: 3,
        cdataSection: 4,
        entityReference: 5,
        // Deprecated
        entityNode: 6,
        // Deprecated
        progressingInstruction: 7,
        comment: 8,
        document: 9,
        documentType: 10,
        documentFragment: 11,
        notation: 12 // Deprecated
    };
    const getGlobal = function getGlobal() {
        return typeof window === 'undefined' ? null : window;
    };
    /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param trustedTypes The policy factory.
   * @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
   * @return The policy created (or null, if Trusted Types
   * are not supported or creating the policy failed).
   */ const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
        if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') return null;
        // Allow the callers to control the unique policy name
        // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
        // Policy creation with duplicate names throws in Trusted Types.
        let suffix = null;
        const ATTR_NAME = 'data-tt-policy-suffix';
        if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) suffix = purifyHostElement.getAttribute(ATTR_NAME);
        const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
        try {
            return trustedTypes.createPolicy(policyName, {
                createHTML (html) {
                    return html;
                },
                createScriptURL (scriptUrl) {
                    return scriptUrl;
                }
            });
        } catch (_) {
            // Policy creation failed (most likely another DOMPurify script has
            // already run). Skip creating the policy, as this will only cause errors
            // if TT are enforced.
            console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
            return null;
        }
    };
    const _createHooksMap = function _createHooksMap() {
        return {
            afterSanitizeAttributes: [],
            afterSanitizeElements: [],
            afterSanitizeShadowDOM: [],
            beforeSanitizeAttributes: [],
            beforeSanitizeElements: [],
            beforeSanitizeShadowDOM: [],
            uponSanitizeAttribute: [],
            uponSanitizeElement: [],
            uponSanitizeShadowNode: []
        };
    };
    function createDOMPurify() {
        let window1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
        const DOMPurify = (root)=>createDOMPurify(root);
        DOMPurify.version = '3.2.5';
        DOMPurify.removed = [];
        if (!window1 || !window1.document || window1.document.nodeType !== NODE_TYPE.document || !window1.Element) {
            // Not running in a browser, provide a factory function
            // so that you can pass your own Window
            DOMPurify.isSupported = false;
            return DOMPurify;
        }
        let { document } = window1;
        const originalDocument = document;
        const currentScript = originalDocument.currentScript;
        const { DocumentFragment, HTMLTemplateElement, Node, Element, NodeFilter, NamedNodeMap = window1.NamedNodeMap || window1.MozNamedAttrMap, HTMLFormElement, DOMParser, trustedTypes } = window1;
        const ElementPrototype = Element.prototype;
        const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
        const remove = lookupGetter(ElementPrototype, 'remove');
        const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
        const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
        const getParentNode = lookupGetter(ElementPrototype, 'parentNode');
        // As per issue #47, the web-components registry is inherited by a
        // new document created via createHTMLDocument. As per the spec
        // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
        // a new empty registry is used when creating a template contents owner
        // document, so we use that as our parent document to ensure nothing
        // is inherited.
        if (typeof HTMLTemplateElement === 'function') {
            const template = document.createElement('template');
            if (template.content && template.content.ownerDocument) document = template.content.ownerDocument;
        }
        let trustedTypesPolicy;
        let emptyHTML = '';
        const { implementation, createNodeIterator, createDocumentFragment, getElementsByTagName } = document;
        const { importNode } = originalDocument;
        let hooks = _createHooksMap();
        /**
     * Expose whether this browser supports running the full DOMPurify.
     */ DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
        const { MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR, DATA_ATTR, ARIA_ATTR, IS_SCRIPT_OR_DATA, ATTR_WHITESPACE, CUSTOM_ELEMENT } = EXPRESSIONS;
        let { IS_ALLOWED_URI: IS_ALLOWED_URI$1 } = EXPRESSIONS;
        /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */ /* allowed element names */ let ALLOWED_TAGS = null;
        const DEFAULT_ALLOWED_TAGS = addToSet({}, [
            ...html$1,
            ...svg$1,
            ...svgFilters,
            ...mathMl$1,
            ...text
        ]);
        /* Allowed attribute names */ let ALLOWED_ATTR = null;
        const DEFAULT_ALLOWED_ATTR = addToSet({}, [
            ...html,
            ...svg,
            ...mathMl,
            ...xml
        ]);
        /*
     * Configure how DOMPurify should handle custom elements and their attributes as well as customized built-in elements.
     * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
     * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
     * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
     */ let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
            tagNameCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
            },
            attributeNameCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
            },
            allowCustomizedBuiltInElements: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: false
            }
        }));
        /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */ let FORBID_TAGS = null;
        /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */ let FORBID_ATTR = null;
        /* Decide if ARIA attributes are okay */ let ALLOW_ARIA_ATTR = true;
        /* Decide if custom data attributes are okay */ let ALLOW_DATA_ATTR = true;
        /* Decide if unknown protocols are okay */ let ALLOW_UNKNOWN_PROTOCOLS = false;
        /* Decide if self-closing tags in attributes are allowed.
     * Usually removed due to a mXSS issue in jQuery 3.0 */ let ALLOW_SELF_CLOSE_IN_ATTR = true;
        /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */ let SAFE_FOR_TEMPLATES = false;
        /* Output should be safe even for XML used within HTML and alike.
     * This means, DOMPurify removes comments when containing risky content.
     */ let SAFE_FOR_XML = true;
        /* Decide if document with <html>... should be returned */ let WHOLE_DOCUMENT = false;
        /* Track whether config is already set on this instance of DOMPurify. */ let SET_CONFIG = false;
        /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */ let FORCE_BODY = false;
        /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */ let RETURN_DOM = false;
        /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */ let RETURN_DOM_FRAGMENT = false;
        /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */ let RETURN_TRUSTED_TYPE = false;
        /* Output should be free from DOM clobbering attacks?
     * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
     */ let SANITIZE_DOM = true;
        /* Achieve full DOM Clobbering protection by isolating the namespace of named
     * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
     *
     * HTML/DOM spec rules that enable DOM Clobbering:
     *   - Named Access on Window (§7.3.3)
     *   - DOM Tree Accessors (§3.1.5)
     *   - Form Element Parent-Child Relations (§4.10.3)
     *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
     *   - HTMLCollection (§4.2.10.2)
     *
     * Namespace isolation is implemented by prefixing `id` and `name` attributes
     * with a constant string, i.e., `user-content-`
     */ let SANITIZE_NAMED_PROPS = false;
        const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
        /* Keep element content when removing element? */ let KEEP_CONTENT = true;
        /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */ let IN_PLACE = false;
        /* Allow usage of profiles like html, svg and mathMl */ let USE_PROFILES = {};
        /* Tags to ignore content of when KEEP_CONTENT is true */ let FORBID_CONTENTS = null;
        const DEFAULT_FORBID_CONTENTS = addToSet({}, [
            'annotation-xml',
            'audio',
            'colgroup',
            'desc',
            'foreignobject',
            'head',
            'iframe',
            'math',
            'mi',
            'mn',
            'mo',
            'ms',
            'mtext',
            'noembed',
            'noframes',
            'noscript',
            'plaintext',
            'script',
            'style',
            'svg',
            'template',
            'thead',
            'title',
            'video',
            'xmp'
        ]);
        /* Tags that are safe for data: URIs */ let DATA_URI_TAGS = null;
        const DEFAULT_DATA_URI_TAGS = addToSet({}, [
            'audio',
            'video',
            'img',
            'source',
            'image',
            'track'
        ]);
        /* Attributes safe for values like "javascript:" */ let URI_SAFE_ATTRIBUTES = null;
        const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
            'alt',
            'class',
            'for',
            'id',
            'label',
            'name',
            'pattern',
            'placeholder',
            'role',
            'summary',
            'title',
            'value',
            'style',
            'xmlns'
        ]);
        const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
        const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
        const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
        /* Document namespace */ let NAMESPACE = HTML_NAMESPACE;
        let IS_EMPTY_INPUT = false;
        /* Allowed XHTML+XML namespaces */ let ALLOWED_NAMESPACES = null;
        const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [
            MATHML_NAMESPACE,
            SVG_NAMESPACE,
            HTML_NAMESPACE
        ], stringToString);
        let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, [
            'mi',
            'mo',
            'mn',
            'ms',
            'mtext'
        ]);
        let HTML_INTEGRATION_POINTS = addToSet({}, [
            'annotation-xml'
        ]);
        // Certain elements are allowed in both SVG and HTML
        // namespace. We need to specify them explicitly
        // so that they don't get erroneously deleted from
        // HTML namespace.
        const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, [
            'title',
            'style',
            'font',
            'a',
            'script'
        ]);
        /* Parsing of strict XHTML documents */ let PARSER_MEDIA_TYPE = null;
        const SUPPORTED_PARSER_MEDIA_TYPES = [
            'application/xhtml+xml',
            'text/html'
        ];
        const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
        let transformCaseFunc = null;
        /* Keep a reference to config to pass to hooks */ let CONFIG = null;
        /* Ideally, do not touch anything below this line */ /* ______________________________________________ */ const formElement = document.createElement('form');
        const isRegexOrFunction = function isRegexOrFunction(testValue) {
            return testValue instanceof RegExp || testValue instanceof Function;
        };
        /**
     * _parseConfig
     *
     * @param cfg optional config literal
     */ // eslint-disable-next-line complexity
        const _parseConfig = function _parseConfig() {
            let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            if (CONFIG && CONFIG === cfg) return;
            /* Shield configuration object from tampering */ if (!cfg || typeof cfg !== 'object') cfg = {};
            /* Shield configuration object from prototype pollution */ cfg = clone(cfg);
            PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
            SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
            // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
            transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
            /* Set configuration parameters */ ALLOWED_TAGS = objectHasOwnProperty(cfg, 'ALLOWED_TAGS') ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
            ALLOWED_ATTR = objectHasOwnProperty(cfg, 'ALLOWED_ATTR') ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
            ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, 'ALLOWED_NAMESPACES') ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
            URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
            DATA_URI_TAGS = objectHasOwnProperty(cfg, 'ADD_DATA_URI_TAGS') ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
            FORBID_CONTENTS = objectHasOwnProperty(cfg, 'FORBID_CONTENTS') ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
            FORBID_TAGS = objectHasOwnProperty(cfg, 'FORBID_TAGS') ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
            FORBID_ATTR = objectHasOwnProperty(cfg, 'FORBID_ATTR') ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
            USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES : false;
            ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
            ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
            ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
            ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
            SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
            SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false; // Default true
            WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
            RETURN_DOM = cfg.RETURN_DOM || false; // Default false
            RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
            RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
            FORCE_BODY = cfg.FORCE_BODY || false; // Default false
            SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
            SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
            KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
            IN_PLACE = cfg.IN_PLACE || false; // Default false
            IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
            NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
            MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
            HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
            CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
            if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
            if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
            if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
            if (SAFE_FOR_TEMPLATES) ALLOW_DATA_ATTR = false;
            if (RETURN_DOM_FRAGMENT) RETURN_DOM = true;
            /* Parse profile info */ if (USE_PROFILES) {
                ALLOWED_TAGS = addToSet({}, text);
                ALLOWED_ATTR = [];
                if (USE_PROFILES.html === true) {
                    addToSet(ALLOWED_TAGS, html$1);
                    addToSet(ALLOWED_ATTR, html);
                }
                if (USE_PROFILES.svg === true) {
                    addToSet(ALLOWED_TAGS, svg$1);
                    addToSet(ALLOWED_ATTR, svg);
                    addToSet(ALLOWED_ATTR, xml);
                }
                if (USE_PROFILES.svgFilters === true) {
                    addToSet(ALLOWED_TAGS, svgFilters);
                    addToSet(ALLOWED_ATTR, svg);
                    addToSet(ALLOWED_ATTR, xml);
                }
                if (USE_PROFILES.mathMl === true) {
                    addToSet(ALLOWED_TAGS, mathMl$1);
                    addToSet(ALLOWED_ATTR, mathMl);
                    addToSet(ALLOWED_ATTR, xml);
                }
            }
            /* Merge configuration parameters */ if (cfg.ADD_TAGS) {
                if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) ALLOWED_TAGS = clone(ALLOWED_TAGS);
                addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
            }
            if (cfg.ADD_ATTR) {
                if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) ALLOWED_ATTR = clone(ALLOWED_ATTR);
                addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
            }
            if (cfg.ADD_URI_SAFE_ATTR) addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
            if (cfg.FORBID_CONTENTS) {
                if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
                addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
            }
            /* Add #text in case KEEP_CONTENT is set to true */ if (KEEP_CONTENT) ALLOWED_TAGS['#text'] = true;
            /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */ if (WHOLE_DOCUMENT) addToSet(ALLOWED_TAGS, [
                'html',
                'head',
                'body'
            ]);
            /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */ if (ALLOWED_TAGS.table) {
                addToSet(ALLOWED_TAGS, [
                    'tbody'
                ]);
                delete FORBID_TAGS.tbody;
            }
            if (cfg.TRUSTED_TYPES_POLICY) {
                if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
                if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
                // Overwrite existing TrustedTypes policy.
                trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
                // Sign local variables required by `sanitize`.
                emptyHTML = trustedTypesPolicy.createHTML('');
            } else {
                // Uninitialized policy, attempt to initialize the internal dompurify policy.
                if (trustedTypesPolicy === undefined) trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
                // If creating the internal policy succeeded sign internal variables.
                if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') emptyHTML = trustedTypesPolicy.createHTML('');
            }
            // Prevent further manipulation of configuration.
            // Not available in IE8, Safari 5, etc.
            if (freeze) freeze(cfg);
            CONFIG = cfg;
        };
        /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */ const ALL_SVG_TAGS = addToSet({}, [
            ...svg$1,
            ...svgFilters,
            ...svgDisallowed
        ]);
        const ALL_MATHML_TAGS = addToSet({}, [
            ...mathMl$1,
            ...mathMlDisallowed
        ]);
        /**
     * @param element a DOM element whose namespace is being checked
     * @returns Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */ const _checkValidNamespace = function _checkValidNamespace(element) {
            let parent = getParentNode(element);
            // In JSDOM, if we're inside shadow DOM, then parentNode
            // can be null. We just simulate parent in this case.
            if (!parent || !parent.tagName) parent = {
                namespaceURI: NAMESPACE,
                tagName: 'template'
            };
            const tagName = stringToLowerCase(element.tagName);
            const parentTagName = stringToLowerCase(parent.tagName);
            if (!ALLOWED_NAMESPACES[element.namespaceURI]) return false;
            if (element.namespaceURI === SVG_NAMESPACE) {
                // The only way to switch from HTML namespace to SVG
                // is via <svg>. If it happens via any other tag, then
                // it should be killed.
                if (parent.namespaceURI === HTML_NAMESPACE) return tagName === 'svg';
                // The only way to switch from MathML to SVG is via`
                // svg if parent is either <annotation-xml> or MathML
                // text integration points.
                if (parent.namespaceURI === MATHML_NAMESPACE) return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
                // We only allow elements that are defined in SVG
                // spec. All others are disallowed in SVG namespace.
                return Boolean(ALL_SVG_TAGS[tagName]);
            }
            if (element.namespaceURI === MATHML_NAMESPACE) {
                // The only way to switch from HTML namespace to MathML
                // is via <math>. If it happens via any other tag, then
                // it should be killed.
                if (parent.namespaceURI === HTML_NAMESPACE) return tagName === 'math';
                // The only way to switch from SVG to MathML is via
                // <math> and HTML integration points
                if (parent.namespaceURI === SVG_NAMESPACE) return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
                // We only allow elements that are defined in MathML
                // spec. All others are disallowed in MathML namespace.
                return Boolean(ALL_MATHML_TAGS[tagName]);
            }
            if (element.namespaceURI === HTML_NAMESPACE) {
                // The only way to switch from SVG to HTML is via
                // HTML integration points, and from MathML to HTML
                // is via MathML text integration points
                if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) return false;
                if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) return false;
                // We disallow tags that are specific for MathML
                // or SVG and should never appear in HTML namespace
                return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
            }
            // For XHTML and XML documents that support custom namespaces
            if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) return true;
            // The code should never reach this place (this means
            // that the element somehow got namespace that is not
            // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
            // Return false just in case.
            return false;
        };
        /**
     * _forceRemove
     *
     * @param node a DOM node
     */ const _forceRemove = function _forceRemove(node) {
            arrayPush(DOMPurify.removed, {
                element: node
            });
            try {
                // eslint-disable-next-line unicorn/prefer-dom-node-remove
                getParentNode(node).removeChild(node);
            } catch (_) {
                remove(node);
            }
        };
        /**
     * _removeAttribute
     *
     * @param name an Attribute name
     * @param element a DOM node
     */ const _removeAttribute = function _removeAttribute(name, element) {
            try {
                arrayPush(DOMPurify.removed, {
                    attribute: element.getAttributeNode(name),
                    from: element
                });
            } catch (_) {
                arrayPush(DOMPurify.removed, {
                    attribute: null,
                    from: element
                });
            }
            element.removeAttribute(name);
            // We void attribute values for unremovable "is" attributes
            if (name === 'is') {
                if (RETURN_DOM || RETURN_DOM_FRAGMENT) try {
                    _forceRemove(element);
                } catch (_) {}
                else try {
                    element.setAttribute(name, '');
                } catch (_) {}
            }
        };
        /**
     * _initDocument
     *
     * @param dirty - a string of dirty markup
     * @return a DOM, filled with the dirty markup
     */ const _initDocument = function _initDocument(dirty) {
            /* Create a HTML document */ let doc = null;
            let leadingWhitespace = null;
            if (FORCE_BODY) dirty = '<remove></remove>' + dirty;
            else {
                /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */ const matches = stringMatch(dirty, /^[\r\n\t ]+/);
                leadingWhitespace = matches && matches[0];
            }
            if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
            dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
            const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
            /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */ if (NAMESPACE === HTML_NAMESPACE) try {
                doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
            } catch (_) {}
            /* Use createHTMLDocument in case DOMParser is not available */ if (!doc || !doc.documentElement) {
                doc = implementation.createDocument(NAMESPACE, 'template', null);
                try {
                    doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
                } catch (_) {
                // Syntax error if dirtyPayload is invalid xml
                }
            }
            const body = doc.body || doc.documentElement;
            if (dirty && leadingWhitespace) body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
            /* Work on whole document or just its body */ if (NAMESPACE === HTML_NAMESPACE) return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
            return WHOLE_DOCUMENT ? doc.documentElement : body;
        };
        /**
     * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
     *
     * @param root The root element or node to start traversing on.
     * @return The created NodeIterator
     */ const _createNodeIterator = function _createNodeIterator(root) {
            return createNodeIterator.call(root.ownerDocument || root, root, // eslint-disable-next-line no-bitwise
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
        };
        /**
     * _isClobbered
     *
     * @param element element to check for clobbering attacks
     * @return true if clobbered, false if safe
     */ const _isClobbered = function _isClobbered(element) {
            return element instanceof HTMLFormElement && (typeof element.nodeName !== 'string' || typeof element.textContent !== 'string' || typeof element.removeChild !== 'function' || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== 'function' || typeof element.setAttribute !== 'function' || typeof element.namespaceURI !== 'string' || typeof element.insertBefore !== 'function' || typeof element.hasChildNodes !== 'function');
        };
        /**
     * Checks whether the given object is a DOM node.
     *
     * @param value object to check whether it's a DOM node
     * @return true is object is a DOM node
     */ const _isNode = function _isNode(value) {
            return typeof Node === 'function' && value instanceof Node;
        };
        function _executeHooks(hooks, currentNode, data) {
            arrayForEach(hooks, (hook)=>{
                hook.call(DOMPurify, currentNode, data, CONFIG);
            });
        }
        /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     * @param currentNode to check for permission to exist
     * @return true if node was killed, false if left alive
     */ const _sanitizeElements = function _sanitizeElements(currentNode) {
            let content = null;
            /* Execute a hook if present */ _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
            /* Check if element is clobbered or can clobber */ if (_isClobbered(currentNode)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Now let's check the element's type and name */ const tagName = transformCaseFunc(currentNode.nodeName);
            /* Execute a hook if present */ _executeHooks(hooks.uponSanitizeElement, currentNode, {
                tagName,
                allowedTags: ALLOWED_TAGS
            });
            /* Detect mXSS attempts abusing namespace confusion */ if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Remove any occurrence of processing instructions */ if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
                _forceRemove(currentNode);
                return true;
            }
            /* Remove any kind of possibly harmful comments */ if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Remove element if anything forbids its presence */ if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
                /* Check if we have a custom element to handle */ if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
                    if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
                    if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
                }
                /* Keep content except for bad-listed elements */ if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
                    const parentNode = getParentNode(currentNode) || currentNode.parentNode;
                    const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
                    if (childNodes && parentNode) {
                        const childCount = childNodes.length;
                        for(let i = childCount - 1; i >= 0; --i){
                            const childClone = cloneNode(childNodes[i], true);
                            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
                            parentNode.insertBefore(childClone, getNextSibling(currentNode));
                        }
                    }
                }
                _forceRemove(currentNode);
                return true;
            }
            /* Check whether element has a valid namespace */ if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Make sure that older browsers don't get fallback-tag mXSS */ if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Sanitize element content to be template-safe */ if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
                /* Get the element's text content */ content = currentNode.textContent;
                arrayForEach([
                    MUSTACHE_EXPR,
                    ERB_EXPR,
                    TMPLIT_EXPR
                ], (expr)=>{
                    content = stringReplace(content, expr, ' ');
                });
                if (currentNode.textContent !== content) {
                    arrayPush(DOMPurify.removed, {
                        element: currentNode.cloneNode()
                    });
                    currentNode.textContent = content;
                }
            }
            /* Execute a hook if present */ _executeHooks(hooks.afterSanitizeElements, currentNode, null);
            return false;
        };
        /**
     * _isValidAttribute
     *
     * @param lcTag Lowercase tag name of containing element.
     * @param lcName Lowercase attribute name.
     * @param value Attribute value.
     * @return Returns true if `value` is valid, otherwise false.
     */ // eslint-disable-next-line complexity
        const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
            /* Make sure attribute cannot clobber */ if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) return false;
            /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */ if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ;
            else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ;
            else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
                if (// First condition does a very basic check if a) it's basically a valid custom element tagname AND
                // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
                // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
                _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
                // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
                lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ;
                else return false;
            /* Check value is safe. First, is attr inert? If so, is safe */ } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
            else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ;
            else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ;
            else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ;
            else if (value) return false;
            return true;
        };
        /**
     * _isBasicCustomElement
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     *
     * @param tagName name of the tag of the node to sanitize
     * @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
     */ const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
            return tagName !== 'annotation-xml' && stringMatch(tagName, CUSTOM_ELEMENT);
        };
        /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param currentNode to sanitize
     */ const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
            /* Execute a hook if present */ _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
            const { attributes } = currentNode;
            /* Check if we have attributes; if not we might have a text node */ if (!attributes || _isClobbered(currentNode)) return;
            const hookEvent = {
                attrName: '',
                attrValue: '',
                keepAttr: true,
                allowedAttributes: ALLOWED_ATTR,
                forceKeepAttr: undefined
            };
            let l = attributes.length;
            /* Go backwards over all attributes; safely remove bad ones */ while(l--){
                const attr = attributes[l];
                const { name, namespaceURI, value: attrValue } = attr;
                const lcName = transformCaseFunc(name);
                let value = name === 'value' ? attrValue : stringTrim(attrValue);
                /* Execute a hook if present */ hookEvent.attrName = lcName;
                hookEvent.attrValue = value;
                hookEvent.keepAttr = true;
                hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
                _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
                value = hookEvent.attrValue;
                /* Full DOM Clobbering protection via namespace isolation,
         * Prefix id and name attributes with `user-content-`
         */ if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
                    // Remove the attribute with this value
                    _removeAttribute(name, currentNode);
                    // Prefix the value and later re-create the attribute with the sanitized value
                    value = SANITIZE_NAMED_PROPS_PREFIX + value;
                }
                /* Work around a security issue with comments inside attributes */ if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title)/i, value)) {
                    _removeAttribute(name, currentNode);
                    continue;
                }
                /* Did the hooks approve of the attribute? */ if (hookEvent.forceKeepAttr) continue;
                /* Remove attribute */ _removeAttribute(name, currentNode);
                /* Did the hooks approve of the attribute? */ if (!hookEvent.keepAttr) continue;
                /* Work around a security issue in jQuery 3.0 */ if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
                    _removeAttribute(name, currentNode);
                    continue;
                }
                /* Sanitize attribute content to be template-safe */ if (SAFE_FOR_TEMPLATES) arrayForEach([
                    MUSTACHE_EXPR,
                    ERB_EXPR,
                    TMPLIT_EXPR
                ], (expr)=>{
                    value = stringReplace(value, expr, ' ');
                });
                /* Is `value` valid for this attribute? */ const lcTag = transformCaseFunc(currentNode.nodeName);
                if (!_isValidAttribute(lcTag, lcName, value)) continue;
                /* Handle attributes that require Trusted Types */ if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
                    if (namespaceURI) ;
                    else switch(trustedTypes.getAttributeType(lcTag, lcName)){
                        case 'TrustedHTML':
                            value = trustedTypesPolicy.createHTML(value);
                            break;
                        case 'TrustedScriptURL':
                            value = trustedTypesPolicy.createScriptURL(value);
                            break;
                    }
                }
                /* Handle invalid data-* attribute set by try-catching it */ try {
                    if (namespaceURI) currentNode.setAttributeNS(namespaceURI, name, value);
                    else /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */ currentNode.setAttribute(name, value);
                    if (_isClobbered(currentNode)) _forceRemove(currentNode);
                    else arrayPop(DOMPurify.removed);
                } catch (_) {}
            }
            /* Execute a hook if present */ _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
        };
        /**
     * _sanitizeShadowDOM
     *
     * @param fragment to iterate over recursively
     */ const _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
            let shadowNode = null;
            const shadowIterator = _createNodeIterator(fragment);
            /* Execute a hook if present */ _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
            while(shadowNode = shadowIterator.nextNode()){
                /* Execute a hook if present */ _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
                /* Sanitize tags and elements */ _sanitizeElements(shadowNode);
                /* Check attributes next */ _sanitizeAttributes(shadowNode);
                /* Deep shadow DOM detected */ if (shadowNode.content instanceof DocumentFragment) _sanitizeShadowDOM(shadowNode.content);
            }
            /* Execute a hook if present */ _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
        };
        // eslint-disable-next-line complexity
        DOMPurify.sanitize = function(dirty) {
            let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            let body = null;
            let importedNode = null;
            let currentNode = null;
            let returnNode = null;
            /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */ IS_EMPTY_INPUT = !dirty;
            if (IS_EMPTY_INPUT) dirty = '<!-->';
            /* Stringify, in case dirty is an object */ if (typeof dirty !== 'string' && !_isNode(dirty)) {
                if (typeof dirty.toString === 'function') {
                    dirty = dirty.toString();
                    if (typeof dirty !== 'string') throw typeErrorCreate('dirty is not a string, aborting');
                } else throw typeErrorCreate('toString is not a function');
            }
            /* Return dirty HTML if DOMPurify cannot run */ if (!DOMPurify.isSupported) return dirty;
            /* Assign config vars */ if (!SET_CONFIG) _parseConfig(cfg);
            /* Clean up removed elements */ DOMPurify.removed = [];
            /* Check if dirty is correctly typed for IN_PLACE */ if (typeof dirty === 'string') IN_PLACE = false;
            if (IN_PLACE) /* Do some early pre-sanitization to avoid unsafe root nodes */ {
                if (dirty.nodeName) {
                    const tagName = transformCaseFunc(dirty.nodeName);
                    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
                }
            } else if (dirty instanceof Node) {
                /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */ body = _initDocument('<!---->');
                importedNode = body.ownerDocument.importNode(dirty, true);
                if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === 'BODY') /* Node is already a body, use as is */ body = importedNode;
                else if (importedNode.nodeName === 'HTML') body = importedNode;
                else // eslint-disable-next-line unicorn/prefer-dom-node-append
                body.appendChild(importedNode);
            } else {
                /* Exit directly if we have nothing to do */ if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
                dirty.indexOf('<') === -1) return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
                /* Initialize the document to work on */ body = _initDocument(dirty);
                /* Check we have a DOM node from the data */ if (!body) return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
            }
            /* Remove first element node (ours) if FORCE_BODY is set */ if (body && FORCE_BODY) _forceRemove(body.firstChild);
            /* Get node iterator */ const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
            /* Now start iterating over the created document */ while(currentNode = nodeIterator.nextNode()){
                /* Sanitize tags and elements */ _sanitizeElements(currentNode);
                /* Check attributes next */ _sanitizeAttributes(currentNode);
                /* Shadow DOM detected, sanitize it */ if (currentNode.content instanceof DocumentFragment) _sanitizeShadowDOM(currentNode.content);
            }
            /* If we sanitized `dirty` in-place, return it. */ if (IN_PLACE) return dirty;
            /* Return sanitized string or DOM */ if (RETURN_DOM) {
                if (RETURN_DOM_FRAGMENT) {
                    returnNode = createDocumentFragment.call(body.ownerDocument);
                    while(body.firstChild)// eslint-disable-next-line unicorn/prefer-dom-node-append
                    returnNode.appendChild(body.firstChild);
                } else returnNode = body;
                if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */ returnNode = importNode.call(originalDocument, returnNode, true);
                return returnNode;
            }
            let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
            /* Serialize doctype if allowed */ if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
            /* Sanitize final string template-safe */ if (SAFE_FOR_TEMPLATES) arrayForEach([
                MUSTACHE_EXPR,
                ERB_EXPR,
                TMPLIT_EXPR
            ], (expr)=>{
                serializedHTML = stringReplace(serializedHTML, expr, ' ');
            });
            return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
        };
        DOMPurify.setConfig = function() {
            let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            _parseConfig(cfg);
            SET_CONFIG = true;
        };
        DOMPurify.clearConfig = function() {
            CONFIG = null;
            SET_CONFIG = false;
        };
        DOMPurify.isValidAttribute = function(tag, attr, value) {
            /* Initialize shared config vars if necessary. */ if (!CONFIG) _parseConfig({});
            const lcTag = transformCaseFunc(tag);
            const lcName = transformCaseFunc(attr);
            return _isValidAttribute(lcTag, lcName, value);
        };
        DOMPurify.addHook = function(entryPoint, hookFunction) {
            if (typeof hookFunction !== 'function') return;
            arrayPush(hooks[entryPoint], hookFunction);
        };
        DOMPurify.removeHook = function(entryPoint, hookFunction) {
            if (hookFunction !== undefined) {
                const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
                return index === -1 ? undefined : arraySplice(hooks[entryPoint], index, 1)[0];
            }
            return arrayPop(hooks[entryPoint]);
        };
        DOMPurify.removeHooks = function(entryPoint) {
            hooks[entryPoint] = [];
        };
        DOMPurify.removeAllHooks = function() {
            hooks = _createHooksMap();
        };
        return DOMPurify;
    }
    var purify = createDOMPurify();
    return purify;
});

},{}],"fSyEy":[function(require,module,exports,__globalThis) {
/**
 * marked v15.0.11 - a markdown parser
 * Copyright (c) 2011-2025, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */ /**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */ (function(global, factory) {
    factory(exports);
})(this, function(exports1) {
    'use strict';
    /**
     * Gets the original marked default options.
     */ function _getDefaults() {
        return {
            async: false,
            breaks: false,
            extensions: null,
            gfm: true,
            hooks: null,
            pedantic: false,
            renderer: null,
            silent: false,
            tokenizer: null,
            walkTokens: null
        };
    }
    exports1.defaults = _getDefaults();
    function changeDefaults(newDefaults) {
        exports1.defaults = newDefaults;
    }
    const noopTest = {
        exec: ()=>null
    };
    function edit(regex, opt = '') {
        let source = typeof regex === 'string' ? regex : regex.source;
        const obj = {
            replace: (name, val)=>{
                let valSource = typeof val === 'string' ? val : val.source;
                valSource = valSource.replace(other.caret, '$1');
                source = source.replace(name, valSource);
                return obj;
            },
            getRegex: ()=>{
                return new RegExp(source, opt);
            }
        };
        return obj;
    }
    const other = {
        codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
        outputLinkReplace: /\\([\[\]])/g,
        indentCodeCompensation: /^(\s+)(?:```)/,
        beginningSpace: /^\s+/,
        endingHash: /#$/,
        startingSpaceChar: /^ /,
        endingSpaceChar: / $/,
        nonSpaceChar: /[^ ]/,
        newLineCharGlobal: /\n/g,
        tabCharGlobal: /\t/g,
        multipleSpaceGlobal: /\s+/g,
        blankLine: /^[ \t]*$/,
        doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
        blockquoteStart: /^ {0,3}>/,
        blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
        blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
        listReplaceTabs: /^\t+/,
        listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
        listIsTask: /^\[[ xX]\] /,
        listReplaceTask: /^\[[ xX]\] +/,
        anyLine: /\n.*\n/,
        hrefBrackets: /^<(.*)>$/,
        tableDelimiter: /[:|]/,
        tableAlignChars: /^\||\| *$/g,
        tableRowBlankLine: /\n[ \t]*$/,
        tableAlignRight: /^ *-+: *$/,
        tableAlignCenter: /^ *:-+: *$/,
        tableAlignLeft: /^ *:-+ *$/,
        startATag: /^<a /i,
        endATag: /^<\/a>/i,
        startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
        endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
        startAngleBracket: /^</,
        endAngleBracket: />$/,
        pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
        unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
        escapeTest: /[&<>"']/,
        escapeReplace: /[&<>"']/g,
        escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
        escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
        unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
        caret: /(^|[^\[])\^/g,
        percentDecode: /%25/g,
        findPipe: /\|/g,
        splitPipe: / \|/,
        slashPipe: /\\\|/g,
        carriageReturn: /\r\n|\r/g,
        spaceLine: /^ +$/gm,
        notSpaceStart: /^\S*/,
        endingNewline: /\n$/,
        listItemRegex: (bull)=>new RegExp(`^( {0,3}${bull})((?:[\t ][^\\n]*)?(?:\\n|$))`),
        nextBulletRegex: (indent)=>new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),
        hrRegex: (indent)=>new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
        fencesBeginRegex: (indent)=>new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`),
        headingBeginRegex: (indent)=>new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`),
        htmlBeginRegex: (indent)=>new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, 'i')
    };
    /**
     * Block-Level Grammar
     */ const newline = /^(?:[ \t]*(?:\n|$))+/;
    const blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
    const fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
    const hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
    const heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
    const bullet = /(?:[*+-]|\d{1,9}[.)])/;
    const lheadingCore = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
    const lheading = edit(lheadingCore).replace(/bull/g, bullet) // lists can interrupt
    .replace(/blockCode/g, /(?: {4}| {0,3}\t)/) // indented code blocks can interrupt
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/) // fenced code blocks can interrupt
    .replace(/blockquote/g, / {0,3}>/) // blockquote can interrupt
    .replace(/heading/g, / {0,3}#{1,6}/) // ATX heading can interrupt
    .replace(/html/g, / {0,3}<[^\n>]+>\n/) // block html can interrupt
    .replace(/\|table/g, '') // table not in commonmark
    .getRegex();
    const lheadingGfm = edit(lheadingCore).replace(/bull/g, bullet) // lists can interrupt
    .replace(/blockCode/g, /(?: {4}| {0,3}\t)/) // indented code blocks can interrupt
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/) // fenced code blocks can interrupt
    .replace(/blockquote/g, / {0,3}>/) // blockquote can interrupt
    .replace(/heading/g, / {0,3}#{1,6}/) // ATX heading can interrupt
    .replace(/html/g, / {0,3}<[^\n>]+>\n/) // block html can interrupt
    .replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/) // table can interrupt
    .getRegex();
    const _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
    const blockText = /^[^\n]+/;
    const _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
    const def = edit(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace('label', _blockLabel).replace('title', /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
    const list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
    const _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
    const _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
    const html = edit("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", 'i').replace('comment', _comment).replace('tag', _tag).replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
    const paragraph = edit(_paragraph).replace('hr', hr).replace('heading', ' {0,3}#{1,6}(?:\\s|$)').replace('|lheading', '') // setext headings don't interrupt commonmark paragraphs
    .replace('|table', '').replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', _tag) // pars can be interrupted by type (6) html blocks
    .getRegex();
    const blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace('paragraph', paragraph).getRegex();
    /**
     * Normal Block Grammar
     */ const blockNormal = {
        blockquote,
        code: blockCode,
        def,
        fences,
        heading,
        hr,
        html,
        lheading,
        list,
        newline,
        paragraph,
        table: noopTest,
        text: blockText
    };
    /**
     * GFM Block Grammar
     */ const gfmTable = edit("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)") // Cells
    .replace('hr', hr).replace('heading', ' {0,3}#{1,6}(?:\\s|$)').replace('blockquote', ' {0,3}>').replace('code', '(?: {4}| {0,3}\t)[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', _tag) // tables can be interrupted by type (6) html blocks
    .getRegex();
    const blockGfm = {
        ...blockNormal,
        lheading: lheadingGfm,
        table: gfmTable,
        paragraph: edit(_paragraph).replace('hr', hr).replace('heading', ' {0,3}#{1,6}(?:\\s|$)').replace('|lheading', '') // setext headings don't interrupt commonmark paragraphs
        .replace('table', gfmTable) // interrupt paragraphs with table
        .replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
        .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', _tag) // pars can be interrupted by type (6) html blocks
        .getRegex()
    };
    /**
     * Pedantic grammar (original John Gruber's loose markdown specification)
     */ const blockPedantic = {
        ...blockNormal,
        html: edit("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace('comment', _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: noopTest,
        lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        paragraph: edit(_paragraph).replace('hr', hr).replace('heading', ' *#{1,6} *[^\n]').replace('lheading', lheading).replace('|table', '').replace('blockquote', ' {0,3}>').replace('|fences', '').replace('|list', '').replace('|html', '').replace('|tag', '').getRegex()
    };
    /**
     * Inline-Level Grammar
     */ const escape$1 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
    const inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
    const br = /^( {2,}|\\)\n(?!\s*$)/;
    const inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
    // list of unicode punctuation marks, plus any missing characters from CommonMark spec
    const _punctuation = /[\p{P}\p{S}]/u;
    const _punctuationOrSpace = /[\s\p{P}\p{S}]/u;
    const _notPunctuationOrSpace = /[^\s\p{P}\p{S}]/u;
    const punctuation = edit(/^((?![*_])punctSpace)/, 'u').replace(/punctSpace/g, _punctuationOrSpace).getRegex();
    // GFM allows ~ inside strong and em for strikethrough
    const _punctuationGfmStrongEm = /(?!~)[\p{P}\p{S}]/u;
    const _punctuationOrSpaceGfmStrongEm = /(?!~)[\s\p{P}\p{S}]/u;
    const _notPunctuationOrSpaceGfmStrongEm = /(?:[^\s\p{P}\p{S}]|~)/u;
    // sequences em should skip over [title](link), `code`, <html>
    const blockSkip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
    const emStrongLDelimCore = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
    const emStrongLDelim = edit(emStrongLDelimCore, 'u').replace(/punct/g, _punctuation).getRegex();
    const emStrongLDelimGfm = edit(emStrongLDelimCore, 'u').replace(/punct/g, _punctuationGfmStrongEm).getRegex();
    const emStrongRDelimAstCore = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)"; // (6) a***a can be either Left or Right Delimiter
    const emStrongRDelimAst = edit(emStrongRDelimAstCore, 'gu').replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
    const emStrongRDelimAstGfm = edit(emStrongRDelimAstCore, 'gu').replace(/notPunctSpace/g, _notPunctuationOrSpaceGfmStrongEm).replace(/punctSpace/g, _punctuationOrSpaceGfmStrongEm).replace(/punct/g, _punctuationGfmStrongEm).getRegex();
    // (6) Not allowed for _
    const emStrongRDelimUnd = edit("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", 'gu') // (5) #___# can be either Left or Right Delimiter
    .replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
    const anyPunctuation = edit(/\\(punct)/, 'gu').replace(/punct/g, _punctuation).getRegex();
    const autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace('scheme', /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace('email', /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
    const _inlineComment = edit(_comment).replace('(?:-->|$)', '-->').getRegex();
    const tag = edit("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>") // CDATA section
    .replace('comment', _inlineComment).replace('attribute', /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
    const _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
    const link = edit(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace('label', _inlineLabel).replace('href', /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace('title', /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
    const reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace('label', _inlineLabel).replace('ref', _blockLabel).getRegex();
    const nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace('ref', _blockLabel).getRegex();
    const reflinkSearch = edit('reflink|nolink(?!\\()', 'g').replace('reflink', reflink).replace('nolink', nolink).getRegex();
    /**
     * Normal Inline Grammar
     */ const inlineNormal = {
        _backpedal: noopTest,
        anyPunctuation,
        autolink,
        blockSkip,
        br,
        code: inlineCode,
        del: noopTest,
        emStrongLDelim,
        emStrongRDelimAst,
        emStrongRDelimUnd,
        escape: escape$1,
        link,
        nolink,
        punctuation,
        reflink,
        reflinkSearch,
        tag,
        text: inlineText,
        url: noopTest
    };
    /**
     * Pedantic Inline Grammar
     */ const inlinePedantic = {
        ...inlineNormal,
        link: edit(/^!?\[(label)\]\((.*?)\)/).replace('label', _inlineLabel).getRegex(),
        reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace('label', _inlineLabel).getRegex()
    };
    /**
     * GFM Inline Grammar
     */ const inlineGfm = {
        ...inlineNormal,
        emStrongRDelimAst: emStrongRDelimAstGfm,
        emStrongLDelim: emStrongLDelimGfm,
        url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, 'i').replace('email', /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
        _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    };
    /**
     * GFM + Line Breaks Inline Grammar
     */ const inlineBreaks = {
        ...inlineGfm,
        br: edit(br).replace('{2,}', '*').getRegex(),
        text: edit(inlineGfm.text).replace('\\b_', '\\b_| {2,}\\n').replace(/\{2,\}/g, '*').getRegex()
    };
    /**
     * exports
     */ const block = {
        normal: blockNormal,
        gfm: blockGfm,
        pedantic: blockPedantic
    };
    const inline = {
        normal: inlineNormal,
        gfm: inlineGfm,
        breaks: inlineBreaks,
        pedantic: inlinePedantic
    };
    /**
     * Helpers
     */ const escapeReplacements = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    const getEscapeReplacement = (ch)=>escapeReplacements[ch];
    function escape(html, encode) {
        if (encode) {
            if (other.escapeTest.test(html)) return html.replace(other.escapeReplace, getEscapeReplacement);
        } else {
            if (other.escapeTestNoEncode.test(html)) return html.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
        }
        return html;
    }
    function cleanUrl(href) {
        try {
            href = encodeURI(href).replace(other.percentDecode, '%');
        } catch  {
            return null;
        }
        return href;
    }
    function splitCells(tableRow, count) {
        // ensure that every cell-delimiting pipe has a space
        // before it to distinguish it from an escaped pipe
        const row = tableRow.replace(other.findPipe, (match, offset, str)=>{
            let escaped = false;
            let curr = offset;
            while(--curr >= 0 && str[curr] === '\\')escaped = !escaped;
            if (escaped) // odd number of slashes means | is escaped
            // so we leave it alone
            return '|';
            else // add space before unescaped |
            return ' |';
        }), cells = row.split(other.splitPipe);
        let i = 0;
        // First/last cell in a row cannot be empty if it has no leading/trailing pipe
        if (!cells[0].trim()) cells.shift();
        if (cells.length > 0 && !cells.at(-1)?.trim()) cells.pop();
        if (count) {
            if (cells.length > count) cells.splice(count);
            else while(cells.length < count)cells.push('');
        }
        for(; i < cells.length; i++)// leading or trailing whitespace is ignored per the gfm spec
        cells[i] = cells[i].trim().replace(other.slashPipe, '|');
        return cells;
    }
    /**
     * Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
     * /c*$/ is vulnerable to REDOS.
     *
     * @param str
     * @param c
     * @param invert Remove suffix of non-c chars instead. Default falsey.
     */ function rtrim(str, c, invert) {
        const l = str.length;
        if (l === 0) return '';
        // Length of suffix matching the invert condition.
        let suffLen = 0;
        // Step left until we fail to match the invert condition.
        while(suffLen < l){
            const currChar = str.charAt(l - suffLen - 1);
            if (currChar === c && true) suffLen++;
            else break;
        }
        return str.slice(0, l - suffLen);
    }
    function findClosingBracket(str, b) {
        if (str.indexOf(b[1]) === -1) return -1;
        let level = 0;
        for(let i = 0; i < str.length; i++){
            if (str[i] === '\\') i++;
            else if (str[i] === b[0]) level++;
            else if (str[i] === b[1]) {
                level--;
                if (level < 0) return i;
            }
        }
        if (level > 0) return -2;
        return -1;
    }
    function outputLink(cap, link, raw, lexer, rules) {
        const href = link.href;
        const title = link.title || null;
        const text = cap[1].replace(rules.other.outputLinkReplace, '$1');
        lexer.state.inLink = true;
        const token = {
            type: cap[0].charAt(0) === '!' ? 'image' : 'link',
            raw,
            href,
            title,
            text,
            tokens: lexer.inlineTokens(text)
        };
        lexer.state.inLink = false;
        return token;
    }
    function indentCodeCompensation(raw, text, rules) {
        const matchIndentToCode = raw.match(rules.other.indentCodeCompensation);
        if (matchIndentToCode === null) return text;
        const indentToCode = matchIndentToCode[1];
        return text.split('\n').map((node)=>{
            const matchIndentInNode = node.match(rules.other.beginningSpace);
            if (matchIndentInNode === null) return node;
            const [indentInNode] = matchIndentInNode;
            if (indentInNode.length >= indentToCode.length) return node.slice(indentToCode.length);
            return node;
        }).join('\n');
    }
    /**
     * Tokenizer
     */ class _Tokenizer {
        options;
        rules;
        lexer;
        constructor(options){
            this.options = options || exports1.defaults;
        }
        space(src) {
            const cap = this.rules.block.newline.exec(src);
            if (cap && cap[0].length > 0) return {
                type: 'space',
                raw: cap[0]
            };
        }
        code(src) {
            const cap = this.rules.block.code.exec(src);
            if (cap) {
                const text = cap[0].replace(this.rules.other.codeRemoveIndent, '');
                return {
                    type: 'code',
                    raw: cap[0],
                    codeBlockStyle: 'indented',
                    text: !this.options.pedantic ? rtrim(text, '\n') : text
                };
            }
        }
        fences(src) {
            const cap = this.rules.block.fences.exec(src);
            if (cap) {
                const raw = cap[0];
                const text = indentCodeCompensation(raw, cap[3] || '', this.rules);
                return {
                    type: 'code',
                    raw,
                    lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, '$1') : cap[2],
                    text
                };
            }
        }
        heading(src) {
            const cap = this.rules.block.heading.exec(src);
            if (cap) {
                let text = cap[2].trim();
                // remove trailing #s
                if (this.rules.other.endingHash.test(text)) {
                    const trimmed = rtrim(text, '#');
                    if (this.options.pedantic) text = trimmed.trim();
                    else if (!trimmed || this.rules.other.endingSpaceChar.test(trimmed)) // CommonMark requires space before trailing #s
                    text = trimmed.trim();
                }
                return {
                    type: 'heading',
                    raw: cap[0],
                    depth: cap[1].length,
                    text,
                    tokens: this.lexer.inline(text)
                };
            }
        }
        hr(src) {
            const cap = this.rules.block.hr.exec(src);
            if (cap) return {
                type: 'hr',
                raw: rtrim(cap[0], '\n')
            };
        }
        blockquote(src) {
            const cap = this.rules.block.blockquote.exec(src);
            if (cap) {
                let lines = rtrim(cap[0], '\n').split('\n');
                let raw = '';
                let text = '';
                const tokens = [];
                while(lines.length > 0){
                    let inBlockquote = false;
                    const currentLines = [];
                    let i;
                    for(i = 0; i < lines.length; i++){
                        // get lines up to a continuation
                        if (this.rules.other.blockquoteStart.test(lines[i])) {
                            currentLines.push(lines[i]);
                            inBlockquote = true;
                        } else if (!inBlockquote) currentLines.push(lines[i]);
                        else break;
                    }
                    lines = lines.slice(i);
                    const currentRaw = currentLines.join('\n');
                    const currentText = currentRaw// precede setext continuation with 4 spaces so it isn't a setext
                    .replace(this.rules.other.blockquoteSetextReplace, '\n    $1').replace(this.rules.other.blockquoteSetextReplace2, '');
                    raw = raw ? `${raw}\n${currentRaw}` : currentRaw;
                    text = text ? `${text}\n${currentText}` : currentText;
                    // parse blockquote lines as top level tokens
                    // merge paragraphs if this is a continuation
                    const top = this.lexer.state.top;
                    this.lexer.state.top = true;
                    this.lexer.blockTokens(currentText, tokens, true);
                    this.lexer.state.top = top;
                    // if there is no continuation then we are done
                    if (lines.length === 0) break;
                    const lastToken = tokens.at(-1);
                    if (lastToken?.type === 'code') break;
                    else if (lastToken?.type === 'blockquote') {
                        // include continuation in nested blockquote
                        const oldToken = lastToken;
                        const newText = oldToken.raw + '\n' + lines.join('\n');
                        const newToken = this.blockquote(newText);
                        tokens[tokens.length - 1] = newToken;
                        raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
                        text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
                        break;
                    } else if (lastToken?.type === 'list') {
                        // include continuation in nested list
                        const oldToken = lastToken;
                        const newText = oldToken.raw + '\n' + lines.join('\n');
                        const newToken = this.list(newText);
                        tokens[tokens.length - 1] = newToken;
                        raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
                        text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
                        lines = newText.substring(tokens.at(-1).raw.length).split('\n');
                        continue;
                    }
                }
                return {
                    type: 'blockquote',
                    raw,
                    tokens,
                    text
                };
            }
        }
        list(src) {
            let cap = this.rules.block.list.exec(src);
            if (cap) {
                let bull = cap[1].trim();
                const isordered = bull.length > 1;
                const list = {
                    type: 'list',
                    raw: '',
                    ordered: isordered,
                    start: isordered ? +bull.slice(0, -1) : '',
                    loose: false,
                    items: []
                };
                bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
                if (this.options.pedantic) bull = isordered ? bull : '[*+-]';
                // Get next list item
                const itemRegex = this.rules.other.listItemRegex(bull);
                let endsWithBlankLine = false;
                // Check if current bullet point can start a new List Item
                while(src){
                    let endEarly = false;
                    let raw = '';
                    let itemContents = '';
                    if (!(cap = itemRegex.exec(src))) break;
                    if (this.rules.block.hr.test(src)) break;
                    raw = cap[0];
                    src = src.substring(raw.length);
                    let line = cap[2].split('\n', 1)[0].replace(this.rules.other.listReplaceTabs, (t)=>' '.repeat(3 * t.length));
                    let nextLine = src.split('\n', 1)[0];
                    let blankLine = !line.trim();
                    let indent = 0;
                    if (this.options.pedantic) {
                        indent = 2;
                        itemContents = line.trimStart();
                    } else if (blankLine) indent = cap[1].length + 1;
                    else {
                        indent = cap[2].search(this.rules.other.nonSpaceChar); // Find first non-space char
                        indent = indent > 4 ? 1 : indent; // Treat indented code blocks (> 4 spaces) as having only 1 indent
                        itemContents = line.slice(indent);
                        indent += cap[1].length;
                    }
                    if (blankLine && this.rules.other.blankLine.test(nextLine)) {
                        raw += nextLine + '\n';
                        src = src.substring(nextLine.length + 1);
                        endEarly = true;
                    }
                    if (!endEarly) {
                        const nextBulletRegex = this.rules.other.nextBulletRegex(indent);
                        const hrRegex = this.rules.other.hrRegex(indent);
                        const fencesBeginRegex = this.rules.other.fencesBeginRegex(indent);
                        const headingBeginRegex = this.rules.other.headingBeginRegex(indent);
                        const htmlBeginRegex = this.rules.other.htmlBeginRegex(indent);
                        // Check if following lines should be included in List Item
                        while(src){
                            const rawLine = src.split('\n', 1)[0];
                            let nextLineWithoutTabs;
                            nextLine = rawLine;
                            // Re-align to follow commonmark nesting rules
                            if (this.options.pedantic) {
                                nextLine = nextLine.replace(this.rules.other.listReplaceNesting, '  ');
                                nextLineWithoutTabs = nextLine;
                            } else nextLineWithoutTabs = nextLine.replace(this.rules.other.tabCharGlobal, '    ');
                            // End list item if found code fences
                            if (fencesBeginRegex.test(nextLine)) break;
                            // End list item if found start of new heading
                            if (headingBeginRegex.test(nextLine)) break;
                            // End list item if found start of html block
                            if (htmlBeginRegex.test(nextLine)) break;
                            // End list item if found start of new bullet
                            if (nextBulletRegex.test(nextLine)) break;
                            // Horizontal rule found
                            if (hrRegex.test(nextLine)) break;
                            if (nextLineWithoutTabs.search(this.rules.other.nonSpaceChar) >= indent || !nextLine.trim()) itemContents += '\n' + nextLineWithoutTabs.slice(indent);
                            else {
                                // not enough indentation
                                if (blankLine) break;
                                // paragraph continuation unless last line was a different block level element
                                if (line.replace(this.rules.other.tabCharGlobal, '    ').search(this.rules.other.nonSpaceChar) >= 4) break;
                                if (fencesBeginRegex.test(line)) break;
                                if (headingBeginRegex.test(line)) break;
                                if (hrRegex.test(line)) break;
                                itemContents += '\n' + nextLine;
                            }
                            if (!blankLine && !nextLine.trim()) blankLine = true;
                            raw += rawLine + '\n';
                            src = src.substring(rawLine.length + 1);
                            line = nextLineWithoutTabs.slice(indent);
                        }
                    }
                    if (!list.loose) {
                        // If the previous item ended with a blank line, the list is loose
                        if (endsWithBlankLine) list.loose = true;
                        else if (this.rules.other.doubleBlankLine.test(raw)) endsWithBlankLine = true;
                    }
                    let istask = null;
                    let ischecked;
                    // Check for task list items
                    if (this.options.gfm) {
                        istask = this.rules.other.listIsTask.exec(itemContents);
                        if (istask) {
                            ischecked = istask[0] !== '[ ] ';
                            itemContents = itemContents.replace(this.rules.other.listReplaceTask, '');
                        }
                    }
                    list.items.push({
                        type: 'list_item',
                        raw,
                        task: !!istask,
                        checked: ischecked,
                        loose: false,
                        text: itemContents,
                        tokens: []
                    });
                    list.raw += raw;
                }
                // Do not consume newlines at end of final item. Alternatively, make itemRegex *start* with any newlines to simplify/speed up endsWithBlankLine logic
                const lastItem = list.items.at(-1);
                if (lastItem) {
                    lastItem.raw = lastItem.raw.trimEnd();
                    lastItem.text = lastItem.text.trimEnd();
                } else // not a list since there were no items
                return;
                list.raw = list.raw.trimEnd();
                // Item child tokens handled here at end because we needed to have the final item to trim it first
                for(let i = 0; i < list.items.length; i++){
                    this.lexer.state.top = false;
                    list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
                    if (!list.loose) {
                        // Check if list should be loose
                        const spacers = list.items[i].tokens.filter((t)=>t.type === 'space');
                        const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t)=>this.rules.other.anyLine.test(t.raw));
                        list.loose = hasMultipleLineBreaks;
                    }
                }
                // Set all items to loose if list is loose
                if (list.loose) for(let i = 0; i < list.items.length; i++)list.items[i].loose = true;
                return list;
            }
        }
        html(src) {
            const cap = this.rules.block.html.exec(src);
            if (cap) {
                const token = {
                    type: 'html',
                    block: true,
                    raw: cap[0],
                    pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
                    text: cap[0]
                };
                return token;
            }
        }
        def(src) {
            const cap = this.rules.block.def.exec(src);
            if (cap) {
                const tag = cap[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, ' ');
                const href = cap[2] ? cap[2].replace(this.rules.other.hrefBrackets, '$1').replace(this.rules.inline.anyPunctuation, '$1') : '';
                const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, '$1') : cap[3];
                return {
                    type: 'def',
                    tag,
                    raw: cap[0],
                    href,
                    title
                };
            }
        }
        table(src) {
            const cap = this.rules.block.table.exec(src);
            if (!cap) return;
            if (!this.rules.other.tableDelimiter.test(cap[2])) // delimiter row must have a pipe (|) or colon (:) otherwise it is a setext heading
            return;
            const headers = splitCells(cap[1]);
            const aligns = cap[2].replace(this.rules.other.tableAlignChars, '').split('|');
            const rows = cap[3]?.trim() ? cap[3].replace(this.rules.other.tableRowBlankLine, '').split('\n') : [];
            const item = {
                type: 'table',
                raw: cap[0],
                header: [],
                align: [],
                rows: []
            };
            if (headers.length !== aligns.length) // header and align columns must be equal, rows can be different.
            return;
            for (const align of aligns){
                if (this.rules.other.tableAlignRight.test(align)) item.align.push('right');
                else if (this.rules.other.tableAlignCenter.test(align)) item.align.push('center');
                else if (this.rules.other.tableAlignLeft.test(align)) item.align.push('left');
                else item.align.push(null);
            }
            for(let i = 0; i < headers.length; i++)item.header.push({
                text: headers[i],
                tokens: this.lexer.inline(headers[i]),
                header: true,
                align: item.align[i]
            });
            for (const row of rows)item.rows.push(splitCells(row, item.header.length).map((cell, i)=>{
                return {
                    text: cell,
                    tokens: this.lexer.inline(cell),
                    header: false,
                    align: item.align[i]
                };
            }));
            return item;
        }
        lheading(src) {
            const cap = this.rules.block.lheading.exec(src);
            if (cap) return {
                type: 'heading',
                raw: cap[0],
                depth: cap[2].charAt(0) === '=' ? 1 : 2,
                text: cap[1],
                tokens: this.lexer.inline(cap[1])
            };
        }
        paragraph(src) {
            const cap = this.rules.block.paragraph.exec(src);
            if (cap) {
                const text = cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1];
                return {
                    type: 'paragraph',
                    raw: cap[0],
                    text,
                    tokens: this.lexer.inline(text)
                };
            }
        }
        text(src) {
            const cap = this.rules.block.text.exec(src);
            if (cap) return {
                type: 'text',
                raw: cap[0],
                text: cap[0],
                tokens: this.lexer.inline(cap[0])
            };
        }
        escape(src) {
            const cap = this.rules.inline.escape.exec(src);
            if (cap) return {
                type: 'escape',
                raw: cap[0],
                text: cap[1]
            };
        }
        tag(src) {
            const cap = this.rules.inline.tag.exec(src);
            if (cap) {
                if (!this.lexer.state.inLink && this.rules.other.startATag.test(cap[0])) this.lexer.state.inLink = true;
                else if (this.lexer.state.inLink && this.rules.other.endATag.test(cap[0])) this.lexer.state.inLink = false;
                if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(cap[0])) this.lexer.state.inRawBlock = true;
                else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(cap[0])) this.lexer.state.inRawBlock = false;
                return {
                    type: 'html',
                    raw: cap[0],
                    inLink: this.lexer.state.inLink,
                    inRawBlock: this.lexer.state.inRawBlock,
                    block: false,
                    text: cap[0]
                };
            }
        }
        link(src) {
            const cap = this.rules.inline.link.exec(src);
            if (cap) {
                const trimmedUrl = cap[2].trim();
                if (!this.options.pedantic && this.rules.other.startAngleBracket.test(trimmedUrl)) {
                    // commonmark requires matching angle brackets
                    if (!this.rules.other.endAngleBracket.test(trimmedUrl)) return;
                    // ending angle bracket cannot be escaped
                    const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), '\\');
                    if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) return;
                } else {
                    // find closing parenthesis
                    const lastParenIndex = findClosingBracket(cap[2], '()');
                    if (lastParenIndex === -2) // more open parens than closed
                    return;
                    if (lastParenIndex > -1) {
                        const start = cap[0].indexOf('!') === 0 ? 5 : 4;
                        const linkLen = start + cap[1].length + lastParenIndex;
                        cap[2] = cap[2].substring(0, lastParenIndex);
                        cap[0] = cap[0].substring(0, linkLen).trim();
                        cap[3] = '';
                    }
                }
                let href = cap[2];
                let title = '';
                if (this.options.pedantic) {
                    // split pedantic href and title
                    const link = this.rules.other.pedanticHrefTitle.exec(href);
                    if (link) {
                        href = link[1];
                        title = link[3];
                    }
                } else title = cap[3] ? cap[3].slice(1, -1) : '';
                href = href.trim();
                if (this.rules.other.startAngleBracket.test(href)) {
                    if (this.options.pedantic && !this.rules.other.endAngleBracket.test(trimmedUrl)) // pedantic allows starting angle bracket without ending angle bracket
                    href = href.slice(1);
                    else href = href.slice(1, -1);
                }
                return outputLink(cap, {
                    href: href ? href.replace(this.rules.inline.anyPunctuation, '$1') : href,
                    title: title ? title.replace(this.rules.inline.anyPunctuation, '$1') : title
                }, cap[0], this.lexer, this.rules);
            }
        }
        reflink(src, links) {
            let cap;
            if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
                const linkString = (cap[2] || cap[1]).replace(this.rules.other.multipleSpaceGlobal, ' ');
                const link = links[linkString.toLowerCase()];
                if (!link) {
                    const text = cap[0].charAt(0);
                    return {
                        type: 'text',
                        raw: text,
                        text
                    };
                }
                return outputLink(cap, link, cap[0], this.lexer, this.rules);
            }
        }
        emStrong(src, maskedSrc, prevChar = '') {
            let match = this.rules.inline.emStrongLDelim.exec(src);
            if (!match) return;
            // _ can't be between two alphanumerics. \p{L}\p{N} includes non-english alphabet/numbers as well
            if (match[3] && prevChar.match(this.rules.other.unicodeAlphaNumeric)) return;
            const nextChar = match[1] || match[2] || '';
            if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
                // unicode Regex counts emoji as 1 char; spread into array for proper count (used multiple times below)
                const lLength = [
                    ...match[0]
                ].length - 1;
                let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
                const endReg = match[0][0] === '*' ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
                endReg.lastIndex = 0;
                // Clip maskedSrc to same section of string as src (move to lexer?)
                maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
                while((match = endReg.exec(maskedSrc)) != null){
                    rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
                    if (!rDelim) continue; // skip single * in __abc*abc__
                    rLength = [
                        ...rDelim
                    ].length;
                    if (match[3] || match[4]) {
                        delimTotal += rLength;
                        continue;
                    } else if (match[5] || match[6]) {
                        if (lLength % 3 && !((lLength + rLength) % 3)) {
                            midDelimTotal += rLength;
                            continue; // CommonMark Emphasis Rules 9-10
                        }
                    }
                    delimTotal -= rLength;
                    if (delimTotal > 0) continue; // Haven't found enough closing delimiters
                    // Remove extra characters. *a*** -> *a*
                    rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
                    // char length can be >1 for unicode characters;
                    const lastCharLength = [
                        ...match[0]
                    ][0].length;
                    const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
                    // Create `em` if smallest delimiter has odd char count. *a***
                    if (Math.min(lLength, rLength) % 2) {
                        const text = raw.slice(1, -1);
                        return {
                            type: 'em',
                            raw,
                            text,
                            tokens: this.lexer.inlineTokens(text)
                        };
                    }
                    // Create 'strong' if smallest delimiter has even char count. **a***
                    const text = raw.slice(2, -2);
                    return {
                        type: 'strong',
                        raw,
                        text,
                        tokens: this.lexer.inlineTokens(text)
                    };
                }
            }
        }
        codespan(src) {
            const cap = this.rules.inline.code.exec(src);
            if (cap) {
                let text = cap[2].replace(this.rules.other.newLineCharGlobal, ' ');
                const hasNonSpaceChars = this.rules.other.nonSpaceChar.test(text);
                const hasSpaceCharsOnBothEnds = this.rules.other.startingSpaceChar.test(text) && this.rules.other.endingSpaceChar.test(text);
                if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) text = text.substring(1, text.length - 1);
                return {
                    type: 'codespan',
                    raw: cap[0],
                    text
                };
            }
        }
        br(src) {
            const cap = this.rules.inline.br.exec(src);
            if (cap) return {
                type: 'br',
                raw: cap[0]
            };
        }
        del(src) {
            const cap = this.rules.inline.del.exec(src);
            if (cap) return {
                type: 'del',
                raw: cap[0],
                text: cap[2],
                tokens: this.lexer.inlineTokens(cap[2])
            };
        }
        autolink(src) {
            const cap = this.rules.inline.autolink.exec(src);
            if (cap) {
                let text, href;
                if (cap[2] === '@') {
                    text = cap[1];
                    href = 'mailto:' + text;
                } else {
                    text = cap[1];
                    href = text;
                }
                return {
                    type: 'link',
                    raw: cap[0],
                    text,
                    href,
                    tokens: [
                        {
                            type: 'text',
                            raw: text,
                            text
                        }
                    ]
                };
            }
        }
        url(src) {
            let cap;
            if (cap = this.rules.inline.url.exec(src)) {
                let text, href;
                if (cap[2] === '@') {
                    text = cap[0];
                    href = 'mailto:' + text;
                } else {
                    // do extended autolink path validation
                    let prevCapZero;
                    do {
                        prevCapZero = cap[0];
                        cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? '';
                    }while (prevCapZero !== cap[0]);
                    text = cap[0];
                    if (cap[1] === 'www.') href = 'http://' + cap[0];
                    else href = cap[0];
                }
                return {
                    type: 'link',
                    raw: cap[0],
                    text,
                    href,
                    tokens: [
                        {
                            type: 'text',
                            raw: text,
                            text
                        }
                    ]
                };
            }
        }
        inlineText(src) {
            const cap = this.rules.inline.text.exec(src);
            if (cap) {
                const escaped = this.lexer.state.inRawBlock;
                return {
                    type: 'text',
                    raw: cap[0],
                    text: cap[0],
                    escaped
                };
            }
        }
    }
    /**
     * Block Lexer
     */ class _Lexer {
        tokens;
        options;
        state;
        tokenizer;
        inlineQueue;
        constructor(options){
            // TokenList cannot be created in one go
            this.tokens = [];
            this.tokens.links = Object.create(null);
            this.options = options || exports1.defaults;
            this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
            this.tokenizer = this.options.tokenizer;
            this.tokenizer.options = this.options;
            this.tokenizer.lexer = this;
            this.inlineQueue = [];
            this.state = {
                inLink: false,
                inRawBlock: false,
                top: true
            };
            const rules = {
                other,
                block: block.normal,
                inline: inline.normal
            };
            if (this.options.pedantic) {
                rules.block = block.pedantic;
                rules.inline = inline.pedantic;
            } else if (this.options.gfm) {
                rules.block = block.gfm;
                if (this.options.breaks) rules.inline = inline.breaks;
                else rules.inline = inline.gfm;
            }
            this.tokenizer.rules = rules;
        }
        /**
         * Expose Rules
         */ static get rules() {
            return {
                block,
                inline
            };
        }
        /**
         * Static Lex Method
         */ static lex(src, options) {
            const lexer = new _Lexer(options);
            return lexer.lex(src);
        }
        /**
         * Static Lex Inline Method
         */ static lexInline(src, options) {
            const lexer = new _Lexer(options);
            return lexer.inlineTokens(src);
        }
        /**
         * Preprocessing
         */ lex(src) {
            src = src.replace(other.carriageReturn, '\n');
            this.blockTokens(src, this.tokens);
            for(let i = 0; i < this.inlineQueue.length; i++){
                const next = this.inlineQueue[i];
                this.inlineTokens(next.src, next.tokens);
            }
            this.inlineQueue = [];
            return this.tokens;
        }
        blockTokens(src, tokens = [], lastParagraphClipped = false) {
            if (this.options.pedantic) src = src.replace(other.tabCharGlobal, '    ').replace(other.spaceLine, '');
            while(src){
                let token;
                if (this.options.extensions?.block?.some((extTokenizer)=>{
                    if (token = extTokenizer.call({
                        lexer: this
                    }, src, tokens)) {
                        src = src.substring(token.raw.length);
                        tokens.push(token);
                        return true;
                    }
                    return false;
                })) continue;
                // newline
                if (token = this.tokenizer.space(src)) {
                    src = src.substring(token.raw.length);
                    const lastToken = tokens.at(-1);
                    if (token.raw.length === 1 && lastToken !== undefined) // if there's a single \n as a spacer, it's terminating the last line,
                    // so move it there so that we don't get unnecessary paragraph tags
                    lastToken.raw += '\n';
                    else tokens.push(token);
                    continue;
                }
                // code
                if (token = this.tokenizer.code(src)) {
                    src = src.substring(token.raw.length);
                    const lastToken = tokens.at(-1);
                    // An indented code block cannot interrupt a paragraph.
                    if (lastToken?.type === 'paragraph' || lastToken?.type === 'text') {
                        lastToken.raw += '\n' + token.raw;
                        lastToken.text += '\n' + token.text;
                        this.inlineQueue.at(-1).src = lastToken.text;
                    } else tokens.push(token);
                    continue;
                }
                // fences
                if (token = this.tokenizer.fences(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // heading
                if (token = this.tokenizer.heading(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // hr
                if (token = this.tokenizer.hr(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // blockquote
                if (token = this.tokenizer.blockquote(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // list
                if (token = this.tokenizer.list(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // html
                if (token = this.tokenizer.html(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // def
                if (token = this.tokenizer.def(src)) {
                    src = src.substring(token.raw.length);
                    const lastToken = tokens.at(-1);
                    if (lastToken?.type === 'paragraph' || lastToken?.type === 'text') {
                        lastToken.raw += '\n' + token.raw;
                        lastToken.text += '\n' + token.raw;
                        this.inlineQueue.at(-1).src = lastToken.text;
                    } else if (!this.tokens.links[token.tag]) this.tokens.links[token.tag] = {
                        href: token.href,
                        title: token.title
                    };
                    continue;
                }
                // table (gfm)
                if (token = this.tokenizer.table(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // lheading
                if (token = this.tokenizer.lheading(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // top-level paragraph
                // prevent paragraph consuming extensions by clipping 'src' to extension start
                let cutSrc = src;
                if (this.options.extensions?.startBlock) {
                    let startIndex = Infinity;
                    const tempSrc = src.slice(1);
                    let tempStart;
                    this.options.extensions.startBlock.forEach((getStartIndex)=>{
                        tempStart = getStartIndex.call({
                            lexer: this
                        }, tempSrc);
                        if (typeof tempStart === 'number' && tempStart >= 0) startIndex = Math.min(startIndex, tempStart);
                    });
                    if (startIndex < Infinity && startIndex >= 0) cutSrc = src.substring(0, startIndex + 1);
                }
                if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
                    const lastToken = tokens.at(-1);
                    if (lastParagraphClipped && lastToken?.type === 'paragraph') {
                        lastToken.raw += '\n' + token.raw;
                        lastToken.text += '\n' + token.text;
                        this.inlineQueue.pop();
                        this.inlineQueue.at(-1).src = lastToken.text;
                    } else tokens.push(token);
                    lastParagraphClipped = cutSrc.length !== src.length;
                    src = src.substring(token.raw.length);
                    continue;
                }
                // text
                if (token = this.tokenizer.text(src)) {
                    src = src.substring(token.raw.length);
                    const lastToken = tokens.at(-1);
                    if (lastToken?.type === 'text') {
                        lastToken.raw += '\n' + token.raw;
                        lastToken.text += '\n' + token.text;
                        this.inlineQueue.pop();
                        this.inlineQueue.at(-1).src = lastToken.text;
                    } else tokens.push(token);
                    continue;
                }
                if (src) {
                    const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(errMsg);
                        break;
                    } else throw new Error(errMsg);
                }
            }
            this.state.top = true;
            return tokens;
        }
        inline(src, tokens = []) {
            this.inlineQueue.push({
                src,
                tokens
            });
            return tokens;
        }
        /**
         * Lexing/Compiling
         */ inlineTokens(src, tokens = []) {
            // String with links masked to avoid interference with em and strong
            let maskedSrc = src;
            let match = null;
            // Mask out reflinks
            if (this.tokens.links) {
                const links = Object.keys(this.tokens.links);
                if (links.length > 0) {
                    while((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null)if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
                }
            }
            // Mask out escaped characters
            while((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null)maskedSrc = maskedSrc.slice(0, match.index) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
            // Mask out other blocks
            while((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null)maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            let keepPrevChar = false;
            let prevChar = '';
            while(src){
                if (!keepPrevChar) prevChar = '';
                keepPrevChar = false;
                let token;
                // extensions
                if (this.options.extensions?.inline?.some((extTokenizer)=>{
                    if (token = extTokenizer.call({
                        lexer: this
                    }, src, tokens)) {
                        src = src.substring(token.raw.length);
                        tokens.push(token);
                        return true;
                    }
                    return false;
                })) continue;
                // escape
                if (token = this.tokenizer.escape(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // tag
                if (token = this.tokenizer.tag(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // link
                if (token = this.tokenizer.link(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // reflink, nolink
                if (token = this.tokenizer.reflink(src, this.tokens.links)) {
                    src = src.substring(token.raw.length);
                    const lastToken = tokens.at(-1);
                    if (token.type === 'text' && lastToken?.type === 'text') {
                        lastToken.raw += token.raw;
                        lastToken.text += token.text;
                    } else tokens.push(token);
                    continue;
                }
                // em & strong
                if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // code
                if (token = this.tokenizer.codespan(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // br
                if (token = this.tokenizer.br(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // del (gfm)
                if (token = this.tokenizer.del(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // autolink
                if (token = this.tokenizer.autolink(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // url (gfm)
                if (!this.state.inLink && (token = this.tokenizer.url(src))) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // text
                // prevent inlineText consuming extensions by clipping 'src' to extension start
                let cutSrc = src;
                if (this.options.extensions?.startInline) {
                    let startIndex = Infinity;
                    const tempSrc = src.slice(1);
                    let tempStart;
                    this.options.extensions.startInline.forEach((getStartIndex)=>{
                        tempStart = getStartIndex.call({
                            lexer: this
                        }, tempSrc);
                        if (typeof tempStart === 'number' && tempStart >= 0) startIndex = Math.min(startIndex, tempStart);
                    });
                    if (startIndex < Infinity && startIndex >= 0) cutSrc = src.substring(0, startIndex + 1);
                }
                if (token = this.tokenizer.inlineText(cutSrc)) {
                    src = src.substring(token.raw.length);
                    if (token.raw.slice(-1) !== '_') prevChar = token.raw.slice(-1);
                    keepPrevChar = true;
                    const lastToken = tokens.at(-1);
                    if (lastToken?.type === 'text') {
                        lastToken.raw += token.raw;
                        lastToken.text += token.text;
                    } else tokens.push(token);
                    continue;
                }
                if (src) {
                    const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(errMsg);
                        break;
                    } else throw new Error(errMsg);
                }
            }
            return tokens;
        }
    }
    /**
     * Renderer
     */ class _Renderer {
        options;
        parser;
        constructor(options){
            this.options = options || exports1.defaults;
        }
        space(token) {
            return '';
        }
        code({ text, lang, escaped }) {
            const langString = (lang || '').match(other.notSpaceStart)?.[0];
            const code = text.replace(other.endingNewline, '') + '\n';
            if (!langString) return '<pre><code>' + (escaped ? code : escape(code, true)) + '</code></pre>\n';
            return '<pre><code class="language-' + escape(langString) + '">' + (escaped ? code : escape(code, true)) + '</code></pre>\n';
        }
        blockquote({ tokens }) {
            const body = this.parser.parse(tokens);
            return `<blockquote>\n${body}</blockquote>\n`;
        }
        html({ text }) {
            return text;
        }
        heading({ tokens, depth }) {
            return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>\n`;
        }
        hr(token) {
            return '<hr>\n';
        }
        list(token) {
            const ordered = token.ordered;
            const start = token.start;
            let body = '';
            for(let j = 0; j < token.items.length; j++){
                const item = token.items[j];
                body += this.listitem(item);
            }
            const type = ordered ? 'ol' : 'ul';
            const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : '';
            return '<' + type + startAttr + '>\n' + body + '</' + type + '>\n';
        }
        listitem(item) {
            let itemBody = '';
            if (item.task) {
                const checkbox = this.checkbox({
                    checked: !!item.checked
                });
                if (item.loose) {
                    if (item.tokens[0]?.type === 'paragraph') {
                        item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                        if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                            item.tokens[0].tokens[0].text = checkbox + ' ' + escape(item.tokens[0].tokens[0].text);
                            item.tokens[0].tokens[0].escaped = true;
                        }
                    } else item.tokens.unshift({
                        type: 'text',
                        raw: checkbox + ' ',
                        text: checkbox + ' ',
                        escaped: true
                    });
                } else itemBody += checkbox + ' ';
            }
            itemBody += this.parser.parse(item.tokens, !!item.loose);
            return `<li>${itemBody}</li>\n`;
        }
        checkbox({ checked }) {
            return '<input ' + (checked ? 'checked="" ' : '') + 'disabled="" type="checkbox">';
        }
        paragraph({ tokens }) {
            return `<p>${this.parser.parseInline(tokens)}</p>\n`;
        }
        table(token) {
            let header = '';
            // header
            let cell = '';
            for(let j = 0; j < token.header.length; j++)cell += this.tablecell(token.header[j]);
            header += this.tablerow({
                text: cell
            });
            let body = '';
            for(let j = 0; j < token.rows.length; j++){
                const row = token.rows[j];
                cell = '';
                for(let k = 0; k < row.length; k++)cell += this.tablecell(row[k]);
                body += this.tablerow({
                    text: cell
                });
            }
            if (body) body = `<tbody>${body}</tbody>`;
            return "<table>\n<thead>\n" + header + '</thead>\n' + body + '</table>\n';
        }
        tablerow({ text }) {
            return `<tr>\n${text}</tr>\n`;
        }
        tablecell(token) {
            const content = this.parser.parseInline(token.tokens);
            const type = token.header ? 'th' : 'td';
            const tag = token.align ? `<${type} align="${token.align}">` : `<${type}>`;
            return tag + content + `</${type}>\n`;
        }
        /**
         * span level renderer
         */ strong({ tokens }) {
            return `<strong>${this.parser.parseInline(tokens)}</strong>`;
        }
        em({ tokens }) {
            return `<em>${this.parser.parseInline(tokens)}</em>`;
        }
        codespan({ text }) {
            return `<code>${escape(text, true)}</code>`;
        }
        br(token) {
            return '<br>';
        }
        del({ tokens }) {
            return `<del>${this.parser.parseInline(tokens)}</del>`;
        }
        link({ href, title, tokens }) {
            const text = this.parser.parseInline(tokens);
            const cleanHref = cleanUrl(href);
            if (cleanHref === null) return text;
            href = cleanHref;
            let out = '<a href="' + href + '"';
            if (title) out += ' title="' + escape(title) + '"';
            out += '>' + text + '</a>';
            return out;
        }
        image({ href, title, text, tokens }) {
            if (tokens) text = this.parser.parseInline(tokens, this.parser.textRenderer);
            const cleanHref = cleanUrl(href);
            if (cleanHref === null) return escape(text);
            href = cleanHref;
            let out = `<img src="${href}" alt="${text}"`;
            if (title) out += ` title="${escape(title)}"`;
            out += '>';
            return out;
        }
        text(token) {
            return 'tokens' in token && token.tokens ? this.parser.parseInline(token.tokens) : 'escaped' in token && token.escaped ? token.text : escape(token.text);
        }
    }
    /**
     * TextRenderer
     * returns only the textual part of the token
     */ class _TextRenderer {
        // no need for block level renderers
        strong({ text }) {
            return text;
        }
        em({ text }) {
            return text;
        }
        codespan({ text }) {
            return text;
        }
        del({ text }) {
            return text;
        }
        html({ text }) {
            return text;
        }
        text({ text }) {
            return text;
        }
        link({ text }) {
            return '' + text;
        }
        image({ text }) {
            return '' + text;
        }
        br() {
            return '';
        }
    }
    /**
     * Parsing & Compiling
     */ class _Parser {
        options;
        renderer;
        textRenderer;
        constructor(options){
            this.options = options || exports1.defaults;
            this.options.renderer = this.options.renderer || new _Renderer();
            this.renderer = this.options.renderer;
            this.renderer.options = this.options;
            this.renderer.parser = this;
            this.textRenderer = new _TextRenderer();
        }
        /**
         * Static Parse Method
         */ static parse(tokens, options) {
            const parser = new _Parser(options);
            return parser.parse(tokens);
        }
        /**
         * Static Parse Inline Method
         */ static parseInline(tokens, options) {
            const parser = new _Parser(options);
            return parser.parseInline(tokens);
        }
        /**
         * Parse Loop
         */ parse(tokens, top = true) {
            let out = '';
            for(let i = 0; i < tokens.length; i++){
                const anyToken = tokens[i];
                // Run any renderer extensions
                if (this.options.extensions?.renderers?.[anyToken.type]) {
                    const genericToken = anyToken;
                    const ret = this.options.extensions.renderers[genericToken.type].call({
                        parser: this
                    }, genericToken);
                    if (ret !== false || ![
                        'space',
                        'hr',
                        'heading',
                        'code',
                        'table',
                        'blockquote',
                        'list',
                        'html',
                        'paragraph',
                        'text'
                    ].includes(genericToken.type)) {
                        out += ret || '';
                        continue;
                    }
                }
                const token = anyToken;
                switch(token.type){
                    case 'space':
                        out += this.renderer.space(token);
                        continue;
                    case 'hr':
                        out += this.renderer.hr(token);
                        continue;
                    case 'heading':
                        out += this.renderer.heading(token);
                        continue;
                    case 'code':
                        out += this.renderer.code(token);
                        continue;
                    case 'table':
                        out += this.renderer.table(token);
                        continue;
                    case 'blockquote':
                        out += this.renderer.blockquote(token);
                        continue;
                    case 'list':
                        out += this.renderer.list(token);
                        continue;
                    case 'html':
                        out += this.renderer.html(token);
                        continue;
                    case 'paragraph':
                        out += this.renderer.paragraph(token);
                        continue;
                    case 'text':
                        {
                            let textToken = token;
                            let body = this.renderer.text(textToken);
                            while(i + 1 < tokens.length && tokens[i + 1].type === 'text'){
                                textToken = tokens[++i];
                                body += '\n' + this.renderer.text(textToken);
                            }
                            if (top) out += this.renderer.paragraph({
                                type: 'paragraph',
                                raw: body,
                                text: body,
                                tokens: [
                                    {
                                        type: 'text',
                                        raw: body,
                                        text: body,
                                        escaped: true
                                    }
                                ]
                            });
                            else out += body;
                            continue;
                        }
                    default:
                        {
                            const errMsg = 'Token with "' + token.type + '" type was not found.';
                            if (this.options.silent) {
                                console.error(errMsg);
                                return '';
                            } else throw new Error(errMsg);
                        }
                }
            }
            return out;
        }
        /**
         * Parse Inline Tokens
         */ parseInline(tokens, renderer = this.renderer) {
            let out = '';
            for(let i = 0; i < tokens.length; i++){
                const anyToken = tokens[i];
                // Run any renderer extensions
                if (this.options.extensions?.renderers?.[anyToken.type]) {
                    const ret = this.options.extensions.renderers[anyToken.type].call({
                        parser: this
                    }, anyToken);
                    if (ret !== false || ![
                        'escape',
                        'html',
                        'link',
                        'image',
                        'strong',
                        'em',
                        'codespan',
                        'br',
                        'del',
                        'text'
                    ].includes(anyToken.type)) {
                        out += ret || '';
                        continue;
                    }
                }
                const token = anyToken;
                switch(token.type){
                    case 'escape':
                        out += renderer.text(token);
                        break;
                    case 'html':
                        out += renderer.html(token);
                        break;
                    case 'link':
                        out += renderer.link(token);
                        break;
                    case 'image':
                        out += renderer.image(token);
                        break;
                    case 'strong':
                        out += renderer.strong(token);
                        break;
                    case 'em':
                        out += renderer.em(token);
                        break;
                    case 'codespan':
                        out += renderer.codespan(token);
                        break;
                    case 'br':
                        out += renderer.br(token);
                        break;
                    case 'del':
                        out += renderer.del(token);
                        break;
                    case 'text':
                        out += renderer.text(token);
                        break;
                    default:
                        {
                            const errMsg = 'Token with "' + token.type + '" type was not found.';
                            if (this.options.silent) {
                                console.error(errMsg);
                                return '';
                            } else throw new Error(errMsg);
                        }
                }
            }
            return out;
        }
    }
    class _Hooks {
        options;
        block;
        constructor(options){
            this.options = options || exports1.defaults;
        }
        static passThroughHooks = new Set([
            'preprocess',
            'postprocess',
            'processAllTokens'
        ]);
        /**
         * Process markdown before marked
         */ preprocess(markdown) {
            return markdown;
        }
        /**
         * Process HTML after marked is finished
         */ postprocess(html) {
            return html;
        }
        /**
         * Process all tokens before walk tokens
         */ processAllTokens(tokens) {
            return tokens;
        }
        /**
         * Provide function to tokenize markdown
         */ provideLexer() {
            return this.block ? _Lexer.lex : _Lexer.lexInline;
        }
        /**
         * Provide function to parse tokens
         */ provideParser() {
            return this.block ? _Parser.parse : _Parser.parseInline;
        }
    }
    class Marked {
        defaults = _getDefaults();
        options = this.setOptions;
        parse = this.parseMarkdown(true);
        parseInline = this.parseMarkdown(false);
        Parser = _Parser;
        Renderer = _Renderer;
        TextRenderer = _TextRenderer;
        Lexer = _Lexer;
        Tokenizer = _Tokenizer;
        Hooks = _Hooks;
        constructor(...args){
            this.use(...args);
        }
        /**
         * Run callback for every token
         */ walkTokens(tokens, callback) {
            let values = [];
            for (const token of tokens){
                values = values.concat(callback.call(this, token));
                switch(token.type){
                    case 'table':
                        {
                            const tableToken = token;
                            for (const cell of tableToken.header)values = values.concat(this.walkTokens(cell.tokens, callback));
                            for (const row of tableToken.rows)for (const cell of row)values = values.concat(this.walkTokens(cell.tokens, callback));
                            break;
                        }
                    case 'list':
                        {
                            const listToken = token;
                            values = values.concat(this.walkTokens(listToken.items, callback));
                            break;
                        }
                    default:
                        {
                            const genericToken = token;
                            if (this.defaults.extensions?.childTokens?.[genericToken.type]) this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens)=>{
                                const tokens = genericToken[childTokens].flat(Infinity);
                                values = values.concat(this.walkTokens(tokens, callback));
                            });
                            else if (genericToken.tokens) values = values.concat(this.walkTokens(genericToken.tokens, callback));
                        }
                }
            }
            return values;
        }
        use(...args) {
            const extensions = this.defaults.extensions || {
                renderers: {},
                childTokens: {}
            };
            args.forEach((pack)=>{
                // copy options to new object
                const opts = {
                    ...pack
                };
                // set async to true if it was set to true before
                opts.async = this.defaults.async || opts.async || false;
                // ==-- Parse "addon" extensions --== //
                if (pack.extensions) {
                    pack.extensions.forEach((ext)=>{
                        if (!ext.name) throw new Error('extension name required');
                        if ('renderer' in ext) {
                            const prevRenderer = extensions.renderers[ext.name];
                            if (prevRenderer) // Replace extension with func to run new extension but fall back if false
                            extensions.renderers[ext.name] = function(...args) {
                                let ret = ext.renderer.apply(this, args);
                                if (ret === false) ret = prevRenderer.apply(this, args);
                                return ret;
                            };
                            else extensions.renderers[ext.name] = ext.renderer;
                        }
                        if ('tokenizer' in ext) {
                            if (!ext.level || ext.level !== 'block' && ext.level !== 'inline') throw new Error("extension level must be 'block' or 'inline'");
                            const extLevel = extensions[ext.level];
                            if (extLevel) extLevel.unshift(ext.tokenizer);
                            else extensions[ext.level] = [
                                ext.tokenizer
                            ];
                            if (ext.start) {
                                if (ext.level === 'block') {
                                    if (extensions.startBlock) extensions.startBlock.push(ext.start);
                                    else extensions.startBlock = [
                                        ext.start
                                    ];
                                } else if (ext.level === 'inline') {
                                    if (extensions.startInline) extensions.startInline.push(ext.start);
                                    else extensions.startInline = [
                                        ext.start
                                    ];
                                }
                            }
                        }
                        if ('childTokens' in ext && ext.childTokens) extensions.childTokens[ext.name] = ext.childTokens;
                    });
                    opts.extensions = extensions;
                }
                // ==-- Parse "overwrite" extensions --== //
                if (pack.renderer) {
                    const renderer = this.defaults.renderer || new _Renderer(this.defaults);
                    for(const prop in pack.renderer){
                        if (!(prop in renderer)) throw new Error(`renderer '${prop}' does not exist`);
                        if ([
                            'options',
                            'parser'
                        ].includes(prop)) continue;
                        const rendererProp = prop;
                        const rendererFunc = pack.renderer[rendererProp];
                        const prevRenderer = renderer[rendererProp];
                        // Replace renderer with func to run extension, but fall back if false
                        renderer[rendererProp] = (...args)=>{
                            let ret = rendererFunc.apply(renderer, args);
                            if (ret === false) ret = prevRenderer.apply(renderer, args);
                            return ret || '';
                        };
                    }
                    opts.renderer = renderer;
                }
                if (pack.tokenizer) {
                    const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
                    for(const prop in pack.tokenizer){
                        if (!(prop in tokenizer)) throw new Error(`tokenizer '${prop}' does not exist`);
                        if ([
                            'options',
                            'rules',
                            'lexer'
                        ].includes(prop)) continue;
                        const tokenizerProp = prop;
                        const tokenizerFunc = pack.tokenizer[tokenizerProp];
                        const prevTokenizer = tokenizer[tokenizerProp];
                        // Replace tokenizer with func to run extension, but fall back if false
                        // @ts-expect-error cannot type tokenizer function dynamically
                        tokenizer[tokenizerProp] = (...args)=>{
                            let ret = tokenizerFunc.apply(tokenizer, args);
                            if (ret === false) ret = prevTokenizer.apply(tokenizer, args);
                            return ret;
                        };
                    }
                    opts.tokenizer = tokenizer;
                }
                // ==-- Parse Hooks extensions --== //
                if (pack.hooks) {
                    const hooks = this.defaults.hooks || new _Hooks();
                    for(const prop in pack.hooks){
                        if (!(prop in hooks)) throw new Error(`hook '${prop}' does not exist`);
                        if ([
                            'options',
                            'block'
                        ].includes(prop)) continue;
                        const hooksProp = prop;
                        const hooksFunc = pack.hooks[hooksProp];
                        const prevHook = hooks[hooksProp];
                        if (_Hooks.passThroughHooks.has(prop)) // @ts-expect-error cannot type hook function dynamically
                        hooks[hooksProp] = (arg)=>{
                            if (this.defaults.async) return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret)=>{
                                return prevHook.call(hooks, ret);
                            });
                            const ret = hooksFunc.call(hooks, arg);
                            return prevHook.call(hooks, ret);
                        };
                        else // @ts-expect-error cannot type hook function dynamically
                        hooks[hooksProp] = (...args)=>{
                            let ret = hooksFunc.apply(hooks, args);
                            if (ret === false) ret = prevHook.apply(hooks, args);
                            return ret;
                        };
                    }
                    opts.hooks = hooks;
                }
                // ==-- Parse WalkTokens extensions --== //
                if (pack.walkTokens) {
                    const walkTokens = this.defaults.walkTokens;
                    const packWalktokens = pack.walkTokens;
                    opts.walkTokens = function(token) {
                        let values = [];
                        values.push(packWalktokens.call(this, token));
                        if (walkTokens) values = values.concat(walkTokens.call(this, token));
                        return values;
                    };
                }
                this.defaults = {
                    ...this.defaults,
                    ...opts
                };
            });
            return this;
        }
        setOptions(opt) {
            this.defaults = {
                ...this.defaults,
                ...opt
            };
            return this;
        }
        lexer(src, options) {
            return _Lexer.lex(src, options ?? this.defaults);
        }
        parser(tokens, options) {
            return _Parser.parse(tokens, options ?? this.defaults);
        }
        parseMarkdown(blockType) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const parse = (src, options)=>{
                const origOpt = {
                    ...options
                };
                const opt = {
                    ...this.defaults,
                    ...origOpt
                };
                const throwError = this.onError(!!opt.silent, !!opt.async);
                // throw error if an extension set async to true but parse was called with async: false
                if (this.defaults.async === true && origOpt.async === false) return throwError(new Error('marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.'));
                // throw error in case of non string input
                if (typeof src === 'undefined' || src === null) return throwError(new Error('marked(): input parameter is undefined or null'));
                if (typeof src !== 'string') return throwError(new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected'));
                if (opt.hooks) {
                    opt.hooks.options = opt;
                    opt.hooks.block = blockType;
                }
                const lexer = opt.hooks ? opt.hooks.provideLexer() : blockType ? _Lexer.lex : _Lexer.lexInline;
                const parser = opt.hooks ? opt.hooks.provideParser() : blockType ? _Parser.parse : _Parser.parseInline;
                if (opt.async) return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src)=>lexer(src, opt)).then((tokens)=>opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens)=>opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(()=>tokens) : tokens).then((tokens)=>parser(tokens, opt)).then((html)=>opt.hooks ? opt.hooks.postprocess(html) : html).catch(throwError);
                try {
                    if (opt.hooks) src = opt.hooks.preprocess(src);
                    let tokens = lexer(src, opt);
                    if (opt.hooks) tokens = opt.hooks.processAllTokens(tokens);
                    if (opt.walkTokens) this.walkTokens(tokens, opt.walkTokens);
                    let html = parser(tokens, opt);
                    if (opt.hooks) html = opt.hooks.postprocess(html);
                    return html;
                } catch (e) {
                    return throwError(e);
                }
            };
            return parse;
        }
        onError(silent, async) {
            return (e)=>{
                e.message += '\nPlease report this to https://github.com/markedjs/marked.';
                if (silent) {
                    const msg = '<p>An error occurred:</p><pre>' + escape(e.message + '', true) + '</pre>';
                    if (async) return Promise.resolve(msg);
                    return msg;
                }
                if (async) return Promise.reject(e);
                throw e;
            };
        }
    }
    const markedInstance = new Marked();
    function marked(src, opt) {
        return markedInstance.parse(src, opt);
    }
    /**
     * Sets the default options.
     *
     * @param options Hash of options
     */ marked.options = marked.setOptions = function(options) {
        markedInstance.setOptions(options);
        marked.defaults = markedInstance.defaults;
        changeDefaults(marked.defaults);
        return marked;
    };
    /**
     * Gets the original marked default options.
     */ marked.getDefaults = _getDefaults;
    marked.defaults = exports1.defaults;
    /**
     * Use Extension
     */ marked.use = function(...args) {
        markedInstance.use(...args);
        marked.defaults = markedInstance.defaults;
        changeDefaults(marked.defaults);
        return marked;
    };
    /**
     * Run callback for every token
     */ marked.walkTokens = function(tokens, callback) {
        return markedInstance.walkTokens(tokens, callback);
    };
    /**
     * Compiles markdown to HTML without enclosing `p` tag.
     *
     * @param src String of markdown source to be compiled
     * @param options Hash of options
     * @return String of compiled HTML
     */ marked.parseInline = markedInstance.parseInline;
    /**
     * Expose
     */ marked.Parser = _Parser;
    marked.parser = _Parser.parse;
    marked.Renderer = _Renderer;
    marked.TextRenderer = _TextRenderer;
    marked.Lexer = _Lexer;
    marked.lexer = _Lexer.lex;
    marked.Tokenizer = _Tokenizer;
    marked.Hooks = _Hooks;
    marked.parse = marked;
    const options = marked.options;
    const setOptions = marked.setOptions;
    const use = marked.use;
    const walkTokens = marked.walkTokens;
    const parseInline = marked.parseInline;
    const parse = marked;
    const parser = _Parser.parse;
    const lexer = _Lexer.lex;
    exports1.Hooks = _Hooks;
    exports1.Lexer = _Lexer;
    exports1.Marked = Marked;
    exports1.Parser = _Parser;
    exports1.Renderer = _Renderer;
    exports1.TextRenderer = _TextRenderer;
    exports1.Tokenizer = _Tokenizer;
    exports1.getDefaults = _getDefaults;
    exports1.lexer = lexer;
    exports1.marked = marked;
    exports1.options = options;
    exports1.parse = parse;
    exports1.parseInline = parseInline;
    exports1.parser = parser;
    exports1.setOptions = setOptions;
    exports1.use = use;
    exports1.walkTokens = walkTokens;
});

},{}],"fpXyP":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function e(e, t) {
    for(var o = 0; o < t.length; o++){
        var n = t[o];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
}
function t(e) {
    return function(e) {
        if (Array.isArray(e)) return o(e);
    }(e) || function(e) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
    }(e) || function(e, t) {
        if (!e) return;
        if ("string" == typeof e) return o(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        "Object" === n && e.constructor && (n = e.constructor.name);
        if ("Map" === n || "Set" === n) return Array.from(e);
        if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return o(e, t);
    }(e) || function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
}
function o(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for(var o = 0, n = new Array(t); o < t; o++)n[o] = e[o];
    return n;
}
var n, i, a, r, s, l = (n = [
    "a[href]",
    "area[href]",
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    "select:not([disabled]):not([aria-hidden])",
    "textarea:not([disabled]):not([aria-hidden])",
    "button:not([disabled]):not([aria-hidden])",
    "iframe",
    "object",
    "embed",
    "[contenteditable]",
    '[tabindex]:not([tabindex^="-"])'
], i = function() {
    function o(e) {
        var n = e.targetModal, i = e.triggers, a = void 0 === i ? [] : i, r = e.onShow, s = void 0 === r ? function() {} : r, l = e.onClose, c = void 0 === l ? function() {} : l, d = e.openTrigger, u = void 0 === d ? "data-micromodal-trigger" : d, f = e.closeTrigger, h = void 0 === f ? "data-micromodal-close" : f, v = e.openClass, g = void 0 === v ? "is-open" : v, m = e.disableScroll, b = void 0 !== m && m, y = e.disableFocus, p = void 0 !== y && y, w = e.awaitCloseAnimation, E = void 0 !== w && w, k = e.awaitOpenAnimation, M = void 0 !== k && k, A = e.debugMode, C = void 0 !== A && A;
        !function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, o), this.modal = "string" == typeof n ? document.getElementById(n) : n, this.config = {
            debugMode: C,
            disableScroll: b,
            openTrigger: u,
            closeTrigger: h,
            openClass: g,
            onShow: s,
            onClose: c,
            awaitCloseAnimation: E,
            awaitOpenAnimation: M,
            disableFocus: p
        }, a.length > 0 && this.registerTriggers.apply(this, t(a)), this.onClick = this.onClick.bind(this), this.onKeydown = this.onKeydown.bind(this);
    }
    var i, a, r;
    return i = o, a = [
        {
            key: "registerTriggers",
            value: function() {
                for(var e = this, t = arguments.length, o = new Array(t), n = 0; n < t; n++)o[n] = arguments[n];
                o.filter(Boolean).forEach(function(t) {
                    t.addEventListener("click", function(t) {
                        return e.showModal(t);
                    });
                });
            }
        },
        {
            key: "showModal",
            value: function() {
                var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                if (this.activeElement = document.activeElement, this.modal.setAttribute("aria-hidden", "false"), this.modal.classList.add(this.config.openClass), this.scrollBehaviour("disable"), this.addEventListeners(), this.config.awaitOpenAnimation) {
                    var o = function t() {
                        e.modal.removeEventListener("animationend", t, !1), e.setFocusToFirstNode();
                    };
                    this.modal.addEventListener("animationend", o, !1);
                } else this.setFocusToFirstNode();
                this.config.onShow(this.modal, this.activeElement, t);
            }
        },
        {
            key: "closeModal",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = this.modal;
                if (this.modal.setAttribute("aria-hidden", "true"), this.removeEventListeners(), this.scrollBehaviour("enable"), this.activeElement && this.activeElement.focus && this.activeElement.focus(), this.config.onClose(this.modal, this.activeElement, e), this.config.awaitCloseAnimation) {
                    var o = this.config.openClass;
                    this.modal.addEventListener("animationend", function e() {
                        t.classList.remove(o), t.removeEventListener("animationend", e, !1);
                    }, !1);
                } else t.classList.remove(this.config.openClass);
            }
        },
        {
            key: "closeModalByIdOrElement",
            value: function(e) {
                this.modal = "string" == typeof e ? document.getElementById(e) : e, this.modal && this.closeModal();
            }
        },
        {
            key: "scrollBehaviour",
            value: function(e) {
                if (this.config.disableScroll) {
                    var t = document.querySelector("body");
                    switch(e){
                        case "enable":
                            Object.assign(t.style, {
                                overflow: ""
                            });
                            break;
                        case "disable":
                            Object.assign(t.style, {
                                overflow: "hidden"
                            });
                    }
                }
            }
        },
        {
            key: "addEventListeners",
            value: function() {
                this.modal.addEventListener("touchstart", this.onClick), this.modal.addEventListener("click", this.onClick), document.addEventListener("keydown", this.onKeydown);
            }
        },
        {
            key: "removeEventListeners",
            value: function() {
                this.modal.removeEventListener("touchstart", this.onClick), this.modal.removeEventListener("click", this.onClick), document.removeEventListener("keydown", this.onKeydown);
            }
        },
        {
            key: "onClick",
            value: function(e) {
                (e.target.hasAttribute(this.config.closeTrigger) || e.target.parentNode.hasAttribute(this.config.closeTrigger)) && (e.preventDefault(), e.stopPropagation(), this.closeModal(e));
            }
        },
        {
            key: "onKeydown",
            value: function(e) {
                27 === e.keyCode && this.closeModal(e), 9 === e.keyCode && this.retainFocus(e);
            }
        },
        {
            key: "getFocusableNodes",
            value: function() {
                var e = this.modal.querySelectorAll(n);
                return Array.apply(void 0, t(e));
            }
        },
        {
            key: "setFocusToFirstNode",
            value: function() {
                var e = this;
                if (!this.config.disableFocus) {
                    var t = this.getFocusableNodes();
                    if (0 !== t.length) {
                        var o = t.filter(function(t) {
                            return !t.hasAttribute(e.config.closeTrigger);
                        });
                        o.length > 0 && o[0].focus(), 0 === o.length && t[0].focus();
                    }
                }
            }
        },
        {
            key: "retainFocus",
            value: function(e) {
                var t = this.getFocusableNodes();
                if (0 !== t.length) {
                    if (t = t.filter(function(e) {
                        return null !== e.offsetParent;
                    }), this.modal.contains(document.activeElement)) {
                        var o = t.indexOf(document.activeElement);
                        e.shiftKey && 0 === o && (t[t.length - 1].focus(), e.preventDefault()), !e.shiftKey && t.length > 0 && o === t.length - 1 && (t[0].focus(), e.preventDefault());
                    } else t[0].focus();
                }
            }
        }
    ], e(i.prototype, a), r && e(i, r), o;
}(), a = null, r = function(e) {
    if ("string" == typeof id ? !document.getElementById(e) : !e) return console.warn("MicroModal: \u2757Seems like you have missed %c'".concat(e, "'"), "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "ID somewhere in your code. Refer example below to resolve it."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<div class="modal" id="'.concat(e, '"></div>')), !1;
}, s = function(e, t) {
    if (function(e) {
        e.length <= 0 && (console.warn("MicroModal: \u2757Please specify at least one %c'micromodal-trigger'", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "data attribute."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<a href="#" data-micromodal-trigger="my-modal"></a>'));
    }(e), !t) return !0;
    for(var o in t)r(o);
    return !0;
}, {
    init: function(e) {
        var o = Object.assign({}, {
            openTrigger: "data-micromodal-trigger"
        }, e), n = t(document.querySelectorAll("[".concat(o.openTrigger, "]"))), r = function(e, t) {
            var o = [];
            return e.forEach(function(e) {
                var n = e.attributes[t].value;
                void 0 === o[n] && (o[n] = []), o[n].push(e);
            }), o;
        }(n, o.openTrigger);
        if (!0 !== o.debugMode || !1 !== s(n, r)) for(var l in r){
            var c = r[l];
            o.targetModal = l, o.triggers = t(c), a = new i(o);
        }
    },
    show: function(e, t) {
        var o = t || {};
        o.targetModal = e, !0 === o.debugMode && !1 === r(e) || (a && a.removeEventListeners(), (a = new i(o)).showModal());
    },
    close: function(e) {
        e ? a.closeModalByIdOrElement(e) : a.closeModal();
    }
});
"undefined" != typeof window && (window.MicroModal = l);
exports.default = l;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jkmVr":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 新しい会話セッション、または更新されたセッションを保存する。
 * idbのputは、キーが存在すれば更新、なければ追加を行う。
 * @param {object} sessionData - 保存するセッションデータ
 * @returns {Promise<IDBValidKey>} 保存されたアイテムのキー (sessionId)
 */ parcelHelpers.export(exports, "saveOrUpdateSession", ()=>saveOrUpdateSession);
/**
 * 指定されたIDのセッションを取得する。
 * @param {string} sessionId
 * @returns {Promise<object|undefined>} セッションデータ、または見つからなければ undefined
 */ parcelHelpers.export(exports, "getSession", ()=>getSession);
/**
 * 全てのセッションの概要（ID、タイトル、最終更新日時など）を最終更新日時の降順で取得する。
 * @returns {Promise<Array<object>>} セッション概要の配列
 */ parcelHelpers.export(exports, "getAllSessionSummaries", ()=>getAllSessionSummaries);
/**
 * 指定されたIDのセッションを削除する。
 * @param {string} sessionId
 * @returns {Promise<void>}
 */ parcelHelpers.export(exports, "deleteSession", ()=>deleteSession);
var _idb = require("idb");
const DB_NAME = "ExplAInfyDB";
const DB_VERSION = 1;
const SESSIONS_STORE_NAME = "sessions";
let dbPromise = null;
function getDB() {
    if (!dbPromise) dbPromise = (0, _idb.openDB)(DB_NAME, DB_VERSION, {
        upgrade (db, oldVersion, newVersion, _transaction) {
            console.log(`Upgrading DB from version ${oldVersion} to ${newVersion}`);
            if (!db.objectStoreNames.contains(SESSIONS_STORE_NAME)) {
                const store = db.createObjectStore(SESSIONS_STORE_NAME, {
                    keyPath: "id"
                });
                // 履歴一覧のソート用にインデックスを作成 (例: 最終更新日時)
                store.createIndex("lastUpdatedAt", "lastUpdatedAt");
                console.log(`Object store ${SESSIONS_STORE_NAME} created.`);
            }
        // ここらへんよくわからんけど、スキーマの変更する場合は頑張って
        }
    });
    return dbPromise;
}
async function saveOrUpdateSession(sessionData) {
    if (!sessionData || !sessionData.id) throw new Error("Session data must have an id.");
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
async function getSession(sessionId) {
    const db = await getDB();
    const tx = db.transaction(SESSIONS_STORE_NAME, "readonly");
    const store = tx.objectStore(SESSIONS_STORE_NAME);
    const session = await store.get(sessionId);
    await tx.done;
    return session;
}
async function getAllSessionSummaries() {
    const db = await getDB();
    const tx = db.transaction(SESSIONS_STORE_NAME, "readonly");
    const store = tx.objectStore(SESSIONS_STORE_NAME);
    const index = store.index("lastUpdatedAt"); // インデックスを使用
    const allSessions = await index.getAll(); // lastUpdatedAt でソートされた状態で取得
    allSessions.reverse(); // 降順にする (もしindexが昇順なら)
    return allSessions.map((session)=>({
            // 必要な情報だけを抽出
            id: session.id,
            title: session.originalTitle,
            lastUpdatedAt: session.lastUpdatedAt
        }));
}
async function deleteSession(sessionId) {
    const db = await getDB();
    const tx = db.transaction(SESSIONS_STORE_NAME, "readwrite");
    const store = tx.objectStore(SESSIONS_STORE_NAME);
    await store.delete(sessionId);
    await tx.done;
    console.log("Session deleted:", sessionId);
}

},{"idb":"258QC","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"258QC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "deleteDB", ()=>deleteDB);
parcelHelpers.export(exports, "openDB", ()=>openDB);
parcelHelpers.export(exports, "unwrap", ()=>unwrap);
parcelHelpers.export(exports, "wrap", ()=>wrap);
const instanceOfAny = (object, constructors)=>constructors.some((c)=>object instanceof c);
let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [
        IDBDatabase,
        IDBObjectStore,
        IDBIndex,
        IDBCursor,
        IDBTransaction
    ]);
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
        IDBCursor.prototype.advance,
        IDBCursor.prototype.continue,
        IDBCursor.prototype.continuePrimaryKey
    ]);
}
const transactionDoneMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject)=>{
        const unlisten = ()=>{
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = ()=>{
            resolve(wrap(request.result));
            unlisten();
        };
        const error = ()=>{
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    // This mapping exists in reverseTransformCache but doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx)) return;
    const done = new Promise((resolve, reject)=>{
        const unlisten = ()=>{
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = ()=>{
            resolve();
            unlisten();
        };
        const error = ()=>{
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get (target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done') return transactionDoneMap.get(target);
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') return receiver.objectStoreNames[1] ? undefined : receiver.objectStore(receiver.objectStoreNames[0]);
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    set (target, prop, value) {
        target[prop] = value;
        return true;
    },
    has (target, prop) {
        if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store')) return true;
        return prop in target;
    }
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) return function(...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        func.apply(unwrap(this), args);
        return wrap(this.request);
    };
    return function(...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function') return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest) return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value)) return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value)=>reverseTransformCache.get(value);
/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */ function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) request.addEventListener('upgradeneeded', (event)=>{
        upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
    });
    if (blocked) request.addEventListener('blocked', (event)=>blocked(// Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion, event.newVersion, event));
    openPromise.then((db)=>{
        if (terminated) db.addEventListener('close', ()=>terminated());
        if (blocking) db.addEventListener('versionchange', (event)=>blocking(event.oldVersion, event.newVersion, event));
    }).catch(()=>{});
    return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */ function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked) request.addEventListener('blocked', (event)=>blocked(// Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion, event));
    return wrap(request).then(()=>undefined);
}
const readMethods = [
    'get',
    'getKey',
    'getAll',
    'getAllKeys',
    'count'
];
const writeMethods = [
    'put',
    'add',
    'delete',
    'clear'
];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === 'string')) return;
    if (cachedMethods.get(prop)) return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (// Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) return;
    const method = async function(storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex) target = target.index(args.shift());
        // Must reject if op rejects.
        // If it's a write operation, must reject if tx.done rejects.
        // Must reject with op rejection first.
        // Must resolve with op value.
        // Must handle both promises (no unhandled rejections)
        return (await Promise.all([
            target[targetFuncName](...args),
            isWrite && tx.done
        ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
}
replaceTraps((oldTraps)=>({
        ...oldTraps,
        get: (target, prop, receiver)=>getMethod(target, prop) || oldTraps.get(target, prop, receiver),
        has: (target, prop)=>!!getMethod(target, prop) || oldTraps.has(target, prop)
    }));
const advanceMethodProps = [
    'continue',
    'continuePrimaryKey',
    'advance'
];
const methodMap = {};
const advanceResults = new WeakMap();
const ittrProxiedCursorToOriginalProxy = new WeakMap();
const cursorIteratorTraps = {
    get (target, prop) {
        if (!advanceMethodProps.includes(prop)) return target[prop];
        let cachedFunc = methodMap[prop];
        if (!cachedFunc) cachedFunc = methodMap[prop] = function(...args) {
            advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
        };
        return cachedFunc;
    }
};
async function* iterate(...args) {
    // tslint:disable-next-line:no-this-assignment
    let cursor = this;
    if (!(cursor instanceof IDBCursor)) cursor = await cursor.openCursor(...args);
    if (!cursor) return;
    cursor;
    const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
    ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
    // Map this double-proxy back to the original, so other cursor methods work.
    reverseTransformCache.set(proxiedCursor, unwrap(cursor));
    while(cursor){
        yield proxiedCursor;
        // If one of the advancing methods was not called, call continue().
        cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
        advanceResults.delete(proxiedCursor);
    }
}
function isIteratorProp(target, prop) {
    return prop === Symbol.asyncIterator && instanceOfAny(target, [
        IDBIndex,
        IDBObjectStore,
        IDBCursor
    ]) || prop === 'iterate' && instanceOfAny(target, [
        IDBIndex,
        IDBObjectStore
    ]);
}
replaceTraps((oldTraps)=>({
        ...oldTraps,
        get (target, prop, receiver) {
            if (isIteratorProp(target, prop)) return iterate;
            return oldTraps.get(target, prop, receiver);
        },
        has (target, prop) {
            return isIteratorProp(target, prop) || oldTraps.has(target, prop);
        }
    }));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["9sVWG","fILKw"], "fILKw", "parcelRequire9b58", {})

//# sourceMappingURL=explainfy-project.1fcc916e.js.map
