import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    // Resolve .web.tsx/.web.ts before .tsx/.ts so platform-specific web files win in jsdom tests
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.js', '.json'],
    alias: {
      // Map react-native to react-native-web so vitest (jsdom) can parse it.
      // react-native/index.js uses Flow `import typeof` syntax that Rollup can't parse.
      'react-native': path.resolve(
        __dirname,
        '../../node_modules/.pnpm/react-native-web@0.19.13_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/react-native-web/dist/cjs/index.js',
      ),
      // Force @tanstack/form-core to 0.34.4 and @tanstack/store to 0.5.5.
      // Reason: packages/ui has TS 6.0.3 devDep which causes pnpm to pick the
      // typescript@6.0.3 variant of react-form@0.34.4. That variant symlinks
      // form-core → 1.32.0 (which uses store@0.9.3 with prototype-method `subscribe`).
      // react-store@0.5.8 passes store.subscribe as an unbound ref to useSyncExternalStore →
      // `this` is undefined → this.atom throws. Pinning to the 0.34.4/0.5.5 pair fixes it.
      '@tanstack/form-core': path.resolve(
        __dirname,
        '../../node_modules/.pnpm/@tanstack+form-core@0.34.4/node_modules/@tanstack/form-core/dist/esm/index.js',
      ),
      '@tanstack/store': path.resolve(
        __dirname,
        '../../node_modules/.pnpm/@tanstack+store@0.5.5/node_modules/@tanstack/store/dist/esm/index.js',
      ),
    },
  },
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    setupFiles: ['src/tests/setup/rn-mocks.ts'],
    // Inline these packages so that vite's resolve.alias applies to their transitive imports.
    // Without this, vitest loads them via native Node require which bypasses aliases, causing
    // the @tanstack/form-core@1.32.0 / @tanstack/store@0.9.3 version mismatch crash.
    server: {
      deps: {
        inline: ['@tanstack/form-core', '@tanstack/store', '@tanstack/react-store', '@tanstack/react-form'],
      },
    },
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
