import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter for production
// In production, consider using Redis or a database
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute per IP

export function rateLimit(req: NextRequest): { success: boolean; resetTime?: number } {
  const ip = 
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
    req.headers.get('x-real-ip') || 
    req.headers.get('x-client-ip') ||
    'unknown';

  const now = Date.now();
  const key = `chat-${ip}`;
  
  const existing = rateLimitMap.get(key);
  
  // Clean up expired entries
  if (existing && now > existing.resetTime) {
    rateLimitMap.delete(key);
  }
  
  const current = rateLimitMap.get(key) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
  
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { 
      success: false, 
      resetTime: current.resetTime 
    };
  }
  
  current.count++;
  rateLimitMap.set(key, current);
  
  return { success: true };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);
