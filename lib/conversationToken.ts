import crypto from 'crypto';

const SECRET_KEY = process.env.APP_SECRET || process.env.NEXTAUTH_SECRET || 'wbs-chat-sec-key-fallback-2026';

/**
 * Gera um token assinado por HMAC para autorizar o acesso a uma conversa específica.
 */
export function generateConversationToken(conversationId: string): string {
  const hmac = crypto.createHmac('sha256', SECRET_KEY).update(conversationId).digest('hex');
  return `${conversationId}.${hmac.substring(0, 16)}`;
}

/**
 * Valida o token assinado e extrai o conversationId correspondente se for válido.
 */
export function verifyConversationToken(token: string | undefined): { valid: boolean; conversationId?: string } {
  if (!token || typeof token !== 'string') {
    return { valid: false };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [conversationId, providedHmac] = parts;
  const expectedHmac = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(conversationId)
    .digest('hex')
    .substring(0, 16);

  try {
    const providedBuffer = Buffer.from(providedHmac, 'hex');
    const expectedBuffer = Buffer.from(expectedHmac, 'hex');

    if (providedBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(providedBuffer, expectedBuffer)) {
      return { valid: false };
    }

    return { valid: true, conversationId };
  } catch {
    return { valid: false };
  }
}
