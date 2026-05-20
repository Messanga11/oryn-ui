import { Button } from '../../components/button';
import { Column } from '../../layout/column';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';

export interface CtaSectionProps {
  title: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  blockType?: string;
  id?: string;
}

export function CtaSection({
  title,
  description,
  primaryCtaText,
  secondaryCtaText,
  onPrimaryPress,
  onSecondaryPress,
}: CtaSectionProps) {
  return (
    <Box className="bg-primary-500/10 rounded-xl p-6 border border-primary-500/30">
      <Column align="center" gap={12}>
        <Typography variant="h2" align="center">
          {title}
        </Typography>
        {description ? (
          <Typography variant="body" color="secondary" align="center">
            {description}
          </Typography>
        ) : null}
        <Column gap={8} className="w-full mt-2">
          {primaryCtaText && onPrimaryPress ? (
            <Button onPress={onPrimaryPress} size="lg" className="w-full">
              {primaryCtaText}
            </Button>
          ) : null}
          {secondaryCtaText && onSecondaryPress ? (
            <Button onPress={onSecondaryPress} variant="outline" size="lg" className="w-full">
              {secondaryCtaText}
            </Button>
          ) : null}
        </Column>
      </Column>
    </Box>
  );
}
