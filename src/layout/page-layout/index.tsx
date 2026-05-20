import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollContainer } from '../../primitives/scroll-container';
import { Box } from '../../primitives/box';

type BgToken = 'bg.base' | 'bg.surface' | 'bg.elevated' | 'bg.overlay';

const BG_CLASS: Record<BgToken, string> = {
  'bg.base': 'bg-bg-base',
  'bg.surface': 'bg-bg-surface',
  'bg.elevated': 'bg-bg-elevated',
  'bg.overlay': 'bg-bg-overlay',
};

export interface PageLayoutProps {
  children: ReactNode;
  /** Wrap content in a ScrollView */
  scrollable?: boolean;
  /** Center content both axes (for auth / error screens) */
  centered?: boolean;
  /** Page-level background token */
  backgroundColor?: BgToken;
  /** Extra NativeWind classNames on the SafeAreaView */
  className?: string;
  /** Extra padding at the bottom (e.g. above tab bar) */
  bottomOffset?: number;
}

/**
 * PageLayout — root layout for every screen.
 * Handles safe area, scroll, and centering.
 *
 * DESIGN-01: backgroundColor="bg.base" applies #0C0E16 via SafeAreaView +
 * propagates to insets so no flash-white on dark devices.
 */
export function PageLayout({
  children,
  scrollable = false,
  centered = false,
  backgroundColor = 'bg.base',
  className,
  bottomOffset = 0,
}: PageLayoutProps) {
  const bgClass = BG_CLASS[backgroundColor];

  const inner = centered ? (
    <Box
      className="flex-1 items-center justify-center px-4"
      style={{ paddingBottom: bottomOffset }}
    >
      {children}
    </Box>
  ) : (
    <Box className="flex-1 px-4" style={{ paddingBottom: bottomOffset }}>
      {children}
    </Box>
  );

  return (
    <SafeAreaView className={['flex-1', bgClass, className].filter(Boolean).join(' ')}>
      {scrollable ? (
        <ScrollContainer withBottomSafeArea className="flex-1">
          {inner}
        </ScrollContainer>
      ) : (
        inner
      )}
    </SafeAreaView>
  );
}
