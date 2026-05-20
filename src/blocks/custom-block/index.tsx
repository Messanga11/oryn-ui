import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';
import type { VexBlock } from '../types';

/**
 * CustomBlock — fallback renderer for unknown blockTypes.
 * Renders nothing in production, shows a warning in dev.
 */
export function CustomBlock(props: VexBlock) {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <Box className="bg-warning/10 border border-warning/30 rounded-lg p-3 my-2">
      <Typography variant="caption" color="warning">
        Unknown block type: "{props.blockType}"
      </Typography>
    </Box>
  );
}
