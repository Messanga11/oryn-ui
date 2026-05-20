import type { ReactNode } from 'react';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';

export interface SectionLayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
  /** Action element placed top-right (e.g. a "See all" link) */
  action?: ReactNode;
  className?: string;
}

/**
 * SectionLayout — named content section with optional title and action.
 */
export function SectionLayout({
  title,
  description,
  children,
  action,
  className,
}: SectionLayoutProps) {
  const hasHeader = !!(title ?? description ?? action);

  return (
    <Box className={['mb-6', className].filter(Boolean).join(' ')}>
      {hasHeader && (
        <Box className="flex-row items-start justify-between mb-3">
          <Box className="flex-1 mr-2">
            {title ? <Typography variant="h3">{title}</Typography> : null}
            {description ? (
              <Typography variant="body-sm" color="secondary" className="mt-0.5">
                {description}
              </Typography>
            ) : null}
          </Box>
          {action ?? null}
        </Box>
      )}
      {children}
    </Box>
  );
}
