import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';

export interface CodeSectionProps {
  language: string;
  code: string;
  blockType?: string;
  id?: string;
}

/**
 * CodeSection — monospace code display for case study blocks.
 * Returns null when code is empty (EDGE-09).
 * DESIGN-14: bg #111111, p-24px, border subtle, font-mono text-sm, white-space pre, overflow-x auto.
 *            Language badge top-right, uppercase mono.
 */
export function CodeSection({ language, code }: CodeSectionProps) {
  if (!code) return null;

  return (
    <Box className="relative bg-bg-surface border border-border-subtle rounded-lg overflow-hidden">
      {/* Language badge — top right */}
      <Box className="absolute top-3 right-3 z-10 px-2 py-1 bg-bg-base rounded">
        <Typography
          variant="overline"
          className="text-xs uppercase font-mono tracking-widest text-text-secondary"
        >
          {language}
        </Typography>
      </Box>

      {/* Code content */}
      <Box className="p-6 overflow-x-auto">
        <Typography
          variant="mono"
          className="text-sm text-text-primary whitespace-pre leading-relaxed"
        >
          {code}
        </Typography>
      </Box>
    </Box>
  );
}
