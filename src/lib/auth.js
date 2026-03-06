const encoder = new TextEncoder();

function toBase64Url(bytes) {
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(input) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

function ensureJwtSecret(env) {
  const secret = env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET");
  return secret;
}

export async function hashPassword(password) {
  const iterations = 210000;
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

export async function verifyPassword(password, storedHash) {
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

export async function signJwt(payload, env, expiresInSeconds = 60 * 60 * 24 * 7) {
  const secret = ensureJwtSecret(env);
  const now = Math.floor(Date.now() / 1000);

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

export async function verifyJwt(token, env) {
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
    const now = Math.floor(Date.now() / 1000);

    if (typeof payload.exp !== "number" || payload.exp <= now) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getAuthUserId(request, env) {
  const authHeader = request.headers.get("authorization") || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;

  const payload = await verifyJwt(match[1], env);
  if (!payload || typeof payload.sub !== "string") return null;

  return payload.sub;
}
