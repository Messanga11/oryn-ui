import { FlashList } from '@shopify/flash-list';
import type { FlashListProps } from '@shopify/flash-list';
import { Box } from '../box';
import { Typography } from '../typography';

export interface ListProps<TItem> extends Omit<FlashListProps<TItem>, 'renderItem'> {
  renderItem: (item: TItem, index: number) => React.ReactNode;
  keyExtractor?: (item: TItem, index: number) => string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyComponent?: React.ReactElement;
  className?: string;
  contentClassName?: string;
}

/**
 * List — high-performance list primitive.
 * Uses FlashList (recycled views, 60 FPS) — never FlatList.
 * Replaces <FlatList>, <ScrollView with map> everywhere.
 */
export function List<TItem>({
  renderItem,
  keyExtractor,
  emptyTitle = 'Aucun élément',
  emptyDescription,
  emptyComponent,
  className,
  contentClassName,
  data,
  estimatedItemSize = 64,
  ...props
}: ListProps<TItem>) {
  return (
    <FlashList
      data={data}
      renderItem={({ item, index }) => renderItem(item, index) as React.ReactElement}
      keyExtractor={
        keyExtractor ? (item, index) => keyExtractor(item, index) : (_item, index) => String(index)
      }
      estimatedItemSize={estimatedItemSize}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        emptyComponent ?? (
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
        )
      }
      {...props}
    />
  );
}
