import { type ReactNode, createContext, useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// ── Gluestack v2 theme context (copy-paste pattern, no @gluestack-ui/themed dep) ──────────
// Sprint 00: minimal context providing dark-mode awareness. Gluestack v2 component
// copies are generated per-sprint (like shadcn) and use this context for theming.
type ColorMode = 'dark' | 'light';

interface GluestackContextValue {
  colorMode: ColorMode;
}

const GluestackContext = createContext<GluestackContextValue>({ colorMode: 'dark' });

export function useColorMode(): ColorMode {
  return useContext(GluestackContext).colorMode;
}

interface GluestackUIProviderProps {
  mode: ColorMode;
  children: ReactNode;
}

/**
 * GluestackUIProvider — thin context provider for Gluestack v2 copy-paste pattern.
 * Provides dark/light mode to all descendant Gluestack components.
 * CRIT-23: must appear in UIProvider.tsx alongside GestureHandlerRootView + SafeAreaProvider.
 */
function GluestackUIProvider({ mode, children }: GluestackUIProviderProps) {
  return (
    <GluestackContext.Provider value={{ colorMode: mode }}>{children}</GluestackContext.Provider>
  );
}

// ── UIProvider ────────────────────────────────────────────────────────────────────────────
export interface UIProviderProps {
  children: ReactNode;
}

/**
 * UIProvider — wraps the app with all required context providers.
 *
 * Order (outside → inside):
 * 1. GestureHandlerRootView  — must be outermost for gesture detection
 * 2. SafeAreaProvider        — provides safe area insets
 * 3. GluestackUIProvider     — dark mode + theme context
 *
 * CRIT-23: all three wrappers required in this exact order.
 */
export function UIProvider({ children }: UIProviderProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GluestackUIProvider mode="dark">{children}</GluestackUIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
