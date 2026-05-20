import type { ReactNode } from 'react';
import { Box } from '../../primitives/box';

export interface CardLayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * CardLayout — structured card with header, body, footer slots.
 */
export function CardLayout({ header, footer, children, className }: CardLayoutProps) {
  return (
    <Box
      className={['bg-bg-surface rounded-lg border border-bg-border overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
    >
      {header ? <Box className="px-4 py-3 border-b border-bg-border">{header}</Box> : null}
      <Box className="px-4 py-4">{children}</Box>
      {footer ? <Box className="px-4 py-3 border-t border-bg-border">{footer}</Box> : null}
    </Box>
  );
}
