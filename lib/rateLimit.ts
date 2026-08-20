import { NextRequest } from 'next/server';
import { prisma } from './prisma';

interface RateLimitDelegate {
  findUnique(args: unknown): Promise<{ count: number; resetTime: Date } | null>;
  upsert(args: unknown): Promise<unknown>;
  deleteMany(args: unknown): Promise<unknown>;
  update(args: unknown): Promise<unknown>;
}

export async function rateLimit(
  req: NextRequest,
  context: string,
  maxRequests: number = 10,
  windowMs: number = 60 * 1000
): Promise<{ success: boolean; resetTime?: number }> {
  const ip = 
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
    req.headers.get('x-real-ip') || 
    req.headers.get('x-client-ip') ||
    'unknown';

  const key = `${context}-${ip}`;
  const now = new Date();

  const prismaClient = prisma as unknown as Record<string, RateLimitDelegate>;

  try {
    if (!prismaClient || !prismaClient.rateLimit) {
      return { success: true };
    }

    const limitRecord = await prismaClient.rateLimit.findUnique({
      where: { key },
    });

    // Se não existir ou se a janela já tiver expirado
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

      // Limpeza assíncrona em segundo plano de registros antigos (10% de chance de rodar)
      if (Math.random() < 0.1) {
        prismaClient.rateLimit.deleteMany({
          where: {
            resetTime: {
              lt: now,
            },
          },
        }).catch((err: unknown) => console.error('Erro na limpeza de rate limit:', err));
      }

      return { success: true };
    }

    // Se já estourou o limite na janela atual
    if (limitRecord.count >= maxRequests) {
      return { 
        success: false, 
        resetTime: limitRecord.resetTime.getTime() 
      };
    }

    // Incrementar o contador
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
    console.error('Erro no helper de rate limit:', error);
    // Em caso de falha de conexão com o banco, falha-se liberando o acesso (fail-open)
    return { success: true };
  }
}
