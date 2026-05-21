import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
  },
  esbuild: {
    target: 'es2020',
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
});
