import { Column } from '../../layout/column';
import { PageLayout } from '../../layout/page-layout';
import { Image } from '../../primitives/image';
import { Typography } from '../../primitives/typography';
import { Button } from '../../components/button';

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  onCtaPress?: () => void;
  alignment?: 'left' | 'center' | 'right';
  variant?: 'dark' | 'light' | 'gradient';
  blockType?: string;
  id?: string;
}

const ALIGN_MAP = {
  left: 'start' as const,
  center: 'center' as const,
  right: 'end' as const,
};

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  onCtaPress,
  alignment = 'center',
  variant = 'dark',
}: HeroSectionProps) {
  const bgClass =
    variant === 'light'
      ? 'bg-white'
      : variant === 'gradient'
        ? 'bg-primary-600'
        : 'bg-bg-base';

  return (
    <PageLayout className={`${bgClass} relative`}>
      {backgroundImage ? (
        <Image
          source={backgroundImage}
          width="100%"
          height="100%"
          contentFit="cover"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.3 }}
          alt=""
        />
      ) : null}

      <Column
        align={ALIGN_MAP[alignment]}
        justify="center"
        gap={16}
        className="flex-1 py-16 px-6"
      >
        <Typography
          variant="h1"
          align={alignment}
          className={variant === 'light' ? 'text-text-inverse' : 'text-text-primary'}
        >
          {title}
        </Typography>

        {subtitle ? (
          <Typography
            variant="body-lg"
            align={alignment}
            color={variant === 'light' ? 'muted' : 'secondary'}
          >
            {subtitle}
          </Typography>
        ) : null}

        {ctaText && onCtaPress ? (
          <Button onPress={onCtaPress} size="lg" className="mt-2">
            {ctaText}
          </Button>
        ) : null}
      </Column>
    </PageLayout>
  );
}
