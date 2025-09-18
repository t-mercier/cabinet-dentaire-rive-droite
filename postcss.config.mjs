/**
 * What changed & why
 * - Switch Tailwind PostCSS plugin from string to imported function.
 * - Fixes Vitest/Vite PostCSS loading error (expects actual plugin fn).
 */
/**
 * What changed & why
 * - Use plugin name mapping shape compatible with Next's PostCSS loader.
 */

export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
