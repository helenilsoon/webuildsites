import { NextRequest } from 'next/server';
import { prisma } from './prisma';
import { logger } from './logger';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// Store em memória para fallback resiliente contra travamento do banco e prevenção de estouro por alta concorrência
const memoryStore = new Map<string, RateLimitRecord>();

// Limpeza periódica em segundo plano das chaves em memória expiradas
if (typeof setInterval !== 'undefined') {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of memoryStore.entries()) {
      if (now > record.resetTime) {
        memoryStore.delete(key);
      }
    }
  }, 60 * 1000);
  if (timer.unref) {
    timer.unref();
  }
}

function checkMemoryRateLimit(key: string, maxRequests: number, windowMs: number): { success: boolean; resetTime?: number } {
  const now = Date.now();
  const record = memoryStore.get(key);

  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs;
    memoryStore.set(key, { count: 1, resetTime });
    return { success: true };
  }

  if (record.count >= maxRequests) {
    return { success: false, resetTime: record.resetTime };
  }

  record.count += 1;
  memoryStore.set(key, record);
  return { success: true };
}

export async function rateLimit(
  req: NextRequest,
  context: string,
  maxRequests: number = 10,
  windowMs: number = 60 * 1000
): Promise<{ success: boolean; resetTime?: number }> {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfIp = req.headers.get('x-cloudflare-connecting-ip') || req.headers.get('cf-connecting-ip');
  const clientIp = req.headers.get('x-client-ip');

  const ip =
    cfIp ||
    (forwarded ? forwarded.split(',')[0].trim() : null) ||
    realIp ||
    clientIp ||
    '127.0.0.1';

  const key = `${context}:${ip}`;

  // 1. Verificação em memória imediata (proteção contra rajadas simultâneas)
  const memResult = checkMemoryRateLimit(key, maxRequests, windowMs);
  if (!memResult.success) {
    logger.warn(`Rate limit excedido (memória) para IP: ${ip}`, 'RateLimit', { ip, context, key });
    return memResult;
  }

  // 2. Persistência e sincronização no PostgreSQL via Prisma
  try {
    const prismaClient = prisma as unknown as Record<string, any>;

    if (!prismaClient || !prismaClient.rateLimit) {
      return memResult;
    }

    const now = new Date();
    const limitRecord = await prismaClient.rateLimit.findUnique({
      where: { key },
    });

    if (!limitRecord || now > limitRecord.resetTime) {
      const resetTime = new Date(Date.now() + windowMs);
      await prismaClient.rateLimit.upsert({
        where: { key },
        update: {
          count: 1,
          resetTime,
        },
        create: {
          key,
          count: 1,
          resetTime,
        },
      });

      if (Math.random() < 0.1) {
        prismaClient.rateLimit.deleteMany({
          where: { resetTime: { lt: now } },
        }).catch((err: unknown) => {
          logger.error('Erro na limpeza de rate limit expirado:', 'RateLimit', { error: String(err) });
        });
      }

      return { success: true };
    }

    if (limitRecord.count >= maxRequests) {
      logger.warn(`Rate limit excedido (DB) para IP: ${ip}`, 'RateLimit', { ip, context, key });
      return {
        success: false,
        resetTime: limitRecord.resetTime.getTime(),
      };
    }

    await prismaClient.rateLimit.update({
      where: { key },
      data: {
        count: {
          increment: 1,
        },
      },
    });

    return { success: true };
  } catch (error) {
    logger.error('Erro no helper de rate limit no banco, usando fallback em memória:', 'RateLimit', {
      error: String(error),
      ip,
      key,
    });
    // Fallback: em caso de erro no banco, o resultado da trava em memória é mantido!
    return memResult;
  }
}
