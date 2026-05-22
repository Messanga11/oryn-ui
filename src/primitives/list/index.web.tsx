/**
 * List.web.tsx — web-specific list primitive.
 *
 * Vite resolves .web.tsx before .tsx for web builds.
 * Avoids importing @shopify/flash-list on web/SSR — flash-list is a native-only
 * package that CJS-requires react-native, causing a cascade of SSR failures
 * (react-native@0.81 ships TypeScript source that Node can't parse natively).
 *
 * On web, a virtualised list is unnecessary: CSS scroll + `overflow-y:auto`
 * handles any reasonable number of items. For very long lists on web, a separate
 * windowed-list component should be created. This primitive covers the common case.
 */
import React from 'react';
import { Box } from '../box';
import { Typography } from '../typography';

export interface ListProps<TItem> {
  data?: ReadonlyArray<TItem> | null;
  renderItem: (item: TItem, index: number) => React.ReactNode;
  keyExtractor?: (item: TItem, index: number) => string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyComponent?: React.ReactElement;
  className?: string;
  contentClassName?: string;
  estimatedItemSize?: number;
  numColumns?: number;
  horizontal?: boolean;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  onEndReached?: (() => void) | null;
  onEndReachedThreshold?: number | null;
  ListHeaderComponent?: React.ReactElement | null;
  ListFooterComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
  ItemSeparatorComponent?: React.ComponentType | null;
  style?: object;
  contentContainerStyle?: object;
}

/**
 * List — web fallback using native scroll + React.map.
 * FlashList (native-only) is replaced by a simple scrollable container.
 */
export function List<TItem>({
  data,
  renderItem,
  keyExtractor,
  emptyTitle = 'Aucun élément',
  emptyDescription,
  emptyComponent,
  className,
  contentClassName,
  horizontal,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  ItemSeparatorComponent,
  style,
  contentContainerStyle,
}: ListProps<TItem>) {
  const items = data ?? [];
  const isEmpty = items.length === 0;

  const defaultEmpty = emptyComponent ?? (
    <Box className="flex-1 items-center justify-center py-16">
      <Typography variant="body" color="muted" align="center">
        {emptyTitle}
      </Typography>
      {emptyDescription ? (
        <Typography variant="caption" color="muted" align="center" className="mt-1">
          {emptyDescription}
        </Typography>
      ) : null}
    </Box>
  );

  return (
    <Box
      className={className}
      style={{
        overflowY: horizontal ? 'hidden' : 'auto',
        overflowX: horizontal ? 'auto' : 'hidden',
        ...(style as object),
      } as object}
    >
      <Box
        className={contentClassName}
        style={{
          display: horizontal ? 'flex' : 'block',
          flexDirection: horizontal ? 'row' : 'column',
          ...(contentContainerStyle as object),
        } as object}
      >
        {ListHeaderComponent}
        {isEmpty
          ? (ListEmptyComponent ?? defaultEmpty)
          : items.map((item, index) => (
              <React.Fragment key={keyExtractor ? keyExtractor(item, index) : String(index)}>
                {index > 0 && ItemSeparatorComponent ? <ItemSeparatorComponent /> : null}
                {renderItem(item, index)}
              </React.Fragment>
            ))}
        {ListFooterComponent}
      </Box>
    </Box>
  );
}
