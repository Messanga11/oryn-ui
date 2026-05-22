import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';

export interface StatsSectionProps {
  items: { label: string; value: string }[];
  blockType?: string;
  id?: string;
}

/**
 * StatsSection — KPI grid for case study blocks.
 * Returns null when items array is empty (EDGE-08).
 * DESIGN-12: grid-cols-2 md:grid-cols-4, gap-8, display variant for value, mono label.
 */
export function StatsSection({ items }: StatsSectionProps) {
  if (items.length === 0) return null;

  return (
    <Box className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {items.map((item, i) => (
        <Box key={String(i)} className="flex-col gap-3">
          <Typography
            variant="display"
            className="text-5xl md:text-6xl text-text-primary font-bold"
          >
            {item.value}
          </Typography>
          <Typography
            variant="overline"
            className="text-xs uppercase font-mono tracking-widest text-text-secondary"
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
