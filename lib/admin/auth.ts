import crypto from "crypto";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "fallback-super-secret-key-at-least-32-chars-long";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

/**
 * Compara duas strings em tempo constante para evitar Timing Attacks
 */
export function timingSafeCompare(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Valida as credenciais administrativas em tempo constante
 */
export function verifyCredentials(usernameInput: string, passwordInput: string): boolean {
  const isUsernameValid = timingSafeCompare(usernameInput, ADMIN_USERNAME);
  const isPasswordValid = timingSafeCompare(passwordInput, ADMIN_PASSWORD);
  return isUsernameValid && isPasswordValid;
}

/**
 * Assina um JWT para sessão com HMAC-SHA256
 */
export function signToken(payload: { username: string }): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  // Sessão dura 2 horas
  const exp = Date.now() + 2 * 60 * 60 * 1000;
  const stringifiedPayload = Buffer.from(JSON.stringify({ ...payload, exp })).toString("base64url");
  
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${stringifiedPayload}`)
    .digest("base64url");

  return `${header}.${stringifiedPayload}.${signature}`;
}

/**
 * Verifica e decodifica o JWT
 */
export function verifyToken(token: string): { username: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest("base64url");

    if (!timingSafeCompare(signature, expectedSignature)) {
      return null;
    }

    const decodedPayload = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    
    // Verifica expiração
    if (Date.now() > decodedPayload.exp) {
      return null;
    }

    return { username: decodedPayload.username };
  } catch (error) {
    console.error("Erro ao verificar token JWT:", error);
    return null;
  }
}
