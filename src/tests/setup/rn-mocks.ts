/**
 * React Native package mocks for vitest (jsdom environment).
 * These packages use native modules / Flow syntax incompatible with Rollup.
 * Import this file via vitest setupFiles.
 */
import { expect, vi } from 'vitest';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';

// Extend vitest expect with jest-dom matchers (toBeInTheDocument, toHaveTextContent, etc.)
expect.extend(jestDomMatchers);

// react-native-reanimated: mock the entire module
vi.mock('react-native-reanimated', () => ({
  default: {
    createAnimatedComponent: (Component: unknown) => Component,
    Value: vi.fn(),
    event: vi.fn(),
    add: vi.fn(),
    eq: vi.fn(),
    set: vi.fn(),
    cond: vi.fn(),
    interpolate: vi.fn(),
    View: ({ children }: { children?: unknown }) => children,
    Extrapolate: { CLAMP: 'clamp' },
    Transition: { Together: 'Together', Out: 'Out', In: 'In' },
  },
  useSharedValue: vi.fn((v: unknown) => ({ value: v })),
  useAnimatedStyle: vi.fn((fn: () => unknown) => fn()),
  useAnimatedScrollHandler: vi.fn(),
  useDerivedValue: vi.fn((fn: () => unknown) => ({ value: fn() })),
  withTiming: vi.fn((v: unknown) => v),
  withSpring: vi.fn((v: unknown) => v),
  withRepeat: vi.fn((v: unknown) => v),
  withSequence: vi.fn((...args: unknown[]) => args[args.length - 1]),
  runOnJS: vi.fn((fn: unknown) => fn),
  interpolate: vi.fn(),
  Extrapolation: { CLAMP: 'clamp' },
  Easing: { linear: vi.fn(), bezier: vi.fn() },
  createAnimatedComponent: (Component: unknown) => Component,
}));

// react-native-safe-area-context: mock
vi.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children?: unknown }) => children,
  SafeAreaView: ({ children }: { children?: unknown }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  useSafeAreaFrame: () => ({ x: 0, y: 0, width: 375, height: 812 }),
}));

// react-native-gesture-handler: mock
vi.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: ({ children }: { children?: unknown }) => children,
  Gesture: { Pan: vi.fn(() => ({ onUpdate: vi.fn(), onEnd: vi.fn() })) },
  GestureDetector: ({ children }: { children?: unknown }) => children,
  PanGestureHandler: ({ children }: { children?: unknown }) => children,
  TapGestureHandler: ({ children }: { children?: unknown }) => children,
}));
