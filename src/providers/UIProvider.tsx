import type { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@gluestack-ui/themed';

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
        <GluestackUIProvider mode="dark">
          {children}
        </GluestackUIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
