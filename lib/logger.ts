type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  level: LogLevel;
  message: string;
  context?: string;
  meta?: Record<string, unknown>;
  timestamp: string;
}

function log(level: LogLevel, message: string, context?: string, meta?: Record<string, unknown>) {
  const payload: LogPayload = {
    timestamp: new Date().toISOString(),
    level,
    context: context || 'app',
    message,
    ...(meta ? { meta } : {}),
  };

  const output = JSON.stringify(payload);

  switch (level) {
    case 'error':
      console.error(output);
      break;
    case 'warn':
      console.warn(output);
      break;
    case 'info':
    case 'debug':
    default:
      console.log(output);
      break;
  }
}

export const logger = {
  info: (message: string, context?: string, meta?: Record<string, unknown>) => log('info', message, context, meta),
  warn: (message: string, context?: string, meta?: Record<string, unknown>) => log('warn', message, context, meta),
  error: (message: string, context?: string, meta?: Record<string, unknown>) => log('error', message, context, meta),
  debug: (message: string, context?: string, meta?: Record<string, unknown>) => log('debug', message, context, meta),
};
