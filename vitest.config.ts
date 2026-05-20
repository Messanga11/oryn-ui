import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    include: ['src/**/__tests__/**/*.{test,spec}.ts'],
    exclude: [
      'node_modules',
      'dist',
      // .tsx tests require @testing-library/react — added in sprint 02
    ],
  },
  esbuild: {
    target: 'es2020',
  },
});
