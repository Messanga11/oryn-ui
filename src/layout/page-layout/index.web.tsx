/**
 * PageLayout.web.tsx — web-specific page layout.
 *
 * Replaces SafeAreaView (react-native-safe-area-context) with a plain div.
 * On web, OS-level safe areas don't exist — viewport is the safe area.
 */
import type { ReactNode } from 'react';
import { Box } from '../../primitives/box';
import { ScrollContainer } from '../../primitives/scroll-container';

type BgToken = 'bg.base' | 'bg.surface' | 'bg.elevated' | 'bg.overlay';

const BG_CLASS: Record<BgToken, string> = {
  'bg.base': 'bg-bg-base',
  'bg.surface': 'bg-bg-surface',
  'bg.elevated': 'bg-bg-elevated',
  'bg.overlay': 'bg-bg-overlay',
};

export interface PageLayoutProps {
  children: ReactNode;
  scrollable?: boolean;
  centered?: boolean;
  backgroundColor?: BgToken;
  className?: string;
  bottomOffset?: number;
}

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
      style={{ paddingBottom: bottomOffset } as object}
    >
      {children}
    </Box>
  ) : (
    <Box className="flex-1 px-4" style={{ paddingBottom: bottomOffset } as object}>
      {children}
    </Box>
  );

  return (
    <Box className={['flex-1', bgClass, className].filter(Boolean).join(' ')}>
      {scrollable ? (
        <ScrollContainer className="flex-1">{inner}</ScrollContainer>
      ) : (
        inner
      )}
    </Box>
  );
}
