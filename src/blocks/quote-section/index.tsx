import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';

export interface QuoteSectionProps {
  text: string;
  author?: string;
  blockType?: string;
  id?: string;
}

/**
 * QuoteSection — editorial citation block.
 * Returns null when text is empty.
 * DESIGN-13: max-width 800px centered, h2 italic, guillemets « », author mono uppercase.
 */
export function QuoteSection({ text, author }: QuoteSectionProps) {
  if (!text) return null;

  return (
    <Box className="max-w-[800px] mx-auto py-16 px-4 items-center">
      <Typography
        variant="h2"
        align="center"
        className="italic text-text-primary leading-snug"
      >
        {`\u00ab\u00a0${text}\u00a0\u00bb`}
      </Typography>
      {author ? (
        <Typography
          variant="overline"
          align="center"
          className="mt-6 text-xs uppercase font-mono tracking-widest text-text-secondary"
        >
          {`\u2014 ${author}`}
        </Typography>
      ) : null}
    </Box>
  );
}
