/**
 * UIProvider.web.tsx — web-specific provider (no gesture or safe area).
 *
 * On web:
 * - GestureHandlerRootView (react-native-gesture-handler) → not needed
 * - SafeAreaProvider (react-native-safe-area-context) → not needed (viewport IS safe)
 * - GluestackUIProvider → kept (provides dark mode context)
 */
import { type ReactNode, createContext, useContext } from 'react';

type ColorMode = 'dark' | 'light';

interface GluestackContextValue {
  colorMode: ColorMode;
}

const GluestackContext = createContext<GluestackContextValue>({ colorMode: 'dark' });

export function useColorMode(): ColorMode {
  return useContext(GluestackContext).colorMode;
}

export interface UIProviderProps {
  children: ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  return (
    <GluestackContext.Provider value={{ colorMode: 'dark' }}>
      {children}
    </GluestackContext.Provider>
  );
}
