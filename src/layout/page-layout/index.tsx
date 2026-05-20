import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollContainer } from '../../primitives/scroll-container';
import { Box } from '../../primitives/box';

export interface PageLayoutProps {
  children: ReactNode;
  /** Wrap content in a ScrollView */
  scrollable?: boolean;
  /** Center content both axes (for auth / error screens) */
  centered?: boolean;
  /** Page-level background override */
  className?: string;
  /** Extra padding at the bottom (e.g. above tab bar) */
  bottomOffset?: number;
}

/**
 * PageLayout — root layout for every screen.
 * Handles safe area, scroll, and centering.
 */
export function PageLayout({
  children,
  scrollable = false,
  centered = false,
  className,
  bottomOffset = 0,
}: PageLayoutProps) {
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
    <SafeAreaView className={['flex-1 bg-bg-base', className].filter(Boolean).join(' ')}>
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
