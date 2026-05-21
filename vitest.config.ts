import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      // Map react-native to react-native-web so vitest (jsdom) can parse it.
      // react-native/index.js uses Flow `import typeof` syntax that Rollup can't parse.
      'react-native': path.resolve(
        __dirname,
        '../../node_modules/.pnpm/react-native-web@0.19.13_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/react-native-web/dist/cjs/index.js',
      ),
    },
  },
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    setupFiles: ['src/tests/setup/rn-mocks.ts'],
  },
  esbuild: {
    target: 'es2020',
    jsx: 'automatic',
    jsxImportSource: 'react',
    // Override tsconfig to avoid broken @repo/config/tsconfig.expo.json extends
    tsconfigRaw: {
      compilerOptions: {
        target: 'ES2020',
        module: 'ESNext',
        moduleResolution: 'bundler',
        allowImportingTsExtensions: false,
        resolveJsonModule: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        jsx: 'react-jsx',
        jsxImportSource: 'react',
        skipLibCheck: true,
        exactOptionalPropertyTypes: false,
      },
    },
  },
});
