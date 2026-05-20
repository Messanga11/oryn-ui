import type { ReactNode } from 'react';
import { Box } from '../../primitives/box';
import { SkeletonCard, SkeletonListItem } from '../skeleton';

export type LoadingStateLayout = 'list' | 'cards' | 'custom';

export interface LoadingStateProps {
  layout?: LoadingStateLayout;
  count?: number;
  children?: ReactNode;
  className?: string;
}

export function LoadingState({
  layout = 'list',
  count = 5,
  children,
  className,
}: LoadingStateProps) {
  if (children) {
    return (
      <Box className={['flex-1', className].filter(Boolean).join(' ')}>
        {children}
      </Box>
    );
  }

  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <Box className={['flex-1', className].filter(Boolean).join(' ')}>
      {layout === 'list'
        ? items.map((i) => <SkeletonListItem key={i} />)
        : items.map((i) => (
            <Box key={i} className="px-4 mb-3">
              <SkeletonCard />
            </Box>
          ))}
    </Box>
  );
}
