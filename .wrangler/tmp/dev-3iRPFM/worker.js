var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/promise-limit/index.js
var require_promise_limit = __commonJS({
  "node_modules/promise-limit/index.js"(exports, module) {
    init_modules_watch_stub();
    function limiter(count) {
      var outstanding = 0;
      var jobs = [];
      function remove() {
        outstanding--;
        if (outstanding < count) {
          dequeue();
        }
      }
      __name(remove, "remove");
      function dequeue() {
        var job = jobs.shift();
        semaphore.queue = jobs.length;
        if (job) {
          run(job.fn).then(job.resolve).catch(job.reject);
        }
      }
      __name(dequeue, "dequeue");
      function queue(fn) {
        return new Promise(function(resolve, reject) {
          jobs.push({ fn, resolve, reject });
          semaphore.queue = jobs.length;
        });
      }
      __name(queue, "queue");
      function run(fn) {
        outstanding++;
        try {
          return Promise.resolve(fn()).then(function(result) {
            remove();
            return result;
          }, function(error) {
            remove();
            throw error;
          });
        } catch (err) {
          remove();
          return Promise.reject(err);
        }
      }
      __name(run, "run");
      var semaphore = /* @__PURE__ */ __name(function(fn) {
        if (outstanding >= count) {
          return queue(fn);
        } else {
          return run(fn);
        }
      }, "semaphore");
      return semaphore;
    }
    __name(limiter, "limiter");
    function map(items, mapper) {
      var failed = false;
      var limit = this;
      return Promise.all(items.map(function() {
        var args = arguments;
        return limit(function() {
          if (!failed) {
            return mapper.apply(void 0, args).catch(function(e) {
              failed = true;
              throw e;
            });
          }
        });
      }));
    }
    __name(map, "map");
    function addExtras(fn) {
      fn.queue = 0;
      fn.map = map;
      return fn;
    }
    __name(addExtras, "addExtras");
    module.exports = function(count) {
      if (count) {
        return addExtras(limiter(count));
      } else {
        return addExtras(function(fn) {
          return fn();
        });
      }
    };
  }
});

// .wrangler/tmp/bundle-loF2Sc/middleware-loader.entry.ts
init_modules_watch_stub();

// .wrangler/tmp/bundle-loF2Sc/middleware-insertion-facade.js
init_modules_watch_stub();

// src/worker.js
init_modules_watch_stub();

// src/lib/turso.js
init_modules_watch_stub();

// node_modules/@libsql/client/lib-esm/web.js
init_modules_watch_stub();

// node_modules/@libsql/core/lib-esm/api.js
init_modules_watch_stub();
var LibsqlError = class extends Error {
  static {
    __name(this, "LibsqlError");
  }
  /** Machine-readable error code. */
  code;
  /** Raw numeric error code */
  rawCode;
  constructor(message, code, rawCode, cause) {
    if (code !== void 0) {
      message = `${code}: ${message}`;
    }
    super(message, { cause });
    this.code = code;
    this.rawCode = rawCode;
    this.name = "LibsqlError";
  }
};

// node_modules/@libsql/core/lib-esm/config.js
init_modules_watch_stub();

// node_modules/@libsql/core/lib-esm/uri.js
init_modules_watch_stub();
function parseUri(text2) {
  const match = URI_RE.exec(text2);
  if (match === null) {
    throw new LibsqlError(`The URL '${text2}' is not in a valid format`, "URL_INVALID");
  }
  const groups = match.groups;
  const scheme = groups["scheme"];
  const authority = groups["authority"] !== void 0 ? parseAuthority(groups["authority"]) : void 0;
  const path = percentDecode(groups["path"]);
  const query = groups["query"] !== void 0 ? parseQuery(groups["query"]) : void 0;
  const fragment = groups["fragment"] !== void 0 ? percentDecode(groups["fragment"]) : void 0;
  return { scheme, authority, path, query, fragment };
}
__name(parseUri, "parseUri");
var URI_RE = (() => {
  const SCHEME = "(?<scheme>[A-Za-z][A-Za-z.+-]*)";
  const AUTHORITY = "(?<authority>[^/?#]*)";
  const PATH = "(?<path>[^?#]*)";
  const QUERY = "(?<query>[^#]*)";
  const FRAGMENT = "(?<fragment>.*)";
  return new RegExp(`^${SCHEME}:(//${AUTHORITY})?${PATH}(\\?${QUERY})?(#${FRAGMENT})?$`, "su");
})();
function parseAuthority(text2) {
  const match = AUTHORITY_RE.exec(text2);
  if (match === null) {
    throw new LibsqlError("The authority part of the URL is not in a valid format", "URL_INVALID");
  }
  const groups = match.groups;
  const host = percentDecode(groups["host_br"] ?? groups["host"]);
  const port = groups["port"] ? parseInt(groups["port"], 10) : void 0;
  const userinfo = groups["username"] !== void 0 ? {
    username: percentDecode(groups["username"]),
    password: groups["password"] !== void 0 ? percentDecode(groups["password"]) : void 0
  } : void 0;
  return { host, port, userinfo };
}
__name(parseAuthority, "parseAuthority");
var AUTHORITY_RE = (() => {
  return new RegExp(`^((?<username>[^:]*)(:(?<password>.*))?@)?((?<host>[^:\\[\\]]*)|(\\[(?<host_br>[^\\[\\]]*)\\]))(:(?<port>[0-9]*))?$`, "su");
})();
function parseQuery(text2) {
  const sequences = text2.split("&");
  const pairs = [];
  for (const sequence of sequences) {
    if (sequence === "") {
      continue;
    }
    let key;
    let value;
    const splitIdx = sequence.indexOf("=");
    if (splitIdx < 0) {
      key = sequence;
      value = "";
    } else {
      key = sequence.substring(0, splitIdx);
      value = sequence.substring(splitIdx + 1);
    }
    pairs.push({
      key: percentDecode(key.replaceAll("+", " ")),
      value: percentDecode(value.replaceAll("+", " "))
    });
  }
  return { pairs };
}
__name(parseQuery, "parseQuery");
function percentDecode(text2) {
  try {
    return decodeURIComponent(text2);
  } catch (e) {
    if (e instanceof URIError) {
      throw new LibsqlError(`URL component has invalid percent encoding: ${e}`, "URL_INVALID", void 0, e);
    }
    throw e;
  }
}
__name(percentDecode, "percentDecode");
function encodeBaseUrl(scheme, authority, path) {
  if (authority === void 0) {
    throw new LibsqlError(`URL with scheme ${JSON.stringify(scheme + ":")} requires authority (the "//" part)`, "URL_INVALID");
  }
  const schemeText = `${scheme}:`;
  const hostText = encodeHost(authority.host);
  const portText = encodePort(authority.port);
  const userinfoText = encodeUserinfo(authority.userinfo);
  const authorityText = `//${userinfoText}${hostText}${portText}`;
  let pathText = path.split("/").map(encodeURIComponent).join("/");
  if (pathText !== "" && !pathText.startsWith("/")) {
    pathText = "/" + pathText;
  }
  return new URL(`${schemeText}${authorityText}${pathText}`);
}
__name(encodeBaseUrl, "encodeBaseUrl");
function encodeHost(host) {
  return host.includes(":") ? `[${encodeURI(host)}]` : encodeURI(host);
}
__name(encodeHost, "encodeHost");
function encodePort(port) {
  return port !== void 0 ? `:${port}` : "";
}
__name(encodePort, "encodePort");
function encodeUserinfo(userinfo) {
  if (userinfo === void 0) {
    return "";
  }
  const usernameText = encodeURIComponent(userinfo.username);
  const passwordText = userinfo.password !== void 0 ? `:${encodeURIComponent(userinfo.password)}` : "";
  return `${usernameText}${passwordText}@`;
}
__name(encodeUserinfo, "encodeUserinfo");

// node_modules/@libsql/core/lib-esm/util.js
init_modules_watch_stub();

// node_modules/js-base64/base64.mjs
init_modules_watch_stub();
var version = "3.7.8";
var VERSION = version;
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a) => {
  let tab = {};
  a.forEach((c, i) => tab[c] = i);
  return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _mkUriSafe = /* @__PURE__ */ __name((src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_"), "_mkUriSafe");
var _tidyB64 = /* @__PURE__ */ __name((s) => s.replace(/[^A-Za-z0-9\+\/]/g, ""), "_tidyB64");
var btoaPolyfill = /* @__PURE__ */ __name((bin) => {
  let u32, c0, c1, c2, asc = "";
  const pad = bin.length % 3;
  for (let i = 0; i < bin.length; ) {
    if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
      throw new TypeError("invalid character found");
    u32 = c0 << 16 | c1 << 8 | c2;
    asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
  }
  return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
}, "btoaPolyfill");
var _btoa = typeof btoa === "function" ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
  const maxargs = 4096;
  let strs = [];
  for (let i = 0, l = u8a.length; i < l; i += maxargs) {
    strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
  }
  return _btoa(strs.join(""));
};
var fromUint8Array = /* @__PURE__ */ __name((u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a), "fromUint8Array");
var cb_utob = /* @__PURE__ */ __name((c) => {
  if (c.length < 2) {
    var cc = c.charCodeAt(0);
    return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  } else {
    var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
    return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  }
}, "cb_utob");
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = /* @__PURE__ */ __name((u) => u.replace(re_utob, cb_utob), "utob");
var _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
var encode = /* @__PURE__ */ __name((src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src), "encode");
var encodeURI2 = /* @__PURE__ */ __name((src) => encode(src, true), "encodeURI");
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = /* @__PURE__ */ __name((cccc) => {
  switch (cccc.length) {
    case 4:
      var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
      return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
    case 3:
      return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
    default:
      return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
  }
}, "cb_btou");
var btou = /* @__PURE__ */ __name((b) => b.replace(re_btou, cb_btou), "btou");
var atobPolyfill = /* @__PURE__ */ __name((asc) => {
  asc = asc.replace(/\s+/g, "");
  if (!b64re.test(asc))
    throw new TypeError("malformed base64.");
  asc += "==".slice(2 - (asc.length & 3));
  let u24, r1, r2;
  let binArray = [];
  for (let i = 0; i < asc.length; ) {
    u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
    if (r1 === 64) {
      binArray.push(_fromCC(u24 >> 16 & 255));
    } else if (r2 === 64) {
      binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255));
    } else {
      binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255));
    }
  }
  return binArray.join("");
}, "atobPolyfill");
var _atob = typeof atob === "function" ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
var _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a).split("").map((c) => c.charCodeAt(0)));
var toUint8Array = /* @__PURE__ */ __name((a) => _toUint8Array(_unURI(a)), "toUint8Array");
var _decode = _hasBuffer ? (a) => Buffer.from(a, "base64").toString("utf8") : _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
var _unURI = /* @__PURE__ */ __name((a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/")), "_unURI");
var decode = /* @__PURE__ */ __name((src) => _decode(_unURI(src)), "decode");
var isValid = /* @__PURE__ */ __name((src) => {
  if (typeof src !== "string")
    return false;
  const s = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
  return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
}, "isValid");
var _noEnum = /* @__PURE__ */ __name((v) => {
  return {
    value: v,
    enumerable: false,
    writable: true,
    configurable: true
  };
}, "_noEnum");
var extendString = /* @__PURE__ */ __name(function() {
  const _add = /* @__PURE__ */ __name((name, body) => Object.defineProperty(String.prototype, name, _noEnum(body)), "_add");
  _add("fromBase64", function() {
    return decode(this);
  });
  _add("toBase64", function(urlsafe) {
    return encode(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return encode(this, true);
  });
  _add("toBase64URL", function() {
    return encode(this, true);
  });
  _add("toUint8Array", function() {
    return toUint8Array(this);
  });
}, "extendString");
var extendUint8Array = /* @__PURE__ */ __name(function() {
  const _add = /* @__PURE__ */ __name((name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body)), "_add");
  _add("toBase64", function(urlsafe) {
    return fromUint8Array(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return fromUint8Array(this, true);
  });
  _add("toBase64URL", function() {
    return fromUint8Array(this, true);
  });
}, "extendUint8Array");
var extendBuiltins = /* @__PURE__ */ __name(() => {
  extendString();
  extendUint8Array();
}, "extendBuiltins");
var gBase64 = {
  version,
  VERSION,
  atob: _atob,
  atobPolyfill,
  btoa: _btoa,
  btoaPolyfill,
  fromBase64: decode,
  toBase64: encode,
  encode,
  encodeURI: encodeURI2,
  encodeURL: encodeURI2,
  utob,
  btou,
  decode,
  isValid,
  fromUint8Array,
  toUint8Array,
  extendString,
  extendUint8Array,
  extendBuiltins
};

// node_modules/@libsql/core/lib-esm/util.js
var supportedUrlLink = "https://github.com/libsql/libsql-client-ts#supported-urls";
function transactionModeToBegin(mode) {
  if (mode === "write") {
    return "BEGIN IMMEDIATE";
  } else if (mode === "read") {
    return "BEGIN TRANSACTION READONLY";
  } else if (mode === "deferred") {
    return "BEGIN DEFERRED";
  } else {
    throw RangeError('Unknown transaction mode, supported values are "write", "read" and "deferred"');
  }
}
__name(transactionModeToBegin, "transactionModeToBegin");
var ResultSetImpl = class {
  static {
    __name(this, "ResultSetImpl");
  }
  columns;
  columnTypes;
  rows;
  rowsAffected;
  lastInsertRowid;
  constructor(columns, columnTypes, rows, rowsAffected, lastInsertRowid) {
    this.columns = columns;
    this.columnTypes = columnTypes;
    this.rows = rows;
    this.rowsAffected = rowsAffected;
    this.lastInsertRowid = lastInsertRowid;
  }
  toJSON() {
    return {
      columns: this.columns,
      columnTypes: this.columnTypes,
      rows: this.rows.map(rowToJson),
      rowsAffected: this.rowsAffected,
      lastInsertRowid: this.lastInsertRowid !== void 0 ? "" + this.lastInsertRowid : null
    };
  }
};
function rowToJson(row) {
  return Array.prototype.map.call(row, valueToJson);
}
__name(rowToJson, "rowToJson");
function valueToJson(value) {
  if (typeof value === "bigint") {
    return "" + value;
  } else if (value instanceof ArrayBuffer) {
    return gBase64.fromUint8Array(new Uint8Array(value));
  } else {
    return value;
  }
}
__name(valueToJson, "valueToJson");

// node_modules/@libsql/core/lib-esm/config.js
var inMemoryMode = ":memory:";
function expandConfig(config, preferHttp) {
  if (typeof config !== "object") {
    throw new TypeError(`Expected client configuration as object, got ${typeof config}`);
  }
  let { url, authToken, tls, intMode, concurrency } = config;
  concurrency = Math.max(0, concurrency || 20);
  intMode ??= "number";
  let connectionQueryParams = [];
  if (url === inMemoryMode) {
    url = "file::memory:";
  }
  const uri = parseUri(url);
  const originalUriScheme = uri.scheme.toLowerCase();
  const isInMemoryMode = originalUriScheme === "file" && uri.path === inMemoryMode && uri.authority === void 0;
  let queryParamsDef;
  if (isInMemoryMode) {
    queryParamsDef = {
      cache: {
        values: ["shared", "private"],
        update: /* @__PURE__ */ __name((key, value) => connectionQueryParams.push(`${key}=${value}`), "update")
      }
    };
  } else {
    queryParamsDef = {
      tls: {
        values: ["0", "1"],
        update: /* @__PURE__ */ __name((_, value) => tls = value === "1", "update")
      },
      authToken: {
        update: /* @__PURE__ */ __name((_, value) => authToken = value, "update")
      }
    };
  }
  for (const { key, value } of uri.query?.pairs ?? []) {
    if (!Object.hasOwn(queryParamsDef, key)) {
      throw new LibsqlError(`Unsupported URL query parameter ${JSON.stringify(key)}`, "URL_PARAM_NOT_SUPPORTED");
    }
    const queryParamDef = queryParamsDef[key];
    if (queryParamDef.values !== void 0 && !queryParamDef.values.includes(value)) {
      throw new LibsqlError(`Unknown value for the "${key}" query argument: ${JSON.stringify(value)}. Supported values are: [${queryParamDef.values.map((x) => '"' + x + '"').join(", ")}]`, "URL_INVALID");
    }
    if (queryParamDef.update !== void 0) {
      queryParamDef?.update(key, value);
    }
  }
  const connectionQueryParamsString = connectionQueryParams.length === 0 ? "" : `?${connectionQueryParams.join("&")}`;
  const path = uri.path + connectionQueryParamsString;
  let scheme;
  if (originalUriScheme === "libsql") {
    if (tls === false) {
      if (uri.authority?.port === void 0) {
        throw new LibsqlError('A "libsql:" URL with ?tls=0 must specify an explicit port', "URL_INVALID");
      }
      scheme = preferHttp ? "http" : "ws";
    } else {
      scheme = preferHttp ? "https" : "wss";
    }
  } else {
    scheme = originalUriScheme;
  }
  if (scheme === "http" || scheme === "ws") {
    tls ??= false;
  } else {
    tls ??= true;
  }
  if (scheme !== "http" && scheme !== "ws" && scheme !== "https" && scheme !== "wss" && scheme !== "file") {
    throw new LibsqlError(`The client supports only "libsql:", "wss:", "ws:", "https:", "http:" and "file:" URLs, got ${JSON.stringify(uri.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  if (intMode !== "number" && intMode !== "bigint" && intMode !== "string") {
    throw new TypeError(`Invalid value for intMode, expected "number", "bigint" or "string", got ${JSON.stringify(intMode)}`);
  }
  if (uri.fragment !== void 0) {
    throw new LibsqlError(`URL fragments are not supported: ${JSON.stringify("#" + uri.fragment)}`, "URL_INVALID");
  }
  if (isInMemoryMode) {
    return {
      scheme: "file",
      tls: false,
      path,
      intMode,
      concurrency,
      syncUrl: config.syncUrl,
      syncInterval: config.syncInterval,
      readYourWrites: config.readYourWrites,
      offline: config.offline,
      fetch: config.fetch,
      authToken: void 0,
      encryptionKey: void 0,
      authority: void 0
    };
  }
  return {
    scheme,
    tls,
    authority: uri.authority,
    path,
    authToken,
    intMode,
    concurrency,
    encryptionKey: config.encryptionKey,
    syncUrl: config.syncUrl,
    syncInterval: config.syncInterval,
    readYourWrites: config.readYourWrites,
    offline: config.offline,
    fetch: config.fetch
  };
}
__name(expandConfig, "expandConfig");

// node_modules/@libsql/client/lib-esm/ws.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/index.js
init_modules_watch_stub();

// node_modules/@libsql/isomorphic-ws/web.mjs
init_modules_watch_stub();
var _WebSocket;
if (typeof WebSocket !== "undefined") {
  _WebSocket = WebSocket;
} else if (typeof global !== "undefined") {
  _WebSocket = global.WebSocket;
} else if (typeof window !== "undefined") {
  _WebSocket = window.WebSocket;
} else if (typeof self !== "undefined") {
  _WebSocket = self.WebSocket;
}

// node_modules/@libsql/hrana-client/lib-esm/ws/client.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/client.js
init_modules_watch_stub();
var Client = class {
  static {
    __name(this, "Client");
  }
  /** @private */
  constructor() {
    this.intMode = "number";
  }
  /** Representation of integers returned from the database. See {@link IntMode}.
   *
   * This value is inherited by {@link Stream} objects created with {@link openStream}, but you can
   * override the integer mode for every stream by setting {@link Stream.intMode} on the stream.
   */
  intMode;
};

// node_modules/@libsql/hrana-client/lib-esm/encoding/index.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/errors.js
init_modules_watch_stub();
var ClientError = class extends Error {
  static {
    __name(this, "ClientError");
  }
  /** @private */
  constructor(message) {
    super(message);
    this.name = "ClientError";
  }
};
var ProtoError = class extends ClientError {
  static {
    __name(this, "ProtoError");
  }
  /** @private */
  constructor(message) {
    super(message);
    this.name = "ProtoError";
  }
};
var ResponseError = class extends ClientError {
  static {
    __name(this, "ResponseError");
  }
  code;
  /** @internal */
  proto;
  /** @private */
  constructor(message, protoError) {
    super(message);
    this.name = "ResponseError";
    this.code = protoError.code;
    this.proto = protoError;
    this.stack = void 0;
  }
};
var ClosedError = class extends ClientError {
  static {
    __name(this, "ClosedError");
  }
  /** @private */
  constructor(message, cause) {
    if (cause !== void 0) {
      super(`${message}: ${cause}`);
      this.cause = cause;
    } else {
      super(message);
    }
    this.name = "ClosedError";
  }
};
var WebSocketUnsupportedError = class extends ClientError {
  static {
    __name(this, "WebSocketUnsupportedError");
  }
  /** @private */
  constructor(message) {
    super(message);
    this.name = "WebSocketUnsupportedError";
  }
};
var WebSocketError = class extends ClientError {
  static {
    __name(this, "WebSocketError");
  }
  /** @private */
  constructor(message) {
    super(message);
    this.name = "WebSocketError";
  }
};
var HttpServerError = class extends ClientError {
  static {
    __name(this, "HttpServerError");
  }
  status;
  /** @private */
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "HttpServerError";
  }
};
var ProtocolVersionError = class extends ClientError {
  static {
    __name(this, "ProtocolVersionError");
  }
  /** @private */
  constructor(message) {
    super(message);
    this.name = "ProtocolVersionError";
  }
};
var InternalError = class extends ClientError {
  static {
    __name(this, "InternalError");
  }
  /** @private */
  constructor(message) {
    super(message);
    this.name = "InternalError";
  }
};
var MisuseError = class extends ClientError {
  static {
    __name(this, "MisuseError");
  }
  /** @private */
  constructor(message) {
    super(message);
    this.name = "MisuseError";
  }
};

// node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js
function string(value) {
  if (typeof value === "string") {
    return value;
  }
  throw typeError(value, "string");
}
__name(string, "string");
function stringOpt(value) {
  if (value === null || value === void 0) {
    return void 0;
  } else if (typeof value === "string") {
    return value;
  }
  throw typeError(value, "string or null");
}
__name(stringOpt, "stringOpt");
function number(value) {
  if (typeof value === "number") {
    return value;
  }
  throw typeError(value, "number");
}
__name(number, "number");
function boolean(value) {
  if (typeof value === "boolean") {
    return value;
  }
  throw typeError(value, "boolean");
}
__name(boolean, "boolean");
function array(value) {
  if (Array.isArray(value)) {
    return value;
  }
  throw typeError(value, "array");
}
__name(array, "array");
function object(value) {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  throw typeError(value, "object");
}
__name(object, "object");
function arrayObjectsMap(value, fun) {
  return array(value).map((elemValue) => fun(object(elemValue)));
}
__name(arrayObjectsMap, "arrayObjectsMap");
function typeError(value, expected) {
  if (value === void 0) {
    return new ProtoError(`Expected ${expected}, but the property was missing`);
  }
  let received = typeof value;
  if (value === null) {
    received = "null";
  } else if (Array.isArray(value)) {
    received = "array";
  }
  return new ProtoError(`Expected ${expected}, received ${received}`);
}
__name(typeError, "typeError");
function readJsonObject(value, fun) {
  return fun(object(value));
}
__name(readJsonObject, "readJsonObject");

// node_modules/@libsql/hrana-client/lib-esm/encoding/json/encode.js
init_modules_watch_stub();
var ObjectWriter = class {
  static {
    __name(this, "ObjectWriter");
  }
  #output;
  #isFirst;
  constructor(output) {
    this.#output = output;
    this.#isFirst = false;
  }
  begin() {
    this.#output.push("{");
    this.#isFirst = true;
  }
  end() {
    this.#output.push("}");
    this.#isFirst = false;
  }
  #key(name) {
    if (this.#isFirst) {
      this.#output.push('"');
      this.#isFirst = false;
    } else {
      this.#output.push(',"');
    }
    this.#output.push(name);
    this.#output.push('":');
  }
  string(name, value) {
    this.#key(name);
    this.#output.push(JSON.stringify(value));
  }
  stringRaw(name, value) {
    this.#key(name);
    this.#output.push('"');
    this.#output.push(value);
    this.#output.push('"');
  }
  number(name, value) {
    this.#key(name);
    this.#output.push("" + value);
  }
  boolean(name, value) {
    this.#key(name);
    this.#output.push(value ? "true" : "false");
  }
  object(name, value, valueFun) {
    this.#key(name);
    this.begin();
    valueFun(this, value);
    this.end();
  }
  arrayObjects(name, values, valueFun) {
    this.#key(name);
    this.#output.push("[");
    for (let i = 0; i < values.length; ++i) {
      if (i !== 0) {
        this.#output.push(",");
      }
      this.begin();
      valueFun(this, values[i]);
      this.end();
    }
    this.#output.push("]");
  }
};
function writeJsonObject(value, fun) {
  const output = [];
  const writer = new ObjectWriter(output);
  writer.begin();
  fun(writer, value);
  writer.end();
  return output.join("");
}
__name(writeJsonObject, "writeJsonObject");

// node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/decode.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/util.js
init_modules_watch_stub();
var VARINT = 0;
var FIXED_64 = 1;
var LENGTH_DELIMITED = 2;
var FIXED_32 = 5;

// node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/decode.js
var MessageReader = class {
  static {
    __name(this, "MessageReader");
  }
  #array;
  #view;
  #pos;
  constructor(array2) {
    this.#array = array2;
    this.#view = new DataView(array2.buffer, array2.byteOffset, array2.byteLength);
    this.#pos = 0;
  }
  varint() {
    let value = 0;
    for (let shift = 0; ; shift += 7) {
      const byte = this.#array[this.#pos++];
      value |= (byte & 127) << shift;
      if (!(byte & 128)) {
        break;
      }
    }
    return value;
  }
  varintBig() {
    let value = 0n;
    for (let shift = 0n; ; shift += 7n) {
      const byte = this.#array[this.#pos++];
      value |= BigInt(byte & 127) << shift;
      if (!(byte & 128)) {
        break;
      }
    }
    return value;
  }
  bytes(length) {
    const array2 = new Uint8Array(this.#array.buffer, this.#array.byteOffset + this.#pos, length);
    this.#pos += length;
    return array2;
  }
  double() {
    const value = this.#view.getFloat64(this.#pos, true);
    this.#pos += 8;
    return value;
  }
  skipVarint() {
    for (; ; ) {
      const byte = this.#array[this.#pos++];
      if (!(byte & 128)) {
        break;
      }
    }
  }
  skip(count) {
    this.#pos += count;
  }
  eof() {
    return this.#pos >= this.#array.byteLength;
  }
};
var FieldReader = class {
  static {
    __name(this, "FieldReader");
  }
  #reader;
  #wireType;
  constructor(reader) {
    this.#reader = reader;
    this.#wireType = -1;
  }
  setup(wireType) {
    this.#wireType = wireType;
  }
  #expect(expectedWireType) {
    if (this.#wireType !== expectedWireType) {
      throw new ProtoError(`Expected wire type ${expectedWireType}, got ${this.#wireType}`);
    }
    this.#wireType = -1;
  }
  bytes() {
    this.#expect(LENGTH_DELIMITED);
    const length = this.#reader.varint();
    return this.#reader.bytes(length);
  }
  string() {
    return new TextDecoder().decode(this.bytes());
  }
  message(def) {
    return readProtobufMessage(this.bytes(), def);
  }
  int32() {
    this.#expect(VARINT);
    return this.#reader.varint();
  }
  uint32() {
    return this.int32();
  }
  bool() {
    return this.int32() !== 0;
  }
  uint64() {
    this.#expect(VARINT);
    return this.#reader.varintBig();
  }
  sint64() {
    const value = this.uint64();
    return value >> 1n ^ -(value & 1n);
  }
  double() {
    this.#expect(FIXED_64);
    return this.#reader.double();
  }
  maybeSkip() {
    if (this.#wireType < 0) {
      return;
    } else if (this.#wireType === VARINT) {
      this.#reader.skipVarint();
    } else if (this.#wireType === FIXED_64) {
      this.#reader.skip(8);
    } else if (this.#wireType === LENGTH_DELIMITED) {
      const length = this.#reader.varint();
      this.#reader.skip(length);
    } else if (this.#wireType === FIXED_32) {
      this.#reader.skip(4);
    } else {
      throw new ProtoError(`Unexpected wire type ${this.#wireType}`);
    }
    this.#wireType = -1;
  }
};
function readProtobufMessage(data, def) {
  const msgReader = new MessageReader(data);
  const fieldReader = new FieldReader(msgReader);
  let value = def.default();
  while (!msgReader.eof()) {
    const key = msgReader.varint();
    const tag = key >> 3;
    const wireType = key & 7;
    fieldReader.setup(wireType);
    const tagFun = def[tag];
    if (tagFun !== void 0) {
      const returnedValue = tagFun(fieldReader, value);
      if (returnedValue !== void 0) {
        value = returnedValue;
      }
    }
    fieldReader.maybeSkip();
  }
  return value;
}
__name(readProtobufMessage, "readProtobufMessage");

// node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/encode.js
init_modules_watch_stub();
var MessageWriter = class _MessageWriter {
  static {
    __name(this, "MessageWriter");
  }
  #buf;
  #array;
  #view;
  #pos;
  constructor() {
    this.#buf = new ArrayBuffer(256);
    this.#array = new Uint8Array(this.#buf);
    this.#view = new DataView(this.#buf);
    this.#pos = 0;
  }
  #ensure(extra) {
    if (this.#pos + extra <= this.#buf.byteLength) {
      return;
    }
    let newCap = this.#buf.byteLength;
    while (newCap < this.#pos + extra) {
      newCap *= 2;
    }
    const newBuf = new ArrayBuffer(newCap);
    const newArray = new Uint8Array(newBuf);
    const newView = new DataView(newBuf);
    newArray.set(new Uint8Array(this.#buf, 0, this.#pos));
    this.#buf = newBuf;
    this.#array = newArray;
    this.#view = newView;
  }
  #varint(value) {
    this.#ensure(5);
    value = 0 | value;
    do {
      let byte = value & 127;
      value >>>= 7;
      byte |= value ? 128 : 0;
      this.#array[this.#pos++] = byte;
    } while (value);
  }
  #varintBig(value) {
    this.#ensure(10);
    value = value & 0xffffffffffffffffn;
    do {
      let byte = Number(value & 0x7fn);
      value >>= 7n;
      byte |= value ? 128 : 0;
      this.#array[this.#pos++] = byte;
    } while (value);
  }
  #tag(tag, wireType) {
    this.#varint(tag << 3 | wireType);
  }
  bytes(tag, value) {
    this.#tag(tag, LENGTH_DELIMITED);
    this.#varint(value.byteLength);
    this.#ensure(value.byteLength);
    this.#array.set(value, this.#pos);
    this.#pos += value.byteLength;
  }
  string(tag, value) {
    this.bytes(tag, new TextEncoder().encode(value));
  }
  message(tag, value, fun) {
    const writer = new _MessageWriter();
    fun(writer, value);
    this.bytes(tag, writer.data());
  }
  int32(tag, value) {
    this.#tag(tag, VARINT);
    this.#varint(value);
  }
  uint32(tag, value) {
    this.int32(tag, value);
  }
  bool(tag, value) {
    this.int32(tag, value ? 1 : 0);
  }
  sint64(tag, value) {
    this.#tag(tag, VARINT);
    this.#varintBig(value << 1n ^ value >> 63n);
  }
  double(tag, value) {
    this.#tag(tag, FIXED_64);
    this.#ensure(8);
    this.#view.setFloat64(this.#pos, value, true);
    this.#pos += 8;
  }
  data() {
    return new Uint8Array(this.#buf, 0, this.#pos);
  }
};
function writeProtobufMessage(value, fun) {
  const w = new MessageWriter();
  fun(w, value);
  return w.data();
}
__name(writeProtobufMessage, "writeProtobufMessage");

// node_modules/@libsql/hrana-client/lib-esm/id_alloc.js
init_modules_watch_stub();
var IdAlloc = class {
  static {
    __name(this, "IdAlloc");
  }
  // Set of all allocated ids
  #usedIds;
  // Set of all free ids lower than `#usedIds.size`
  #freeIds;
  constructor() {
    this.#usedIds = /* @__PURE__ */ new Set();
    this.#freeIds = /* @__PURE__ */ new Set();
  }
  // Returns an id that was free, and marks it as used.
  alloc() {
    for (const freeId2 of this.#freeIds) {
      this.#freeIds.delete(freeId2);
      this.#usedIds.add(freeId2);
      if (!this.#usedIds.has(this.#usedIds.size - 1)) {
        this.#freeIds.add(this.#usedIds.size - 1);
      }
      return freeId2;
    }
    const freeId = this.#usedIds.size;
    this.#usedIds.add(freeId);
    return freeId;
  }
  free(id) {
    if (!this.#usedIds.delete(id)) {
      throw new InternalError("Freeing an id that is not allocated");
    }
    this.#freeIds.delete(this.#usedIds.size);
    if (id < this.#usedIds.size) {
      this.#freeIds.add(id);
    }
  }
};

// node_modules/@libsql/hrana-client/lib-esm/result.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/value.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/util.js
init_modules_watch_stub();
function impossible(value, message) {
  throw new InternalError(message);
}
__name(impossible, "impossible");

// node_modules/@libsql/hrana-client/lib-esm/value.js
function valueToProto(value) {
  if (value === null) {
    return null;
  } else if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new RangeError("Only finite numbers (not Infinity or NaN) can be passed as arguments");
    }
    return value;
  } else if (typeof value === "bigint") {
    if (value < minInteger || value > maxInteger) {
      throw new RangeError("This bigint value is too large to be represented as a 64-bit integer and passed as argument");
    }
    return value;
  } else if (typeof value === "boolean") {
    return value ? 1n : 0n;
  } else if (value instanceof ArrayBuffer) {
    return new Uint8Array(value);
  } else if (value instanceof Uint8Array) {
    return value;
  } else if (value instanceof Date) {
    return +value.valueOf();
  } else if (typeof value === "object") {
    return "" + value.toString();
  } else {
    throw new TypeError("Unsupported type of value");
  }
}
__name(valueToProto, "valueToProto");
var minInteger = -9223372036854775808n;
var maxInteger = 9223372036854775807n;
function valueFromProto(value, intMode) {
  if (value === null) {
    return null;
  } else if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    return value;
  } else if (typeof value === "bigint") {
    if (intMode === "number") {
      const num = Number(value);
      if (!Number.isSafeInteger(num)) {
        throw new RangeError("Received integer which is too large to be safely represented as a JavaScript number");
      }
      return num;
    } else if (intMode === "bigint") {
      return value;
    } else if (intMode === "string") {
      return "" + value;
    } else {
      throw new MisuseError("Invalid value for IntMode");
    }
  } else if (value instanceof Uint8Array) {
    return value.slice().buffer;
  } else if (value === void 0) {
    throw new ProtoError("Received unrecognized type of Value");
  } else {
    throw impossible(value, "Impossible type of Value");
  }
}
__name(valueFromProto, "valueFromProto");

// node_modules/@libsql/hrana-client/lib-esm/result.js
function stmtResultFromProto(result) {
  return {
    affectedRowCount: result.affectedRowCount,
    lastInsertRowid: result.lastInsertRowid,
    columnNames: result.cols.map((col) => col.name),
    columnDecltypes: result.cols.map((col) => col.decltype)
  };
}
__name(stmtResultFromProto, "stmtResultFromProto");
function rowsResultFromProto(result, intMode) {
  const stmtResult = stmtResultFromProto(result);
  const rows = result.rows.map((row) => rowFromProto(stmtResult.columnNames, row, intMode));
  return { ...stmtResult, rows };
}
__name(rowsResultFromProto, "rowsResultFromProto");
function rowResultFromProto(result, intMode) {
  const stmtResult = stmtResultFromProto(result);
  let row;
  if (result.rows.length > 0) {
    row = rowFromProto(stmtResult.columnNames, result.rows[0], intMode);
  }
  return { ...stmtResult, row };
}
__name(rowResultFromProto, "rowResultFromProto");
function valueResultFromProto(result, intMode) {
  const stmtResult = stmtResultFromProto(result);
  let value;
  if (result.rows.length > 0 && stmtResult.columnNames.length > 0) {
    value = valueFromProto(result.rows[0][0], intMode);
  }
  return { ...stmtResult, value };
}
__name(valueResultFromProto, "valueResultFromProto");
function rowFromProto(colNames, values, intMode) {
  const row = {};
  Object.defineProperty(row, "length", { value: values.length });
  for (let i = 0; i < values.length; ++i) {
    const value = valueFromProto(values[i], intMode);
    Object.defineProperty(row, i, { value });
    const colName = colNames[i];
    if (colName !== void 0 && !Object.hasOwn(row, colName)) {
      Object.defineProperty(row, colName, { value, enumerable: true, configurable: true, writable: true });
    }
  }
  return row;
}
__name(rowFromProto, "rowFromProto");
function errorFromProto(error) {
  return new ResponseError(error.message, error);
}
__name(errorFromProto, "errorFromProto");

// node_modules/@libsql/hrana-client/lib-esm/sql.js
init_modules_watch_stub();
var Sql = class {
  static {
    __name(this, "Sql");
  }
  #owner;
  #sqlId;
  #closed;
  /** @private */
  constructor(owner, sqlId) {
    this.#owner = owner;
    this.#sqlId = sqlId;
    this.#closed = void 0;
  }
  /** @private */
  _getSqlId(owner) {
    if (this.#owner !== owner) {
      throw new MisuseError("Attempted to use SQL text opened with other object");
    } else if (this.#closed !== void 0) {
      throw new ClosedError("SQL text is closed", this.#closed);
    }
    return this.#sqlId;
  }
  /** Remove the SQL text from the server, releasing resouces. */
  close() {
    this._setClosed(new ClientError("SQL text was manually closed"));
  }
  /** @private */
  _setClosed(error) {
    if (this.#closed === void 0) {
      this.#closed = error;
      this.#owner._closeSql(this.#sqlId);
    }
  }
  /** True if the SQL text is closed (removed from the server). */
  get closed() {
    return this.#closed !== void 0;
  }
};
function sqlToProto(owner, sql) {
  if (sql instanceof Sql) {
    return { sqlId: sql._getSqlId(owner) };
  } else {
    return { sql: "" + sql };
  }
}
__name(sqlToProto, "sqlToProto");

// node_modules/@libsql/hrana-client/lib-esm/ws/stream.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/queue.js
init_modules_watch_stub();
var Queue = class {
  static {
    __name(this, "Queue");
  }
  #pushStack;
  #shiftStack;
  constructor() {
    this.#pushStack = [];
    this.#shiftStack = [];
  }
  get length() {
    return this.#pushStack.length + this.#shiftStack.length;
  }
  push(elem) {
    this.#pushStack.push(elem);
  }
  shift() {
    if (this.#shiftStack.length === 0 && this.#pushStack.length > 0) {
      this.#shiftStack = this.#pushStack.reverse();
      this.#pushStack = [];
    }
    return this.#shiftStack.pop();
  }
  first() {
    return this.#shiftStack.length !== 0 ? this.#shiftStack[this.#shiftStack.length - 1] : this.#pushStack[0];
  }
};

// node_modules/@libsql/hrana-client/lib-esm/stream.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/batch.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/stmt.js
init_modules_watch_stub();
var Stmt = class {
  static {
    __name(this, "Stmt");
  }
  /** The SQL statement text. */
  sql;
  /** @private */
  _args;
  /** @private */
  _namedArgs;
  /** Initialize the statement with given SQL text. */
  constructor(sql) {
    this.sql = sql;
    this._args = [];
    this._namedArgs = /* @__PURE__ */ new Map();
  }
  /** Binds positional parameters from the given `values`. All previous positional bindings are cleared. */
  bindIndexes(values) {
    this._args.length = 0;
    for (const value of values) {
      this._args.push(valueToProto(value));
    }
    return this;
  }
  /** Binds a parameter by a 1-based index. */
  bindIndex(index, value) {
    if (index !== (index | 0) || index <= 0) {
      throw new RangeError("Index of a positional argument must be positive integer");
    }
    while (this._args.length < index) {
      this._args.push(null);
    }
    this._args[index - 1] = valueToProto(value);
    return this;
  }
  /** Binds a parameter by name. */
  bindName(name, value) {
    this._namedArgs.set(name, valueToProto(value));
    return this;
  }
  /** Clears all bindings. */
  unbindAll() {
    this._args.length = 0;
    this._namedArgs.clear();
    return this;
  }
};
function stmtToProto(sqlOwner, stmt, wantRows) {
  let inSql;
  let args = [];
  let namedArgs = [];
  if (stmt instanceof Stmt) {
    inSql = stmt.sql;
    args = stmt._args;
    for (const [name, value] of stmt._namedArgs.entries()) {
      namedArgs.push({ name, value });
    }
  } else if (Array.isArray(stmt)) {
    inSql = stmt[0];
    if (Array.isArray(stmt[1])) {
      args = stmt[1].map((arg) => valueToProto(arg));
    } else {
      namedArgs = Object.entries(stmt[1]).map(([name, value]) => {
        return { name, value: valueToProto(value) };
      });
    }
  } else {
    inSql = stmt;
  }
  const { sql, sqlId } = sqlToProto(sqlOwner, inSql);
  return { sql, sqlId, args, namedArgs, wantRows };
}
__name(stmtToProto, "stmtToProto");

// node_modules/@libsql/hrana-client/lib-esm/batch.js
var Batch = class {
  static {
    __name(this, "Batch");
  }
  /** @private */
  _stream;
  #useCursor;
  /** @private */
  _steps;
  #executed;
  /** @private */
  constructor(stream, useCursor) {
    this._stream = stream;
    this.#useCursor = useCursor;
    this._steps = [];
    this.#executed = false;
  }
  /** Return a builder for adding a step to the batch. */
  step() {
    return new BatchStep(this);
  }
  /** Execute the batch. */
  execute() {
    if (this.#executed) {
      throw new MisuseError("This batch has already been executed");
    }
    this.#executed = true;
    const batch = {
      steps: this._steps.map((step) => step.proto)
    };
    if (this.#useCursor) {
      return executeCursor(this._stream, this._steps, batch);
    } else {
      return executeRegular(this._stream, this._steps, batch);
    }
  }
};
function executeRegular(stream, steps, batch) {
  return stream._batch(batch).then((result) => {
    for (let step = 0; step < steps.length; ++step) {
      const stepResult = result.stepResults.get(step);
      const stepError = result.stepErrors.get(step);
      steps[step].callback(stepResult, stepError);
    }
  });
}
__name(executeRegular, "executeRegular");
async function executeCursor(stream, steps, batch) {
  const cursor = await stream._openCursor(batch);
  try {
    let nextStep = 0;
    let beginEntry = void 0;
    let rows = [];
    for (; ; ) {
      const entry = await cursor.next();
      if (entry === void 0) {
        break;
      }
      if (entry.type === "step_begin") {
        if (entry.step < nextStep || entry.step >= steps.length) {
          throw new ProtoError("Server produced StepBeginEntry for unexpected step");
        } else if (beginEntry !== void 0) {
          throw new ProtoError("Server produced StepBeginEntry before terminating previous step");
        }
        for (let step = nextStep; step < entry.step; ++step) {
          steps[step].callback(void 0, void 0);
        }
        nextStep = entry.step + 1;
        beginEntry = entry;
        rows = [];
      } else if (entry.type === "step_end") {
        if (beginEntry === void 0) {
          throw new ProtoError("Server produced StepEndEntry but no step is active");
        }
        const stmtResult = {
          cols: beginEntry.cols,
          rows,
          affectedRowCount: entry.affectedRowCount,
          lastInsertRowid: entry.lastInsertRowid
        };
        steps[beginEntry.step].callback(stmtResult, void 0);
        beginEntry = void 0;
        rows = [];
      } else if (entry.type === "step_error") {
        if (beginEntry === void 0) {
          if (entry.step >= steps.length) {
            throw new ProtoError("Server produced StepErrorEntry for unexpected step");
          }
          for (let step = nextStep; step < entry.step; ++step) {
            steps[step].callback(void 0, void 0);
          }
        } else {
          if (entry.step !== beginEntry.step) {
            throw new ProtoError("Server produced StepErrorEntry for unexpected step");
          }
          beginEntry = void 0;
          rows = [];
        }
        steps[entry.step].callback(void 0, entry.error);
        nextStep = entry.step + 1;
      } else if (entry.type === "row") {
        if (beginEntry === void 0) {
          throw new ProtoError("Server produced RowEntry but no step is active");
        }
        rows.push(entry.row);
      } else if (entry.type === "error") {
        throw errorFromProto(entry.error);
      } else if (entry.type === "none") {
        throw new ProtoError("Server produced unrecognized CursorEntry");
      } else {
        throw impossible(entry, "Impossible CursorEntry");
      }
    }
    if (beginEntry !== void 0) {
      throw new ProtoError("Server closed Cursor before terminating active step");
    }
    for (let step = nextStep; step < steps.length; ++step) {
      steps[step].callback(void 0, void 0);
    }
  } finally {
    cursor.close();
  }
}
__name(executeCursor, "executeCursor");
var BatchStep = class {
  static {
    __name(this, "BatchStep");
  }
  /** @private */
  _batch;
  #conds;
  /** @private */
  _index;
  /** @private */
  constructor(batch) {
    this._batch = batch;
    this.#conds = [];
    this._index = void 0;
  }
  /** Add the condition that needs to be satisfied to execute the statement. If you use this method multiple
   * times, we join the conditions with a logical AND. */
  condition(cond) {
    this.#conds.push(cond._proto);
    return this;
  }
  /** Add a statement that returns rows. */
  query(stmt) {
    return this.#add(stmt, true, rowsResultFromProto);
  }
  /** Add a statement that returns at most a single row. */
  queryRow(stmt) {
    return this.#add(stmt, true, rowResultFromProto);
  }
  /** Add a statement that returns at most a single value. */
  queryValue(stmt) {
    return this.#add(stmt, true, valueResultFromProto);
  }
  /** Add a statement without returning rows. */
  run(stmt) {
    return this.#add(stmt, false, stmtResultFromProto);
  }
  #add(inStmt, wantRows, fromProto) {
    if (this._index !== void 0) {
      throw new MisuseError("This BatchStep has already been added to the batch");
    }
    const stmt = stmtToProto(this._batch._stream._sqlOwner(), inStmt, wantRows);
    let condition;
    if (this.#conds.length === 0) {
      condition = void 0;
    } else if (this.#conds.length === 1) {
      condition = this.#conds[0];
    } else {
      condition = { type: "and", conds: this.#conds.slice() };
    }
    const proto = { stmt, condition };
    return new Promise((outputCallback, errorCallback) => {
      const callback = /* @__PURE__ */ __name((stepResult, stepError) => {
        if (stepResult !== void 0 && stepError !== void 0) {
          errorCallback(new ProtoError("Server returned both result and error"));
        } else if (stepError !== void 0) {
          errorCallback(errorFromProto(stepError));
        } else if (stepResult !== void 0) {
          outputCallback(fromProto(stepResult, this._batch._stream.intMode));
        } else {
          outputCallback(void 0);
        }
      }, "callback");
      this._index = this._batch._steps.length;
      this._batch._steps.push({ proto, callback });
    });
  }
};
var BatchCond = class _BatchCond {
  static {
    __name(this, "BatchCond");
  }
  /** @private */
  _batch;
  /** @private */
  _proto;
  /** @private */
  constructor(batch, proto) {
    this._batch = batch;
    this._proto = proto;
  }
  /** Create a condition that evaluates to true when the given step executes successfully.
   *
   * If the given step fails error or is skipped because its condition evaluated to false, this
   * condition evaluates to false.
   */
  static ok(step) {
    return new _BatchCond(step._batch, { type: "ok", step: stepIndex(step) });
  }
  /** Create a condition that evaluates to true when the given step fails.
   *
   * If the given step succeeds or is skipped because its condition evaluated to false, this condition
   * evaluates to false.
   */
  static error(step) {
    return new _BatchCond(step._batch, { type: "error", step: stepIndex(step) });
  }
  /** Create a condition that is a logical negation of another condition.
   */
  static not(cond) {
    return new _BatchCond(cond._batch, { type: "not", cond: cond._proto });
  }
  /** Create a condition that is a logical AND of other conditions.
   */
  static and(batch, conds) {
    for (const cond of conds) {
      checkCondBatch(batch, cond);
    }
    return new _BatchCond(batch, { type: "and", conds: conds.map((e) => e._proto) });
  }
  /** Create a condition that is a logical OR of other conditions.
   */
  static or(batch, conds) {
    for (const cond of conds) {
      checkCondBatch(batch, cond);
    }
    return new _BatchCond(batch, { type: "or", conds: conds.map((e) => e._proto) });
  }
  /** Create a condition that evaluates to true when the SQL connection is in autocommit mode (not inside an
   * explicit transaction). This requires protocol version 3 or higher.
   */
  static isAutocommit(batch) {
    batch._stream.client()._ensureVersion(3, "BatchCond.isAutocommit()");
    return new _BatchCond(batch, { type: "is_autocommit" });
  }
};
function stepIndex(step) {
  if (step._index === void 0) {
    throw new MisuseError("Cannot add a condition referencing a step that has not been added to the batch");
  }
  return step._index;
}
__name(stepIndex, "stepIndex");
function checkCondBatch(expectedBatch, cond) {
  if (cond._batch !== expectedBatch) {
    throw new MisuseError("Cannot mix BatchCond objects for different Batch objects");
  }
}
__name(checkCondBatch, "checkCondBatch");

// node_modules/@libsql/hrana-client/lib-esm/describe.js
init_modules_watch_stub();
function describeResultFromProto(result) {
  return {
    paramNames: result.params.map((p) => p.name),
    columns: result.cols,
    isExplain: result.isExplain,
    isReadonly: result.isReadonly
  };
}
__name(describeResultFromProto, "describeResultFromProto");

// node_modules/@libsql/hrana-client/lib-esm/stream.js
var Stream = class {
  static {
    __name(this, "Stream");
  }
  /** @private */
  constructor(intMode) {
    this.intMode = intMode;
  }
  /** Execute a statement and return rows. */
  query(stmt) {
    return this.#execute(stmt, true, rowsResultFromProto);
  }
  /** Execute a statement and return at most a single row. */
  queryRow(stmt) {
    return this.#execute(stmt, true, rowResultFromProto);
  }
  /** Execute a statement and return at most a single value. */
  queryValue(stmt) {
    return this.#execute(stmt, true, valueResultFromProto);
  }
  /** Execute a statement without returning rows. */
  run(stmt) {
    return this.#execute(stmt, false, stmtResultFromProto);
  }
  #execute(inStmt, wantRows, fromProto) {
    const stmt = stmtToProto(this._sqlOwner(), inStmt, wantRows);
    return this._execute(stmt).then((r) => fromProto(r, this.intMode));
  }
  /** Return a builder for creating and executing a batch.
   *
   * If `useCursor` is true, the batch will be executed using a Hrana cursor, which will stream results from
   * the server to the client, which consumes less memory on the server. This requires protocol version 3 or
   * higher.
   */
  batch(useCursor = false) {
    return new Batch(this, useCursor);
  }
  /** Parse and analyze a statement. This requires protocol version 2 or higher. */
  describe(inSql) {
    const protoSql = sqlToProto(this._sqlOwner(), inSql);
    return this._describe(protoSql).then(describeResultFromProto);
  }
  /** Execute a sequence of statements separated by semicolons. This requires protocol version 2 or higher.
   * */
  sequence(inSql) {
    const protoSql = sqlToProto(this._sqlOwner(), inSql);
    return this._sequence(protoSql);
  }
  /** Representation of integers returned from the database. See {@link IntMode}.
   *
   * This value affects the results of all operations on this stream.
   */
  intMode;
};

// node_modules/@libsql/hrana-client/lib-esm/ws/cursor.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/cursor.js
init_modules_watch_stub();
var Cursor = class {
  static {
    __name(this, "Cursor");
  }
};

// node_modules/@libsql/hrana-client/lib-esm/ws/cursor.js
var fetchChunkSize = 1e3;
var fetchQueueSize = 10;
var WsCursor = class extends Cursor {
  static {
    __name(this, "WsCursor");
  }
  #client;
  #stream;
  #cursorId;
  #entryQueue;
  #fetchQueue;
  #closed;
  #done;
  /** @private */
  constructor(client, stream, cursorId) {
    super();
    this.#client = client;
    this.#stream = stream;
    this.#cursorId = cursorId;
    this.#entryQueue = new Queue();
    this.#fetchQueue = new Queue();
    this.#closed = void 0;
    this.#done = false;
  }
  /** Fetch the next entry from the cursor. */
  async next() {
    for (; ; ) {
      if (this.#closed !== void 0) {
        throw new ClosedError("Cursor is closed", this.#closed);
      }
      while (!this.#done && this.#fetchQueue.length < fetchQueueSize) {
        this.#fetchQueue.push(this.#fetch());
      }
      const entry = this.#entryQueue.shift();
      if (this.#done || entry !== void 0) {
        return entry;
      }
      await this.#fetchQueue.shift().then((response) => {
        if (response === void 0) {
          return;
        }
        for (const entry2 of response.entries) {
          this.#entryQueue.push(entry2);
        }
        this.#done ||= response.done;
      });
    }
  }
  #fetch() {
    return this.#stream._sendCursorRequest(this, {
      type: "fetch_cursor",
      cursorId: this.#cursorId,
      maxCount: fetchChunkSize
    }).then((resp) => resp, (error) => {
      this._setClosed(error);
      return void 0;
    });
  }
  /** @private */
  _setClosed(error) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error;
    this.#stream._sendCursorRequest(this, {
      type: "close_cursor",
      cursorId: this.#cursorId
    }).catch(() => void 0);
    this.#stream._cursorClosed(this);
  }
  /** Close the cursor. */
  close() {
    this._setClosed(new ClientError("Cursor was manually closed"));
  }
  /** True if the cursor is closed. */
  get closed() {
    return this.#closed !== void 0;
  }
};

// node_modules/@libsql/hrana-client/lib-esm/ws/stream.js
var WsStream = class _WsStream extends Stream {
  static {
    __name(this, "WsStream");
  }
  #client;
  #streamId;
  #queue;
  #cursor;
  #closing;
  #closed;
  /** @private */
  static open(client) {
    const streamId = client._streamIdAlloc.alloc();
    const stream = new _WsStream(client, streamId);
    const responseCallback = /* @__PURE__ */ __name(() => void 0, "responseCallback");
    const errorCallback = /* @__PURE__ */ __name((e) => stream.#setClosed(e), "errorCallback");
    const request = { type: "open_stream", streamId };
    client._sendRequest(request, { responseCallback, errorCallback });
    return stream;
  }
  /** @private */
  constructor(client, streamId) {
    super(client.intMode);
    this.#client = client;
    this.#streamId = streamId;
    this.#queue = new Queue();
    this.#cursor = void 0;
    this.#closing = false;
    this.#closed = void 0;
  }
  /** Get the {@link WsClient} object that this stream belongs to. */
  client() {
    return this.#client;
  }
  /** @private */
  _sqlOwner() {
    return this.#client;
  }
  /** @private */
  _execute(stmt) {
    return this.#sendStreamRequest({
      type: "execute",
      streamId: this.#streamId,
      stmt
    }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _batch(batch) {
    return this.#sendStreamRequest({
      type: "batch",
      streamId: this.#streamId,
      batch
    }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _describe(protoSql) {
    this.#client._ensureVersion(2, "describe()");
    return this.#sendStreamRequest({
      type: "describe",
      streamId: this.#streamId,
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _sequence(protoSql) {
    this.#client._ensureVersion(2, "sequence()");
    return this.#sendStreamRequest({
      type: "sequence",
      streamId: this.#streamId,
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((_response) => {
      return void 0;
    });
  }
  /** Check whether the SQL connection underlying this stream is in autocommit state (i.e., outside of an
   * explicit transaction). This requires protocol version 3 or higher.
   */
  getAutocommit() {
    this.#client._ensureVersion(3, "getAutocommit()");
    return this.#sendStreamRequest({
      type: "get_autocommit",
      streamId: this.#streamId
    }).then((response) => {
      return response.isAutocommit;
    });
  }
  #sendStreamRequest(request) {
    return new Promise((responseCallback, errorCallback) => {
      this.#pushToQueue({ type: "request", request, responseCallback, errorCallback });
    });
  }
  /** @private */
  _openCursor(batch) {
    this.#client._ensureVersion(3, "cursor");
    return new Promise((cursorCallback, errorCallback) => {
      this.#pushToQueue({ type: "cursor", batch, cursorCallback, errorCallback });
    });
  }
  /** @private */
  _sendCursorRequest(cursor, request) {
    if (cursor !== this.#cursor) {
      throw new InternalError("Cursor not associated with the stream attempted to execute a request");
    }
    return new Promise((responseCallback, errorCallback) => {
      if (this.#closed !== void 0) {
        errorCallback(new ClosedError("Stream is closed", this.#closed));
      } else {
        this.#client._sendRequest(request, { responseCallback, errorCallback });
      }
    });
  }
  /** @private */
  _cursorClosed(cursor) {
    if (cursor !== this.#cursor) {
      throw new InternalError("Cursor was closed, but it was not associated with the stream");
    }
    this.#cursor = void 0;
    this.#flushQueue();
  }
  #pushToQueue(entry) {
    if (this.#closed !== void 0) {
      entry.errorCallback(new ClosedError("Stream is closed", this.#closed));
    } else if (this.#closing) {
      entry.errorCallback(new ClosedError("Stream is closing", void 0));
    } else {
      this.#queue.push(entry);
      this.#flushQueue();
    }
  }
  #flushQueue() {
    for (; ; ) {
      const entry = this.#queue.first();
      if (entry === void 0 && this.#cursor === void 0 && this.#closing) {
        this.#setClosed(new ClientError("Stream was gracefully closed"));
        break;
      } else if (entry?.type === "request" && this.#cursor === void 0) {
        const { request, responseCallback, errorCallback } = entry;
        this.#queue.shift();
        this.#client._sendRequest(request, { responseCallback, errorCallback });
      } else if (entry?.type === "cursor" && this.#cursor === void 0) {
        const { batch, cursorCallback } = entry;
        this.#queue.shift();
        const cursorId = this.#client._cursorIdAlloc.alloc();
        const cursor = new WsCursor(this.#client, this, cursorId);
        const request = {
          type: "open_cursor",
          streamId: this.#streamId,
          cursorId,
          batch
        };
        const responseCallback = /* @__PURE__ */ __name(() => void 0, "responseCallback");
        const errorCallback = /* @__PURE__ */ __name((e) => cursor._setClosed(e), "errorCallback");
        this.#client._sendRequest(request, { responseCallback, errorCallback });
        this.#cursor = cursor;
        cursorCallback(cursor);
      } else {
        break;
      }
    }
  }
  #setClosed(error) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error;
    if (this.#cursor !== void 0) {
      this.#cursor._setClosed(error);
    }
    for (; ; ) {
      const entry = this.#queue.shift();
      if (entry !== void 0) {
        entry.errorCallback(error);
      } else {
        break;
      }
    }
    const request = { type: "close_stream", streamId: this.#streamId };
    const responseCallback = /* @__PURE__ */ __name(() => this.#client._streamIdAlloc.free(this.#streamId), "responseCallback");
    const errorCallback = /* @__PURE__ */ __name(() => void 0, "errorCallback");
    this.#client._sendRequest(request, { responseCallback, errorCallback });
  }
  /** Immediately close the stream. */
  close() {
    this.#setClosed(new ClientError("Stream was manually closed"));
  }
  /** Gracefully close the stream. */
  closeGracefully() {
    this.#closing = true;
    this.#flushQueue();
  }
  /** True if the stream is closed or closing. */
  get closed() {
    return this.#closed !== void 0 || this.#closing;
  }
};

// node_modules/@libsql/hrana-client/lib-esm/ws/json_encode.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/shared/json_encode.js
init_modules_watch_stub();
function Stmt2(w, msg) {
  if (msg.sql !== void 0) {
    w.string("sql", msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.number("sql_id", msg.sqlId);
  }
  w.arrayObjects("args", msg.args, Value);
  w.arrayObjects("named_args", msg.namedArgs, NamedArg);
  w.boolean("want_rows", msg.wantRows);
}
__name(Stmt2, "Stmt");
function NamedArg(w, msg) {
  w.string("name", msg.name);
  w.object("value", msg.value, Value);
}
__name(NamedArg, "NamedArg");
function Batch2(w, msg) {
  w.arrayObjects("steps", msg.steps, BatchStep2);
}
__name(Batch2, "Batch");
function BatchStep2(w, msg) {
  if (msg.condition !== void 0) {
    w.object("condition", msg.condition, BatchCond2);
  }
  w.object("stmt", msg.stmt, Stmt2);
}
__name(BatchStep2, "BatchStep");
function BatchCond2(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "ok" || msg.type === "error") {
    w.number("step", msg.step);
  } else if (msg.type === "not") {
    w.object("cond", msg.cond, BatchCond2);
  } else if (msg.type === "and" || msg.type === "or") {
    w.arrayObjects("conds", msg.conds, BatchCond2);
  } else if (msg.type === "is_autocommit") {
  } else {
    throw impossible(msg, "Impossible type of BatchCond");
  }
}
__name(BatchCond2, "BatchCond");
function Value(w, msg) {
  if (msg === null) {
    w.stringRaw("type", "null");
  } else if (typeof msg === "bigint") {
    w.stringRaw("type", "integer");
    w.stringRaw("value", "" + msg);
  } else if (typeof msg === "number") {
    w.stringRaw("type", "float");
    w.number("value", msg);
  } else if (typeof msg === "string") {
    w.stringRaw("type", "text");
    w.string("value", msg);
  } else if (msg instanceof Uint8Array) {
    w.stringRaw("type", "blob");
    w.stringRaw("base64", gBase64.fromUint8Array(msg));
  } else if (msg === void 0) {
  } else {
    throw impossible(msg, "Impossible type of Value");
  }
}
__name(Value, "Value");

// node_modules/@libsql/hrana-client/lib-esm/ws/json_encode.js
function ClientMsg(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "hello") {
    if (msg.jwt !== void 0) {
      w.string("jwt", msg.jwt);
    }
  } else if (msg.type === "request") {
    w.number("request_id", msg.requestId);
    w.object("request", msg.request, Request2);
  } else {
    throw impossible(msg, "Impossible type of ClientMsg");
  }
}
__name(ClientMsg, "ClientMsg");
function Request2(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "open_stream") {
    w.number("stream_id", msg.streamId);
  } else if (msg.type === "close_stream") {
    w.number("stream_id", msg.streamId);
  } else if (msg.type === "execute") {
    w.number("stream_id", msg.streamId);
    w.object("stmt", msg.stmt, Stmt2);
  } else if (msg.type === "batch") {
    w.number("stream_id", msg.streamId);
    w.object("batch", msg.batch, Batch2);
  } else if (msg.type === "open_cursor") {
    w.number("stream_id", msg.streamId);
    w.number("cursor_id", msg.cursorId);
    w.object("batch", msg.batch, Batch2);
  } else if (msg.type === "close_cursor") {
    w.number("cursor_id", msg.cursorId);
  } else if (msg.type === "fetch_cursor") {
    w.number("cursor_id", msg.cursorId);
    w.number("max_count", msg.maxCount);
  } else if (msg.type === "sequence") {
    w.number("stream_id", msg.streamId);
    if (msg.sql !== void 0) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== void 0) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "describe") {
    w.number("stream_id", msg.streamId);
    if (msg.sql !== void 0) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== void 0) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "store_sql") {
    w.number("sql_id", msg.sqlId);
    w.string("sql", msg.sql);
  } else if (msg.type === "close_sql") {
    w.number("sql_id", msg.sqlId);
  } else if (msg.type === "get_autocommit") {
    w.number("stream_id", msg.streamId);
  } else {
    throw impossible(msg, "Impossible type of Request");
  }
}
__name(Request2, "Request");

// node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_encode.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_encode.js
init_modules_watch_stub();
function Stmt3(w, msg) {
  if (msg.sql !== void 0) {
    w.string(1, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(2, msg.sqlId);
  }
  for (const arg of msg.args) {
    w.message(3, arg, Value2);
  }
  for (const arg of msg.namedArgs) {
    w.message(4, arg, NamedArg2);
  }
  w.bool(5, msg.wantRows);
}
__name(Stmt3, "Stmt");
function NamedArg2(w, msg) {
  w.string(1, msg.name);
  w.message(2, msg.value, Value2);
}
__name(NamedArg2, "NamedArg");
function Batch3(w, msg) {
  for (const step of msg.steps) {
    w.message(1, step, BatchStep3);
  }
}
__name(Batch3, "Batch");
function BatchStep3(w, msg) {
  if (msg.condition !== void 0) {
    w.message(1, msg.condition, BatchCond3);
  }
  w.message(2, msg.stmt, Stmt3);
}
__name(BatchStep3, "BatchStep");
function BatchCond3(w, msg) {
  if (msg.type === "ok") {
    w.uint32(1, msg.step);
  } else if (msg.type === "error") {
    w.uint32(2, msg.step);
  } else if (msg.type === "not") {
    w.message(3, msg.cond, BatchCond3);
  } else if (msg.type === "and") {
    w.message(4, msg.conds, BatchCondList);
  } else if (msg.type === "or") {
    w.message(5, msg.conds, BatchCondList);
  } else if (msg.type === "is_autocommit") {
    w.message(6, void 0, Empty);
  } else {
    throw impossible(msg, "Impossible type of BatchCond");
  }
}
__name(BatchCond3, "BatchCond");
function BatchCondList(w, msg) {
  for (const cond of msg) {
    w.message(1, cond, BatchCond3);
  }
}
__name(BatchCondList, "BatchCondList");
function Value2(w, msg) {
  if (msg === null) {
    w.message(1, void 0, Empty);
  } else if (typeof msg === "bigint") {
    w.sint64(2, msg);
  } else if (typeof msg === "number") {
    w.double(3, msg);
  } else if (typeof msg === "string") {
    w.string(4, msg);
  } else if (msg instanceof Uint8Array) {
    w.bytes(5, msg);
  } else if (msg === void 0) {
  } else {
    throw impossible(msg, "Impossible type of Value");
  }
}
__name(Value2, "Value");
function Empty(_w, _msg) {
}
__name(Empty, "Empty");

// node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_encode.js
function ClientMsg2(w, msg) {
  if (msg.type === "hello") {
    w.message(1, msg, HelloMsg);
  } else if (msg.type === "request") {
    w.message(2, msg, RequestMsg);
  } else {
    throw impossible(msg, "Impossible type of ClientMsg");
  }
}
__name(ClientMsg2, "ClientMsg");
function HelloMsg(w, msg) {
  if (msg.jwt !== void 0) {
    w.string(1, msg.jwt);
  }
}
__name(HelloMsg, "HelloMsg");
function RequestMsg(w, msg) {
  w.int32(1, msg.requestId);
  const request = msg.request;
  if (request.type === "open_stream") {
    w.message(2, request, OpenStreamReq);
  } else if (request.type === "close_stream") {
    w.message(3, request, CloseStreamReq);
  } else if (request.type === "execute") {
    w.message(4, request, ExecuteReq);
  } else if (request.type === "batch") {
    w.message(5, request, BatchReq);
  } else if (request.type === "open_cursor") {
    w.message(6, request, OpenCursorReq);
  } else if (request.type === "close_cursor") {
    w.message(7, request, CloseCursorReq);
  } else if (request.type === "fetch_cursor") {
    w.message(8, request, FetchCursorReq);
  } else if (request.type === "sequence") {
    w.message(9, request, SequenceReq);
  } else if (request.type === "describe") {
    w.message(10, request, DescribeReq);
  } else if (request.type === "store_sql") {
    w.message(11, request, StoreSqlReq);
  } else if (request.type === "close_sql") {
    w.message(12, request, CloseSqlReq);
  } else if (request.type === "get_autocommit") {
    w.message(13, request, GetAutocommitReq);
  } else {
    throw impossible(request, "Impossible type of Request");
  }
}
__name(RequestMsg, "RequestMsg");
function OpenStreamReq(w, msg) {
  w.int32(1, msg.streamId);
}
__name(OpenStreamReq, "OpenStreamReq");
function CloseStreamReq(w, msg) {
  w.int32(1, msg.streamId);
}
__name(CloseStreamReq, "CloseStreamReq");
function ExecuteReq(w, msg) {
  w.int32(1, msg.streamId);
  w.message(2, msg.stmt, Stmt3);
}
__name(ExecuteReq, "ExecuteReq");
function BatchReq(w, msg) {
  w.int32(1, msg.streamId);
  w.message(2, msg.batch, Batch3);
}
__name(BatchReq, "BatchReq");
function OpenCursorReq(w, msg) {
  w.int32(1, msg.streamId);
  w.int32(2, msg.cursorId);
  w.message(3, msg.batch, Batch3);
}
__name(OpenCursorReq, "OpenCursorReq");
function CloseCursorReq(w, msg) {
  w.int32(1, msg.cursorId);
}
__name(CloseCursorReq, "CloseCursorReq");
function FetchCursorReq(w, msg) {
  w.int32(1, msg.cursorId);
  w.uint32(2, msg.maxCount);
}
__name(FetchCursorReq, "FetchCursorReq");
function SequenceReq(w, msg) {
  w.int32(1, msg.streamId);
  if (msg.sql !== void 0) {
    w.string(2, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(3, msg.sqlId);
  }
}
__name(SequenceReq, "SequenceReq");
function DescribeReq(w, msg) {
  w.int32(1, msg.streamId);
  if (msg.sql !== void 0) {
    w.string(2, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(3, msg.sqlId);
  }
}
__name(DescribeReq, "DescribeReq");
function StoreSqlReq(w, msg) {
  w.int32(1, msg.sqlId);
  w.string(2, msg.sql);
}
__name(StoreSqlReq, "StoreSqlReq");
function CloseSqlReq(w, msg) {
  w.int32(1, msg.sqlId);
}
__name(CloseSqlReq, "CloseSqlReq");
function GetAutocommitReq(w, msg) {
  w.int32(1, msg.streamId);
}
__name(GetAutocommitReq, "GetAutocommitReq");

// node_modules/@libsql/hrana-client/lib-esm/ws/json_decode.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/shared/json_decode.js
init_modules_watch_stub();
function Error2(obj) {
  const message = string(obj["message"]);
  const code = stringOpt(obj["code"]);
  return { message, code };
}
__name(Error2, "Error");
function StmtResult(obj) {
  const cols = arrayObjectsMap(obj["cols"], Col);
  const rows = array(obj["rows"]).map((rowObj) => arrayObjectsMap(rowObj, Value3));
  const affectedRowCount = number(obj["affected_row_count"]);
  const lastInsertRowidStr = stringOpt(obj["last_insert_rowid"]);
  const lastInsertRowid = lastInsertRowidStr !== void 0 ? BigInt(lastInsertRowidStr) : void 0;
  return { cols, rows, affectedRowCount, lastInsertRowid };
}
__name(StmtResult, "StmtResult");
function Col(obj) {
  const name = stringOpt(obj["name"]);
  const decltype = stringOpt(obj["decltype"]);
  return { name, decltype };
}
__name(Col, "Col");
function BatchResult(obj) {
  const stepResults = /* @__PURE__ */ new Map();
  array(obj["step_results"]).forEach((value, i) => {
    if (value !== null) {
      stepResults.set(i, StmtResult(object(value)));
    }
  });
  const stepErrors = /* @__PURE__ */ new Map();
  array(obj["step_errors"]).forEach((value, i) => {
    if (value !== null) {
      stepErrors.set(i, Error2(object(value)));
    }
  });
  return { stepResults, stepErrors };
}
__name(BatchResult, "BatchResult");
function CursorEntry(obj) {
  const type = string(obj["type"]);
  if (type === "step_begin") {
    const step = number(obj["step"]);
    const cols = arrayObjectsMap(obj["cols"], Col);
    return { type: "step_begin", step, cols };
  } else if (type === "step_end") {
    const affectedRowCount = number(obj["affected_row_count"]);
    const lastInsertRowidStr = stringOpt(obj["last_insert_rowid"]);
    const lastInsertRowid = lastInsertRowidStr !== void 0 ? BigInt(lastInsertRowidStr) : void 0;
    return { type: "step_end", affectedRowCount, lastInsertRowid };
  } else if (type === "step_error") {
    const step = number(obj["step"]);
    const error = Error2(object(obj["error"]));
    return { type: "step_error", step, error };
  } else if (type === "row") {
    const row = arrayObjectsMap(obj["row"], Value3);
    return { type: "row", row };
  } else if (type === "error") {
    const error = Error2(object(obj["error"]));
    return { type: "error", error };
  } else {
    throw new ProtoError("Unexpected type of CursorEntry");
  }
}
__name(CursorEntry, "CursorEntry");
function DescribeResult(obj) {
  const params = arrayObjectsMap(obj["params"], DescribeParam);
  const cols = arrayObjectsMap(obj["cols"], DescribeCol);
  const isExplain = boolean(obj["is_explain"]);
  const isReadonly = boolean(obj["is_readonly"]);
  return { params, cols, isExplain, isReadonly };
}
__name(DescribeResult, "DescribeResult");
function DescribeParam(obj) {
  const name = stringOpt(obj["name"]);
  return { name };
}
__name(DescribeParam, "DescribeParam");
function DescribeCol(obj) {
  const name = string(obj["name"]);
  const decltype = stringOpt(obj["decltype"]);
  return { name, decltype };
}
__name(DescribeCol, "DescribeCol");
function Value3(obj) {
  const type = string(obj["type"]);
  if (type === "null") {
    return null;
  } else if (type === "integer") {
    const value = string(obj["value"]);
    return BigInt(value);
  } else if (type === "float") {
    return number(obj["value"]);
  } else if (type === "text") {
    return string(obj["value"]);
  } else if (type === "blob") {
    return gBase64.toUint8Array(string(obj["base64"]));
  } else {
    throw new ProtoError("Unexpected type of Value");
  }
}
__name(Value3, "Value");

// node_modules/@libsql/hrana-client/lib-esm/ws/json_decode.js
function ServerMsg(obj) {
  const type = string(obj["type"]);
  if (type === "hello_ok") {
    return { type: "hello_ok" };
  } else if (type === "hello_error") {
    const error = Error2(object(obj["error"]));
    return { type: "hello_error", error };
  } else if (type === "response_ok") {
    const requestId = number(obj["request_id"]);
    const response = Response2(object(obj["response"]));
    return { type: "response_ok", requestId, response };
  } else if (type === "response_error") {
    const requestId = number(obj["request_id"]);
    const error = Error2(object(obj["error"]));
    return { type: "response_error", requestId, error };
  } else {
    throw new ProtoError("Unexpected type of ServerMsg");
  }
}
__name(ServerMsg, "ServerMsg");
function Response2(obj) {
  const type = string(obj["type"]);
  if (type === "open_stream") {
    return { type: "open_stream" };
  } else if (type === "close_stream") {
    return { type: "close_stream" };
  } else if (type === "execute") {
    const result = StmtResult(object(obj["result"]));
    return { type: "execute", result };
  } else if (type === "batch") {
    const result = BatchResult(object(obj["result"]));
    return { type: "batch", result };
  } else if (type === "open_cursor") {
    return { type: "open_cursor" };
  } else if (type === "close_cursor") {
    return { type: "close_cursor" };
  } else if (type === "fetch_cursor") {
    const entries = arrayObjectsMap(obj["entries"], CursorEntry);
    const done = boolean(obj["done"]);
    return { type: "fetch_cursor", entries, done };
  } else if (type === "sequence") {
    return { type: "sequence" };
  } else if (type === "describe") {
    const result = DescribeResult(object(obj["result"]));
    return { type: "describe", result };
  } else if (type === "store_sql") {
    return { type: "store_sql" };
  } else if (type === "close_sql") {
    return { type: "close_sql" };
  } else if (type === "get_autocommit") {
    const isAutocommit = boolean(obj["is_autocommit"]);
    return { type: "get_autocommit", isAutocommit };
  } else {
    throw new ProtoError("Unexpected type of Response");
  }
}
__name(Response2, "Response");

// node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_decode.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_decode.js
init_modules_watch_stub();
var Error3 = {
  default() {
    return { message: "", code: void 0 };
  },
  1(r, msg) {
    msg.message = r.string();
  },
  2(r, msg) {
    msg.code = r.string();
  }
};
var StmtResult2 = {
  default() {
    return {
      cols: [],
      rows: [],
      affectedRowCount: 0,
      lastInsertRowid: void 0
    };
  },
  1(r, msg) {
    msg.cols.push(r.message(Col2));
  },
  2(r, msg) {
    msg.rows.push(r.message(Row));
  },
  3(r, msg) {
    msg.affectedRowCount = Number(r.uint64());
  },
  4(r, msg) {
    msg.lastInsertRowid = r.sint64();
  }
};
var Col2 = {
  default() {
    return { name: void 0, decltype: void 0 };
  },
  1(r, msg) {
    msg.name = r.string();
  },
  2(r, msg) {
    msg.decltype = r.string();
  }
};
var Row = {
  default() {
    return [];
  },
  1(r, msg) {
    msg.push(r.message(Value4));
  }
};
var BatchResult2 = {
  default() {
    return { stepResults: /* @__PURE__ */ new Map(), stepErrors: /* @__PURE__ */ new Map() };
  },
  1(r, msg) {
    const [key, value] = r.message(BatchResultStepResult);
    msg.stepResults.set(key, value);
  },
  2(r, msg) {
    const [key, value] = r.message(BatchResultStepError);
    msg.stepErrors.set(key, value);
  }
};
var BatchResultStepResult = {
  default() {
    return [0, StmtResult2.default()];
  },
  1(r, msg) {
    msg[0] = r.uint32();
  },
  2(r, msg) {
    msg[1] = r.message(StmtResult2);
  }
};
var BatchResultStepError = {
  default() {
    return [0, Error3.default()];
  },
  1(r, msg) {
    msg[0] = r.uint32();
  },
  2(r, msg) {
    msg[1] = r.message(Error3);
  }
};
var CursorEntry2 = {
  default() {
    return { type: "none" };
  },
  1(r) {
    return r.message(StepBeginEntry);
  },
  2(r) {
    return r.message(StepEndEntry);
  },
  3(r) {
    return r.message(StepErrorEntry);
  },
  4(r) {
    return { type: "row", row: r.message(Row) };
  },
  5(r) {
    return { type: "error", error: r.message(Error3) };
  }
};
var StepBeginEntry = {
  default() {
    return { type: "step_begin", step: 0, cols: [] };
  },
  1(r, msg) {
    msg.step = r.uint32();
  },
  2(r, msg) {
    msg.cols.push(r.message(Col2));
  }
};
var StepEndEntry = {
  default() {
    return {
      type: "step_end",
      affectedRowCount: 0,
      lastInsertRowid: void 0
    };
  },
  1(r, msg) {
    msg.affectedRowCount = r.uint32();
  },
  2(r, msg) {
    msg.lastInsertRowid = r.uint64();
  }
};
var StepErrorEntry = {
  default() {
    return {
      type: "step_error",
      step: 0,
      error: Error3.default()
    };
  },
  1(r, msg) {
    msg.step = r.uint32();
  },
  2(r, msg) {
    msg.error = r.message(Error3);
  }
};
var DescribeResult2 = {
  default() {
    return {
      params: [],
      cols: [],
      isExplain: false,
      isReadonly: false
    };
  },
  1(r, msg) {
    msg.params.push(r.message(DescribeParam2));
  },
  2(r, msg) {
    msg.cols.push(r.message(DescribeCol2));
  },
  3(r, msg) {
    msg.isExplain = r.bool();
  },
  4(r, msg) {
    msg.isReadonly = r.bool();
  }
};
var DescribeParam2 = {
  default() {
    return { name: void 0 };
  },
  1(r, msg) {
    msg.name = r.string();
  }
};
var DescribeCol2 = {
  default() {
    return { name: "", decltype: void 0 };
  },
  1(r, msg) {
    msg.name = r.string();
  },
  2(r, msg) {
    msg.decltype = r.string();
  }
};
var Value4 = {
  default() {
    return void 0;
  },
  1(r) {
    return null;
  },
  2(r) {
    return r.sint64();
  },
  3(r) {
    return r.double();
  },
  4(r) {
    return r.string();
  },
  5(r) {
    return r.bytes();
  }
};

// node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_decode.js
var ServerMsg2 = {
  default() {
    return { type: "none" };
  },
  1(r) {
    return { type: "hello_ok" };
  },
  2(r) {
    return r.message(HelloErrorMsg);
  },
  3(r) {
    return r.message(ResponseOkMsg);
  },
  4(r) {
    return r.message(ResponseErrorMsg);
  }
};
var HelloErrorMsg = {
  default() {
    return { type: "hello_error", error: Error3.default() };
  },
  1(r, msg) {
    msg.error = r.message(Error3);
  }
};
var ResponseErrorMsg = {
  default() {
    return { type: "response_error", requestId: 0, error: Error3.default() };
  },
  1(r, msg) {
    msg.requestId = r.int32();
  },
  2(r, msg) {
    msg.error = r.message(Error3);
  }
};
var ResponseOkMsg = {
  default() {
    return {
      type: "response_ok",
      requestId: 0,
      response: { type: "none" }
    };
  },
  1(r, msg) {
    msg.requestId = r.int32();
  },
  2(r, msg) {
    msg.response = { type: "open_stream" };
  },
  3(r, msg) {
    msg.response = { type: "close_stream" };
  },
  4(r, msg) {
    msg.response = r.message(ExecuteResp);
  },
  5(r, msg) {
    msg.response = r.message(BatchResp);
  },
  6(r, msg) {
    msg.response = { type: "open_cursor" };
  },
  7(r, msg) {
    msg.response = { type: "close_cursor" };
  },
  8(r, msg) {
    msg.response = r.message(FetchCursorResp);
  },
  9(r, msg) {
    msg.response = { type: "sequence" };
  },
  10(r, msg) {
    msg.response = r.message(DescribeResp);
  },
  11(r, msg) {
    msg.response = { type: "store_sql" };
  },
  12(r, msg) {
    msg.response = { type: "close_sql" };
  },
  13(r, msg) {
    msg.response = r.message(GetAutocommitResp);
  }
};
var ExecuteResp = {
  default() {
    return { type: "execute", result: StmtResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(StmtResult2);
  }
};
var BatchResp = {
  default() {
    return { type: "batch", result: BatchResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(BatchResult2);
  }
};
var FetchCursorResp = {
  default() {
    return { type: "fetch_cursor", entries: [], done: false };
  },
  1(r, msg) {
    msg.entries.push(r.message(CursorEntry2));
  },
  2(r, msg) {
    msg.done = r.bool();
  }
};
var DescribeResp = {
  default() {
    return { type: "describe", result: DescribeResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(DescribeResult2);
  }
};
var GetAutocommitResp = {
  default() {
    return { type: "get_autocommit", isAutocommit: false };
  },
  1(r, msg) {
    msg.isAutocommit = r.bool();
  }
};

// node_modules/@libsql/hrana-client/lib-esm/ws/client.js
var subprotocolsV2 = /* @__PURE__ */ new Map([
  ["hrana2", { version: 2, encoding: "json" }],
  ["hrana1", { version: 1, encoding: "json" }]
]);
var subprotocolsV3 = /* @__PURE__ */ new Map([
  ["hrana3-protobuf", { version: 3, encoding: "protobuf" }],
  ["hrana3", { version: 3, encoding: "json" }],
  ["hrana2", { version: 2, encoding: "json" }],
  ["hrana1", { version: 1, encoding: "json" }]
]);
var WsClient = class extends Client {
  static {
    __name(this, "WsClient");
  }
  #socket;
  // List of callbacks that we queue until the socket transitions from the CONNECTING to the OPEN state.
  #openCallbacks;
  // Have we already transitioned from CONNECTING to OPEN and fired the callbacks in #openCallbacks?
  #opened;
  // Stores the error that caused us to close the client (and the socket). If we are not closed, this is
  // `undefined`.
  #closed;
  // Have we received a response to our "hello" from the server?
  #recvdHello;
  // Subprotocol negotiated with the server. It is only available after the socket transitions to the OPEN
  // state.
  #subprotocol;
  // Has the `getVersion()` function been called? This is only used to validate that the API is used
  // correctly.
  #getVersionCalled;
  // A map from request id to the responses that we expect to receive from the server.
  #responseMap;
  // An allocator of request ids.
  #requestIdAlloc;
  // An allocator of stream ids.
  /** @private */
  _streamIdAlloc;
  // An allocator of cursor ids.
  /** @private */
  _cursorIdAlloc;
  // An allocator of SQL text ids.
  #sqlIdAlloc;
  /** @private */
  constructor(socket, jwt) {
    super();
    this.#socket = socket;
    this.#openCallbacks = [];
    this.#opened = false;
    this.#closed = void 0;
    this.#recvdHello = false;
    this.#subprotocol = void 0;
    this.#getVersionCalled = false;
    this.#responseMap = /* @__PURE__ */ new Map();
    this.#requestIdAlloc = new IdAlloc();
    this._streamIdAlloc = new IdAlloc();
    this._cursorIdAlloc = new IdAlloc();
    this.#sqlIdAlloc = new IdAlloc();
    this.#socket.binaryType = "arraybuffer";
    this.#socket.addEventListener("open", () => this.#onSocketOpen());
    this.#socket.addEventListener("close", (event) => this.#onSocketClose(event));
    this.#socket.addEventListener("error", (event) => this.#onSocketError(event));
    this.#socket.addEventListener("message", (event) => this.#onSocketMessage(event));
    this.#send({ type: "hello", jwt });
  }
  // Send (or enqueue to send) a message to the server.
  #send(msg) {
    if (this.#closed !== void 0) {
      throw new InternalError("Trying to send a message on a closed client");
    }
    if (this.#opened) {
      this.#sendToSocket(msg);
    } else {
      const openCallback = /* @__PURE__ */ __name(() => this.#sendToSocket(msg), "openCallback");
      const errorCallback = /* @__PURE__ */ __name(() => void 0, "errorCallback");
      this.#openCallbacks.push({ openCallback, errorCallback });
    }
  }
  // The socket transitioned from CONNECTING to OPEN
  #onSocketOpen() {
    const protocol = this.#socket.protocol;
    if (protocol === void 0) {
      this.#setClosed(new ClientError("The `WebSocket.protocol` property is undefined. This most likely means that the WebSocket implementation provided by the environment is broken. If you are using Miniflare 2, please update to Miniflare 3, which fixes this problem."));
      return;
    } else if (protocol === "") {
      this.#subprotocol = { version: 1, encoding: "json" };
    } else {
      this.#subprotocol = subprotocolsV3.get(protocol);
      if (this.#subprotocol === void 0) {
        this.#setClosed(new ProtoError(`Unrecognized WebSocket subprotocol: ${JSON.stringify(protocol)}`));
        return;
      }
    }
    for (const callbacks of this.#openCallbacks) {
      callbacks.openCallback();
    }
    this.#openCallbacks.length = 0;
    this.#opened = true;
  }
  #sendToSocket(msg) {
    const encoding = this.#subprotocol.encoding;
    if (encoding === "json") {
      const jsonMsg = writeJsonObject(msg, ClientMsg);
      this.#socket.send(jsonMsg);
    } else if (encoding === "protobuf") {
      const protobufMsg = writeProtobufMessage(msg, ClientMsg2);
      this.#socket.send(protobufMsg);
    } else {
      throw impossible(encoding, "Impossible encoding");
    }
  }
  /** Get the protocol version negotiated with the server, possibly waiting until the socket is open. */
  getVersion() {
    return new Promise((versionCallback, errorCallback) => {
      this.#getVersionCalled = true;
      if (this.#closed !== void 0) {
        errorCallback(this.#closed);
      } else if (!this.#opened) {
        const openCallback = /* @__PURE__ */ __name(() => versionCallback(this.#subprotocol.version), "openCallback");
        this.#openCallbacks.push({ openCallback, errorCallback });
      } else {
        versionCallback(this.#subprotocol.version);
      }
    });
  }
  // Make sure that the negotiated version is at least `minVersion`.
  /** @private */
  _ensureVersion(minVersion, feature) {
    if (this.#subprotocol === void 0 || !this.#getVersionCalled) {
      throw new ProtocolVersionError(`${feature} is supported only on protocol version ${minVersion} and higher, but the version supported by the WebSocket server is not yet known. Use Client.getVersion() to wait until the version is available.`);
    } else if (this.#subprotocol.version < minVersion) {
      throw new ProtocolVersionError(`${feature} is supported on protocol version ${minVersion} and higher, but the WebSocket server only supports version ${this.#subprotocol.version}`);
    }
  }
  // Send a request to the server and invoke a callback when we get the response.
  /** @private */
  _sendRequest(request, callbacks) {
    if (this.#closed !== void 0) {
      callbacks.errorCallback(new ClosedError("Client is closed", this.#closed));
      return;
    }
    const requestId = this.#requestIdAlloc.alloc();
    this.#responseMap.set(requestId, { ...callbacks, type: request.type });
    this.#send({ type: "request", requestId, request });
  }
  // The socket encountered an error.
  #onSocketError(event) {
    const eventMessage = event.message;
    const message = eventMessage ?? "WebSocket was closed due to an error";
    this.#setClosed(new WebSocketError(message));
  }
  // The socket was closed.
  #onSocketClose(event) {
    let message = `WebSocket was closed with code ${event.code}`;
    if (event.reason) {
      message += `: ${event.reason}`;
    }
    this.#setClosed(new WebSocketError(message));
  }
  // Close the client with the given error.
  #setClosed(error) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error;
    for (const callbacks of this.#openCallbacks) {
      callbacks.errorCallback(error);
    }
    this.#openCallbacks.length = 0;
    for (const [requestId, responseState] of this.#responseMap.entries()) {
      responseState.errorCallback(error);
      this.#requestIdAlloc.free(requestId);
    }
    this.#responseMap.clear();
    this.#socket.close();
  }
  // We received a message from the socket.
  #onSocketMessage(event) {
    if (this.#closed !== void 0) {
      return;
    }
    try {
      let msg;
      const encoding = this.#subprotocol.encoding;
      if (encoding === "json") {
        if (typeof event.data !== "string") {
          this.#socket.close(3003, "Only text messages are accepted with JSON encoding");
          this.#setClosed(new ProtoError("Received non-text message from server with JSON encoding"));
          return;
        }
        msg = readJsonObject(JSON.parse(event.data), ServerMsg);
      } else if (encoding === "protobuf") {
        if (!(event.data instanceof ArrayBuffer)) {
          this.#socket.close(3003, "Only binary messages are accepted with Protobuf encoding");
          this.#setClosed(new ProtoError("Received non-binary message from server with Protobuf encoding"));
          return;
        }
        msg = readProtobufMessage(new Uint8Array(event.data), ServerMsg2);
      } else {
        throw impossible(encoding, "Impossible encoding");
      }
      this.#handleMsg(msg);
    } catch (e) {
      this.#socket.close(3007, "Could not handle message");
      this.#setClosed(e);
    }
  }
  // Handle a message from the server.
  #handleMsg(msg) {
    if (msg.type === "none") {
      throw new ProtoError("Received an unrecognized ServerMsg");
    } else if (msg.type === "hello_ok" || msg.type === "hello_error") {
      if (this.#recvdHello) {
        throw new ProtoError("Received a duplicated hello response");
      }
      this.#recvdHello = true;
      if (msg.type === "hello_error") {
        throw errorFromProto(msg.error);
      }
      return;
    } else if (!this.#recvdHello) {
      throw new ProtoError("Received a non-hello message before a hello response");
    }
    if (msg.type === "response_ok") {
      const requestId = msg.requestId;
      const responseState = this.#responseMap.get(requestId);
      this.#responseMap.delete(requestId);
      if (responseState === void 0) {
        throw new ProtoError("Received unexpected OK response");
      }
      this.#requestIdAlloc.free(requestId);
      try {
        if (responseState.type !== msg.response.type) {
          console.dir({ responseState, msg });
          throw new ProtoError("Received unexpected type of response");
        }
        responseState.responseCallback(msg.response);
      } catch (e) {
        responseState.errorCallback(e);
        throw e;
      }
    } else if (msg.type === "response_error") {
      const requestId = msg.requestId;
      const responseState = this.#responseMap.get(requestId);
      this.#responseMap.delete(requestId);
      if (responseState === void 0) {
        throw new ProtoError("Received unexpected error response");
      }
      this.#requestIdAlloc.free(requestId);
      responseState.errorCallback(errorFromProto(msg.error));
    } else {
      throw impossible(msg, "Impossible ServerMsg type");
    }
  }
  /** Open a {@link WsStream}, a stream for executing SQL statements. */
  openStream() {
    return WsStream.open(this);
  }
  /** Cache a SQL text on the server. This requires protocol version 2 or higher. */
  storeSql(sql) {
    this._ensureVersion(2, "storeSql()");
    const sqlId = this.#sqlIdAlloc.alloc();
    const sqlObj = new Sql(this, sqlId);
    const responseCallback = /* @__PURE__ */ __name(() => void 0, "responseCallback");
    const errorCallback = /* @__PURE__ */ __name((e) => sqlObj._setClosed(e), "errorCallback");
    const request = { type: "store_sql", sqlId, sql };
    this._sendRequest(request, { responseCallback, errorCallback });
    return sqlObj;
  }
  /** @private */
  _closeSql(sqlId) {
    if (this.#closed !== void 0) {
      return;
    }
    const responseCallback = /* @__PURE__ */ __name(() => this.#sqlIdAlloc.free(sqlId), "responseCallback");
    const errorCallback = /* @__PURE__ */ __name((e) => this.#setClosed(e), "errorCallback");
    const request = { type: "close_sql", sqlId };
    this._sendRequest(request, { responseCallback, errorCallback });
  }
  /** Close the client and the WebSocket. */
  close() {
    this.#setClosed(new ClientError("Client was manually closed"));
  }
  /** True if the client is closed. */
  get closed() {
    return this.#closed !== void 0;
  }
};

// node_modules/@libsql/hrana-client/lib-esm/http/client.js
init_modules_watch_stub();

// node_modules/@libsql/isomorphic-fetch/web.js
init_modules_watch_stub();
var _fetch = fetch;
var _Request = Request;
var _Headers = Headers;

// node_modules/@libsql/hrana-client/lib-esm/http/stream.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/queue_microtask.js
init_modules_watch_stub();
var _queueMicrotask;
if (typeof queueMicrotask !== "undefined") {
  _queueMicrotask = queueMicrotask;
} else {
  const resolved = Promise.resolve();
  _queueMicrotask = /* @__PURE__ */ __name((callback) => {
    resolved.then(callback);
  }, "_queueMicrotask");
}

// node_modules/@libsql/hrana-client/lib-esm/http/cursor.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/byte_queue.js
init_modules_watch_stub();
var ByteQueue = class {
  static {
    __name(this, "ByteQueue");
  }
  #array;
  #shiftPos;
  #pushPos;
  constructor(initialCap) {
    this.#array = new Uint8Array(new ArrayBuffer(initialCap));
    this.#shiftPos = 0;
    this.#pushPos = 0;
  }
  get length() {
    return this.#pushPos - this.#shiftPos;
  }
  data() {
    return this.#array.slice(this.#shiftPos, this.#pushPos);
  }
  push(chunk) {
    this.#ensurePush(chunk.byteLength);
    this.#array.set(chunk, this.#pushPos);
    this.#pushPos += chunk.byteLength;
  }
  #ensurePush(pushLength) {
    if (this.#pushPos + pushLength <= this.#array.byteLength) {
      return;
    }
    const filledLength = this.#pushPos - this.#shiftPos;
    if (filledLength + pushLength <= this.#array.byteLength && 2 * this.#pushPos >= this.#array.byteLength) {
      this.#array.copyWithin(0, this.#shiftPos, this.#pushPos);
    } else {
      let newCap = this.#array.byteLength;
      do {
        newCap *= 2;
      } while (filledLength + pushLength > newCap);
      const newArray = new Uint8Array(new ArrayBuffer(newCap));
      newArray.set(this.#array.slice(this.#shiftPos, this.#pushPos), 0);
      this.#array = newArray;
    }
    this.#pushPos = filledLength;
    this.#shiftPos = 0;
  }
  shift(length) {
    this.#shiftPos += length;
  }
};

// node_modules/@libsql/hrana-client/lib-esm/http/json_decode.js
init_modules_watch_stub();
function PipelineRespBody(obj) {
  const baton = stringOpt(obj["baton"]);
  const baseUrl = stringOpt(obj["base_url"]);
  const results = arrayObjectsMap(obj["results"], StreamResult);
  return { baton, baseUrl, results };
}
__name(PipelineRespBody, "PipelineRespBody");
function StreamResult(obj) {
  const type = string(obj["type"]);
  if (type === "ok") {
    const response = StreamResponse(object(obj["response"]));
    return { type: "ok", response };
  } else if (type === "error") {
    const error = Error2(object(obj["error"]));
    return { type: "error", error };
  } else {
    throw new ProtoError("Unexpected type of StreamResult");
  }
}
__name(StreamResult, "StreamResult");
function StreamResponse(obj) {
  const type = string(obj["type"]);
  if (type === "close") {
    return { type: "close" };
  } else if (type === "execute") {
    const result = StmtResult(object(obj["result"]));
    return { type: "execute", result };
  } else if (type === "batch") {
    const result = BatchResult(object(obj["result"]));
    return { type: "batch", result };
  } else if (type === "sequence") {
    return { type: "sequence" };
  } else if (type === "describe") {
    const result = DescribeResult(object(obj["result"]));
    return { type: "describe", result };
  } else if (type === "store_sql") {
    return { type: "store_sql" };
  } else if (type === "close_sql") {
    return { type: "close_sql" };
  } else if (type === "get_autocommit") {
    const isAutocommit = boolean(obj["is_autocommit"]);
    return { type: "get_autocommit", isAutocommit };
  } else {
    throw new ProtoError("Unexpected type of StreamResponse");
  }
}
__name(StreamResponse, "StreamResponse");
function CursorRespBody(obj) {
  const baton = stringOpt(obj["baton"]);
  const baseUrl = stringOpt(obj["base_url"]);
  return { baton, baseUrl };
}
__name(CursorRespBody, "CursorRespBody");

// node_modules/@libsql/hrana-client/lib-esm/http/protobuf_decode.js
init_modules_watch_stub();
var PipelineRespBody2 = {
  default() {
    return { baton: void 0, baseUrl: void 0, results: [] };
  },
  1(r, msg) {
    msg.baton = r.string();
  },
  2(r, msg) {
    msg.baseUrl = r.string();
  },
  3(r, msg) {
    msg.results.push(r.message(StreamResult2));
  }
};
var StreamResult2 = {
  default() {
    return { type: "none" };
  },
  1(r) {
    return { type: "ok", response: r.message(StreamResponse2) };
  },
  2(r) {
    return { type: "error", error: r.message(Error3) };
  }
};
var StreamResponse2 = {
  default() {
    return { type: "none" };
  },
  1(r) {
    return { type: "close" };
  },
  2(r) {
    return r.message(ExecuteStreamResp);
  },
  3(r) {
    return r.message(BatchStreamResp);
  },
  4(r) {
    return { type: "sequence" };
  },
  5(r) {
    return r.message(DescribeStreamResp);
  },
  6(r) {
    return { type: "store_sql" };
  },
  7(r) {
    return { type: "close_sql" };
  },
  8(r) {
    return r.message(GetAutocommitStreamResp);
  }
};
var ExecuteStreamResp = {
  default() {
    return { type: "execute", result: StmtResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(StmtResult2);
  }
};
var BatchStreamResp = {
  default() {
    return { type: "batch", result: BatchResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(BatchResult2);
  }
};
var DescribeStreamResp = {
  default() {
    return { type: "describe", result: DescribeResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(DescribeResult2);
  }
};
var GetAutocommitStreamResp = {
  default() {
    return { type: "get_autocommit", isAutocommit: false };
  },
  1(r, msg) {
    msg.isAutocommit = r.bool();
  }
};
var CursorRespBody2 = {
  default() {
    return { baton: void 0, baseUrl: void 0 };
  },
  1(r, msg) {
    msg.baton = r.string();
  },
  2(r, msg) {
    msg.baseUrl = r.string();
  }
};

// node_modules/@libsql/hrana-client/lib-esm/http/cursor.js
var HttpCursor = class extends Cursor {
  static {
    __name(this, "HttpCursor");
  }
  #stream;
  #encoding;
  #reader;
  #queue;
  #closed;
  #done;
  /** @private */
  constructor(stream, encoding) {
    super();
    this.#stream = stream;
    this.#encoding = encoding;
    this.#reader = void 0;
    this.#queue = new ByteQueue(16 * 1024);
    this.#closed = void 0;
    this.#done = false;
  }
  async open(response) {
    if (response.body === null) {
      throw new ProtoError("No response body for cursor request");
    }
    this.#reader = response.body.getReader();
    const respBody = await this.#nextItem(CursorRespBody, CursorRespBody2);
    if (respBody === void 0) {
      throw new ProtoError("Empty response to cursor request");
    }
    return respBody;
  }
  /** Fetch the next entry from the cursor. */
  next() {
    return this.#nextItem(CursorEntry, CursorEntry2);
  }
  /** Close the cursor. */
  close() {
    this._setClosed(new ClientError("Cursor was manually closed"));
  }
  /** @private */
  _setClosed(error) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error;
    this.#stream._cursorClosed(this);
    if (this.#reader !== void 0) {
      this.#reader.cancel();
    }
  }
  /** True if the cursor is closed. */
  get closed() {
    return this.#closed !== void 0;
  }
  async #nextItem(jsonFun, protobufDef) {
    for (; ; ) {
      if (this.#done) {
        return void 0;
      } else if (this.#closed !== void 0) {
        throw new ClosedError("Cursor is closed", this.#closed);
      }
      if (this.#encoding === "json") {
        const jsonData = this.#parseItemJson();
        if (jsonData !== void 0) {
          const jsonText = new TextDecoder().decode(jsonData);
          const jsonValue = JSON.parse(jsonText);
          return readJsonObject(jsonValue, jsonFun);
        }
      } else if (this.#encoding === "protobuf") {
        const protobufData = this.#parseItemProtobuf();
        if (protobufData !== void 0) {
          return readProtobufMessage(protobufData, protobufDef);
        }
      } else {
        throw impossible(this.#encoding, "Impossible encoding");
      }
      if (this.#reader === void 0) {
        throw new InternalError("Attempted to read from HTTP cursor before it was opened");
      }
      const { value, done } = await this.#reader.read();
      if (done && this.#queue.length === 0) {
        this.#done = true;
      } else if (done) {
        throw new ProtoError("Unexpected end of cursor stream");
      } else {
        this.#queue.push(value);
      }
    }
  }
  #parseItemJson() {
    const data = this.#queue.data();
    const newlineByte = 10;
    const newlinePos = data.indexOf(newlineByte);
    if (newlinePos < 0) {
      return void 0;
    }
    const jsonData = data.slice(0, newlinePos);
    this.#queue.shift(newlinePos + 1);
    return jsonData;
  }
  #parseItemProtobuf() {
    const data = this.#queue.data();
    let varintValue = 0;
    let varintLength = 0;
    for (; ; ) {
      if (varintLength >= data.byteLength) {
        return void 0;
      }
      const byte = data[varintLength];
      varintValue |= (byte & 127) << 7 * varintLength;
      varintLength += 1;
      if (!(byte & 128)) {
        break;
      }
    }
    if (data.byteLength < varintLength + varintValue) {
      return void 0;
    }
    const protobufData = data.slice(varintLength, varintLength + varintValue);
    this.#queue.shift(varintLength + varintValue);
    return protobufData;
  }
};

// node_modules/@libsql/hrana-client/lib-esm/http/json_encode.js
init_modules_watch_stub();
function PipelineReqBody(w, msg) {
  if (msg.baton !== void 0) {
    w.string("baton", msg.baton);
  }
  w.arrayObjects("requests", msg.requests, StreamRequest);
}
__name(PipelineReqBody, "PipelineReqBody");
function StreamRequest(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "close") {
  } else if (msg.type === "execute") {
    w.object("stmt", msg.stmt, Stmt2);
  } else if (msg.type === "batch") {
    w.object("batch", msg.batch, Batch2);
  } else if (msg.type === "sequence") {
    if (msg.sql !== void 0) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== void 0) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "describe") {
    if (msg.sql !== void 0) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== void 0) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "store_sql") {
    w.number("sql_id", msg.sqlId);
    w.string("sql", msg.sql);
  } else if (msg.type === "close_sql") {
    w.number("sql_id", msg.sqlId);
  } else if (msg.type === "get_autocommit") {
  } else {
    throw impossible(msg, "Impossible type of StreamRequest");
  }
}
__name(StreamRequest, "StreamRequest");
function CursorReqBody(w, msg) {
  if (msg.baton !== void 0) {
    w.string("baton", msg.baton);
  }
  w.object("batch", msg.batch, Batch2);
}
__name(CursorReqBody, "CursorReqBody");

// node_modules/@libsql/hrana-client/lib-esm/http/protobuf_encode.js
init_modules_watch_stub();
function PipelineReqBody2(w, msg) {
  if (msg.baton !== void 0) {
    w.string(1, msg.baton);
  }
  for (const req of msg.requests) {
    w.message(2, req, StreamRequest2);
  }
}
__name(PipelineReqBody2, "PipelineReqBody");
function StreamRequest2(w, msg) {
  if (msg.type === "close") {
    w.message(1, msg, CloseStreamReq2);
  } else if (msg.type === "execute") {
    w.message(2, msg, ExecuteStreamReq);
  } else if (msg.type === "batch") {
    w.message(3, msg, BatchStreamReq);
  } else if (msg.type === "sequence") {
    w.message(4, msg, SequenceStreamReq);
  } else if (msg.type === "describe") {
    w.message(5, msg, DescribeStreamReq);
  } else if (msg.type === "store_sql") {
    w.message(6, msg, StoreSqlStreamReq);
  } else if (msg.type === "close_sql") {
    w.message(7, msg, CloseSqlStreamReq);
  } else if (msg.type === "get_autocommit") {
    w.message(8, msg, GetAutocommitStreamReq);
  } else {
    throw impossible(msg, "Impossible type of StreamRequest");
  }
}
__name(StreamRequest2, "StreamRequest");
function CloseStreamReq2(_w, _msg) {
}
__name(CloseStreamReq2, "CloseStreamReq");
function ExecuteStreamReq(w, msg) {
  w.message(1, msg.stmt, Stmt3);
}
__name(ExecuteStreamReq, "ExecuteStreamReq");
function BatchStreamReq(w, msg) {
  w.message(1, msg.batch, Batch3);
}
__name(BatchStreamReq, "BatchStreamReq");
function SequenceStreamReq(w, msg) {
  if (msg.sql !== void 0) {
    w.string(1, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(2, msg.sqlId);
  }
}
__name(SequenceStreamReq, "SequenceStreamReq");
function DescribeStreamReq(w, msg) {
  if (msg.sql !== void 0) {
    w.string(1, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(2, msg.sqlId);
  }
}
__name(DescribeStreamReq, "DescribeStreamReq");
function StoreSqlStreamReq(w, msg) {
  w.int32(1, msg.sqlId);
  w.string(2, msg.sql);
}
__name(StoreSqlStreamReq, "StoreSqlStreamReq");
function CloseSqlStreamReq(w, msg) {
  w.int32(1, msg.sqlId);
}
__name(CloseSqlStreamReq, "CloseSqlStreamReq");
function GetAutocommitStreamReq(_w, _msg) {
}
__name(GetAutocommitStreamReq, "GetAutocommitStreamReq");
function CursorReqBody2(w, msg) {
  if (msg.baton !== void 0) {
    w.string(1, msg.baton);
  }
  w.message(2, msg.batch, Batch3);
}
__name(CursorReqBody2, "CursorReqBody");

// node_modules/@libsql/hrana-client/lib-esm/http/stream.js
var HttpStream = class extends Stream {
  static {
    __name(this, "HttpStream");
  }
  #client;
  #baseUrl;
  #jwt;
  #fetch;
  #baton;
  #queue;
  #flushing;
  #cursor;
  #closing;
  #closeQueued;
  #closed;
  #sqlIdAlloc;
  /** @private */
  constructor(client, baseUrl, jwt, customFetch) {
    super(client.intMode);
    this.#client = client;
    this.#baseUrl = baseUrl.toString();
    this.#jwt = jwt;
    this.#fetch = customFetch;
    this.#baton = void 0;
    this.#queue = new Queue();
    this.#flushing = false;
    this.#closing = false;
    this.#closeQueued = false;
    this.#closed = void 0;
    this.#sqlIdAlloc = new IdAlloc();
  }
  /** Get the {@link HttpClient} object that this stream belongs to. */
  client() {
    return this.#client;
  }
  /** @private */
  _sqlOwner() {
    return this;
  }
  /** Cache a SQL text on the server. */
  storeSql(sql) {
    const sqlId = this.#sqlIdAlloc.alloc();
    this.#sendStreamRequest({ type: "store_sql", sqlId, sql }).then(() => void 0, (error) => this._setClosed(error));
    return new Sql(this, sqlId);
  }
  /** @private */
  _closeSql(sqlId) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#sendStreamRequest({ type: "close_sql", sqlId }).then(() => this.#sqlIdAlloc.free(sqlId), (error) => this._setClosed(error));
  }
  /** @private */
  _execute(stmt) {
    return this.#sendStreamRequest({ type: "execute", stmt }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _batch(batch) {
    return this.#sendStreamRequest({ type: "batch", batch }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _describe(protoSql) {
    return this.#sendStreamRequest({
      type: "describe",
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _sequence(protoSql) {
    return this.#sendStreamRequest({
      type: "sequence",
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((_response) => {
      return void 0;
    });
  }
  /** Check whether the SQL connection underlying this stream is in autocommit state (i.e., outside of an
   * explicit transaction). This requires protocol version 3 or higher.
   */
  getAutocommit() {
    this.#client._ensureVersion(3, "getAutocommit()");
    return this.#sendStreamRequest({
      type: "get_autocommit"
    }).then((response) => {
      return response.isAutocommit;
    });
  }
  #sendStreamRequest(request) {
    return new Promise((responseCallback, errorCallback) => {
      this.#pushToQueue({ type: "pipeline", request, responseCallback, errorCallback });
    });
  }
  /** @private */
  _openCursor(batch) {
    return new Promise((cursorCallback, errorCallback) => {
      this.#pushToQueue({ type: "cursor", batch, cursorCallback, errorCallback });
    });
  }
  /** @private */
  _cursorClosed(cursor) {
    if (cursor !== this.#cursor) {
      throw new InternalError("Cursor was closed, but it was not associated with the stream");
    }
    this.#cursor = void 0;
    _queueMicrotask(() => this.#flushQueue());
  }
  /** Immediately close the stream. */
  close() {
    this._setClosed(new ClientError("Stream was manually closed"));
  }
  /** Gracefully close the stream. */
  closeGracefully() {
    this.#closing = true;
    _queueMicrotask(() => this.#flushQueue());
  }
  /** True if the stream is closed. */
  get closed() {
    return this.#closed !== void 0 || this.#closing;
  }
  /** @private */
  _setClosed(error) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error;
    if (this.#cursor !== void 0) {
      this.#cursor._setClosed(error);
    }
    this.#client._streamClosed(this);
    for (; ; ) {
      const entry = this.#queue.shift();
      if (entry !== void 0) {
        entry.errorCallback(error);
      } else {
        break;
      }
    }
    if ((this.#baton !== void 0 || this.#flushing) && !this.#closeQueued) {
      this.#queue.push({
        type: "pipeline",
        request: { type: "close" },
        responseCallback: /* @__PURE__ */ __name(() => void 0, "responseCallback"),
        errorCallback: /* @__PURE__ */ __name(() => void 0, "errorCallback")
      });
      this.#closeQueued = true;
      _queueMicrotask(() => this.#flushQueue());
    }
  }
  #pushToQueue(entry) {
    if (this.#closed !== void 0) {
      throw new ClosedError("Stream is closed", this.#closed);
    } else if (this.#closing) {
      throw new ClosedError("Stream is closing", void 0);
    } else {
      this.#queue.push(entry);
      _queueMicrotask(() => this.#flushQueue());
    }
  }
  #flushQueue() {
    if (this.#flushing || this.#cursor !== void 0) {
      return;
    }
    if (this.#closing && this.#queue.length === 0) {
      this._setClosed(new ClientError("Stream was gracefully closed"));
      return;
    }
    const endpoint = this.#client._endpoint;
    if (endpoint === void 0) {
      this.#client._endpointPromise.then(() => this.#flushQueue(), (error) => this._setClosed(error));
      return;
    }
    const firstEntry = this.#queue.shift();
    if (firstEntry === void 0) {
      return;
    } else if (firstEntry.type === "pipeline") {
      const pipeline = [firstEntry];
      for (; ; ) {
        const entry = this.#queue.first();
        if (entry !== void 0 && entry.type === "pipeline") {
          pipeline.push(entry);
          this.#queue.shift();
        } else if (entry === void 0 && this.#closing && !this.#closeQueued) {
          pipeline.push({
            type: "pipeline",
            request: { type: "close" },
            responseCallback: /* @__PURE__ */ __name(() => void 0, "responseCallback"),
            errorCallback: /* @__PURE__ */ __name(() => void 0, "errorCallback")
          });
          this.#closeQueued = true;
          break;
        } else {
          break;
        }
      }
      this.#flushPipeline(endpoint, pipeline);
    } else if (firstEntry.type === "cursor") {
      this.#flushCursor(endpoint, firstEntry);
    } else {
      throw impossible(firstEntry, "Impossible type of QueueEntry");
    }
  }
  #flushPipeline(endpoint, pipeline) {
    this.#flush(() => this.#createPipelineRequest(pipeline, endpoint), (resp) => decodePipelineResponse(resp, endpoint.encoding), (respBody) => respBody.baton, (respBody) => respBody.baseUrl, (respBody) => handlePipelineResponse(pipeline, respBody), (error) => pipeline.forEach((entry) => entry.errorCallback(error)));
  }
  #flushCursor(endpoint, entry) {
    const cursor = new HttpCursor(this, endpoint.encoding);
    this.#cursor = cursor;
    this.#flush(() => this.#createCursorRequest(entry, endpoint), (resp) => cursor.open(resp), (respBody) => respBody.baton, (respBody) => respBody.baseUrl, (_respBody) => entry.cursorCallback(cursor), (error) => entry.errorCallback(error));
  }
  #flush(createRequest, decodeResponse, getBaton, getBaseUrl, handleResponse, handleError) {
    let promise;
    try {
      const request = createRequest();
      const fetch2 = this.#fetch;
      promise = fetch2(request);
    } catch (error) {
      promise = Promise.reject(error);
    }
    this.#flushing = true;
    promise.then((resp) => {
      if (!resp.ok) {
        return errorFromResponse(resp).then((error) => {
          throw error;
        });
      }
      return decodeResponse(resp);
    }).then((r) => {
      this.#baton = getBaton(r);
      this.#baseUrl = getBaseUrl(r) ?? this.#baseUrl;
      handleResponse(r);
    }).catch((error) => {
      this._setClosed(error);
      handleError(error);
    }).finally(() => {
      this.#flushing = false;
      this.#flushQueue();
    });
  }
  #createPipelineRequest(pipeline, endpoint) {
    return this.#createRequest(new URL(endpoint.pipelinePath, this.#baseUrl), {
      baton: this.#baton,
      requests: pipeline.map((entry) => entry.request)
    }, endpoint.encoding, PipelineReqBody, PipelineReqBody2);
  }
  #createCursorRequest(entry, endpoint) {
    if (endpoint.cursorPath === void 0) {
      throw new ProtocolVersionError(`Cursors are supported only on protocol version 3 and higher, but the HTTP server only supports version ${endpoint.version}.`);
    }
    return this.#createRequest(new URL(endpoint.cursorPath, this.#baseUrl), {
      baton: this.#baton,
      batch: entry.batch
    }, endpoint.encoding, CursorReqBody, CursorReqBody2);
  }
  #createRequest(url, reqBody, encoding, jsonFun, protobufFun) {
    let bodyData;
    let contentType;
    if (encoding === "json") {
      bodyData = writeJsonObject(reqBody, jsonFun);
      contentType = "application/json";
    } else if (encoding === "protobuf") {
      bodyData = writeProtobufMessage(reqBody, protobufFun);
      contentType = "application/x-protobuf";
    } else {
      throw impossible(encoding, "Impossible encoding");
    }
    const headers = new _Headers();
    headers.set("content-type", contentType);
    if (this.#jwt !== void 0) {
      headers.set("authorization", `Bearer ${this.#jwt}`);
    }
    return new _Request(url.toString(), { method: "POST", headers, body: bodyData });
  }
};
function handlePipelineResponse(pipeline, respBody) {
  if (respBody.results.length !== pipeline.length) {
    throw new ProtoError("Server returned unexpected number of pipeline results");
  }
  for (let i = 0; i < pipeline.length; ++i) {
    const result = respBody.results[i];
    const entry = pipeline[i];
    if (result.type === "ok") {
      if (result.response.type !== entry.request.type) {
        throw new ProtoError("Received unexpected type of response");
      }
      entry.responseCallback(result.response);
    } else if (result.type === "error") {
      entry.errorCallback(errorFromProto(result.error));
    } else if (result.type === "none") {
      throw new ProtoError("Received unrecognized type of StreamResult");
    } else {
      throw impossible(result, "Received impossible type of StreamResult");
    }
  }
}
__name(handlePipelineResponse, "handlePipelineResponse");
async function decodePipelineResponse(resp, encoding) {
  if (encoding === "json") {
    const respJson = await resp.json();
    return readJsonObject(respJson, PipelineRespBody);
  }
  if (encoding === "protobuf") {
    const respData = await resp.arrayBuffer();
    return readProtobufMessage(new Uint8Array(respData), PipelineRespBody2);
  }
  await resp.body?.cancel();
  throw impossible(encoding, "Impossible encoding");
}
__name(decodePipelineResponse, "decodePipelineResponse");
async function errorFromResponse(resp) {
  const respType = resp.headers.get("content-type") ?? "text/plain";
  let message = `Server returned HTTP status ${resp.status}`;
  if (respType === "application/json") {
    const respBody = await resp.json();
    if ("message" in respBody) {
      return errorFromProto(respBody);
    }
    return new HttpServerError(message, resp.status);
  }
  if (respType === "text/plain") {
    const respBody = (await resp.text()).trim();
    if (respBody !== "") {
      message += `: ${respBody}`;
    }
    return new HttpServerError(message, resp.status);
  }
  await resp.body?.cancel();
  return new HttpServerError(message, resp.status);
}
__name(errorFromResponse, "errorFromResponse");

// node_modules/@libsql/hrana-client/lib-esm/http/client.js
var checkEndpoints = [
  {
    versionPath: "v3-protobuf",
    pipelinePath: "v3-protobuf/pipeline",
    cursorPath: "v3-protobuf/cursor",
    version: 3,
    encoding: "protobuf"
  }
  /*
  {
      versionPath: "v3",
      pipelinePath: "v3/pipeline",
      cursorPath: "v3/cursor",
      version: 3,
      encoding: "json",
  },
  */
];
var fallbackEndpoint = {
  versionPath: "v2",
  pipelinePath: "v2/pipeline",
  cursorPath: void 0,
  version: 2,
  encoding: "json"
};
var HttpClient = class extends Client {
  static {
    __name(this, "HttpClient");
  }
  #url;
  #jwt;
  #fetch;
  #closed;
  #streams;
  /** @private */
  _endpointPromise;
  /** @private */
  _endpoint;
  /** @private */
  constructor(url, jwt, customFetch, protocolVersion = 2) {
    super();
    this.#url = url;
    this.#jwt = jwt;
    this.#fetch = customFetch ?? _fetch;
    this.#closed = void 0;
    this.#streams = /* @__PURE__ */ new Set();
    if (protocolVersion == 3) {
      this._endpointPromise = findEndpoint(this.#fetch, this.#url);
      this._endpointPromise.then((endpoint) => this._endpoint = endpoint, (error) => this.#setClosed(error));
    } else {
      this._endpointPromise = Promise.resolve(fallbackEndpoint);
      this._endpointPromise.then((endpoint) => this._endpoint = endpoint, (error) => this.#setClosed(error));
    }
  }
  /** Get the protocol version supported by the server. */
  async getVersion() {
    if (this._endpoint !== void 0) {
      return this._endpoint.version;
    }
    return (await this._endpointPromise).version;
  }
  // Make sure that the negotiated version is at least `minVersion`.
  /** @private */
  _ensureVersion(minVersion, feature) {
    if (minVersion <= fallbackEndpoint.version) {
      return;
    } else if (this._endpoint === void 0) {
      throw new ProtocolVersionError(`${feature} is supported only on protocol version ${minVersion} and higher, but the version supported by the HTTP server is not yet known. Use Client.getVersion() to wait until the version is available.`);
    } else if (this._endpoint.version < minVersion) {
      throw new ProtocolVersionError(`${feature} is supported only on protocol version ${minVersion} and higher, but the HTTP server only supports version ${this._endpoint.version}.`);
    }
  }
  /** Open a {@link HttpStream}, a stream for executing SQL statements. */
  openStream() {
    if (this.#closed !== void 0) {
      throw new ClosedError("Client is closed", this.#closed);
    }
    const stream = new HttpStream(this, this.#url, this.#jwt, this.#fetch);
    this.#streams.add(stream);
    return stream;
  }
  /** @private */
  _streamClosed(stream) {
    this.#streams.delete(stream);
  }
  /** Close the client and all its streams. */
  close() {
    this.#setClosed(new ClientError("Client was manually closed"));
  }
  /** True if the client is closed. */
  get closed() {
    return this.#closed !== void 0;
  }
  #setClosed(error) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error;
    for (const stream of Array.from(this.#streams)) {
      stream._setClosed(new ClosedError("Client was closed", error));
    }
  }
};
async function findEndpoint(customFetch, clientUrl) {
  const fetch2 = customFetch;
  for (const endpoint of checkEndpoints) {
    const url = new URL(endpoint.versionPath, clientUrl);
    const request = new _Request(url.toString(), { method: "GET" });
    const response = await fetch2(request);
    await response.arrayBuffer();
    if (response.ok) {
      return endpoint;
    }
  }
  return fallbackEndpoint;
}
__name(findEndpoint, "findEndpoint");

// node_modules/@libsql/hrana-client/lib-esm/libsql_url.js
init_modules_watch_stub();

// node_modules/@libsql/hrana-client/lib-esm/index.js
function openWs(url, jwt, protocolVersion = 2) {
  if (typeof _WebSocket === "undefined") {
    throw new WebSocketUnsupportedError("WebSockets are not supported in this environment");
  }
  var subprotocols = void 0;
  if (protocolVersion == 3) {
    subprotocols = Array.from(subprotocolsV3.keys());
  } else {
    subprotocols = Array.from(subprotocolsV2.keys());
  }
  const socket = new _WebSocket(url, subprotocols);
  return new WsClient(socket, jwt);
}
__name(openWs, "openWs");
function openHttp(url, jwt, customFetch, protocolVersion = 2) {
  return new HttpClient(url instanceof URL ? url : new URL(url), jwt, customFetch, protocolVersion);
}
__name(openHttp, "openHttp");

// node_modules/@libsql/client/lib-esm/hrana.js
init_modules_watch_stub();
var HranaTransaction = class {
  static {
    __name(this, "HranaTransaction");
  }
  #mode;
  #version;
  // Promise that is resolved when the BEGIN statement completes, or `undefined` if we haven't executed the
  // BEGIN statement yet.
  #started;
  /** @private */
  constructor(mode, version2) {
    this.#mode = mode;
    this.#version = version2;
    this.#started = void 0;
  }
  execute(stmt) {
    return this.batch([stmt]).then((results) => results[0]);
  }
  async batch(stmts) {
    const stream = this._getStream();
    if (stream.closed) {
      throw new LibsqlError("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
    }
    try {
      const hranaStmts = stmts.map(stmtToHrana);
      let rowsPromises;
      if (this.#started === void 0) {
        this._getSqlCache().apply(hranaStmts);
        const batch = stream.batch(this.#version >= 3);
        const beginStep = batch.step();
        const beginPromise = beginStep.run(transactionModeToBegin(this.#mode));
        let lastStep = beginStep;
        rowsPromises = hranaStmts.map((hranaStmt) => {
          const stmtStep = batch.step().condition(BatchCond.ok(lastStep));
          if (this.#version >= 3) {
            stmtStep.condition(BatchCond.not(BatchCond.isAutocommit(batch)));
          }
          const rowsPromise = stmtStep.query(hranaStmt);
          rowsPromise.catch(() => void 0);
          lastStep = stmtStep;
          return rowsPromise;
        });
        this.#started = batch.execute().then(() => beginPromise).then(() => void 0);
        try {
          await this.#started;
        } catch (e) {
          this.close();
          throw e;
        }
      } else {
        if (this.#version < 3) {
          await this.#started;
        } else {
        }
        this._getSqlCache().apply(hranaStmts);
        const batch = stream.batch(this.#version >= 3);
        let lastStep = void 0;
        rowsPromises = hranaStmts.map((hranaStmt) => {
          const stmtStep = batch.step();
          if (lastStep !== void 0) {
            stmtStep.condition(BatchCond.ok(lastStep));
          }
          if (this.#version >= 3) {
            stmtStep.condition(BatchCond.not(BatchCond.isAutocommit(batch)));
          }
          const rowsPromise = stmtStep.query(hranaStmt);
          rowsPromise.catch(() => void 0);
          lastStep = stmtStep;
          return rowsPromise;
        });
        await batch.execute();
      }
      const resultSets = [];
      for (const rowsPromise of rowsPromises) {
        const rows = await rowsPromise;
        if (rows === void 0) {
          throw new LibsqlError("Statement in a transaction was not executed, probably because the transaction has been rolled back", "TRANSACTION_CLOSED");
        }
        resultSets.push(resultSetFromHrana(rows));
      }
      return resultSets;
    } catch (e) {
      throw mapHranaError(e);
    }
  }
  async executeMultiple(sql) {
    const stream = this._getStream();
    if (stream.closed) {
      throw new LibsqlError("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
    }
    try {
      if (this.#started === void 0) {
        this.#started = stream.run(transactionModeToBegin(this.#mode)).then(() => void 0);
        try {
          await this.#started;
        } catch (e) {
          this.close();
          throw e;
        }
      } else {
        await this.#started;
      }
      await stream.sequence(sql);
    } catch (e) {
      throw mapHranaError(e);
    }
  }
  async rollback() {
    try {
      const stream = this._getStream();
      if (stream.closed) {
        return;
      }
      if (this.#started !== void 0) {
      } else {
        return;
      }
      const promise = stream.run("ROLLBACK").catch((e) => {
        throw mapHranaError(e);
      });
      stream.closeGracefully();
      await promise;
    } catch (e) {
      throw mapHranaError(e);
    } finally {
      this.close();
    }
  }
  async commit() {
    try {
      const stream = this._getStream();
      if (stream.closed) {
        throw new LibsqlError("Cannot commit the transaction because it is already closed", "TRANSACTION_CLOSED");
      }
      if (this.#started !== void 0) {
        await this.#started;
      } else {
        return;
      }
      const promise = stream.run("COMMIT").catch((e) => {
        throw mapHranaError(e);
      });
      stream.closeGracefully();
      await promise;
    } catch (e) {
      throw mapHranaError(e);
    } finally {
      this.close();
    }
  }
};
async function executeHranaBatch(mode, version2, batch, hranaStmts, disableForeignKeys = false) {
  if (disableForeignKeys) {
    batch.step().run("PRAGMA foreign_keys=off");
  }
  const beginStep = batch.step();
  const beginPromise = beginStep.run(transactionModeToBegin(mode));
  let lastStep = beginStep;
  const stmtPromises = hranaStmts.map((hranaStmt) => {
    const stmtStep = batch.step().condition(BatchCond.ok(lastStep));
    if (version2 >= 3) {
      stmtStep.condition(BatchCond.not(BatchCond.isAutocommit(batch)));
    }
    const stmtPromise = stmtStep.query(hranaStmt);
    lastStep = stmtStep;
    return stmtPromise;
  });
  const commitStep = batch.step().condition(BatchCond.ok(lastStep));
  if (version2 >= 3) {
    commitStep.condition(BatchCond.not(BatchCond.isAutocommit(batch)));
  }
  const commitPromise = commitStep.run("COMMIT");
  const rollbackStep = batch.step().condition(BatchCond.not(BatchCond.ok(commitStep)));
  rollbackStep.run("ROLLBACK").catch((_) => void 0);
  if (disableForeignKeys) {
    batch.step().run("PRAGMA foreign_keys=on");
  }
  await batch.execute();
  const resultSets = [];
  await beginPromise;
  for (const stmtPromise of stmtPromises) {
    const hranaRows = await stmtPromise;
    if (hranaRows === void 0) {
      throw new LibsqlError("Statement in a batch was not executed, probably because the transaction has been rolled back", "TRANSACTION_CLOSED");
    }
    resultSets.push(resultSetFromHrana(hranaRows));
  }
  await commitPromise;
  return resultSets;
}
__name(executeHranaBatch, "executeHranaBatch");
function stmtToHrana(stmt) {
  let sql;
  let args;
  if (Array.isArray(stmt)) {
    [sql, args] = stmt;
  } else if (typeof stmt === "string") {
    sql = stmt;
  } else {
    sql = stmt.sql;
    args = stmt.args;
  }
  const hranaStmt = new Stmt(sql);
  if (args) {
    if (Array.isArray(args)) {
      hranaStmt.bindIndexes(args);
    } else {
      for (const [key, value] of Object.entries(args)) {
        hranaStmt.bindName(key, value);
      }
    }
  }
  return hranaStmt;
}
__name(stmtToHrana, "stmtToHrana");
function resultSetFromHrana(hranaRows) {
  const columns = hranaRows.columnNames.map((c) => c ?? "");
  const columnTypes = hranaRows.columnDecltypes.map((c) => c ?? "");
  const rows = hranaRows.rows;
  const rowsAffected = hranaRows.affectedRowCount;
  const lastInsertRowid = hranaRows.lastInsertRowid !== void 0 ? hranaRows.lastInsertRowid : void 0;
  return new ResultSetImpl(columns, columnTypes, rows, rowsAffected, lastInsertRowid);
}
__name(resultSetFromHrana, "resultSetFromHrana");
function mapHranaError(e) {
  if (e instanceof ClientError) {
    const code = mapHranaErrorCode(e);
    return new LibsqlError(e.message, code, void 0, e);
  }
  return e;
}
__name(mapHranaError, "mapHranaError");
function mapHranaErrorCode(e) {
  if (e instanceof ResponseError && e.code !== void 0) {
    return e.code;
  } else if (e instanceof ProtoError) {
    return "HRANA_PROTO_ERROR";
  } else if (e instanceof ClosedError) {
    return e.cause instanceof ClientError ? mapHranaErrorCode(e.cause) : "HRANA_CLOSED_ERROR";
  } else if (e instanceof WebSocketError) {
    return "HRANA_WEBSOCKET_ERROR";
  } else if (e instanceof HttpServerError) {
    return "SERVER_ERROR";
  } else if (e instanceof ProtocolVersionError) {
    return "PROTOCOL_VERSION_ERROR";
  } else if (e instanceof InternalError) {
    return "INTERNAL_ERROR";
  } else {
    return "UNKNOWN";
  }
}
__name(mapHranaErrorCode, "mapHranaErrorCode");

// node_modules/@libsql/client/lib-esm/sql_cache.js
init_modules_watch_stub();
var SqlCache = class {
  static {
    __name(this, "SqlCache");
  }
  #owner;
  #sqls;
  capacity;
  constructor(owner, capacity) {
    this.#owner = owner;
    this.#sqls = new Lru();
    this.capacity = capacity;
  }
  // Replaces SQL strings with cached `hrana.Sql` objects in the statements in `hranaStmts`. After this
  // function returns, we guarantee that all `hranaStmts` refer to valid (not closed) `hrana.Sql` objects,
  // but _we may invalidate any other `hrana.Sql` objects_ (by closing them, thus removing them from the
  // server).
  //
  // In practice, this means that after calling this function, you can use the statements only up to the
  // first `await`, because concurrent code may also use the cache and invalidate those statements.
  apply(hranaStmts) {
    if (this.capacity <= 0) {
      return;
    }
    const usedSqlObjs = /* @__PURE__ */ new Set();
    for (const hranaStmt of hranaStmts) {
      if (typeof hranaStmt.sql !== "string") {
        continue;
      }
      const sqlText = hranaStmt.sql;
      if (sqlText.length >= 5e3) {
        continue;
      }
      let sqlObj = this.#sqls.get(sqlText);
      if (sqlObj === void 0) {
        while (this.#sqls.size + 1 > this.capacity) {
          const [evictSqlText, evictSqlObj] = this.#sqls.peekLru();
          if (usedSqlObjs.has(evictSqlObj)) {
            break;
          }
          evictSqlObj.close();
          this.#sqls.delete(evictSqlText);
        }
        if (this.#sqls.size + 1 <= this.capacity) {
          sqlObj = this.#owner.storeSql(sqlText);
          this.#sqls.set(sqlText, sqlObj);
        }
      }
      if (sqlObj !== void 0) {
        hranaStmt.sql = sqlObj;
        usedSqlObjs.add(sqlObj);
      }
    }
  }
};
var Lru = class {
  static {
    __name(this, "Lru");
  }
  // This maps keys to the cache values. The entries are ordered by their last use (entires that were used
  // most recently are at the end).
  #cache;
  constructor() {
    this.#cache = /* @__PURE__ */ new Map();
  }
  get(key) {
    const value = this.#cache.get(key);
    if (value !== void 0) {
      this.#cache.delete(key);
      this.#cache.set(key, value);
    }
    return value;
  }
  set(key, value) {
    this.#cache.set(key, value);
  }
  peekLru() {
    for (const entry of this.#cache.entries()) {
      return entry;
    }
    return void 0;
  }
  delete(key) {
    this.#cache.delete(key);
  }
  get size() {
    return this.#cache.size;
  }
};

// node_modules/@libsql/client/lib-esm/ws.js
var import_promise_limit = __toESM(require_promise_limit(), 1);
function _createClient(config) {
  if (config.scheme !== "wss" && config.scheme !== "ws") {
    throw new LibsqlError(`The WebSocket client supports only "libsql:", "wss:" and "ws:" URLs, got ${JSON.stringify(config.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  if (config.encryptionKey !== void 0) {
    throw new LibsqlError("Encryption key is not supported by the remote client.", "ENCRYPTION_KEY_NOT_SUPPORTED");
  }
  if (config.scheme === "ws" && config.tls) {
    throw new LibsqlError(`A "ws:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
  } else if (config.scheme === "wss" && !config.tls) {
    throw new LibsqlError(`A "wss:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
  }
  const url = encodeBaseUrl(config.scheme, config.authority, config.path);
  let client;
  try {
    client = openWs(url, config.authToken);
  } catch (e) {
    if (e instanceof WebSocketUnsupportedError) {
      const suggestedScheme = config.scheme === "wss" ? "https" : "http";
      const suggestedUrl = encodeBaseUrl(suggestedScheme, config.authority, config.path);
      throw new LibsqlError(`This environment does not support WebSockets, please switch to the HTTP client by using a "${suggestedScheme}:" URL (${JSON.stringify(suggestedUrl)}). For more information, please read ${supportedUrlLink}`, "WEBSOCKETS_NOT_SUPPORTED");
    }
    throw mapHranaError(e);
  }
  return new WsClient2(client, url, config.authToken, config.intMode, config.concurrency);
}
__name(_createClient, "_createClient");
var maxConnAgeMillis = 60 * 1e3;
var sqlCacheCapacity = 100;
var WsClient2 = class {
  static {
    __name(this, "WsClient");
  }
  #url;
  #authToken;
  #intMode;
  // State of the current connection. The `hrana.WsClient` inside may be closed at any moment due to an
  // asynchronous error.
  #connState;
  // If defined, this is a connection that will be used in the future, once it is ready.
  #futureConnState;
  closed;
  protocol;
  #isSchemaDatabase;
  #promiseLimitFunction;
  /** @private */
  constructor(client, url, authToken, intMode, concurrency) {
    this.#url = url;
    this.#authToken = authToken;
    this.#intMode = intMode;
    this.#connState = this.#openConn(client);
    this.#futureConnState = void 0;
    this.closed = false;
    this.protocol = "ws";
    this.#promiseLimitFunction = (0, import_promise_limit.default)(concurrency);
  }
  async limit(fn) {
    return this.#promiseLimitFunction(fn);
  }
  async execute(stmtOrSql, args) {
    let stmt;
    if (typeof stmtOrSql === "string") {
      stmt = {
        sql: stmtOrSql,
        args: args || []
      };
    } else {
      stmt = stmtOrSql;
    }
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const hranaStmt = stmtToHrana(stmt);
        streamState.conn.sqlCache.apply([hranaStmt]);
        const hranaRowsPromise = streamState.stream.query(hranaStmt);
        streamState.stream.closeGracefully();
        const hranaRowsResult = await hranaRowsPromise;
        return resultSetFromHrana(hranaRowsResult);
      } catch (e) {
        throw mapHranaError(e);
      } finally {
        this._closeStream(streamState);
      }
    });
  }
  async batch(stmts, mode = "deferred") {
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const normalizedStmts = stmts.map((stmt) => {
          if (Array.isArray(stmt)) {
            return {
              sql: stmt[0],
              args: stmt[1] || []
            };
          }
          return stmt;
        });
        const hranaStmts = normalizedStmts.map(stmtToHrana);
        const version2 = await streamState.conn.client.getVersion();
        streamState.conn.sqlCache.apply(hranaStmts);
        const batch = streamState.stream.batch(version2 >= 3);
        const resultsPromise = executeHranaBatch(mode, version2, batch, hranaStmts);
        const results = await resultsPromise;
        return results;
      } catch (e) {
        throw mapHranaError(e);
      } finally {
        this._closeStream(streamState);
      }
    });
  }
  async migrate(stmts) {
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const hranaStmts = stmts.map(stmtToHrana);
        const version2 = await streamState.conn.client.getVersion();
        const batch = streamState.stream.batch(version2 >= 3);
        const resultsPromise = executeHranaBatch("deferred", version2, batch, hranaStmts, true);
        const results = await resultsPromise;
        return results;
      } catch (e) {
        throw mapHranaError(e);
      } finally {
        this._closeStream(streamState);
      }
    });
  }
  async transaction(mode = "write") {
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const version2 = await streamState.conn.client.getVersion();
        return new WsTransaction(this, streamState, mode, version2);
      } catch (e) {
        this._closeStream(streamState);
        throw mapHranaError(e);
      }
    });
  }
  async executeMultiple(sql) {
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const promise = streamState.stream.sequence(sql);
        streamState.stream.closeGracefully();
        await promise;
      } catch (e) {
        throw mapHranaError(e);
      } finally {
        this._closeStream(streamState);
      }
    });
  }
  sync() {
    throw new LibsqlError("sync not supported in ws mode", "SYNC_NOT_SUPPORTED");
  }
  async #openStream() {
    if (this.closed) {
      throw new LibsqlError("The client is closed", "CLIENT_CLOSED");
    }
    const now = /* @__PURE__ */ new Date();
    const ageMillis = now.valueOf() - this.#connState.openTime.valueOf();
    if (ageMillis > maxConnAgeMillis && this.#futureConnState === void 0) {
      const futureConnState = this.#openConn();
      this.#futureConnState = futureConnState;
      futureConnState.client.getVersion().then((_version) => {
        if (this.#connState !== futureConnState) {
          if (this.#connState.streamStates.size === 0) {
            this.#connState.client.close();
          } else {
          }
        }
        this.#connState = futureConnState;
        this.#futureConnState = void 0;
      }, (_e) => {
        this.#futureConnState = void 0;
      });
    }
    if (this.#connState.client.closed) {
      try {
        if (this.#futureConnState !== void 0) {
          this.#connState = this.#futureConnState;
        } else {
          this.#connState = this.#openConn();
        }
      } catch (e) {
        throw mapHranaError(e);
      }
    }
    const connState = this.#connState;
    try {
      if (connState.useSqlCache === void 0) {
        connState.useSqlCache = await connState.client.getVersion() >= 2;
        if (connState.useSqlCache) {
          connState.sqlCache.capacity = sqlCacheCapacity;
        }
      }
      const stream = connState.client.openStream();
      stream.intMode = this.#intMode;
      const streamState = { conn: connState, stream };
      connState.streamStates.add(streamState);
      return streamState;
    } catch (e) {
      throw mapHranaError(e);
    }
  }
  #openConn(client) {
    try {
      client ??= openWs(this.#url, this.#authToken);
      return {
        client,
        useSqlCache: void 0,
        sqlCache: new SqlCache(client, 0),
        openTime: /* @__PURE__ */ new Date(),
        streamStates: /* @__PURE__ */ new Set()
      };
    } catch (e) {
      throw mapHranaError(e);
    }
  }
  async reconnect() {
    try {
      for (const st of Array.from(this.#connState.streamStates)) {
        try {
          st.stream.close();
        } catch {
        }
      }
      this.#connState.client.close();
    } catch {
    }
    if (this.#futureConnState) {
      try {
        this.#futureConnState.client.close();
      } catch {
      }
      this.#futureConnState = void 0;
    }
    const next = this.#openConn();
    const version2 = await next.client.getVersion();
    next.useSqlCache = version2 >= 2;
    if (next.useSqlCache) {
      next.sqlCache.capacity = sqlCacheCapacity;
    }
    this.#connState = next;
    this.closed = false;
  }
  _closeStream(streamState) {
    streamState.stream.close();
    const connState = streamState.conn;
    connState.streamStates.delete(streamState);
    if (connState.streamStates.size === 0 && connState !== this.#connState) {
      connState.client.close();
    }
  }
  close() {
    this.#connState.client.close();
    this.closed = true;
    if (this.#futureConnState) {
      try {
        this.#futureConnState.client.close();
      } catch {
      }
      this.#futureConnState = void 0;
    }
    this.closed = true;
  }
};
var WsTransaction = class extends HranaTransaction {
  static {
    __name(this, "WsTransaction");
  }
  #client;
  #streamState;
  /** @private */
  constructor(client, state, mode, version2) {
    super(mode, version2);
    this.#client = client;
    this.#streamState = state;
  }
  /** @private */
  _getStream() {
    return this.#streamState.stream;
  }
  /** @private */
  _getSqlCache() {
    return this.#streamState.conn.sqlCache;
  }
  close() {
    this.#client._closeStream(this.#streamState);
  }
  get closed() {
    return this.#streamState.stream.closed;
  }
};

// node_modules/@libsql/client/lib-esm/http.js
init_modules_watch_stub();
var import_promise_limit2 = __toESM(require_promise_limit(), 1);
function _createClient2(config) {
  if (config.scheme !== "https" && config.scheme !== "http") {
    throw new LibsqlError(`The HTTP client supports only "libsql:", "https:" and "http:" URLs, got ${JSON.stringify(config.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  if (config.encryptionKey !== void 0) {
    throw new LibsqlError("Encryption key is not supported by the remote client.", "ENCRYPTION_KEY_NOT_SUPPORTED");
  }
  if (config.scheme === "http" && config.tls) {
    throw new LibsqlError(`A "http:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
  } else if (config.scheme === "https" && !config.tls) {
    throw new LibsqlError(`A "https:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
  }
  const url = encodeBaseUrl(config.scheme, config.authority, config.path);
  return new HttpClient2(url, config.authToken, config.intMode, config.fetch, config.concurrency);
}
__name(_createClient2, "_createClient");
var sqlCacheCapacity2 = 30;
var HttpClient2 = class {
  static {
    __name(this, "HttpClient");
  }
  #client;
  protocol;
  #url;
  #intMode;
  #customFetch;
  #concurrency;
  #authToken;
  #promiseLimitFunction;
  /** @private */
  constructor(url, authToken, intMode, customFetch, concurrency) {
    this.#url = url;
    this.#authToken = authToken;
    this.#intMode = intMode;
    this.#customFetch = customFetch;
    this.#concurrency = concurrency;
    this.#client = openHttp(this.#url, this.#authToken, this.#customFetch);
    this.#client.intMode = this.#intMode;
    this.protocol = "http";
    this.#promiseLimitFunction = (0, import_promise_limit2.default)(this.#concurrency);
  }
  async limit(fn) {
    return this.#promiseLimitFunction(fn);
  }
  async execute(stmtOrSql, args) {
    let stmt;
    if (typeof stmtOrSql === "string") {
      stmt = {
        sql: stmtOrSql,
        args: args || []
      };
    } else {
      stmt = stmtOrSql;
    }
    return this.limit(async () => {
      try {
        const hranaStmt = stmtToHrana(stmt);
        let rowsPromise;
        const stream = this.#client.openStream();
        try {
          rowsPromise = stream.query(hranaStmt);
        } finally {
          stream.closeGracefully();
        }
        const rowsResult = await rowsPromise;
        return resultSetFromHrana(rowsResult);
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  async batch(stmts, mode = "deferred") {
    return this.limit(async () => {
      try {
        const normalizedStmts = stmts.map((stmt) => {
          if (Array.isArray(stmt)) {
            return {
              sql: stmt[0],
              args: stmt[1] || []
            };
          }
          return stmt;
        });
        const hranaStmts = normalizedStmts.map(stmtToHrana);
        const version2 = await this.#client.getVersion();
        let resultsPromise;
        const stream = this.#client.openStream();
        try {
          const sqlCache = new SqlCache(stream, sqlCacheCapacity2);
          sqlCache.apply(hranaStmts);
          const batch = stream.batch(false);
          resultsPromise = executeHranaBatch(mode, version2, batch, hranaStmts);
        } finally {
          stream.closeGracefully();
        }
        const results = await resultsPromise;
        return results;
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  async migrate(stmts) {
    return this.limit(async () => {
      try {
        const hranaStmts = stmts.map(stmtToHrana);
        const version2 = await this.#client.getVersion();
        let resultsPromise;
        const stream = this.#client.openStream();
        try {
          const batch = stream.batch(false);
          resultsPromise = executeHranaBatch("deferred", version2, batch, hranaStmts, true);
        } finally {
          stream.closeGracefully();
        }
        const results = await resultsPromise;
        return results;
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  async transaction(mode = "write") {
    return this.limit(async () => {
      try {
        const version2 = await this.#client.getVersion();
        return new HttpTransaction(this.#client.openStream(), mode, version2);
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  async executeMultiple(sql) {
    return this.limit(async () => {
      try {
        let promise;
        const stream = this.#client.openStream();
        try {
          promise = stream.sequence(sql);
        } finally {
          stream.closeGracefully();
        }
        await promise;
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  sync() {
    throw new LibsqlError("sync not supported in http mode", "SYNC_NOT_SUPPORTED");
  }
  close() {
    this.#client.close();
  }
  async reconnect() {
    try {
      if (!this.closed) {
        this.#client.close();
      }
    } finally {
      this.#client = openHttp(this.#url, this.#authToken, this.#customFetch);
      this.#client.intMode = this.#intMode;
    }
  }
  get closed() {
    return this.#client.closed;
  }
};
var HttpTransaction = class extends HranaTransaction {
  static {
    __name(this, "HttpTransaction");
  }
  #stream;
  #sqlCache;
  /** @private */
  constructor(stream, mode, version2) {
    super(mode, version2);
    this.#stream = stream;
    this.#sqlCache = new SqlCache(stream, sqlCacheCapacity2);
  }
  /** @private */
  _getStream() {
    return this.#stream;
  }
  /** @private */
  _getSqlCache() {
    return this.#sqlCache;
  }
  close() {
    this.#stream.close();
  }
  get closed() {
    return this.#stream.closed;
  }
};

// node_modules/@libsql/client/lib-esm/web.js
function createClient(config) {
  return _createClient3(expandConfig(config, true));
}
__name(createClient, "createClient");
function _createClient3(config) {
  if (config.scheme === "ws" || config.scheme === "wss") {
    return _createClient(config);
  } else if (config.scheme === "http" || config.scheme === "https") {
    return _createClient2(config);
  } else {
    throw new LibsqlError(`The client that uses Web standard APIs supports only "libsql:", "wss:", "ws:", "https:" and "http:" URLs, got ${JSON.stringify(config.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
}
__name(_createClient3, "_createClient");

// src/lib/turso.js
var cachedClient;
function normalizeTursoUrl(rawUrl) {
  if (!rawUrl) return rawUrl;
  if (rawUrl.startsWith("libsql://")) {
    return `https://${rawUrl.slice("libsql://".length)}`;
  }
  return rawUrl;
}
__name(normalizeTursoUrl, "normalizeTursoUrl");
function getTursoClient(env) {
  if (cachedClient) return cachedClient;
  const rawUrl = env.TURSO_DATABASE_URL || env.TURSO_URL;
  const authToken = env.TURSO_AUTH_TOKEN || env.TURSO_TOKEN;
  const url = normalizeTursoUrl(rawUrl);
  if (!url) {
    throw new Error("Missing TURSO_DATABASE_URL (or TURSO_URL)");
  }
  if (!authToken) {
    throw new Error("Missing TURSO_AUTH_TOKEN (or TURSO_TOKEN)");
  }
  cachedClient = createClient({ url, authToken });
  return cachedClient;
}
__name(getTursoClient, "getTursoClient");

// src/lib/auth.js
init_modules_watch_stub();
var encoder = new TextEncoder();
var DEFAULT_PBKDF2_ITERATIONS = 15e3;
function toBase64Url(bytes) {
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
__name(toBase64Url, "toBase64Url");
function fromBase64Url(input) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - base64.length % 4) % 4);
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
}
__name(fromBase64Url, "fromBase64Url");
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}
__name(timingSafeEqual, "timingSafeEqual");
function ensureJwtSecret(env) {
  const secret = env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET");
  return secret;
}
__name(ensureJwtSecret, "ensureJwtSecret");
async function hashPassword(password, iterations = DEFAULT_PBKDF2_ITERATIONS) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    keyMaterial,
    256
  );
  return `pbkdf2$sha256$${iterations}$${toBase64Url(salt)}$${toBase64Url(new Uint8Array(bits))}`;
}
__name(hashPassword, "hashPassword");
async function verifyPassword(password, storedHash) {
  const parts = storedHash.split("$");
  if (parts.length !== 5) return false;
  const [scheme, algo, iterationStr, saltB64, hashB64] = parts;
  if (scheme !== "pbkdf2" || algo !== "sha256") return false;
  const iterations = Number(iterationStr);
  if (!Number.isInteger(iterations) || iterations <= 0) return false;
  const salt = fromBase64Url(saltB64);
  const expected = hashB64;
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    keyMaterial,
    256
  );
  const computed = toBase64Url(new Uint8Array(bits));
  return timingSafeEqual(computed, expected);
}
__name(verifyPassword, "verifyPassword");
async function signHS256(data, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return toBase64Url(new Uint8Array(sig));
}
__name(signHS256, "signHS256");
async function signJwt(payload, env, expiresInSeconds = 60 * 60 * 24 * 7) {
  const secret = ensureJwtSecret(env);
  const now = Math.floor(Date.now() / 1e3);
  const header = { alg: "HS256", typ: "JWT" };
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds
  };
  const encodedHeader = toBase64Url(encoder.encode(JSON.stringify(header)));
  const encodedPayload = toBase64Url(encoder.encode(JSON.stringify(fullPayload)));
  const data = `${encodedHeader}.${encodedPayload}`;
  const signature = await signHS256(data, secret);
  return `${data}.${signature}`;
}
__name(signJwt, "signJwt");
async function verifyJwt(token, env) {
  if (!token) return null;
  const secret = ensureJwtSecret(env);
  const [encodedHeader, encodedPayload, signature] = token.split(".");
  if (!encodedHeader || !encodedPayload || !signature) return null;
  const data = `${encodedHeader}.${encodedPayload}`;
  const expectedSig = await signHS256(data, secret);
  if (!timingSafeEqual(signature, expectedSig)) return null;
  try {
    const payloadJson = new TextDecoder().decode(fromBase64Url(encodedPayload));
    const payload = JSON.parse(payloadJson);
    const now = Math.floor(Date.now() / 1e3);
    if (typeof payload.exp !== "number" || payload.exp <= now) return null;
    return payload;
  } catch {
    return null;
  }
}
__name(verifyJwt, "verifyJwt");
async function getAuthUserId(request, env) {
  const authHeader = request.headers.get("authorization") || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  const payload = await verifyJwt(match[1], env);
  if (!payload || typeof payload.sub !== "string") return null;
  return payload.sub;
}
__name(getAuthUserId, "getAuthUserId");

// src/frontend.js
init_modules_watch_stub();
var CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0a0c10;
    --bg1:       #0f1117;
    --bg2:       #161b24;
    --bg3:       #1c2333;
    --border:    rgba(255,255,255,0.07);
    --border2:   rgba(255,255,255,0.12);
    --text:      #e6edf3;
    --muted:     #7d8590;
    --muted2:    #6e7781;
    --accent:    #f97316;
    --accent2:   #fb923c;
    --blue:      #388bfd;
    --green:     #3fb950;
    --red:       #f85149;
    --yellow:    #d29922;
    --sidebar-w: 220px;
    --header-h:  56px;
    --radius:    8px;
    --radius-lg: 12px;
    --shadow:    0 8px 32px rgba(0,0,0,0.4);
    --glow:      0 0 0 1px rgba(249,115,22,0.3), 0 0 20px rgba(249,115,22,0.12);
  }

  html, body { height: 100%; }

  body {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
    font-size: 14px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  a { color: var(--blue); text-decoration: none; }
  a:hover { text-decoration: underline; }

  /* \u2500\u2500 MARKETING LAYOUT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .mkt-header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: var(--header-h);
    border-bottom: 1px solid var(--border);
    background: rgba(10,12,16,0.85);
    backdrop-filter: blur(20px);
    display: flex; align-items: center;
  }
  .mkt-header-inner {
    max-width: 1100px; width: 100%; margin: 0 auto;
    padding: 0 24px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }
  .wordmark {
    font-size: 15px; font-weight: 700; letter-spacing: -0.01em;
    color: var(--text); display: flex; align-items: center; gap: 8px;
  }
  .wordmark-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
  }
  .mkt-nav { display: flex; align-items: center; gap: 4px; }
  .mkt-nav a {
    padding: 6px 12px; border-radius: var(--radius);
    color: var(--muted); font-size: 13px; font-weight: 500;
    transition: color 0.15s, background 0.15s;
  }
  .mkt-nav a:hover { color: var(--text); background: var(--bg2); text-decoration: none; }
  .mkt-nav a.active { color: var(--text); }
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 16px; border-radius: var(--radius);
    font: inherit; font-weight: 600; font-size: 13px;
    cursor: pointer; border: none; transition: all 0.15s;
    text-decoration: none !important;
  }
  .btn-primary {
    background: var(--accent); color: #fff;
    box-shadow: 0 1px 3px rgba(249,115,22,0.4);
  }
  .btn-primary:hover { background: var(--accent2); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(249,115,22,0.4); }
  .btn-ghost {
    background: var(--bg2); color: var(--text);
    border: 1px solid var(--border2);
  }
  .btn-ghost:hover { background: var(--bg3); border-color: var(--border2); }
  .btn-danger {
    background: rgba(248,81,73,0.15); color: var(--red);
    border: 1px solid rgba(248,81,73,0.3);
  }
  .btn-danger:hover { background: rgba(248,81,73,0.25); }

  .mkt-main {
    max-width: 1100px; margin: 0 auto;
    padding: calc(var(--header-h) + 48px) 24px 80px;
  }

  /* \u2500\u2500 HERO \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .hero {
    padding: 64px 0 48px;
    position: relative;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px 4px 6px; border-radius: 999px;
    border: 1px solid rgba(249,115,22,0.3);
    background: rgba(249,115,22,0.08);
    color: var(--accent); font-size: 12px; font-weight: 600;
    letter-spacing: 0.04em; text-transform: uppercase;
    margin-bottom: 20px;
  }
  .hero-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent); animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%,100% { opacity:1; } 50% { opacity: 0.4; }
  }
  .hero h1 {
    font-size: clamp(32px, 5vw, 54px);
    font-weight: 700; letter-spacing: -0.03em; line-height: 1.1;
    margin-bottom: 18px;
  }
  .hero h1 em { font-style: normal; color: var(--accent); }
  .hero p {
    font-size: 17px; color: var(--muted); max-width: 540px;
    line-height: 1.65; margin-bottom: 28px;
  }
  .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }

  /* \u2500\u2500 FEATURE GRID \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1px;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin: 48px 0;
    background: var(--border);
  }
  .feature-card {
    background: var(--bg1);
    padding: 28px 24px;
    transition: background 0.15s;
  }
  .feature-card:hover { background: var(--bg2); }
  .feature-icon {
    width: 36px; height: 36px; border-radius: var(--radius);
    background: var(--bg3);
    border: 1px solid var(--border2);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; margin-bottom: 14px;
  }
  .feature-card h3 { font-size: 14px; font-weight: 600; margin-bottom: 6px; }
  .feature-card p { font-size: 13px; color: var(--muted); line-height: 1.5; }

  /* \u2500\u2500 PRICING \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px; margin: 40px 0;
  }
  .plan-card {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px 24px;
    background: var(--bg1);
    position: relative;
    transition: border-color 0.2s, transform 0.2s;
  }
  .plan-card:hover { border-color: var(--border2); transform: translateY(-2px); }
  .plan-card.featured {
    border-color: rgba(249,115,22,0.5);
    background: linear-gradient(135deg, rgba(249,115,22,0.06), var(--bg1));
    box-shadow: var(--glow);
  }
  .plan-badge {
    position: absolute; top: -10px; left: 24px;
    padding: 2px 10px; border-radius: 999px;
    background: var(--accent); color: #fff;
    font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .plan-name { font-size: 13px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
  .plan-price { font-size: 36px; font-weight: 700; letter-spacing: -0.03em; line-height: 1; margin-bottom: 4px; }
  .plan-price span { font-size: 14px; font-weight: 400; color: var(--muted); }
  .plan-desc { font-size: 13px; color: var(--muted); margin-bottom: 24px; }
  .plan-features { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
  .plan-features li { font-size: 13px; display: flex; align-items: center; gap: 8px; }
  .plan-features li::before { content: '\u2713'; color: var(--green); font-weight: 700; font-size: 12px; flex-shrink: 0; }

  /* \u2500\u2500 DIVIDER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .section-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 12px;
  }
  .divider { border: none; border-top: 1px solid var(--border); margin: 40px 0; }

  /* \u2500\u2500 PORTAL LAYOUT (sidebar) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .portal-wrap {
    display: flex; min-height: 100vh;
  }
  .sidebar {
    width: var(--sidebar-w); flex-shrink: 0;
    background: var(--bg1);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    position: fixed; top: 0; left: 0; bottom: 0;
    z-index: 50;
    transition: transform 0.2s;
  }
  .sidebar-top {
    padding: 18px 16px 12px;
    border-bottom: 1px solid var(--border);
  }
  .sidebar-wordmark { font-size: 14px; font-weight: 700; display: flex; align-items: center; gap: 7px; }
  .sidebar-section-label {
    padding: 16px 16px 6px;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--muted2);
  }
  .sidebar-nav { padding: 4px 8px; flex: 1; overflow-y: auto; }
  .sidebar-nav a {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px; border-radius: var(--radius);
    color: var(--muted); font-size: 13px; font-weight: 500;
    transition: all 0.12s; margin-bottom: 2px;
    text-decoration: none !important;
  }
  .sidebar-nav a:hover { color: var(--text); background: var(--bg2); }
  .sidebar-nav a.active { color: var(--text); background: var(--bg3); }
  .sidebar-nav a .icon { font-size: 15px; width: 18px; text-align: center; flex-shrink: 0; }
  .sidebar-bottom {
    padding: 12px 8px;
    border-top: 1px solid var(--border);
  }
  .sidebar-user {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px; border-radius: var(--radius);
  }
  .user-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), #9333ea);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .user-info { min-width: 0; flex: 1; }
  .user-email { font-size: 12px; font-weight: 500; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .user-plan { font-size: 11px; color: var(--muted); }

  .portal-content {
    margin-left: var(--sidebar-w);
    flex: 1; display: flex; flex-direction: column; min-height: 100vh;
  }
  .portal-topbar {
    height: var(--header-h); border-bottom: 1px solid var(--border);
    background: var(--bg); padding: 0 28px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 40;
  }
  .portal-topbar h1 { font-size: 15px; font-weight: 600; }
  .portal-main { padding: 28px; max-width: 960px; }

  /* \u2500\u2500 CARDS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .card {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--bg1);
    overflow: hidden;
  }
  .card-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-header h2 { font-size: 14px; font-weight: 600; }
  .card-header p { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .card-body { padding: 20px; }

  .stat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
  .stat-card {
    border: 1px solid var(--border); border-radius: var(--radius-lg);
    padding: 16px; background: var(--bg1);
  }
  .stat-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin-bottom: 8px; }
  .stat-value { font-size: 26px; font-weight: 700; letter-spacing: -0.02em; }
  .stat-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }

  /* \u2500\u2500 FORM ELEMENTS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 12px; font-weight: 600; color: var(--muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em; }
  .form-input {
    width: 100%; padding: 9px 12px;
    background: var(--bg); border: 1px solid var(--border2);
    border-radius: var(--radius); color: var(--text);
    font: inherit; font-size: 14px;
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none;
  }
  .form-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(249,115,22,0.12); }
  .form-input::placeholder { color: var(--muted2); }
  textarea.form-input { min-height: 100px; resize: vertical; }

  /* \u2500\u2500 ALERTS / STATUS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .alert {
    padding: 10px 14px; border-radius: var(--radius);
    font-size: 13px; display: flex; align-items: center; gap: 8px;
    margin-top: 12px;
  }
  .alert-error { background: rgba(248,81,73,0.1); border: 1px solid rgba(248,81,73,0.3); color: var(--red); }
  .alert-success { background: rgba(63,185,80,0.1); border: 1px solid rgba(63,185,80,0.3); color: var(--green); }
  .alert-info { background: rgba(56,139,253,0.1); border: 1px solid rgba(56,139,253,0.3); color: var(--blue); }
  .alert-warn { background: rgba(210,153,34,0.1); border: 1px solid rgba(210,153,34,0.3); color: var(--yellow); }
  .alert:empty { display: none; }

  /* \u2500\u2500 BADGE / CHIPS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 8px; border-radius: 999px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.03em;
    border: 1px solid transparent;
  }
  .badge-green { background: rgba(63,185,80,0.15); color: var(--green); border-color: rgba(63,185,80,0.3); }
  .badge-yellow { background: rgba(210,153,34,0.15); color: var(--yellow); border-color: rgba(210,153,34,0.3); }
  .badge-red { background: rgba(248,81,73,0.15); color: var(--red); border-color: rgba(248,81,73,0.3); }
  .badge-blue { background: rgba(56,139,253,0.15); color: var(--blue); border-color: rgba(56,139,253,0.3); }

  /* \u2500\u2500 TABLE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .data-table { width: 100%; border-collapse: collapse; }
  .data-table th {
    text-align: left; padding: 10px 16px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--muted); border-bottom: 1px solid var(--border);
  }
  .data-table td {
    padding: 12px 16px; font-size: 13px;
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table tr:hover td { background: rgba(255,255,255,0.02); }
  .mono { font-family: 'DM Mono', monospace; font-size: 12px; }

  /* \u2500\u2500 EMPTY STATE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .empty-state {
    text-align: center; padding: 48px 24px; color: var(--muted);
  }
  .empty-state .empty-icon { font-size: 36px; margin-bottom: 12px; opacity: 0.5; }
  .empty-state h3 { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
  .empty-state p { font-size: 13px; max-width: 300px; margin: 0 auto 20px; }

  /* \u2500\u2500 AUTH PAGES \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .auth-wrap {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 24px;
    background:
      radial-gradient(600px 400px at 20% 30%, rgba(249,115,22,0.06) 0%, transparent 70%),
      radial-gradient(800px 600px at 80% 80%, rgba(56,139,253,0.05) 0%, transparent 70%),
      var(--bg);
  }
  .auth-card {
    width: 100%; max-width: 400px;
    border: 1px solid var(--border2); border-radius: 16px;
    background: var(--bg1); padding: 32px;
    box-shadow: var(--shadow);
  }
  .auth-logo { display: flex; align-items: center; gap: 8px; margin-bottom: 28px; font-size: 15px; font-weight: 700; }
  .auth-card h1 { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 6px; }
  .auth-card p { font-size: 13px; color: var(--muted); margin-bottom: 24px; }
  .auth-footer { margin-top: 20px; text-align: center; font-size: 13px; color: var(--muted); }
  .auth-footer a { color: var(--accent); }

  /* \u2500\u2500 LOADING \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .spinner {
    display: inline-block; width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.2);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* \u2500\u2500 TICKET THREAD \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .ticket-thread { display: flex; flex-direction: column; gap: 12px; }
  .ticket-msg {
    padding: 12px 16px; border-radius: var(--radius);
    border: 1px solid var(--border);
    background: var(--bg2);
  }
  .ticket-msg.admin {
    border-color: rgba(249,115,22,0.25);
    background: rgba(249,115,22,0.06);
  }
  .ticket-msg-meta { font-size: 11px; color: var(--muted); margin-bottom: 6px; }
  .ticket-msg p { font-size: 13px; }

  /* \u2500\u2500 ANIMATIONS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.35s ease both; }
  .fade-up-1 { animation-delay: 0.05s; }
  .fade-up-2 { animation-delay: 0.10s; }
  .fade-up-3 { animation-delay: 0.15s; }
  .fade-up-4 { animation-delay: 0.20s; }

  /* \u2500\u2500 PROFILE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .profile-avatar {
    width: 56px; height: 56px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), #9333ea);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .plan-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 999px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
    background: rgba(249,115,22,0.15); color: var(--accent); border: 1px solid rgba(249,115,22,0.3);
  }

  /* \u2500\u2500 TICKET THREAD \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .thread { display: flex; flex-direction: column; gap: 12px; padding: 20px; }
  .thread-msg {
    padding: 14px 16px; border-radius: var(--radius);
    border: 1px solid var(--border); background: var(--bg2);
    max-width: 90%;
  }
  .thread-msg.from-admin {
    border-color: rgba(249,115,22,0.3);
    background: rgba(249,115,22,0.06);
    align-self: flex-end;
  }
  .thread-msg.from-client { align-self: flex-start; }
  .thread-msg-meta { font-size: 11px; color: var(--muted); margin-bottom: 6px; font-weight: 600; }
  .thread-msg p { font-size: 13px; line-height: 1.6; white-space: pre-wrap; }

  /* \u2500\u2500 NOTIFICATION DOT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .notif-dot {
    display: inline-block; width: 7px; height: 7px; border-radius: 50%;
    background: var(--accent); margin-left: 6px; vertical-align: middle;
    animation: pulse 2s infinite;
  }

  .mkt-footer {
    border-top: 1px solid var(--border);
    padding: 40px 24px;
    text-align: center;
    color: var(--muted); font-size: 13px;
  }
  .mkt-footer a { color: var(--muted); }
  .mkt-footer a:hover { color: var(--text); }

  /* \u2500\u2500 RESPONSIVE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .portal-content { margin-left: 0; }
    .hero h1 { font-size: 28px; }
    .pricing-grid { grid-template-columns: 1fr; }
    .stat-grid { grid-template-columns: 1fr 1fr; }
  }
`;
var PORTAL_SCRIPT = `
const _K = 'ubani_t';
const _getToken = () => localStorage.getItem(_K) || '';
const _setToken = v => v ? localStorage.setItem(_K, v) : localStorage.removeItem(_K);
const _getUser  = () => { try { return JSON.parse(localStorage.getItem('ubani_u') || 'null'); } catch { return null; } };
const _setUser  = u => u ? localStorage.setItem('ubani_u', JSON.stringify(u)) : localStorage.removeItem('ubani_u');
const APP = window.__UBANI_ORIGIN || window.location.origin;

// Redirect to login if no token
if (!_getToken()) { window.location.replace(APP + '/portal/login'); }

// Populate user info in sidebar
window.addEventListener('DOMContentLoaded', () => {
  const u = _getUser();
  if (u) {
    const avatar = document.getElementById('userAvatar');
    const email  = document.getElementById('userEmail');
    const plan   = document.getElementById('userPlan');
    if (avatar) avatar.textContent = (u.name || u.email || '?')[0].toUpperCase();
    if (email)  email.textContent  = u.name || u.email || '';
    if (plan)   plan.textContent   = (u.plan ? u.plan.charAt(0).toUpperCase() + u.plan.slice(1) : 'Free') + ' Plan';
  }
  // Highlight active nav link
  const current = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
});

const api = async (path, options = {}, auth = true) => {
  const url = path.startsWith('http') ? path : APP + path;
  const headers = { 'content-type': 'application/json', ...(options.headers || {}) };
  if (auth && _getToken()) headers.authorization = 'Bearer ' + _getToken();
  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) { _setToken(null); _setUser(null); window.location.replace(APP + '/portal/login'); }
  if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);
  return data;
};

const showAlert = (id, msg, type = 'info') => {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = 'alert alert-' + type;
  el.textContent = msg;
};
const clearAlert = id => { const el = document.getElementById(id); if (el) { el.className = 'alert'; el.textContent = ''; } };

const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const fmtDate = v => { if (!v) return '\u2014'; const d = new Date(String(v).replace(' ','T') + (String(v).endsWith('Z') ? '' : 'Z')); return isNaN(d) ? String(v) : d.toLocaleDateString('en-ZA', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}); };
const fmtRand = cents => 'R' + (Number(cents || 0) / 100).toFixed(2);
const statusBadge = s => {
  const m = {paid:'green', open:'yellow', closed:'blue', failed:'red', pending:'yellow', live:'green', draft:'blue'};
  return '<span class="badge badge-' + (m[s] || 'blue') + '">' + esc(s) + '</span>';
};

const logout = () => { _setToken(null); _setUser(null); window.location.replace(APP + '/portal/login'); };
`;
var ADMIN_SCRIPT = `
const APP = window.__UBANI_ORIGIN || window.location.origin;
const _adminKey = () => sessionStorage.getItem('ubani_akey') || '';
const _setAdminKey = k => sessionStorage.setItem('ubani_akey', k);

const adminApi = async path => {
  const key = _adminKey();
  if (!key) throw new Error('No admin key set');
  const res = await fetch(APP + path, { headers: { 'x-admin-key': key } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);
  return data;
};

const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const fmtDate = v => { if (!v) return '\u2014'; const d = new Date(String(v).replace(' ','T') + (String(v).endsWith('Z') ? '' : 'Z')); return isNaN(d) ? String(v) : d.toLocaleDateString('en-ZA', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}); };
const fmtRand = cents => 'R' + (Number(cents || 0) / 100).toFixed(2);
const statusBadge = s => {
  const m = {paid:'green', open:'yellow', closed:'blue', failed:'red', pending:'yellow', live:'green', draft:'blue'};
  return '<span class="badge badge-' + (m[s] || 'blue') + '">' + esc(s) + '</span>';
};

// Auto-restore admin key & load data on page load
window.addEventListener('DOMContentLoaded', () => {
  const inp = document.getElementById('adminKeyInput');
  if (inp && _adminKey()) {
    inp.value = _adminKey();
    document.getElementById('autoLoadTrigger') && document.getElementById('autoLoadTrigger').click();
  }
  const current = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
});

const saveKey = () => {
  const k = document.getElementById('adminKeyInput')?.value.trim();
  if (k) _setAdminKey(k);
};
`;
function mktShell({ title, body, path = "/" }) {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/hosting", label: "Hosting" },
    { href: "/contact", label: "Contact" }
  ].map((l) => `<a href="${l.href}" class="mkt-nav-link${path === l.href ? " active" : ""}">${l.label}</a>`).join("");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="description" content="Ubani Hosting \u2014 Web design, hosting and client management for South African businesses."/>
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>${CSS}</style>
</head>
<body>
  <header class="mkt-header">
    <div class="mkt-header-inner">
      <a href="/" class="wordmark" style="text-decoration:none">
        <div class="wordmark-dot"></div>Ubani Hosting
      </a>
      <nav class="mkt-nav">
        ${navLinks}
      </nav>
      <div style="display:flex;gap:8px;align-items:center">
        <a href="/portal/login" class="btn btn-ghost" style="font-size:13px">Sign in</a>
        <a href="/portal/register" class="btn btn-primary">Get started</a>
      </div>
    </div>
  </header>
  <main class="mkt-main">
    ${body}
  </main>
  <footer class="mkt-footer">
    <div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px">
      <span>\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Ubani Hosting \xB7 Built for South Africa</span>
      <div style="display:flex;gap:20px">
        <a href="/pricing">Pricing</a>
        <a href="/hosting">Hosting</a>
        <a href="/contact">Contact</a>
        <a href="/portal/login">Client Portal</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
}
__name(mktShell, "mktShell");
function portalShell({ title, body, script = "", path = "", apiOrigin = "" }) {
  const navItems = [
    { href: "/portal/dashboard", icon: "\u229E", label: "Dashboard" },
    { href: "/portal/projects", icon: "\u25C8", label: "Projects" },
    { href: "/portal/billing", icon: "\u25CE", label: "Billing" },
    { href: "/portal/support", icon: "\u25F7", label: "Support" },
    { href: "/portal/profile", icon: "\u25C9", label: "Profile" }
  ];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title} | Ubani Hosting</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>${CSS}</style>
</head>
<body>
  <div class="portal-wrap">
    <aside class="sidebar">
      <div class="sidebar-top">
        <a href="/" class="sidebar-wordmark" style="text-decoration:none;color:var(--text)">
          <div class="wordmark-dot"></div>Ubani Hosting
        </a>
      </div>
      <div class="sidebar-section-label">Client Portal</div>
      <nav class="sidebar-nav">
        ${navItems.map((i) => `<a href="${i.href}"><span class="icon">${i.icon}</span>${i.label}</a>`).join("")}
      </nav>
      <div class="sidebar-bottom">
        <div class="sidebar-user">
          <div class="user-avatar" id="userAvatar">?</div>
          <div class="user-info">
            <div class="user-email" id="userEmail">Loading...</div>
            <div class="user-plan" id="userPlan">Free Plan</div>
          </div>
        </div>
        <button onclick="logout()" class="btn btn-danger" style="width:100%;margin-top:8px;font-size:12px">Sign out</button>
      </div>
    </aside>
    <div class="portal-content">
      <div class="portal-topbar">
        <h1>${title}</h1>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:12px;color:var(--muted)" id="topbarEmail"></span>
        </div>
      </div>
      <div class="portal-main">
        ${body}
      </div>
    </div>
  </div>
  <script>
    window.__UBANI_ORIGIN = ${JSON.stringify(apiOrigin || "")};
    ${PORTAL_SCRIPT}
    ${script}
    // Update topbar email
    window.addEventListener('DOMContentLoaded', () => {
      const u = _getUser();
      const el = document.getElementById('topbarEmail');
      if (u && el) el.textContent = u.email;
    });
  <\/script>
</body>
</html>`;
}
__name(portalShell, "portalShell");
function adminShell({ title, body, script = "", apiOrigin = "" }) {
  const navItems = [
    { href: "/admin/dashboard", icon: "\u229E", label: "Overview" },
    { href: "/admin/users", icon: "\u25CE", label: "Users" },
    { href: "/admin/projects", icon: "\u25C8", label: "Projects" },
    { href: "/admin/revenue", icon: "\u25C9", label: "Revenue" },
    { href: "/admin/tickets", icon: "\u25F7", label: "Tickets" }
  ];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title} | Ubani Admin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>${CSS}
  .sidebar { background: #0a0c10; }
  .sidebar-section-label::before { content: ''; }
  </style>
</head>
<body>
  <div class="portal-wrap">
    <aside class="sidebar">
      <div class="sidebar-top">
        <a href="/" class="sidebar-wordmark" style="text-decoration:none;color:var(--text)">
          <div class="wordmark-dot"></div>Admin Panel
        </a>
      </div>
      <div class="sidebar-section-label">Management</div>
      <nav class="sidebar-nav">
        ${navItems.map((i) => `<a href="${i.href}"><span class="icon">${i.icon}</span>${i.label}</a>`).join("")}
        <hr style="border:none;border-top:1px solid var(--border);margin:8px 0"/>
        <a href="/portal/dashboard"><span class="icon">\u2190</span>Client Portal</a>
        <a href="/"><span class="icon">\u2302</span>Marketing Site</a>
      </nav>
      <div class="sidebar-bottom">
        <div style="padding:8px 10px">
          <div class="form-label">Admin Key</div>
          <input id="adminKeyInput" type="password" class="form-input" placeholder="Enter admin key" oninput="saveKey()" style="font-size:12px"/>
        </div>
      </div>
    </aside>
    <div class="portal-content">
      <div class="portal-topbar">
        <h1>${title}</h1>
        <span class="badge badge-red" style="font-size:11px">Admin Access</span>
      </div>
      <div class="portal-main">
        ${body}
      </div>
    </div>
  </div>
  <script>
    window.__UBANI_ORIGIN = ${JSON.stringify(apiOrigin || "")};
    ${ADMIN_SCRIPT}
    ${script}
  <\/script>
</body>
</html>`;
}
__name(adminShell, "adminShell");
function authShell({ title, body, script = "", apiOrigin = "" }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title} | Ubani Hosting</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>${CSS}</style>
</head>
<body>
  <div class="auth-wrap">
    ${body}
  </div>
  <script>
    window.__UBANI_ORIGIN = ${JSON.stringify(apiOrigin || "")};
    const APP = window.__UBANI_ORIGIN || window.location.origin;
    const _K = 'ubani_t';
    const _getToken = () => localStorage.getItem(_K) || '';
    const _setToken = v => v ? localStorage.setItem(_K, v) : localStorage.removeItem(_K);
    const _setUser  = u => u ? localStorage.setItem('ubani_u', JSON.stringify(u)) : localStorage.removeItem('ubani_u');
    const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

    // Already logged in? Go to dashboard
    if (_getToken() && !window.location.pathname.includes('logout')) {
      window.location.replace(APP + '/portal/dashboard');
    }

    const api = async (path, options = {}) => {
      const res = await fetch(APP + path, {
        ...options,
        headers: { 'content-type': 'application/json', ...(options.headers || {}) }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);
      return data;
    };
    const showAlert = (id, msg, type='error') => {
      const el = document.getElementById(id);
      if (!el) return;
      el.className = 'alert alert-' + type;
      el.textContent = msg;
    };
    ${script}
  <\/script>
</body>
</html>`;
}
__name(authShell, "authShell");
function pageHome(apiOrigin) {
  return mktShell({
    title: "Ubani Hosting \u2014 Web Design & Hosting for South Africa",
    path: "/",
    body: `
    <div class="hero fade-up">
      <div class="hero-badge"><div class="hero-badge-dot"></div>Now live in South Africa</div>
      <h1>Web design, hosting &amp;<br/>client management \u2014 <em>in one platform</em></h1>
      <p>Built for SA web designers. Manage clients, deploy sites, send invoices, and handle support without switching tools.</p>
      <div class="hero-actions">
        <a href="/portal/register" class="btn btn-primary" style="font-size:15px;padding:10px 22px">Start free \u2192</a>
        <a href="/pricing" class="btn btn-ghost" style="font-size:15px;padding:10px 22px">View pricing</a>
      </div>
    </div>

    <div class="features">
      <div class="feature-card fade-up fade-up-1">
        <div class="feature-icon">\u25C8</div>
        <h3>Client Portal</h3>
        <p>Every client gets a branded portal to view their project status, pay invoices, and raise support tickets.</p>
      </div>
      <div class="feature-card fade-up fade-up-2">
        <div class="feature-icon">\u25CE</div>
        <h3>Yoco Billing</h3>
        <p>Create invoices and collect payment in ZAR via Yoco. Webhook-verified, automatically reconciled.</p>
      </div>
      <div class="feature-card fade-up fade-up-3">
        <div class="feature-icon">\u25F7</div>
        <h3>Support Tickets</h3>
        <p>Clients submit tickets; you respond from the admin panel. Full thread history, open/close workflow.</p>
      </div>
      <div class="feature-card fade-up fade-up-4">
        <div class="feature-icon">\u229E</div>
        <h3>Project Tracking</h3>
        <p>Track every project from scope to live. Status updates, storage tracking, domain mapping included.</p>
      </div>
      <div class="feature-card fade-up">
        <div class="feature-icon">\u26A1</div>
        <h3>Cloudflare-Powered</h3>
        <p>Built on Cloudflare Workers + Turso. Sub-100ms globally distributed, zero cold starts.</p>
      </div>
      <div class="feature-card fade-up fade-up-1">
        <div class="feature-icon">\u{1F512}</div>
        <h3>Secure by Default</h3>
        <p>PBKDF2 password hashing, JWT auth, rate limiting, and HSTS headers out of the box.</p>
      </div>
    </div>

    <div style="text-align:center;padding:20px 0 48px">
      <p style="color:var(--muted);font-size:15px;margin-bottom:20px">Ready to replace your patchwork of tools?</p>
      <a href="/portal/register" class="btn btn-primary" style="font-size:15px;padding:10px 24px">Create your free account \u2192</a>
    </div>`
  });
}
__name(pageHome, "pageHome");
function pagePricing(apiOrigin) {
  return mktShell({
    title: "Pricing \u2014 Ubani Hosting",
    path: "/pricing",
    body: `
    <div class="hero fade-up" style="text-align:center;padding-bottom:12px">
      <div class="hero-badge" style="margin:0 auto 16px"><div class="hero-badge-dot"></div>Simple pricing</div>
      <h1 style="max-width:560px;margin:0 auto 14px">Start free.<br/>Scale when you're ready.</h1>
      <p style="margin:0 auto">No contracts, no surprises. All plans include the full platform.</p>
    </div>

    <div class="pricing-grid">
      <div class="plan-card fade-up">
        <div class="plan-name">Free</div>
        <div class="plan-price">R0<span>/mo</span></div>
        <div class="plan-desc">Perfect for testing or a single personal project.</div>
        <ul class="plan-features">
          <li>1 active project</li>
          <li>500MB storage</li>
          <li>Ubani subdomain</li>
          <li>Client portal access</li>
          <li>Community support</li>
        </ul>
        <a href="/portal/register" class="btn btn-ghost" style="width:100%;justify-content:center">Get started free</a>
      </div>

      <div class="plan-card featured fade-up fade-up-1">
        <div class="plan-badge">Most popular</div>
        <div class="plan-name">Starter</div>
        <div class="plan-price">R99<span>/mo</span></div>
        <div class="plan-desc">For designers managing a handful of client sites.</div>
        <ul class="plan-features">
          <li>5 active projects</li>
          <li>10GB storage</li>
          <li>Custom domains</li>
          <li>Yoco billing integration</li>
          <li>Support ticket system</li>
          <li>Email notifications</li>
        </ul>
        <a href="/portal/register" class="btn btn-primary" style="width:100%;justify-content:center">Start with Starter \u2192</a>
      </div>

      <div class="plan-card fade-up fade-up-2">
        <div class="plan-name">Agency</div>
        <div class="plan-price">R299<span>/mo</span></div>
        <div class="plan-desc">For studios managing multiple clients at scale.</div>
        <ul class="plan-features">
          <li>Unlimited projects</li>
          <li>100GB storage</li>
          <li>Priority support</li>
          <li>Admin + team workflows</li>
          <li>Revenue analytics</li>
          <li>White-label portal (coming)</li>
        </ul>
        <a href="/contact" class="btn btn-ghost" style="width:100%;justify-content:center">Contact sales</a>
      </div>
    </div>

    <div style="text-align:center;padding:16px 0 40px;color:var(--muted);font-size:13px">
      All prices in South African Rand (ZAR) \xB7 Yoco powers secure checkout \xB7 Cancel anytime
    </div>`
  });
}
__name(pagePricing, "pagePricing");
function pageHosting(apiOrigin) {
  return mktShell({
    title: "Hosting \u2014 Ubani Hosting",
    path: "/hosting",
    body: `
    <div class="hero fade-up">
      <div class="hero-badge"><div class="hero-badge-dot"></div>Infrastructure</div>
      <h1>Hosting built for<br/>South African velocity</h1>
      <p>Every project deployed on Cloudflare's global edge. No servers to manage, no capacity planning.</p>
    </div>

    <div class="features" style="margin-top:0">
      <div class="feature-card fade-up">
        <div class="feature-icon">\u26A1</div>
        <h3>Edge-first deployment</h3>
        <p>Static files and API routes served from Cloudflare's 300+ PoPs. SA clients see sub-50ms response times.</p>
      </div>
      <div class="feature-card fade-up fade-up-1">
        <div class="feature-icon">\u25C8</div>
        <h3>Project-level storage</h3>
        <p>Each project tracks its own file storage. Upgrade plans as client sites grow without affecting others.</p>
      </div>
      <div class="feature-card fade-up fade-up-2">
        <div class="feature-icon">\u25CE</div>
        <h3>Billing-native</h3>
        <p>Invoice creation and Yoco checkout baked in. Accept ZAR payments without a third-party billing tool.</p>
      </div>
      <div class="feature-card fade-up fade-up-3">
        <div class="feature-icon">\u25F7</div>
        <h3>Turso database</h3>
        <p>libSQL-powered relational database with global replication. Your data is always close to your clients.</p>
      </div>
      <div class="feature-card fade-up">
        <div class="feature-icon">\u{1F512}</div>
        <h3>Security included</h3>
        <p>JWT auth, PBKDF2 hashing, rate limiting, HSTS, and CSP headers configured by default on every route.</p>
      </div>
      <div class="feature-card fade-up fade-up-1">
        <div class="feature-icon">\u229E</div>
        <h3>Webhook reconciliation</h3>
        <p>Yoco webhook signatures verified cryptographically. Payment state always reflects reality.</p>
      </div>
    </div>

    <div style="margin:40px 0">
      <a href="/portal/register" class="btn btn-primary" style="font-size:15px;padding:10px 22px">Deploy your first project \u2192</a>
    </div>`
  });
}
__name(pageHosting, "pageHosting");
function pageContact(apiOrigin) {
  return mktShell({
    title: "Contact \u2014 Ubani Hosting",
    path: "/contact",
    body: `
    <div class="hero fade-up">
      <div class="hero-badge"><div class="hero-badge-dot"></div>Get in touch</div>
      <h1>Let's build something<br/>together</h1>
      <p>Whether you need hosting, a website, or want to discuss agency plans \u2014 we're here.</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-bottom:40px">
      <div class="card fade-up">
        <div class="card-header"><h2>Sales &amp; Onboarding</h2></div>
        <div class="card-body">
          <p style="color:var(--muted);font-size:13px;margin-bottom:12px">Ready to get started or want to understand what plan fits best?</p>
          <a href="mailto:sales@ubanihosting.co.za" class="btn btn-primary">sales@ubanihosting.co.za</a>
        </div>
      </div>
      <div class="card fade-up fade-up-1">
        <div class="card-header"><h2>Technical Support</h2></div>
        <div class="card-body">
          <p style="color:var(--muted);font-size:13px;margin-bottom:12px">Existing clients can raise tickets directly from the portal. General queries welcome here.</p>
          <a href="mailto:support@ubanihosting.co.za" class="btn btn-ghost">support@ubanihosting.co.za</a>
        </div>
      </div>
      <div class="card fade-up fade-up-2">
        <div class="card-header"><h2>Partnerships</h2></div>
        <div class="card-body">
          <p style="color:var(--muted);font-size:13px;margin-bottom:12px">Agencies, resellers, or integration partners \u2014 let's explore how we can work together.</p>
          <a href="mailto:partners@ubanihosting.co.za" class="btn btn-ghost">partners@ubanihosting.co.za</a>
        </div>
      </div>
    </div>

    <div class="card fade-up" style="max-width:480px">
      <div class="card-header"><h2>Quick start</h2></div>
      <div class="card-body">
        <p style="color:var(--muted);font-size:13px;margin-bottom:16px">The fastest path is creating a free account and exploring the platform yourself.</p>
        <a href="/portal/register" class="btn btn-primary" style="width:100%;justify-content:center">Create free account \u2192</a>
      </div>
    </div>`
  });
}
__name(pageContact, "pageContact");
function pageLogin(apiOrigin) {
  return authShell({
    apiOrigin,
    title: "Sign in",
    body: `
    <div class="auth-card fade-up">
      <div class="auth-logo"><div class="wordmark-dot"></div>Ubani Hosting</div>
      <h1>Welcome back</h1>
      <p>Sign in to your client portal</p>

      <div class="form-group">
        <label class="form-label">Email address</label>
        <input id="email" type="email" class="form-input" placeholder="you@example.com" autocomplete="email"/>
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input id="password" type="password" class="form-input" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" autocomplete="current-password"/>
      </div>

      <button id="loginBtn" class="btn btn-primary" style="width:100%;justify-content:center;padding:10px" onclick="doLogin()">
        Sign in
      </button>
      <div id="loginAlert" class="alert"></div>

      <div class="auth-footer">
        Don't have an account? <a href="/portal/register">Create one free</a>
      </div>
    </div>`,
    script: `
    const doLogin = async () => {
      const btn = document.getElementById('loginBtn');
      btn.innerHTML = '<span class="spinner"></span> Signing in...';
      btn.disabled = true;
      clearAlert && clearAlert('loginAlert');
      try {
        const email    = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        if (!email || !password) throw new Error('Email and password are required');
        const data = await api('/api/login', { method:'POST', body: JSON.stringify({ email, password }) });
        _setToken(data.token);
        _setUser(data.user);
        showAlert('loginAlert', 'Success! Redirecting...', 'success');
        setTimeout(() => window.location.replace(APP + '/portal/dashboard'), 500);
      } catch(err) {
        showAlert('loginAlert', err.message, 'error');
        btn.innerHTML = 'Sign in';
        btn.disabled = false;
      }
    };
    document.getElementById('password').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
    `
  });
}
__name(pageLogin, "pageLogin");
function pageRegister(apiOrigin) {
  return authShell({
    apiOrigin,
    title: "Create account",
    body: `
    <div class="auth-card fade-up">
      <div class="auth-logo"><div class="wordmark-dot"></div>Ubani Hosting</div>
      <h1>Create your account</h1>
      <p>Start with a free plan \u2014 no credit card needed</p>

      <div class="form-group">
        <label class="form-label">Full name</label>
        <input id="name" type="text" class="form-input" placeholder="Jane Smith" autocomplete="name"/>
      </div>
      <div class="form-group">
        <label class="form-label">Email address</label>
        <input id="email" type="email" class="form-input" placeholder="you@example.com" autocomplete="email"/>
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input id="password" type="password" class="form-input" placeholder="Min. 8 characters" autocomplete="new-password"/>
      </div>
      <div class="form-group">
        <label class="form-label">Confirm password</label>
        <input id="password2" type="password" class="form-input" placeholder="Repeat password" autocomplete="new-password"/>
      </div>

      <button id="regBtn" class="btn btn-primary" style="width:100%;justify-content:center;padding:10px" onclick="doRegister()">
        Create account
      </button>
      <div id="regAlert" class="alert"></div>

      <div class="auth-footer">
        Already have an account? <a href="/portal/login">Sign in</a>
      </div>
    </div>`,
    script: `
    const doRegister = async () => {
      const btn = document.getElementById('regBtn');
      btn.innerHTML = '<span class="spinner"></span> Creating account...';
      btn.disabled = true;
      try {
        const name  = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const pass  = document.getElementById('password').value;
        const pass2 = document.getElementById('password2').value;
        if (!email || !pass) throw new Error('Email and password are required');
        if (pass.length < 8) throw new Error('Password must be at least 8 characters');
        if (pass !== pass2) throw new Error('Passwords do not match');
        const data = await api('/api/register', { method:'POST', body: JSON.stringify({ email, password: pass, name }) });
        _setToken(data.token);
        _setUser(data.user);
        showAlert('regAlert', 'Account created! Redirecting...', 'success');
        setTimeout(() => window.location.replace(APP + '/portal/dashboard'), 600);
      } catch(err) {
        showAlert('regAlert', err.message, 'error');
        btn.innerHTML = 'Create account';
        btn.disabled = false;
      }
    };
    `
  });
}
__name(pageRegister, "pageRegister");
function pagePortalDashboard(apiOrigin) {
  return portalShell({
    apiOrigin,
    title: "Dashboard",
    path: "/portal/dashboard",
    body: `
    <div class="stat-grid fade-up" id="statsGrid">
      <div class="stat-card"><div class="stat-label">Projects</div><div class="stat-value" id="statProjects">\u2014</div><div class="stat-sub">Active deployments</div></div>
      <div class="stat-card"><div class="stat-label">Invoices</div><div class="stat-value" id="statInvoices">\u2014</div><div class="stat-sub">All time</div></div>
      <div class="stat-card"><div class="stat-label">Open tickets</div><div class="stat-value" id="statTickets">\u2014</div><div class="stat-sub">Awaiting response</div></div>
      <div class="stat-card"><div class="stat-label">Account credit</div><div class="stat-value" id="statCredit">\u2014</div><div class="stat-sub">Available balance</div></div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;margin-top:20px">
      <div class="card fade-up fade-up-1">
        <div class="card-header">
          <div><h2>Recent projects</h2><p>Your latest deployments</p></div>
          <a href="/portal/projects" class="btn btn-ghost" style="font-size:12px">View all</a>
        </div>
        <div id="recentProjects"><div class="empty-state"><div class="empty-icon">\u25C8</div><h3>No projects yet</h3><p>Deploy your first project to get started</p><a href="/portal/projects" class="btn btn-primary">Create project</a></div></div>
      </div>

      <div class="card fade-up fade-up-2">
        <div class="card-header">
          <div><h2>Recent invoices</h2><p>Latest billing activity</p></div>
          <a href="/portal/billing" class="btn btn-ghost" style="font-size:12px">View all</a>
        </div>
        <div id="recentInvoices"><div class="empty-state"><div class="empty-icon">\u25CE</div><h3>No invoices yet</h3><p>Invoices will appear here when created</p></div></div>
      </div>
    </div>`,
    script: `
    window.addEventListener('DOMContentLoaded', async () => {
      try {
        const [me, projects, invoices, tickets] = await Promise.all([
          api('/api/me'),
          api('/api/projects'),
          api('/api/invoices'),
          api('/api/support/tickets')
        ]);

        // Stats
        document.getElementById('statProjects').textContent = (projects.projects || []).length;
        document.getElementById('statInvoices').textContent = (invoices.invoices || []).length;
        const open = (tickets.tickets || []).filter(t => t.status === 'open').length;
        document.getElementById('statTickets').textContent = open;
        document.getElementById('statCredit').textContent = 'R' + (Number(me.user?.credit || 0) / 100).toFixed(2);

        // Recent projects
        const projs = (projects.projects || []).slice(0, 3);
        if (projs.length) {
          document.getElementById('recentProjects').innerHTML =
            '<table class="data-table"><thead><tr><th>Domain</th><th>Status</th><th>Storage</th></tr></thead><tbody>' +
            projs.map(p => '<tr><td class="mono">' + esc(p.domain) + '</td><td>' + statusBadge(p.status || 'live') + '</td><td>' + esc(Math.round((p.storage||0)/1024)) + ' KB</td></tr>').join('') +
            '</tbody></table>';
        }

        // Recent invoices
        const invs = (invoices.invoices || []).slice(0, 3);
        if (invs.length) {
          document.getElementById('recentInvoices').innerHTML =
            '<table class="data-table"><thead><tr><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>' +
            invs.map(i => '<tr><td>' + fmtRand(i.amount) + '</td><td>' + statusBadge(i.status) + '</td><td>' + fmtDate(i.created_at) + '</td></tr>').join('') +
            '</tbody></table>';
        }
      } catch(err) {
        console.error('Dashboard load error:', err);
      }
    });
    `
  });
}
__name(pagePortalDashboard, "pagePortalDashboard");
function pagePortalProjects(apiOrigin) {
  return portalShell({
    apiOrigin,
    title: "Projects",
    path: "/portal/projects",
    body: `
    <div style="display:grid;grid-template-columns:320px 1fr;gap:16px;min-height:500px">

      <!-- Left: project list -->
      <div style="display:flex;flex-direction:column;gap:12px">
        <button class="btn btn-primary" onclick="showNewProject()" style="width:100%;justify-content:center">+ New Project</button>
        <div class="card" style="flex:1">
          <div class="card-header"><h2>Your Projects</h2><p id="projCount">Loading...</p></div>
          <div id="projectListPanel" style="overflow-y:auto;max-height:520px">
            <div class="empty-state"><div class="spinner"></div></div>
          </div>
        </div>
      </div>

      <!-- Right: project detail -->
      <div id="projectDetailPanel" class="card">
        <div class="empty-state" style="padding:60px 24px">
          <div class="empty-icon">\u25C8</div>
          <h3>Select a project</h3>
          <p>Choose a project from the left or create a new one to get started.</p>
        </div>
      </div>

    </div>`,
    script: `
    let activeProjectId = null;

    const showNewProject = () => {
      activeProjectId = null;
      document.querySelectorAll('.proj-item').forEach(el => el.style.background = '');
      document.getElementById('projectDetailPanel').innerHTML = \`
        <div class="card-header"><h2>New Project</h2><p>Create a new client deployment</p></div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">Domain / Project name</label>
            <input id="newDomain" class="form-input" placeholder="client-site.co.za"/>
          </div>
          <div class="form-group">
            <label class="form-label">Description (optional)</label>
            <input id="newDesc" class="form-input" placeholder="Brief project notes"/>
          </div>
          <button class="btn btn-primary" onclick="doCreateProject()" id="createProjBtn" style="padding:9px 20px">Create Project</button>
          <div id="createProjAlert" class="alert" style="margin-top:10px"></div>
        </div>
      \`;
    };

    const doCreateProject = async () => {
      const btn = document.getElementById('createProjBtn');
      btn.innerHTML = '<span class="spinner"></span>';
      btn.disabled = true;
      try {
        const domain = document.getElementById('newDomain').value.trim();
        const description = document.getElementById('newDesc').value.trim();
        if (!domain) throw new Error('Domain is required');
        const data = await api('/api/projects', { method:'POST', body: JSON.stringify({ domain, description }) });
        await loadProjects();
        openProject(data.project.id);
      } catch(err) {
        showAlert('createProjAlert', err.message, 'error');
        btn.innerHTML = 'Create Project';
        btn.disabled = false;
      }
    };

    const openProject = async (projectId) => {
      activeProjectId = projectId;
      document.querySelectorAll('.proj-item').forEach(el => {
        el.style.background = el.dataset.id === projectId ? 'var(--bg3)' : '';
      });
      document.getElementById('projectDetailPanel').innerHTML = '<div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading project...</p></div>';
      try {
        const data = await api('/api/projects/' + projectId);
        const proj  = data.project;
        const files = data.files || [];
        const deploys = data.deployments || [];
        const isLive  = proj.status === 'live';
        const isBuild = proj.status === 'building';

        document.getElementById('projectDetailPanel').innerHTML =
          '<div class="card-header">' +
          '<div><h2>' + esc(proj.domain) + '</h2>' +
          '<p style="margin-top:3px">' + statusBadge(proj.status || 'draft') +
          (isLive && proj.cf_pages_url ? ' &nbsp;<a href="' + esc(proj.cf_pages_url) + '" target="_blank" rel="noopener" style="font-size:12px;color:var(--blue)">\u2197 ' + esc(proj.cf_pages_url) + '</a>' : '') +
          '</p></div>' +
          '<div style="display:flex;gap:8px">' +
          (!isBuild ? '<button class="btn btn-primary" onclick="doDeploy('' + esc(projectId) + '')" id="deployBtn" style="font-size:13px">' + (isLive ? '\u21BA Redeploy' : '\u{1F680} Deploy to Pages') + '</button>' : '<button class="btn btn-ghost" disabled>Building...</button>') +
          '</div></div>' +

          // Description
          (proj.description ? '<div style="padding:12px 20px;border-bottom:1px solid var(--border);font-size:13px;color:var(--muted)">' + esc(proj.description) + '</div>' : '') +

          // File upload area
          '<div style="padding:16px 20px;border-bottom:1px solid var(--border)">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
          '<div class="section-label">Files (' + files.length + ')</div>' +
          '<label class="btn btn-ghost" style="font-size:12px;cursor:pointer">+ Upload File<input type="file" multiple style="display:none" onchange="uploadFiles('' + esc(projectId) + '', this)"/></label>' +
          '</div>' +
          (files.length ? '<table class="data-table"><thead><tr><th>Filename</th><th>Type</th><th>Size</th><th></th></tr></thead><tbody>' +
          files.map(f => '<tr><td class="mono" style="font-size:12px">' + esc(f.filename) + '</td><td style="color:var(--muted);font-size:12px">' + esc(f.content_type) + '</td><td style="font-size:12px">' + formatBytes(f.size_bytes) + '</td><td><button onclick="deleteFile('' + esc(projectId) + '','' + esc(f.id) + '')" class="btn btn-danger" style="font-size:11px;padding:3px 8px">\u2715</button></td></tr>').join('') +
          '</tbody></table>'
          : '<div style="border:2px dashed var(--border2);border-radius:8px;padding:24px;text-align:center;color:var(--muted);font-size:13px">Drop files here or click Upload File above</div>') +
          '<div id="uploadAlert" class="alert" style="margin-top:8px"></div>' +
          '</div>' +

          // Deploy log
          '<div style="padding:16px 20px">' +
          '<div class="section-label" style="margin-bottom:10px">Deployment History</div>' +
          (deploys.length ? '<table class="data-table"><thead><tr><th>Status</th><th>URL</th><th>Date</th></tr></thead><tbody>' +
          deploys.map(d => '<tr><td>' + statusBadge(d.status) + '</td><td>' +
          (d.pages_url ? '<a href="' + esc(d.pages_url) + '" target="_blank" style="font-size:12px">' + esc(d.pages_url) + '</a>' : (d.error_message ? '<span style="color:var(--red);font-size:12px">' + esc(d.error_message) + '</span>' : '\u2014')) +
          '</td><td style="font-size:12px">' + fmtDate(d.triggered_at) + '</td></tr>').join('') +
          '</tbody></table>'
          : '<p style="color:var(--muted);font-size:13px">No deployments yet. Upload files then click Deploy.</p>') +
          '</div>';
      } catch(err) {
        document.getElementById('projectDetailPanel').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    const formatBytes = n => {
      const v = Number(n || 0);
      if (v < 1024) return v + ' B';
      if (v < 1024*1024) return (v/1024).toFixed(1) + ' KB';
      return (v/1024/1024).toFixed(1) + ' MB';
    };

    const uploadFiles = async (projectId, input) => {
      const filesToUpload = Array.from(input.files);
      if (!filesToUpload.length) return;
      showAlert('uploadAlert', 'Uploading ' + filesToUpload.length + ' file(s)...', 'info');
      try {
        for (const file of filesToUpload) {
          await fetch(APP + '/api/projects/' + projectId + '/files', {
            method: 'POST',
            headers: {
              authorization: 'Bearer ' + _getToken(),
              'content-type': file.type || 'application/octet-stream',
              'x-filename': encodeURIComponent(file.name)
            },
            body: file
          }).then(async r => {
            if (!r.ok) { const d = await r.json().catch(()=>{}); throw new Error(d?.error || 'Upload failed'); }
          });
        }
        showAlert('uploadAlert', filesToUpload.length + ' file(s) uploaded!', 'success');
        setTimeout(() => openProject(projectId), 500);
      } catch(err) {
        showAlert('uploadAlert', err.message, 'error');
      }
    };

    const deleteFile = async (projectId, fileId) => {
      if (!confirm('Delete this file?')) return;
      try {
        await api('/api/projects/' + projectId + '/files/' + fileId, { method:'DELETE' });
        openProject(projectId);
      } catch(err) { alert(err.message); }
    };

    const doDeploy = async (projectId) => {
      const btn = document.getElementById('deployBtn');
      if (btn) { btn.innerHTML = '<span class="spinner"></span> Deploying...'; btn.disabled = true; }
      try {
        const data = await api('/api/projects/' + projectId + '/deploy', { method:'POST' });
        if (data.pagesUrl) {
          showAlert('uploadAlert', '\u{1F680} Deployed! Live at: ' + data.pagesUrl, 'success');
        } else {
          showAlert('uploadAlert', data.note || 'Deployment queued.', 'info');
        }
        await loadProjects();
        setTimeout(() => openProject(projectId), 800);
      } catch(err) {
        showAlert('uploadAlert', err.message, 'error');
        if (btn) { btn.innerHTML = '\u{1F680} Deploy to Pages'; btn.disabled = false; }
      }
    };

    const loadProjects = async () => {
      try {
        const data = await api('/api/projects');
        const projects = data.projects || [];
        document.getElementById('projCount').textContent = projects.length + ' project' + (projects.length !== 1 ? 's' : '');
        if (!projects.length) {
          document.getElementById('projectListPanel').innerHTML = '<div class="empty-state" style="padding:24px 16px"><p>No projects yet</p></div>';
          return;
        }
        document.getElementById('projectListPanel').innerHTML = projects.map(p =>
          '<div class="proj-item" data-id="' + esc(p.id) + '" onclick="openProject('' + esc(p.id) + '')"' +
          ' style="padding:12px 16px;cursor:pointer;border-bottom:1px solid var(--border);transition:background 0.12s' + (p.id === activeProjectId ? ';background:var(--bg3)' : '') + '">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:3px">' +
          '<strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px">' + esc(p.domain) + '</strong>' +
          statusBadge(p.status || 'draft') + '</div>' +
          '<div style="font-size:11px;color:var(--muted)">' + formatBytes(p.storage) + ' \xB7 ' + fmtDate(p.created_at) + '</div></div>'
        ).join('');
      } catch(err) {
        document.getElementById('projectListPanel').innerHTML = '<div style="padding:12px"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    window.addEventListener('DOMContentLoaded', loadProjects);
    `
  });
}
__name(pagePortalProjects, "pagePortalProjects");
function pagePortalBilling(apiOrigin) {
  return portalShell({
    apiOrigin,
    title: "Billing",
    path: "/portal/billing",
    body: `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">
      <div class="card fade-up">
        <div class="card-header"><h2>Create Invoice</h2><p>Initiate a Yoco payment session</p></div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">Amount (ZAR)</label>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="color:var(--muted);font-size:18px;font-weight:600">R</span>
              <input id="amountRand" class="form-input" type="number" min="1" step="0.01" placeholder="99.00" style="font-size:18px;font-weight:600"/>
            </div>
          </div>
          <button class="btn btn-primary" onclick="doCheckout()" id="checkoutBtn" style="width:100%;justify-content:center;padding:10px">
            Pay with Yoco \u2192
          </button>
          <div id="checkoutAlert" class="alert" style="margin-top:10px"></div>
        </div>
      </div>

      <div class="card fade-up fade-up-1">
        <div class="card-header"><h2>Invoice History</h2><p>All payment records</p></div>
        <div id="invoiceList">
          <div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading...</p></div>
        </div>
      </div>
    </div>`,
    script: `
    const doCheckout = async () => {
      const btn = document.getElementById('checkoutBtn');
      btn.innerHTML = '<span class="spinner"></span> Creating checkout...';
      btn.disabled = true;
      try {
        const rand = parseFloat(document.getElementById('amountRand').value);
        if (!rand || rand <= 0) throw new Error('Enter a valid amount');
        const cents = Math.round(rand * 100);
        const data = await api('/api/invoice/checkout', { method:'POST', body: JSON.stringify({ amount: cents }) });
        if (data.checkoutUrl) {
          window.open(data.checkoutUrl, '_blank', 'noopener,noreferrer');
          showAlert('checkoutAlert', 'Checkout opened in a new tab. Invoice ID: ' + data.invoiceId, 'success');
        } else {
          showAlert('checkoutAlert', 'Invoice created but no checkout URL returned. Invoice: ' + data.invoiceId, 'warn');
        }
        loadInvoices();
      } catch(err) {
        showAlert('checkoutAlert', err.message, 'error');
      } finally {
        btn.innerHTML = 'Pay with Yoco \u2192';
        btn.disabled = false;
      }
    };

    const loadInvoices = async () => {
      try {
        const data = await api('/api/invoices');
        const invs = data.invoices || [];
        if (!invs.length) {
          document.getElementById('invoiceList').innerHTML = '<div class="empty-state"><div class="empty-icon">\u25CE</div><h3>No invoices yet</h3><p>Create your first invoice above</p></div>';
          return;
        }
        document.getElementById('invoiceList').innerHTML =
          '<table class="data-table"><thead><tr><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>' +
          invs.map(i => '<tr><td style="font-weight:600">' + fmtRand(i.amount) + '</td><td>' + statusBadge(i.status) + '</td><td>' + fmtDate(i.created_at) + '</td></tr>').join('') +
          '</tbody></table>';
      } catch(err) {
        document.getElementById('invoiceList').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    window.addEventListener('DOMContentLoaded', loadInvoices);
    `
  });
}
__name(pagePortalBilling, "pagePortalBilling");
function pagePortalSupport(apiOrigin) {
  return portalShell({
    apiOrigin,
    title: "Support",
    path: "/portal/support",
    body: `
    <div style="display:grid;grid-template-columns:300px 1fr;gap:16px;min-height:500px">
      <div style="display:flex;flex-direction:column;gap:12px">
        <button class="btn btn-primary" onclick="showNewTicket()" style="width:100%;justify-content:center">+ New Ticket</button>
        <div class="card" style="flex:1">
          <div class="card-header"><h2>My Tickets</h2></div>
          <div id="ticketListPanel" style="overflow-y:auto;max-height:520px">
            <div class="empty-state"><div class="spinner"></div></div>
          </div>
        </div>
      </div>
      <div class="card" id="threadPanel">
        <div class="empty-state" style="padding:60px 24px">
          <div class="empty-icon">\u25F7</div>
          <h3>Select a ticket</h3>
          <p>Choose a ticket from the left, or create a new one.</p>
        </div>
      </div>
    </div>`,
    script: `
    let activeTicketId = null;

    const showNewTicket = () => {
      activeTicketId = null;
      document.querySelectorAll('.ticket-item').forEach(el => el.style.background = '');
      document.getElementById('threadPanel').innerHTML = \`
        <div class="card-header"><h2>New Support Ticket</h2><p>Our team typically responds within 24 hours</p></div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">Subject</label>
            <input id="newSubject" class="form-input" placeholder="Brief description of your issue"/>
          </div>
          <div class="form-group">
            <label class="form-label">Message</label>
            <textarea id="newMessage" class="form-input" placeholder="Describe your issue in detail..." style="min-height:140px"></textarea>
          </div>
          <button class="btn btn-primary" onclick="submitNewTicket()" id="submitTicketBtn" style="padding:10px 20px">Submit Ticket</button>
          <div id="newTicketAlert" class="alert" style="margin-top:10px"></div>
        </div>
      \`;
    };

    const submitNewTicket = async () => {
      const btn = document.getElementById('submitTicketBtn');
      btn.innerHTML = '<span class="spinner"></span>';
      btn.disabled = true;
      try {
        const subject = document.getElementById('newSubject').value.trim();
        const message = document.getElementById('newMessage').value.trim();
        if (!subject) throw new Error('Subject is required');
        const data = await api('/api/support/tickets', { method:'POST', body: JSON.stringify({ subject, message }) });
        await loadTickets();
        openTicket(data.ticket.id);
      } catch(err) {
        showAlert('newTicketAlert', err.message, 'error');
        btn.innerHTML = 'Submit Ticket';
        btn.disabled = false;
      }
    };

    const openTicket = async (ticketId) => {
      activeTicketId = ticketId;
      document.querySelectorAll('.ticket-item').forEach(el => {
        el.style.background = el.dataset.id === ticketId ? 'var(--bg3)' : '';
      });
      document.getElementById('threadPanel').innerHTML = '<div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading...</p></div>';
      try {
        const data = await api('/api/support/tickets/' + ticketId);
        const ticket = data.ticket;
        const messages = data.messages || [];
        const isClosed = ticket.status === 'closed';
        document.getElementById('threadPanel').innerHTML =
          '<div class="card-header"><div><h2>' + esc(ticket.subject) + '</h2>' +
          '<p style="margin-top:4px">Opened ' + fmtDate(ticket.created_at) + ' &nbsp;' + statusBadge(ticket.status) + '</p></div></div>' +
          '<div class="thread" id="messageThread">' +
          (messages.length ? messages.map(m =>
            '<div class="thread-msg ' + (m.author_role === 'admin' ? 'from-admin' : 'from-client') + '">' +
            '<div class="thread-msg-meta">' + (m.author_role === 'admin' ? '\u{1F7E0} Ubani Support' : '\u25C9 You') + ' \xB7 ' + fmtDate(m.created_at) + '</div>' +
            '<p>' + esc(m.body) + '</p></div>'
          ).join('') : '<p style="color:var(--muted);font-size:13px;padding:8px 0">No messages yet.</p>') +
          '</div>' +
          (!isClosed
            ? '<div style="padding:16px;border-top:1px solid var(--border)">' +
              '<textarea id="replyText" class="form-input" placeholder="Write a reply..." style="min-height:80px;margin-bottom:10px"></textarea>' +
              '<button class="btn btn-primary" onclick="sendReply('' + esc(ticketId) + '')" id="replyBtn">Send Reply</button>' +
              '<div id="replyAlert" class="alert" style="margin-top:8px"></div></div>'
            : '<div style="padding:16px;color:var(--muted);font-size:13px;border-top:1px solid var(--border)">This ticket is closed.</div>'
          );
      } catch(err) {
        document.getElementById('threadPanel').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    const sendReply = async (ticketId) => {
      const btn = document.getElementById('replyBtn');
      btn.innerHTML = '<span class="spinner"></span>';
      btn.disabled = true;
      try {
        const message = document.getElementById('replyText').value.trim();
        if (!message) throw new Error('Message is required');
        await api('/api/support/tickets/' + ticketId + '/reply', { method:'POST', body: JSON.stringify({ message }) });
        openTicket(ticketId);
        loadTickets();
      } catch(err) {
        showAlert('replyAlert', err.message, 'error');
        btn.innerHTML = 'Send Reply';
        btn.disabled = false;
      }
    };

    const loadTickets = async () => {
      try {
        const data = await api('/api/support/tickets');
        const tickets = data.tickets || [];
        if (!tickets.length) {
          document.getElementById('ticketListPanel').innerHTML = '<div class="empty-state" style="padding:24px 16px"><p>No tickets yet.</p></div>';
          return;
        }
        document.getElementById('ticketListPanel').innerHTML = tickets.map(t =>
          '<div class="ticket-item" data-id="' + esc(t.id) + '" onclick="openTicket('' + esc(t.id) + '')"' +
          ' style="padding:12px 16px;cursor:pointer;border-bottom:1px solid var(--border);transition:background 0.12s">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:3px">' +
          '<strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px">' + esc(t.subject) + '</strong>' +
          statusBadge(t.status) + '</div>' +
          '<div style="font-size:11px;color:var(--muted)">' + fmtDate(t.updated_at || t.created_at) + '</div></div>'
        ).join('');
      } catch(err) {
        document.getElementById('ticketListPanel').innerHTML = '<div style="padding:12px"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    window.addEventListener('DOMContentLoaded', loadTickets);
    `
  });
}
__name(pagePortalSupport, "pagePortalSupport");
function pagePortalProfile(apiOrigin) {
  return portalShell({
    apiOrigin,
    title: "Profile",
    path: "/portal/profile",
    body: `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px">
      <div class="card fade-up">
        <div class="card-header"><h2>Account Details</h2><p>Your personal information</p></div>
        <div class="card-body">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px">
            <div class="profile-avatar" id="profileAvatar">?</div>
            <div>
              <div style="font-size:16px;font-weight:600" id="profileName">Loading...</div>
              <div style="font-size:13px;color:var(--muted)" id="profileEmail"></div>
              <div style="margin-top:4px"><span class="plan-pill" id="profilePlan">Free</span></div>
            </div>
          </div>
          <hr style="border:none;border-top:1px solid var(--border);margin-bottom:20px"/>
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input id="nameInput" class="form-input" placeholder="Your name"/>
          </div>
          <button class="btn btn-primary" onclick="saveProfile()" id="saveBtn" style="padding:9px 20px">Save Changes</button>
          <div id="profileAlert" class="alert" style="margin-top:10px"></div>
        </div>
      </div>

      <div class="card fade-up fade-up-1">
        <div class="card-header"><h2>Account Stats</h2><p>Your usage at a glance</p></div>
        <div class="card-body" id="statsBody">
          <div class="empty-state" style="padding:20px"><div class="spinner"></div></div>
        </div>
      </div>

      <div class="card fade-up fade-up-2">
        <div class="card-header"><h2>Upgrade Plan</h2><p>Get more from Ubani</p></div>
        <div class="card-body">
          <p style="color:var(--muted);font-size:13px;margin-bottom:16px">Unlock more projects, storage, and priority support by upgrading your plan.</p>
          <a href="/pricing" class="btn btn-primary" style="width:100%;justify-content:center">View plans \u2192</a>
        </div>
      </div>
    </div>`,
    script: `
    window.addEventListener('DOMContentLoaded', async () => {
      try {
        const [meData, projects, invoices, tickets] = await Promise.all([
          api('/api/me'),
          api('/api/projects'),
          api('/api/invoices'),
          api('/api/support/tickets')
        ]);
        const u = meData.user || {};

        // Update local storage with fresh data
        _setUser({ ..._getUser(), name: u.name, plan: u.plan });

        document.getElementById('profileAvatar').textContent = (u.name || u.email || '?')[0].toUpperCase();
        document.getElementById('profileName').textContent   = u.name || '(no name set)';
        document.getElementById('profileEmail').textContent  = u.email || '';
        document.getElementById('profilePlan').textContent   = u.plan ? u.plan.charAt(0).toUpperCase() + u.plan.slice(1) : 'Free';
        document.getElementById('nameInput').value           = u.name || '';

        // Update sidebar too
        const sAvatar = document.getElementById('userAvatar');
        const sEmail  = document.getElementById('userEmail');
        const sPlan   = document.getElementById('userPlan');
        if (sAvatar) sAvatar.textContent = (u.name || u.email || '?')[0].toUpperCase();
        if (sEmail)  sEmail.textContent  = u.name || u.email || '';
        if (sPlan)   sPlan.textContent   = (u.plan ? u.plan.charAt(0).toUpperCase() + u.plan.slice(1) : 'Free') + ' Plan';

        document.getElementById('statsBody').innerHTML =
          '<div class="stat-grid">' +
          '<div class="stat-card"><div class="stat-label">Projects</div><div class="stat-value">' + (projects.projects||[]).length + '</div></div>' +
          '<div class="stat-card"><div class="stat-label">Invoices</div><div class="stat-value">' + (invoices.invoices||[]).length + '</div></div>' +
          '<div class="stat-card"><div class="stat-label">Tickets</div><div class="stat-value">' + (tickets.tickets||[]).length + '</div></div>' +
          '<div class="stat-card"><div class="stat-label">Credit</div><div class="stat-value">R' + (Number(u.credit||0)/100).toFixed(2) + '</div></div>' +
          '<div class="stat-card" style="grid-column:1/-1"><div class="stat-label">Member since</div><div class="stat-value" style="font-size:16px">' + fmtDate(u.created_at) + '</div></div>' +
          '</div>';
      } catch(err) {
        showAlert('profileAlert', err.message, 'error');
      }
    });

    const saveProfile = async () => {
      const btn = document.getElementById('saveBtn');
      btn.innerHTML = '<span class="spinner"></span>';
      btn.disabled = true;
      try {
        const name = document.getElementById('nameInput').value.trim();
        if (!name) throw new Error('Name cannot be empty');
        await api('/api/me', { method:'PATCH', body: JSON.stringify({ name }) });
        // Update local user cache
        const u = _getUser() || {};
        _setUser({ ...u, name });
        document.getElementById('profileAvatar').textContent = name[0].toUpperCase();
        document.getElementById('profileName').textContent   = name;
        const sAvatar = document.getElementById('userAvatar');
        const sEmail  = document.getElementById('userEmail');
        if (sAvatar) sAvatar.textContent = name[0].toUpperCase();
        if (sEmail)  sEmail.textContent  = name;
        showAlert('profileAlert', 'Profile updated!', 'success');
      } catch(err) {
        showAlert('profileAlert', err.message, 'error');
      } finally {
        btn.innerHTML = 'Save Changes';
        btn.disabled = false;
      }
    };
    `
  });
}
__name(pagePortalProfile, "pagePortalProfile");
function pageAdminProjects(apiOrigin) {
  return adminShell({
    apiOrigin,
    title: "Projects",
    body: `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px" class="fade-up">
      <div><h2 style="font-size:16px;font-weight:600">All Projects</h2><p style="color:var(--muted);font-size:13px">Every deployment across all clients</p></div>
      <div style="display:flex;gap:8px">
        <select id="statusFilter" class="form-input" style="width:auto;font-size:12px" onchange="loadProjects()">
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="building">Building</option>
          <option value="live">Live</option>
          <option value="paused">Paused</option>
        </select>
        <button class="btn btn-ghost" onclick="loadProjects()">\u21BA Refresh</button>
      </div>
    </div>
    <div class="card fade-up" id="projectsContainer">
      <div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading...</p></div>
    </div>`,
    script: `
    const setStatus = async (projectId, status) => {
      try {
        await adminApi('/api/admin/projects/' + projectId + '/status', { method:'POST', body: JSON.stringify({ status }) });
        loadProjects();
      } catch(err) { alert(err.message); }
    };

    const adminApiPost = async (path, body) => {
      const key = _adminKey();
      if (!key) throw new Error('No admin key');
      const res = await fetch(APP + path, {
        method: 'POST',
        headers: { 'x-admin-key': key, 'content-type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json().catch(()=>({}));
      if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);
      return data;
    };

    const loadProjects = async () => {
      try {
        const data = await adminApi('/api/admin/projects');
        let projects = data.projects || [];
        const filter = document.getElementById('statusFilter').value;
        if (filter) projects = projects.filter(p => p.status === filter);
        if (!projects.length) {
          document.getElementById('projectsContainer').innerHTML = '<div class="empty-state"><div class="empty-icon">\u25C8</div><h3>No projects found</h3></div>';
          return;
        }
        document.getElementById('projectsContainer').innerHTML =
          '<table class="data-table"><thead><tr><th>Domain</th><th>Client</th><th>Status</th><th>Live URL</th><th>Storage</th><th>Actions</th></tr></thead><tbody>' +
          projects.map(p => '<tr>' +
            '<td><strong style="font-size:13px">' + esc(p.domain) + '</strong></td>' +
            '<td style="font-size:12px;color:var(--muted)">' + esc(p.name || p.email || '') + '</td>' +
            '<td>' + statusBadge(p.status || 'draft') + '</td>' +
            '<td>' + (p.cf_pages_url ? '<a href="' + esc(p.cf_pages_url) + '" target="_blank" style="font-size:12px">\u2197 View</a>' : '<span style="color:var(--muted);font-size:12px">\u2014</span>') + '</td>' +
            '<td style="font-size:12px">' + (p.storage > 0 ? (p.storage/1024).toFixed(1) + ' KB' : '\u2014') + '</td>' +
            '<td><select onchange="setStatus(\\'' + esc(p.id) + '\\', this.value)" style="background:var(--bg2);border:1px solid var(--border2);color:var(--text);border-radius:6px;padding:3px 6px;font-size:11px;cursor:pointer">' +
            ['draft','live','paused','building'].map(s => '<option value="' + s + '"' + (p.status === s ? ' selected' : '') + '>' + s + '</option>').join('') +
            '</select></td>' +
          '</tr>').join('') +
          '</tbody></table>';
      } catch(err) {
        document.getElementById('projectsContainer').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    window.addEventListener('DOMContentLoaded', () => { if (_adminKey()) loadProjects(); });
    document.getElementById('adminKeyInput')?.addEventListener('change', loadProjects);
    `
  });
}
__name(pageAdminProjects, "pageAdminProjects");
function pageAdminDashboard(apiOrigin) {
  return adminShell({
    apiOrigin,
    title: "Overview",
    body: `
    <div class="stat-grid fade-up" id="statsGrid">
      <div class="stat-card"><div class="stat-label">Total users</div><div class="stat-value" id="sUsers">\u2014</div></div>
      <div class="stat-card"><div class="stat-label">Projects</div><div class="stat-value" id="sProjects">\u2014</div></div>
      <div class="stat-card"><div class="stat-label">Invoices</div><div class="stat-value" id="sInvoices">\u2014</div></div>
      <div class="stat-card"><div class="stat-label">Paid revenue</div><div class="stat-value" id="sRevenue">\u2014</div></div>
    </div>
    <div id="adminAlert" class="alert fade-up" style="margin-top:16px;max-width:500px"></div>`,
    script: `
    const load = async () => {
      try {
        const data = await adminApi('/api/admin/summary');
        document.getElementById('sUsers').textContent    = data.users;
        document.getElementById('sProjects').textContent = data.projects;
        document.getElementById('sInvoices').textContent = data.invoices;
        document.getElementById('sRevenue').textContent  = fmtRand(data.paidRevenueCents);
      } catch(err) {
        document.getElementById('adminAlert').className   = 'alert alert-error fade-up';
        document.getElementById('adminAlert').textContent = err.message;
      }
    };
    document.getElementById('autoLoadTrigger') || (window._autoLoad = load);
    window.addEventListener('DOMContentLoaded', () => { if (_adminKey()) load(); });
    document.getElementById('adminKeyInput')?.addEventListener('change', load);
    `
  });
}
__name(pageAdminDashboard, "pageAdminDashboard");
function pageAdminUsers(apiOrigin) {
  return adminShell({
    apiOrigin,
    title: "Users",
    body: `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px" class="fade-up">
      <div><h2 style="font-size:16px;font-weight:600">All Users</h2><p style="color:var(--muted);font-size:13px">Registered accounts</p></div>
      <button class="btn btn-ghost" onclick="loadUsers()">\u21BA Refresh</button>
    </div>
    <div class="card fade-up" id="usersContainer">
      <div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading...</p></div>
    </div>`,
    script: `
    const loadUsers = async () => {
      try {
        const data = await adminApi('/api/admin/users');
        const users = data.users || [];
        if (!users.length) {
          document.getElementById('usersContainer').innerHTML = '<div class="empty-state"><div class="empty-icon">\u25CE</div><h3>No users yet</h3></div>';
          return;
        }
        document.getElementById('usersContainer').innerHTML =
          '<table class="data-table"><thead><tr><th>Email</th><th>Credit</th><th>Registered</th><th>ID</th></tr></thead><tbody>' +
          users.map(u => '<tr><td>' + esc(u.email) + '</td><td>R' + (Number(u.credit||0)/100).toFixed(2) + '</td><td>' + fmtDate(u.created_at) + '</td><td class="mono" style="color:var(--muted)">' + esc(u.id.slice(0,8)) + '\u2026</td></tr>').join('') +
          '</tbody></table>';
      } catch(err) {
        document.getElementById('usersContainer').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };
    window.addEventListener('DOMContentLoaded', () => { if (_adminKey()) loadUsers(); });
    document.getElementById('adminKeyInput')?.addEventListener('change', loadUsers);
    `
  });
}
__name(pageAdminUsers, "pageAdminUsers");
function pageAdminRevenue(apiOrigin) {
  return adminShell({
    apiOrigin,
    title: "Revenue",
    body: `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px" class="fade-up">
      <div><h2 style="font-size:16px;font-weight:600">Revenue Analytics</h2><p style="color:var(--muted);font-size:13px">Invoice totals by status</p></div>
      <button class="btn btn-ghost" onclick="loadRevenue()">\u21BA Refresh</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">
      <div class="card fade-up" id="totalsCard">
        <div class="card-header"><h2>By Status</h2></div>
        <div class="empty-state"><div class="spinner"></div></div>
      </div>
      <div class="card fade-up fade-up-1" id="paidCard">
        <div class="card-header"><h2>Latest Paid</h2></div>
        <div class="empty-state"><div class="spinner"></div></div>
      </div>
    </div>`,
    script: `
    const loadRevenue = async () => {
      try {
        const data = await adminApi('/api/admin/revenue');
        const totals = data.totals || [];
        const paid   = data.latestPaid || [];

        document.getElementById('totalsCard').innerHTML =
          '<div class="card-header"><h2>By Status</h2></div>' +
          (totals.length
            ? '<table class="data-table"><thead><tr><th>Status</th><th>Count</th><th>Total</th></tr></thead><tbody>' +
              totals.map(t => '<tr><td>' + statusBadge(t.status) + '</td><td>' + esc(t.count) + '</td><td style="font-weight:600">' + fmtRand(t.cents) + '</td></tr>').join('') +
              '</tbody></table>'
            : '<div class="empty-state"><p>No data</p></div>');

        document.getElementById('paidCard').innerHTML =
          '<div class="card-header"><h2>Latest Paid</h2></div>' +
          (paid.length
            ? '<table class="data-table"><thead><tr><th>Amount</th><th>User</th><th>Date</th></tr></thead><tbody>' +
              paid.map(i => '<tr><td style="font-weight:600">' + fmtRand(i.amount) + '</td><td class="mono" style="color:var(--muted)">' + esc(i.user_id.slice(0,8)) + '\u2026</td><td>' + fmtDate(i.created_at) + '</td></tr>').join('') +
              '</tbody></table>'
            : '<div class="empty-state"><p>No paid invoices yet</p></div>');
      } catch(err) {
        document.getElementById('totalsCard').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };
    window.addEventListener('DOMContentLoaded', () => { if (_adminKey()) loadRevenue(); });
    document.getElementById('adminKeyInput')?.addEventListener('change', loadRevenue);
    `
  });
}
__name(pageAdminRevenue, "pageAdminRevenue");
function pageAdminTickets(apiOrigin) {
  return adminShell({
    apiOrigin,
    title: "Tickets",
    body: `
    <div style="display:grid;grid-template-columns:320px 1fr;gap:16px;min-height:540px" class="fade-up">
      <div style="display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;gap:8px">
          <button class="btn btn-ghost" onclick="loadTickets()" style="flex:1">\u21BA Refresh</button>
          <select id="statusFilter" class="form-input" style="width:auto;font-size:12px" onchange="loadTickets()">
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div class="card" style="flex:1">
          <div class="card-header"><h2>All Tickets</h2><p id="ticketCount">Loading...</p></div>
          <div id="ticketListPanel" style="overflow-y:auto;max-height:520px">
            <div class="empty-state"><div class="spinner"></div></div>
          </div>
        </div>
      </div>

      <div class="card" id="adminThreadPanel">
        <div class="empty-state" style="padding:60px 24px">
          <div class="empty-icon">\u25F7</div>
          <h3>Select a ticket</h3>
          <p>Click a ticket on the left to view the full thread and reply.</p>
        </div>
      </div>
    </div>`,
    script: `
    let activeId = null;

    const openAdminTicket = async (ticketId) => {
      activeId = ticketId;
      document.querySelectorAll('.admin-ticket-item').forEach(el => {
        el.style.background = el.dataset.id === ticketId ? 'var(--bg3)' : '';
      });
      document.getElementById('adminThreadPanel').innerHTML = '<div class="empty-state"><div class="spinner"></div><p style="margin-top:12px">Loading thread...</p></div>';
      try {
        const data = await adminApi('/api/admin/tickets/' + ticketId);
        const ticket = data.ticket;
        const messages = data.messages || [];
        const isClosed = ticket.status === 'closed';
        document.getElementById('adminThreadPanel').innerHTML =
          '<div class="card-header">' +
          '<div><h2>' + esc(ticket.subject) + '</h2>' +
          '<p style="margin-top:4px">From: <strong>' + esc(ticket.name || ticket.email || '') + '</strong> (' + esc(ticket.email || '') + ') &nbsp;' + statusBadge(ticket.status) + '</p>' +
          '<p style="margin-top:2px;font-size:12px;color:var(--muted)">Opened ' + fmtDate(ticket.created_at) + '</p>' +
          '</div>' +
          (isClosed
            ? '<button class="btn btn-ghost" style="font-size:12px" disabled>Closed</button>'
            : '<button class="btn btn-danger" style="font-size:12px" onclick="closeTicket(\\'' + esc(ticketId) + '\\')">Close Ticket</button>'
          ) +
          '</div>' +
          '<div class="thread" id="adminMsgThread">' +
          (messages.length ? messages.map(m =>
            '<div class="thread-msg ' + (m.author_role === 'admin' ? 'from-admin' : 'from-client') + '">' +
            '<div class="thread-msg-meta">' + (m.author_role === 'admin' ? '\u{1F7E0} You (Admin)' : '\u25C9 Client') + ' \xB7 ' + fmtDate(m.created_at) + '</div>' +
            '<p>' + esc(m.body) + '</p></div>'
          ).join('') : '<p style="color:var(--muted);font-size:13px;padding:4px 0">No messages in thread yet.</p>') +
          '</div>' +
          (!isClosed
            ? '<div style="padding:16px;border-top:1px solid var(--border)">' +
              '<textarea id="adminReplyText" class="form-input" placeholder="Type your reply to the client..." style="min-height:100px;margin-bottom:10px"></textarea>' +
              '<button class="btn btn-primary" onclick="sendAdminReply(\\'' + esc(ticketId) + '\\')" id="adminReplyBtn">Send Reply &amp; Notify Client</button>' +
              '<div id="adminReplyAlert" class="alert" style="margin-top:8px"></div></div>'
            : '<div style="padding:16px;color:var(--muted);font-size:13px;border-top:1px solid var(--border)">This ticket is closed.</div>'
          );
      } catch(err) {
        document.getElementById('adminThreadPanel').innerHTML = '<div class="card-body"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    const sendAdminReply = async (ticketId) => {
      const btn = document.getElementById('adminReplyBtn');
      btn.innerHTML = '<span class="spinner"></span> Sending...';
      btn.disabled = true;
      try {
        const message = document.getElementById('adminReplyText').value.trim();
        if (!message) throw new Error('Reply cannot be empty');
        await adminApi('/api/admin/tickets/' + ticketId + '/reply', { method: 'POST', body: JSON.stringify({ message }) });
        showAdminAlert('adminReplyAlert', 'Reply sent \u2014 client notified by email \u2713', 'success');
        openAdminTicket(ticketId);
        loadTickets();
      } catch(err) {
        showAdminAlert('adminReplyAlert', err.message, 'error');
        btn.innerHTML = 'Send Reply & Notify Client';
        btn.disabled = false;
      }
    };

    const closeTicket = async (ticketId) => {
      if (!confirm('Close this ticket?')) return;
      try {
        await adminApi('/api/admin/tickets/' + ticketId + '/close', { method: 'POST' });
        loadTickets();
        openAdminTicket(ticketId);
      } catch(err) { alert(err.message); }
    };

    const showAdminAlert = (id, msg, type) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.className = 'alert alert-' + type;
      el.textContent = msg;
    };

    const adminApi2 = async (path, options = {}) => {
      const key = _adminKey();
      if (!key) throw new Error('No admin key set');
      const opts = { ...options, headers: { 'x-admin-key': key, 'content-type': 'application/json', ...(options.headers||{}) } };
      const res = await fetch(APP + path, opts);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'HTTP ' + res.status);
      return data;
    };
    // Override adminApi to support POST
    const _origAdminApi = adminApi;
    const adminApi = async (path, options = {}) => {
      if (options.method) return adminApi2(path, options);
      return _origAdminApi(path);
    };

    const loadTickets = async () => {
      try {
        const data = await adminApi('/api/admin/tickets');
        let tickets = data.tickets || [];
        const filter = document.getElementById('statusFilter').value;
        if (filter) tickets = tickets.filter(t => t.status === filter);
        document.getElementById('ticketCount').textContent = tickets.length + ' ticket' + (tickets.length !== 1 ? 's' : '');
        if (!tickets.length) {
          document.getElementById('ticketListPanel').innerHTML = '<div class="empty-state" style="padding:24px 16px"><p>No tickets found</p></div>';
          return;
        }
        document.getElementById('ticketListPanel').innerHTML = tickets.map(t =>
          '<div class="admin-ticket-item" data-id="' + esc(t.id) + '" onclick="openAdminTicket(\\'' + esc(t.id) + '\\')"' +
          ' style="padding:12px 16px;cursor:pointer;border-bottom:1px solid var(--border);transition:background 0.12s' + (t.id === activeId ? ';background:var(--bg3)' : '') + '">' +
          '<div style="display:flex;justify-content:space-between;gap:8px;margin-bottom:3px">' +
          '<strong style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:170px">' + esc(t.subject) + '</strong>' +
          statusBadge(t.status) + '</div>' +
          '<div style="font-size:11px;color:var(--muted)">' + esc((t.user_id||'').slice(0,8)) + '\u2026 \xB7 ' + fmtDate(t.created_at) + '</div></div>'
        ).join('');
      } catch(err) {
        document.getElementById('ticketListPanel').innerHTML = '<div style="padding:12px"><div class="alert alert-error">' + esc(err.message) + '</div></div>';
      }
    };

    window.addEventListener('DOMContentLoaded', () => { if (_adminKey()) loadTickets(); });
    document.getElementById('adminKeyInput')?.addEventListener('change', loadTickets);
    `
  });
}
__name(pageAdminTickets, "pageAdminTickets");
function renderFrontend(pathname, apiOrigin) {
  switch (pathname) {
    case "/":
      return pageHome(apiOrigin);
    case "/pricing":
      return pagePricing(apiOrigin);
    case "/hosting":
      return pageHosting(apiOrigin);
    case "/contact":
      return pageContact(apiOrigin);
    case "/portal/login":
      return pageLogin(apiOrigin);
    case "/portal/register":
      return pageRegister(apiOrigin);
    case "/portal":
    case "/portal/dashboard":
      return pagePortalDashboard(apiOrigin);
    case "/portal/projects":
      return pagePortalProjects(apiOrigin);
    case "/portal/billing":
      return pagePortalBilling(apiOrigin);
    case "/portal/support":
      return pagePortalSupport(apiOrigin);
    case "/portal/profile":
      return pagePortalProfile(apiOrigin);
    case "/admin/dashboard":
      return pageAdminDashboard(apiOrigin);
    case "/admin/users":
      return pageAdminUsers(apiOrigin);
    case "/admin/projects":
      return pageAdminProjects(apiOrigin);
    case "/admin/revenue":
      return pageAdminRevenue(apiOrigin);
    case "/admin/tickets":
      return pageAdminTickets(apiOrigin);
    default:
      return null;
  }
}
__name(renderFrontend, "renderFrontend");
function renderDesignerLanding(apiOrigin) {
  return pageHome(apiOrigin);
}
__name(renderDesignerLanding, "renderDesignerLanding");

// src/worker.js
var DEFAULT_PASSWORD_HASH_ITERATIONS = 15e3;
var MIN_PASSWORD_HASH_ITERATIONS = 1e4;
var MAX_PASSWORD_HASH_ITERATIONS = 5e4;
var RATE_LIMIT_BUCKETS = /* @__PURE__ */ new Map();
var BLOCKED_CRAWLER_SIGNATURES = [
  "gptbot",
  "chatgpt-user",
  "oai-searchbot",
  "claudebot",
  "anthropic-ai",
  "perplexitybot",
  "bytespider",
  "cohere-ai",
  "ccbot"
];
var SECURITY_HEADERS = {
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "geolocation=(), camera=(), microphone=()",
  "strict-transport-security": "max-age=31536000; includeSubDomains; preload"
};
function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...SECURITY_HEADERS,
      ...init.headers || {}
    }
  });
}
__name(json, "json");
function buildCsp(apiOrigin) {
  const connectSrc = ["'self'", "https://cloudflareinsights.com", "https://*.cloudflareinsights.com"];
  if (apiOrigin && !connectSrc.includes(apiOrigin)) connectSrc.push(apiOrigin);
  if (!connectSrc.some((s) => s.includes("localhost"))) {
    connectSrc.push("http://localhost:8787", "https://localhost:8787");
  }
  return [
    "default-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src https://fonts.gstatic.com",
    "img-src 'self' https: data:",
    "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
    `connect-src ${connectSrc.join(" ")}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join("; ");
}
__name(buildCsp, "buildCsp");
function html(content, init = {}, apiOrigin = "") {
  return new Response(content, {
    ...init,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=120",
      ...SECURITY_HEADERS,
      "content-security-policy": buildCsp(apiOrigin),
      ...init.headers || {}
    }
  });
}
__name(html, "html");
function text(content, init = {}) {
  return new Response(content, {
    ...init,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      ...SECURITY_HEADERS,
      ...init.headers || {}
    }
  });
}
__name(text, "text");
function headFromResponse(response) {
  return new Response(null, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}
__name(headFromResponse, "headFromResponse");
function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}
__name(constantTimeEqual, "constantTimeEqual");
function bytesFromBase64(base64) {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}
__name(bytesFromBase64, "bytesFromBase64");
function base64FromBytes(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}
__name(base64FromBytes, "base64FromBytes");
async function hmacSha256Base64(keyBytes, message) {
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return base64FromBytes(new Uint8Array(signature));
}
__name(hmacSha256Base64, "hmacSha256Base64");
async function parseJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
__name(parseJson, "parseJson");
function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
__name(isValidEmail, "isValidEmail");
function getClientIp(request) {
  const fromCf = request.headers.get("cf-connecting-ip");
  if (fromCf) return fromCf.trim();
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
__name(getClientIp, "getClientIp");
function consumeRateLimit(key, limit, windowMs) {
  const now = Date.now();
  const existing = RATE_LIMIT_BUCKETS.get(key);
  if (!existing || now >= existing.resetAt) {
    RATE_LIMIT_BUCKETS.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: Math.ceil(windowMs / 1e3) };
  }
  existing.count += 1;
  if (existing.count <= limit) {
    return {
      allowed: true,
      remaining: Math.max(limit - existing.count, 0),
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1e3)
    };
  }
  return {
    allowed: false,
    remaining: 0,
    retryAfterSeconds: Math.max(Math.ceil((existing.resetAt - now) / 1e3), 1)
  };
}
__name(consumeRateLimit, "consumeRateLimit");
function isBlockedCrawlerRequest(request, env) {
  if (String(env.ALLOW_AI_CRAWLERS || "").toLowerCase() === "true") return false;
  const ua = String(request.headers.get("user-agent") || "").toLowerCase();
  if (!ua) return false;
  return BLOCKED_CRAWLER_SIGNATURES.some((signature) => ua.includes(signature));
}
__name(isBlockedCrawlerRequest, "isBlockedCrawlerRequest");
function isFrontendPath(pathname) {
  return pathname === "/" || pathname === "/pricing" || pathname === "/hosting" || pathname === "/contact" || pathname === "/portal" || pathname.startsWith("/portal/") || pathname.startsWith("/admin/");
}
__name(isFrontendPath, "isFrontendPath");
function getRobotsTxt() {
  return [
    "User-agent: GPTBot",
    "Disallow: /",
    "",
    "User-agent: ChatGPT-User",
    "Disallow: /",
    "",
    "User-agent: OAI-SearchBot",
    "Disallow: /",
    "",
    "User-agent: ClaudeBot",
    "Disallow: /",
    "",
    "User-agent: PerplexityBot",
    "Disallow: /",
    "",
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /admin/",
    "Disallow: /portal/"
  ].join("\n");
}
__name(getRobotsTxt, "getRobotsTxt");
async function serveStaticAsset(request, env) {
  if (!env.ASSETS || typeof env.ASSETS.fetch !== "function") {
    return text("Asset binding unavailable", { status: 503, headers: { "cache-control": "no-store" } });
  }
  const response = await env.ASSETS.fetch(request);
  if (!response || response.status === 404) {
    return text("Not Found", { status: 404, headers: { "cache-control": "public, max-age=60" } });
  }
  const headers = new Headers(response.headers);
  headers.set("cache-control", "public, max-age=604800, immutable");
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
__name(serveStaticAsset, "serveStaticAsset");
async function register(request, env) {
  const body = await parseJson(request);
  if (!isValidEmail(body?.email) || typeof body?.password !== "string" || body.password.length < 8) {
    return json({ error: "Valid email and password (min 8 chars) are required" }, { status: 400 });
  }
  const db = getTursoClient(env);
  const id = crypto.randomUUID();
  const name = String(body?.name || "").trim().slice(0, 120);
  const configuredIterations = Number(env.PASSWORD_HASH_ITERATIONS || DEFAULT_PASSWORD_HASH_ITERATIONS);
  const iterations = Number.isInteger(configuredIterations) ? Math.min(Math.max(configuredIterations, MIN_PASSWORD_HASH_ITERATIONS), MAX_PASSWORD_HASH_ITERATIONS) : DEFAULT_PASSWORD_HASH_ITERATIONS;
  const passwordHash = await hashPassword(body.password, iterations);
  try {
    await db.execute({
      sql: `INSERT INTO users(id, email, password, name, plan, credit, created_at)
            VALUES (?, ?, ?, ?, 'free', 0, CURRENT_TIMESTAMP)`,
      args: [id, body.email.toLowerCase(), passwordHash, name]
    });
  } catch (error) {
    if (String(error.message || "").toLowerCase().includes("unique")) {
      return json({ error: "Email already registered" }, { status: 409 });
    }
    throw error;
  }
  const token = await signJwt({ sub: id, email: body.email.toLowerCase() }, env);
  return json({ user: { id, email: body.email.toLowerCase(), name, plan: "free" }, token }, { status: 201 });
}
__name(register, "register");
async function updateProfile(request, env, userId) {
  const body = await parseJson(request);
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, 120) : null;
  if (!name) return json({ error: "name is required" }, { status: 400 });
  const db = getTursoClient(env);
  await db.execute({
    sql: "UPDATE users SET name = ? WHERE id = ?",
    args: [name, userId]
  });
  return json({ ok: true, name });
}
__name(updateProfile, "updateProfile");
async function login(request, env) {
  const body = await parseJson(request);
  if (!isValidEmail(body?.email) || typeof body?.password !== "string") {
    return json({ error: "email and password are required" }, { status: 400 });
  }
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: "SELECT id, email, password, name, plan, credit FROM users WHERE email = ? LIMIT 1",
    args: [body.email.toLowerCase()]
  });
  if (!result.rows.length) {
    return json({ error: "Invalid credentials" }, { status: 401 });
  }
  const user = result.rows[0];
  const ok = await verifyPassword(body.password, String(user.password));
  if (!ok) {
    return json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = await signJwt({ sub: String(user.id), email: String(user.email) }, env);
  return json({ user: { id: user.id, email: user.email, name: user.name, plan: user.plan, credit: user.credit }, token });
}
__name(login, "login");
async function invoice(request, env, userId) {
  const body = await parseJson(request);
  if (typeof body?.amount !== "number") {
    return json({ error: "numeric amount is required" }, { status: 400 });
  }
  const db = getTursoClient(env);
  const id = crypto.randomUUID();
  await db.execute({
    sql: `INSERT INTO invoices(id, user_id, amount, status)
          VALUES (?, ?, ?, ?)`,
    args: [id, userId, body.amount, "pending"]
  });
  return json({ id, status: "pending" }, { status: 201 });
}
__name(invoice, "invoice");
function getYocoSecret(env) {
  const key = env.YOCO_SECRET_KEY || env.YOCO_SECRET;
  if (!key) throw new Error("Missing YOCO_SECRET_KEY");
  return key;
}
__name(getYocoSecret, "getYocoSecret");
function getCanonicalApiOrigin(request, env) {
  const configured = (env.PUBLIC_API_BASE_URL || env.API_BASE_URL || "").trim();
  if (!configured) return new URL(request.url).origin;
  try {
    return new URL(configured).origin;
  } catch {
    throw new Error("PUBLIC_API_BASE_URL must be a valid absolute URL");
  }
}
__name(getCanonicalApiOrigin, "getCanonicalApiOrigin");
async function createYocoCheckout(amount, invoiceId, request, env) {
  const secret = getYocoSecret(env);
  const origin = getCanonicalApiOrigin(request, env);
  const successUrl = env.PAYMENT_SUCCESS_URL || `${origin}/portal`;
  const cancelUrl = env.PAYMENT_CANCEL_URL || `${origin}/portal`;
  const response = await fetch("https://payments.yoco.com/api/checkouts", {
    method: "POST",
    headers: {
      authorization: `Bearer ${secret}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      amount,
      currency: "ZAR",
      successUrl,
      cancelUrl,
      metadata: {
        invoiceId
      }
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof data?.message === "string" ? data.message : `Yoco checkout failed (${response.status})`;
    throw new Error(message);
  }
  return {
    checkoutId: data?.id || data?.checkoutId || crypto.randomUUID(),
    checkoutUrl: data?.redirectUrl || data?.url || data?.checkoutUrl || null,
    raw: data
  };
}
__name(createYocoCheckout, "createYocoCheckout");
async function createInvoiceCheckout(request, env, userId) {
  const body = await parseJson(request);
  if (!Number.isInteger(body?.amount) || body.amount <= 0) {
    return json({ error: "amount must be a positive integer in cents" }, { status: 400 });
  }
  const db = getTursoClient(env);
  const invoiceId = crypto.randomUUID();
  await db.execute({
    sql: `INSERT INTO invoices(id, user_id, amount, status)
          VALUES (?, ?, ?, ?)`,
    args: [invoiceId, userId, body.amount, "pending"]
  });
  const checkout = await createYocoCheckout(body.amount, invoiceId, request, env);
  await db.execute({
    sql: `INSERT INTO payments(
            id, invoice_id, user_id, provider, status, checkout_id, checkout_url, provider_reference, payload, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    args: [
      crypto.randomUUID(),
      invoiceId,
      userId,
      "yoco",
      "pending",
      checkout.checkoutId,
      checkout.checkoutUrl,
      null,
      JSON.stringify(checkout.raw)
    ]
  });
  return json({
    invoiceId,
    amount: body.amount,
    status: "pending",
    checkoutUrl: checkout.checkoutUrl
  }, { status: 201 });
}
__name(createInvoiceCheckout, "createInvoiceCheckout");
async function me(env, userId) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: "SELECT id, email, name, plan, credit, created_at FROM users WHERE id = ? LIMIT 1",
    args: [userId]
  });
  if (!result.rows.length) return json({ error: "User not found" }, { status: 404 });
  return json({ user: result.rows[0] });
}
__name(me, "me");
async function listProjects(env, userId) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, domain, status, description, storage, cf_pages_url, cf_deployment_id, created_at
          FROM projects
          WHERE user_id = ?
          ORDER BY created_at DESC
          LIMIT 100`,
    args: [userId]
  });
  return json({ projects: result.rows });
}
__name(listProjects, "listProjects");
async function getProject(request, env, userId) {
  const projectId = new URL(request.url).pathname.split("/")[3];
  const db = getTursoClient(env);
  const [projResult, filesResult, deploysResult] = await Promise.all([
    db.execute({
      sql: `SELECT id, domain, status, description, storage, cf_pages_url, cf_pages_project, cf_deployment_id, created_at
            FROM projects WHERE id = ? AND user_id = ? LIMIT 1`,
      args: [projectId, userId]
    }),
    db.execute({
      sql: `SELECT id, filename, content_type, size_bytes, r2_key, uploaded_at
            FROM r2_files WHERE project_id = ? ORDER BY uploaded_at DESC LIMIT 50`,
      args: [projectId]
    }),
    db.execute({
      sql: `SELECT id, status, pages_url, triggered_at, completed_at, error_message
            FROM deployments WHERE project_id = ? ORDER BY triggered_at DESC LIMIT 10`,
      args: [projectId]
    })
  ]);
  if (!projResult.rows.length) return json({ error: "Project not found" }, { status: 404 });
  return json({
    project: projResult.rows[0],
    files: filesResult.rows,
    deployments: deploysResult.rows
  });
}
__name(getProject, "getProject");
async function updateProject(request, env, userId) {
  const projectId = new URL(request.url).pathname.split("/")[3];
  const body = await parseJson(request);
  const db = getTursoClient(env);
  const check = await db.execute({
    sql: "SELECT id FROM projects WHERE id = ? AND user_id = ? LIMIT 1",
    args: [projectId, userId]
  });
  if (!check.rows.length) return json({ error: "Project not found" }, { status: 404 });
  const updates = [];
  const args = [];
  if (typeof body?.description === "string") {
    updates.push("description = ?");
    args.push(body.description.slice(0, 500));
  }
  if (typeof body?.domain === "string" && body.domain.trim()) {
    updates.push("domain = ?");
    args.push(body.domain.trim());
  }
  const allowedStatuses = ["draft", "live", "paused"];
  if (body?.status && allowedStatuses.includes(body.status)) {
    updates.push("status = ?");
    args.push(body.status);
  }
  if (!updates.length) return json({ error: "No valid fields to update" }, { status: 400 });
  args.push(projectId);
  await db.execute({ sql: `UPDATE projects SET ${updates.join(", ")} WHERE id = ?`, args });
  return json({ ok: true });
}
__name(updateProject, "updateProject");
async function createProject(request, env, userId) {
  const body = await parseJson(request);
  const domain = String(body?.domain || "").trim();
  if (!domain) return json({ error: "domain is required" }, { status: 400 });
  const db = getTursoClient(env);
  const projectId = crypto.randomUUID();
  await db.execute({
    sql: `INSERT INTO projects(id, user_id, domain, status, description, storage)
          VALUES (?, ?, ?, 'draft', ?, 0)`,
    args: [projectId, userId, domain, String(body?.description || "")]
  });
  return json({ project: { id: projectId, domain, status: "draft" } }, { status: 201 });
}
__name(createProject, "createProject");
async function uploadFile(request, env, userId) {
  const projectId = new URL(request.url).pathname.split("/")[3];
  const db = getTursoClient(env);
  const projCheck = await db.execute({
    sql: "SELECT id FROM projects WHERE id = ? AND user_id = ? LIMIT 1",
    args: [projectId, userId]
  });
  if (!projCheck.rows.length) return json({ error: "Project not found" }, { status: 404 });
  if (!env.FILES_BUCKET) {
    return json({ error: "R2 bucket not configured \u2014 add FILES_BUCKET binding to wrangler.toml" }, { status: 503 });
  }
  const contentType = request.headers.get("content-type") || "application/octet-stream";
  const filename = decodeURIComponent(request.headers.get("x-filename") || `file-${Date.now()}`);
  const safeFilename = filename.replace(/[^a-zA-Z0-9._\-]/g, "_").slice(0, 200);
  const r2Key = `projects/${projectId}/${safeFilename}`;
  const bodyBytes = await request.arrayBuffer();
  if (!bodyBytes.byteLength) return json({ error: "Empty file body" }, { status: 400 });
  if (bodyBytes.byteLength > 25 * 1024 * 1024) return json({ error: "File too large (25MB max)" }, { status: 413 });
  await env.FILES_BUCKET.put(r2Key, bodyBytes, {
    httpMetadata: { contentType },
    customMetadata: { projectId, userId, originalFilename: filename }
  });
  const fileId = crypto.randomUUID();
  await db.execute({
    sql: `INSERT OR REPLACE INTO r2_files(id, project_id, user_id, r2_key, filename, content_type, size_bytes, uploaded_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    args: [fileId, projectId, userId, r2Key, safeFilename, contentType, bodyBytes.byteLength]
  });
  await db.execute({
    sql: `UPDATE projects
          SET storage = (SELECT COALESCE(SUM(size_bytes),0) FROM r2_files WHERE project_id = ?)
          WHERE id = ?`,
    args: [projectId, projectId]
  });
  return json({ ok: true, fileId, r2Key, filename: safeFilename, size: bodyBytes.byteLength }, { status: 201 });
}
__name(uploadFile, "uploadFile");
async function deleteFile(request, env, userId) {
  const parts = new URL(request.url).pathname.split("/");
  const projectId = parts[3];
  const fileId = parts[5];
  const db = getTursoClient(env);
  const fileResult = await db.execute({
    sql: "SELECT r2_key FROM r2_files WHERE id = ? AND project_id = ? AND user_id = ? LIMIT 1",
    args: [fileId, projectId, userId]
  });
  if (!fileResult.rows.length) return json({ error: "File not found" }, { status: 404 });
  const r2Key = String(fileResult.rows[0].r2_key);
  if (env.FILES_BUCKET) await env.FILES_BUCKET.delete(r2Key);
  await db.execute({ sql: "DELETE FROM r2_files WHERE id = ?", args: [fileId] });
  await db.execute({
    sql: `UPDATE projects SET storage = (SELECT COALESCE(SUM(size_bytes),0) FROM r2_files WHERE project_id = ?) WHERE id = ?`,
    args: [projectId, projectId]
  });
  return json({ ok: true });
}
__name(deleteFile, "deleteFile");
async function serveProjectFile(request, env) {
  const parts = new URL(request.url).pathname.split("/").filter(Boolean);
  const projectId = parts[1];
  const filePath = parts.slice(2).join("/");
  const r2Key = `projects/${projectId}/${filePath}`;
  if (!env.FILES_BUCKET) return new Response("File storage unavailable", { status: 503 });
  const obj = await env.FILES_BUCKET.get(r2Key);
  if (!obj) return new Response("Not Found", { status: 404 });
  const headers = new Headers();
  headers.set("content-type", obj.httpMetadata?.contentType || "application/octet-stream");
  headers.set("cache-control", "public, max-age=3600");
  return new Response(obj.body, { headers });
}
__name(serveProjectFile, "serveProjectFile");
async function deployToPages(request, env, userId) {
  const projectId = new URL(request.url).pathname.split("/")[3];
  const db = getTursoClient(env);
  const projResult = await db.execute({
    sql: "SELECT id, domain, cf_pages_project FROM projects WHERE id = ? AND user_id = ? LIMIT 1",
    args: [projectId, userId]
  });
  if (!projResult.rows.length) return json({ error: "Project not found" }, { status: 404 });
  const project = projResult.rows[0];
  await db.execute({ sql: "UPDATE projects SET status = 'building' WHERE id = ?", args: [projectId] });
  const cfAccountId = env.CF_ACCOUNT_ID;
  const cfApiToken = env.CF_API_TOKEN;
  if (!cfAccountId || !cfApiToken) {
    await db.execute({ sql: "UPDATE projects SET status = 'live' WHERE id = ?", args: [projectId] });
    const deployId2 = crypto.randomUUID();
    await db.execute({
      sql: `INSERT INTO deployments(id, project_id, user_id, status, triggered_at, completed_at)
            VALUES (?, ?, ?, 'live', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      args: [deployId2, projectId, userId]
    });
    return json({
      ok: true,
      deployId: deployId2,
      status: "live",
      note: "CF_ACCOUNT_ID / CF_API_TOKEN not set. Project marked live without real Pages deployment. Add credentials to wrangler secrets to enable full deployment."
    });
  }
  const filesResult = await db.execute({
    sql: "SELECT r2_key, filename, content_type FROM r2_files WHERE project_id = ? LIMIT 100",
    args: [projectId]
  });
  const domain = String(project.domain || "project").replace(/[^a-z0-9]/gi, "-").toLowerCase().slice(0, 55);
  const pagesProjectName = String(project.cf_pages_project || `ubani-${domain}-${projectId.slice(0, 8)}`);
  const checkRes = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/pages/projects/${pagesProjectName}`,
    { headers: { authorization: `Bearer ${cfApiToken}` } }
  );
  if (!checkRes.ok) {
    const createRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/pages/projects`,
      {
        method: "POST",
        headers: { authorization: `Bearer ${cfApiToken}`, "content-type": "application/json" },
        body: JSON.stringify({ name: pagesProjectName, production_branch: "main" })
      }
    );
    if (!createRes.ok) {
      const errData = await createRes.json().catch(() => ({}));
      const msg = errData?.errors?.[0]?.message || `CF Pages create failed (${createRes.status})`;
      await db.execute({ sql: "UPDATE projects SET status = 'draft' WHERE id = ?", args: [projectId] });
      return json({ error: msg }, { status: 502 });
    }
  }
  const formData = new FormData();
  let fileCount = 0;
  for (const file of filesResult.rows) {
    try {
      const obj = await env.FILES_BUCKET.get(String(file.r2_key));
      if (obj) {
        const bytes = await obj.arrayBuffer();
        formData.append("file", new Blob([bytes], { type: String(file.content_type) }), String(file.filename));
        fileCount++;
      }
    } catch {
    }
  }
  if (fileCount === 0) {
    const html2 = `<!doctype html><html><head><meta charset="utf-8"/><title>${domain}</title><style>body{font-family:system-ui;background:#0a0c10;color:#e6edf3;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}h1{font-size:2rem}</style></head><body><h1>${domain}</h1><p>Deployed via Ubani Hosting.</p></body></html>`;
    formData.append("file", new Blob([html2], { type: "text/html" }), "index.html");
  }
  const deployRes = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/pages/projects/${pagesProjectName}/deployments`,
    { method: "POST", headers: { authorization: `Bearer ${cfApiToken}` }, body: formData }
  );
  const deployData = await deployRes.json().catch(() => ({}));
  if (!deployRes.ok) {
    const msg = deployData?.errors?.[0]?.message || `Deployment failed (${deployRes.status})`;
    await db.execute({ sql: "UPDATE projects SET status = 'draft' WHERE id = ?", args: [projectId] });
    const deployId2 = crypto.randomUUID();
    await db.execute({
      sql: `INSERT INTO deployments(id, project_id, user_id, status, error_message, triggered_at, completed_at)
            VALUES (?, ?, ?, 'failed', ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      args: [deployId2, projectId, userId, msg]
    });
    return json({ error: msg }, { status: 502 });
  }
  const cfDeployId = String(deployData?.result?.id || "");
  const pagesUrl = String(deployData?.result?.url || `https://${pagesProjectName}.pages.dev`);
  await db.execute({
    sql: "UPDATE projects SET status = 'live', cf_pages_project = ?, cf_pages_url = ?, cf_deployment_id = ? WHERE id = ?",
    args: [pagesProjectName, pagesUrl, cfDeployId, projectId]
  });
  const deployId = crypto.randomUUID();
  await db.execute({
    sql: `INSERT INTO deployments(id, project_id, user_id, status, cf_deploy_id, pages_url, triggered_at, completed_at)
          VALUES (?, ?, ?, 'live', ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    args: [deployId, projectId, userId, cfDeployId, pagesUrl]
  });
  return json({ ok: true, deployId, status: "live", pagesUrl, cfDeployId });
}
__name(deployToPages, "deployToPages");
async function listDeployments(request, env, userId) {
  const projectId = new URL(request.url).pathname.split("/")[3];
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, status, pages_url, triggered_at, completed_at, error_message
          FROM deployments WHERE project_id = ? AND user_id = ?
          ORDER BY triggered_at DESC LIMIT 20`,
    args: [projectId, userId]
  });
  return json({ deployments: result.rows });
}
__name(listDeployments, "listDeployments");
async function adminProjects(env) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT p.id, p.domain, p.status, p.cf_pages_url, p.storage, p.created_at, u.email, u.name
          FROM projects p JOIN users u ON u.id = p.user_id
          ORDER BY p.created_at DESC LIMIT 200`
  });
  return json({ projects: result.rows });
}
__name(adminProjects, "adminProjects");
async function adminUpdateProjectStatus(request, env) {
  const projectId = new URL(request.url).pathname.split("/")[5];
  const body = await parseJson(request);
  const allowed = ["draft", "live", "paused", "building"];
  if (!body?.status || !allowed.includes(body.status)) {
    return json({ error: `status must be one of: ${allowed.join(", ")}` }, { status: 400 });
  }
  const db = getTursoClient(env);
  await db.execute({ sql: "UPDATE projects SET status = ? WHERE id = ?", args: [body.status, projectId] });
  return json({ ok: true });
}
__name(adminUpdateProjectStatus, "adminUpdateProjectStatus");
async function deploy(request, env, userId) {
  const body = await parseJson(request);
  const domain = String(body?.domain || "").trim();
  if (!domain) return json({ error: "domain is required" }, { status: 400 });
  const db = getTursoClient(env);
  const projectId = crypto.randomUUID();
  await db.execute({
    sql: "INSERT INTO projects(id, user_id, domain, status, storage) VALUES (?, ?, ?, 'draft', 0)",
    args: [projectId, userId, domain]
  });
  return json({ status: "draft", projectId }, { status: 201 });
}
__name(deploy, "deploy");
async function listInvoices(env, userId) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, amount, status, created_at
          FROM invoices
          WHERE user_id = ?
          ORDER BY created_at DESC
          LIMIT 100`,
    args: [userId]
  });
  return json({ invoices: result.rows });
}
__name(listInvoices, "listInvoices");
async function createSupportTicket(request, env, userId) {
  const body = await parseJson(request);
  const subject = String(body?.subject || "").trim();
  const message = String(body?.message || "").trim();
  if (!subject) return json({ error: "subject is required" }, { status: 400 });
  const db = getTursoClient(env);
  const ticketId = crypto.randomUUID();
  const messageId = crypto.randomUUID();
  await db.execute({
    sql: `INSERT INTO tickets(id, user_id, subject, message, status, created_at, updated_at)
          VALUES (?, ?, ?, ?, 'open', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    args: [ticketId, userId, subject, message]
  });
  if (message) {
    await db.execute({
      sql: `INSERT INTO ticket_messages(id, ticket_id, author_id, author_role, body, created_at)
            VALUES (?, ?, ?, 'client', ?, CURRENT_TIMESTAMP)`,
      args: [messageId, ticketId, userId, message]
    });
  }
  const userResult = await db.execute({
    sql: "SELECT email, name FROM users WHERE id = ? LIMIT 1",
    args: [userId]
  });
  const userEmail = String(userResult.rows[0]?.email || "");
  const userName = String(userResult.rows[0]?.name || userEmail);
  await sendEmail(env, {
    to: env.ADMIN_EMAIL || "admin@ubanihosting.co.za",
    subject: `[New Ticket] ${subject}`,
    html: emailLayout({
      heading: "New Support Ticket",
      body: `
        <p>A client has submitted a support ticket.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:8px;color:#7d8590;font-size:13px;width:100px">Client</td><td style="padding:8px;font-size:13px">${escHtml(userName)} (${escHtml(userEmail)})</td></tr>
          <tr><td style="padding:8px;color:#7d8590;font-size:13px">Subject</td><td style="padding:8px;font-size:13px;font-weight:600">${escHtml(subject)}</td></tr>
          ${message ? `<tr><td style="padding:8px;color:#7d8590;font-size:13px;vertical-align:top">Message</td><td style="padding:8px;font-size:13px">${escHtml(message)}</td></tr>` : ""}
        </table>
        <p><a href="${env.PUBLIC_API_BASE_URL || ""}/admin/tickets" style="color:#f97316">View in admin panel \u2192</a></p>
      `
    })
  }).catch(() => {
  });
  return json({ ticket: { id: ticketId, subject, message, status: "open" } }, { status: 201 });
}
__name(createSupportTicket, "createSupportTicket");
async function replyToTicket(request, env, userId) {
  const ticketId = new URL(request.url).pathname.split("/")[4];
  const body = await parseJson(request);
  const replyBody = String(body?.message || "").trim();
  if (!replyBody) return json({ error: "message is required" }, { status: 400 });
  const db = getTursoClient(env);
  const ticketResult = await db.execute({
    sql: "SELECT id, subject FROM tickets WHERE id = ? AND user_id = ? LIMIT 1",
    args: [ticketId, userId]
  });
  if (!ticketResult.rows.length) return json({ error: "Ticket not found" }, { status: 404 });
  const msgId = crypto.randomUUID();
  await db.execute({
    sql: `INSERT INTO ticket_messages(id, ticket_id, author_id, author_role, body, created_at)
          VALUES (?, ?, ?, 'client', ?, CURRENT_TIMESTAMP)`,
    args: [msgId, ticketId, userId, replyBody]
  });
  await db.execute({
    sql: "UPDATE tickets SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    args: [ticketId]
  });
  return json({ ok: true, messageId: msgId });
}
__name(replyToTicket, "replyToTicket");
async function getTicketThread(request, env, userId) {
  const ticketId = new URL(request.url).pathname.split("/")[4];
  const db = getTursoClient(env);
  const ticketResult = await db.execute({
    sql: "SELECT id, subject, message, status, created_at FROM tickets WHERE id = ? AND user_id = ? LIMIT 1",
    args: [ticketId, userId]
  });
  if (!ticketResult.rows.length) return json({ error: "Ticket not found" }, { status: 404 });
  const messagesResult = await db.execute({
    sql: "SELECT id, author_role, body, created_at FROM ticket_messages WHERE ticket_id = ? ORDER BY created_at ASC",
    args: [ticketId]
  });
  return json({ ticket: ticketResult.rows[0], messages: messagesResult.rows });
}
__name(getTicketThread, "getTicketThread");
async function adminReplyToTicket(request, env) {
  const ticketId = new URL(request.url).pathname.split("/")[5];
  const body = await parseJson(request);
  const replyBody = String(body?.message || "").trim();
  if (!replyBody) return json({ error: "message is required" }, { status: 400 });
  const db = getTursoClient(env);
  const ticketResult = await db.execute({
    sql: `SELECT t.id, t.subject, t.user_id, u.email, u.name
          FROM tickets t
          JOIN users u ON u.id = t.user_id
          WHERE t.id = ? LIMIT 1`,
    args: [ticketId]
  });
  if (!ticketResult.rows.length) return json({ error: "Ticket not found" }, { status: 404 });
  const ticket = ticketResult.rows[0];
  const msgId = crypto.randomUUID();
  await db.execute({
    sql: `INSERT INTO ticket_messages(id, ticket_id, author_id, author_role, body, created_at)
          VALUES (?, ?, 'admin', 'admin', ?, CURRENT_TIMESTAMP)`,
    args: [msgId, ticketId, replyBody]
  });
  await db.execute({
    sql: "UPDATE tickets SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    args: [ticketId]
  });
  const clientEmail = String(ticket.email || "");
  const clientName = String(ticket.name || clientEmail);
  if (clientEmail) {
    const notifId = crypto.randomUUID();
    const emailResult = await sendEmail(env, {
      to: clientEmail,
      subject: `Re: ${ticket.subject} \u2014 Ubani Hosting Support`,
      html: emailLayout({
        heading: "You have a reply from support",
        body: `
          <p>Hi ${escHtml(clientName)},</p>
          <p>Our team has responded to your support ticket <strong>${escHtml(String(ticket.subject || ""))}</strong>.</p>
          <div style="background:#161b24;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:16px;margin:16px 0">
            <p style="color:#7d8590;font-size:12px;margin-bottom:8px">FROM UBANI SUPPORT</p>
            <p style="font-size:14px;line-height:1.6">${escHtml(replyBody)}</p>
          </div>
          <p><a href="${env.PUBLIC_API_BASE_URL || ""}/portal/support" style="color:#f97316">View your ticket \u2192</a></p>
        `
      })
    }).catch((err) => ({ error: err.message }));
    await db.execute({
      sql: `INSERT INTO notifications(id, user_id, type, subject, status, error, sent_at)
            VALUES (?, ?, 'ticket_reply', ?, ?, ?, CURRENT_TIMESTAMP)`,
      args: [notifId, String(ticket.user_id), `Re: ${ticket.subject}`, emailResult?.error ? "failed" : "sent", emailResult?.error || null]
    });
  }
  return json({ ok: true, messageId: msgId });
}
__name(adminReplyToTicket, "adminReplyToTicket");
async function adminGetTicketThread(request, env) {
  const ticketId = new URL(request.url).pathname.split("/")[5];
  const db = getTursoClient(env);
  const ticketResult = await db.execute({
    sql: `SELECT t.id, t.subject, t.message, t.status, t.created_at, u.email, u.name
          FROM tickets t JOIN users u ON u.id = t.user_id
          WHERE t.id = ? LIMIT 1`,
    args: [ticketId]
  });
  if (!ticketResult.rows.length) return json({ error: "Ticket not found" }, { status: 404 });
  const messagesResult = await db.execute({
    sql: "SELECT id, author_role, body, created_at FROM ticket_messages WHERE ticket_id = ? ORDER BY created_at ASC",
    args: [ticketId]
  });
  return json({ ticket: ticketResult.rows[0], messages: messagesResult.rows });
}
__name(adminGetTicketThread, "adminGetTicketThread");
async function adminCloseTicket(request, env) {
  const ticketId = new URL(request.url).pathname.split("/")[5];
  const db = getTursoClient(env);
  await db.execute({
    sql: "UPDATE tickets SET status = 'closed', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    args: [ticketId]
  });
  return json({ ok: true });
}
__name(adminCloseTicket, "adminCloseTicket");
async function listSupportTickets(env, userId) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, subject, status, created_at, updated_at
          FROM tickets
          WHERE user_id = ?
          ORDER BY updated_at DESC
          LIMIT 100`,
    args: [userId]
  });
  return json({ tickets: result.rows });
}
__name(listSupportTickets, "listSupportTickets");
function requireAdmin(request, env) {
  const configured = String(env.ADMIN_API_KEY || "").trim();
  if (!configured) return json({ error: "ADMIN_API_KEY is not configured" }, { status: 503 });
  const provided = String(request.headers.get("x-admin-key") || "").trim();
  if (!provided || !constantTimeEqual(configured, provided)) {
    return json({ error: "Unauthorized admin request" }, { status: 401 });
  }
  return null;
}
__name(requireAdmin, "requireAdmin");
async function adminSummary(env) {
  const db = getTursoClient(env);
  const [users, projects, invoices, paidRevenue] = await Promise.all([
    db.execute({ sql: "SELECT COUNT(*) AS count FROM users" }),
    db.execute({ sql: "SELECT COUNT(*) AS count FROM projects" }),
    db.execute({ sql: "SELECT COUNT(*) AS count FROM invoices" }),
    db.execute({ sql: "SELECT COALESCE(SUM(amount), 0) AS cents FROM invoices WHERE status = 'paid'" })
  ]);
  return json({
    users: Number(users.rows[0]?.count || 0),
    projects: Number(projects.rows[0]?.count || 0),
    invoices: Number(invoices.rows[0]?.count || 0),
    paidRevenueCents: Number(paidRevenue.rows[0]?.cents || 0)
  });
}
__name(adminSummary, "adminSummary");
async function adminUsers(env) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, email, credit, created_at
          FROM users
          ORDER BY created_at DESC
          LIMIT 200`
  });
  return json({ users: result.rows });
}
__name(adminUsers, "adminUsers");
async function adminRevenue(env) {
  const db = getTursoClient(env);
  const [byStatus, latestPaid] = await Promise.all([
    db.execute({
      sql: `SELECT status, COUNT(*) AS count, COALESCE(SUM(amount), 0) AS cents
            FROM invoices
            GROUP BY status
            ORDER BY status ASC`
    }),
    db.execute({
      sql: `SELECT id, user_id, amount, status, created_at
            FROM invoices
            WHERE status = 'paid'
            ORDER BY created_at DESC
            LIMIT 100`
    })
  ]);
  return json({ totals: byStatus.rows, latestPaid: latestPaid.rows });
}
__name(adminRevenue, "adminRevenue");
async function adminTickets(env) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, user_id, subject, status, created_at
          FROM tickets
          ORDER BY created_at DESC
          LIMIT 200`
  });
  return json({ tickets: result.rows });
}
__name(adminTickets, "adminTickets");
function normalizePaymentStatus(value) {
  const status = String(value || "").toLowerCase();
  if (status === "successful" || status === "paid" || status === "completed") return "paid";
  if (status === "failed" || status === "cancelled" || status === "canceled") return "failed";
  return "pending";
}
__name(normalizePaymentStatus, "normalizePaymentStatus");
async function verifyYocoWebhookSignature(request, rawBody, webhookSecret) {
  const webhookId = request.headers.get("webhook-id") || "";
  const webhookTimestamp = request.headers.get("webhook-timestamp") || "";
  const webhookSignature = request.headers.get("webhook-signature") || "";
  if (!webhookId || !webhookTimestamp || !webhookSignature) return false;
  const timestampSeconds = Number(webhookTimestamp);
  if (!Number.isFinite(timestampSeconds)) return false;
  const nowSeconds = Math.floor(Date.now() / 1e3);
  if (Math.abs(nowSeconds - timestampSeconds) > 180) return false;
  const [prefix, ...parts] = webhookSecret.split("_");
  if (!prefix || parts.length === 0) return false;
  let secretBytes;
  try {
    secretBytes = bytesFromBase64(parts.join("_"));
  } catch {
    return false;
  }
  const signedContent = `${webhookId}.${webhookTimestamp}.${rawBody}`;
  const expectedSignature = await hmacSha256Base64(secretBytes, signedContent);
  const signatures = webhookSignature.split(/\s+/).map((entry) => entry.trim()).filter(Boolean).map((entry) => {
    const idx = entry.indexOf(",");
    if (idx === -1) return null;
    return { version: entry.slice(0, idx), signature: entry.slice(idx + 1) };
  }).filter(Boolean);
  return signatures.some((entry) => entry.version === "v1" && constantTimeEqual(entry.signature, expectedSignature));
}
__name(verifyYocoWebhookSignature, "verifyYocoWebhookSignature");
async function yocoWebhook(request, env, rawBody) {
  const webhookSecret = env.YOCO_WEBHOOK_SECRET || "";
  if (webhookSecret) {
    const verified = await verifyYocoWebhookSignature(request, rawBody, webhookSecret);
    if (!verified) return json({ error: "Invalid Yoco webhook signature" }, { status: 401 });
  }
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const invoiceId = payload?.metadata?.invoiceId || payload?.invoiceId || payload?.reference || payload?.checkoutId || null;
  if (!invoiceId || typeof invoiceId !== "string") {
    return json({ error: "Missing invoice reference in webhook payload" }, { status: 400 });
  }
  const status = normalizePaymentStatus(payload?.status || payload?.eventType);
  const providerRef = String(payload?.id || payload?.paymentId || payload?.checkoutId || "");
  const db = getTursoClient(env);
  await db.execute({
    sql: `UPDATE invoices
          SET status = ?
          WHERE id = ?`,
    args: [status, invoiceId]
  });
  await db.execute({
    sql: `UPDATE payments
          SET status = ?, provider_reference = ?, payload = ?, updated_at = CURRENT_TIMESTAMP
          WHERE invoice_id = ?`,
    args: [status, providerRef, JSON.stringify(payload), invoiceId]
  });
  return json({ ok: true, invoiceId, status });
}
__name(yocoWebhook, "yocoWebhook");
function escHtml(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
__name(escHtml, "escHtml");
function emailLayout({ heading, body }) {
  return `<!doctype html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0a0c10;font-family:'DM Sans',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0c10;padding:40px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0f1117;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;max-width:560px;width:100%">
        <tr><td style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.08)">
          <span style="font-size:15px;font-weight:700;color:#e6edf3">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f97316;margin-right:8px;vertical-align:middle"></span>
            Ubani Hosting
          </span>
        </td></tr>
        <tr><td style="padding:28px">
          <h1 style="font-size:20px;font-weight:700;color:#e6edf3;margin:0 0 16px;letter-spacing:-0.02em">${heading}</h1>
          <div style="font-size:14px;color:#7d8590;line-height:1.6">${body}</div>
        </td></tr>
        <tr><td style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#4a5568">
          Ubani Hosting \xB7 ubanihosting.co.za \xB7 Unsubscribe from transactional emails not available (account notifications)
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
__name(emailLayout, "emailLayout");
async function sendEmail(env, { to, subject, html: html2 }) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured \u2014 email skipped");
    return { skipped: true };
  }
  const fromName = env.EMAIL_FROM_NAME || "Ubani Hosting";
  const fromEmail = env.EMAIL_FROM || "noreply@ubanihosting.co.za";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: [to],
      subject,
      html: html2
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.message || `Resend error ${response.status}`);
  }
  return data;
}
__name(sendEmail, "sendEmail");
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const clientIp = getClientIp(request);
    const isHead = request.method === "HEAD";
    const host = url.hostname.toLowerCase();
    try {
      if ((request.method === "GET" || isHead) && url.pathname.startsWith("/assets/")) {
        const assetResponse = await serveStaticAsset(request, env);
        return isHead ? headFromResponse(assetResponse) : assetResponse;
      }
      if (request.method === "GET" && url.pathname === "/robots.txt") {
        return text(getRobotsTxt(), { headers: { "cache-control": "public, max-age=1800" } });
      }
      if (request.method === "GET" && isFrontendPath(url.pathname) && isBlockedCrawlerRequest(request, env)) {
        return text("Forbidden", { status: 403, headers: { "cache-control": "no-store" } });
      }
      if (request.method === "GET" && url.pathname === "/") {
        const apiOrigin = getCanonicalApiOrigin(request, env);
        const homepage = host === "www.ubanihosting.co.za" ? renderDesignerLanding(apiOrigin) : renderFrontend(url.pathname, apiOrigin);
        const response = html(homepage, {}, apiOrigin);
        return isHead ? headFromResponse(response) : response;
      }
      if (request.method === "GET" || isHead) {
        const apiOrigin = getCanonicalApiOrigin(request, env);
        const frontend = renderFrontend(url.pathname, apiOrigin);
        if (frontend) {
          const response = html(frontend, {}, apiOrigin);
          return isHead ? headFromResponse(response) : response;
        }
      }
      if (request.method === "GET" && url.pathname === "/favicon.ico") {
        return new Response(null, { status: 204 });
      }
      if (request.method === "POST" && url.pathname === "/api/register") {
        const rl = consumeRateLimit(`register:${clientIp}`, 20, 10 * 60 * 1e3);
        if (!rl.allowed) return json({ error: "Too many registration attempts" }, { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } });
        return await register(request, env);
      }
      if (request.method === "POST" && url.pathname === "/api/login") {
        const rl = consumeRateLimit(`login:${clientIp}`, 30, 10 * 60 * 1e3);
        if (!rl.allowed) return json({ error: "Too many login attempts" }, { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } });
        return await login(request, env);
      }
      if (request.method === "GET" && url.pathname === "/api") return json({ message: "Ubani API", health: "/health" });
      if (request.method === "POST" && url.pathname === "/webhooks/yoco") {
        const rl = consumeRateLimit(`webhook:${clientIp}`, 180, 60 * 1e3);
        if (!rl.allowed) return json({ error: "Too many webhook requests" }, { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } });
        const rawBody = await request.text();
        return await yocoWebhook(request, env, rawBody);
      }
      if (request.method === "GET" && url.pathname === "/health") return json({ ok: true });
      if (isHead && url.pathname === "/health") {
        const response = json({ ok: true });
        return headFromResponse(response);
      }
      if (request.method === "GET" && url.pathname === "/api/admin/summary") {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminSummary(env);
      }
      if (request.method === "GET" && url.pathname === "/api/admin/users") {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminUsers(env);
      }
      if (request.method === "GET" && url.pathname === "/api/admin/revenue") {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminRevenue(env);
      }
      if (request.method === "GET" && url.pathname === "/api/admin/tickets") {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminTickets(env);
      }
      if (request.method === "GET" && url.pathname === "/api/admin/tickets") {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminTickets(env);
      }
      if (request.method === "GET" && /^\/api\/admin\/tickets\/[^/]+$/.test(url.pathname)) {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminGetTicketThread(request, env);
      }
      if (request.method === "POST" && /^\/api\/admin\/tickets\/[^/]+\/reply$/.test(url.pathname)) {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminReplyToTicket(request, env);
      }
      if (request.method === "POST" && /^\/api\/admin\/tickets\/[^/]+\/close$/.test(url.pathname)) {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminCloseTicket(request, env);
      }
      if (request.method === "GET" && url.pathname === "/api/admin/projects") {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminProjects(env);
      }
      if (request.method === "POST" && /^\/api\/admin\/projects\/[^/]+\/status$/.test(url.pathname)) {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminUpdateProjectStatus(request, env);
      }
      const authUserId = await getAuthUserId(request, env);
      if (!authUserId) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }
      if (request.method === "GET" && url.pathname.startsWith("/files/")) {
        return await serveProjectFile(request, env);
      }
      if (request.method === "POST" && url.pathname === "/api/projects") return await createProject(request, env, authUserId);
      if (request.method === "GET" && url.pathname === "/api/projects") return await listProjects(env, authUserId);
      if (request.method === "GET" && /^\/api\/projects\/[^/]+$/.test(url.pathname)) return await getProject(request, env, authUserId);
      if (request.method === "PATCH" && /^\/api\/projects\/[^/]+$/.test(url.pathname)) return await updateProject(request, env, authUserId);
      if (request.method === "POST" && /^\/api\/projects\/[^/]+\/files$/.test(url.pathname)) return await uploadFile(request, env, authUserId);
      if (request.method === "DELETE" && /^\/api\/projects\/[^/]+\/files\/[^/]+$/.test(url.pathname)) return await deleteFile(request, env, authUserId);
      if (request.method === "POST" && /^\/api\/projects\/[^/]+\/deploy$/.test(url.pathname)) return await deployToPages(request, env, authUserId);
      if (request.method === "GET" && /^\/api\/projects\/[^/]+\/deployments$/.test(url.pathname)) return await listDeployments(request, env, authUserId);
      if (request.method === "POST" && url.pathname === "/api/deploy") return await deploy(request, env, authUserId);
      if (request.method === "POST" && url.pathname === "/api/invoice") return await invoice(request, env, authUserId);
      if (request.method === "POST" && url.pathname === "/api/invoice/checkout") return await createInvoiceCheckout(request, env, authUserId);
      if (request.method === "POST" && url.pathname === "/api/support/tickets") return await createSupportTicket(request, env, authUserId);
      if (request.method === "GET" && url.pathname === "/api/support/tickets") return await listSupportTickets(env, authUserId);
      if (request.method === "GET" && /^\/api\/support\/tickets\/[^/]+$/.test(url.pathname)) return await getTicketThread(request, env, authUserId);
      if (request.method === "POST" && /^\/api\/support\/tickets\/[^/]+\/reply$/.test(url.pathname)) return await replyToTicket(request, env, authUserId);
      if (request.method === "GET" && url.pathname === "/api/me") return await me(env, authUserId);
      if (request.method === "PATCH" && url.pathname === "/api/me") return await updateProfile(request, env, authUserId);
      if (request.method === "GET" && url.pathname === "/api/invoices") return await listInvoices(env, authUserId);
      return json({ message: "Ubani API" });
    } catch (error) {
      const message = error instanceof Error ? error.message : typeof error === "string" ? error : "Unexpected error";
      return json({ error: message }, { status: 500 });
    }
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-loF2Sc/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-loF2Sc/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
