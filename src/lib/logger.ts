/**
 * What changed & why
 * - New lightweight logger used across server and client.
 * - Replaces direct console.* calls for cleaner logs and easy switching.
 * - No-ops in production for info/debug to keep output clean.
 */

/**
 * Tiny logger wrapper.
 * - In dev: logs info/warn/error to console.
 * - In prod: only warn/error, info is silenced.
 */
export const logger = {
  info: (...args: unknown[]) => {
    if (process.env.NODE_ENV !== 'production') console.info(...args)
  },
  warn: (...args: unknown[]) => console.warn(...args),
  error: (...args: unknown[]) => console.error(...args),
}

