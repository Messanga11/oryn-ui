import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';
import { Image } from '../../primitives/image';
import { SectionLayout } from '../../layout/section-layout';

export interface ContentSectionProps {
  title?: string;
  content: string;
  image?: string;
  imagePosition?: 'top' | 'bottom' | 'left' | 'right';
  blockType?: string;
  id?: string;
}

export function ContentSection({
  title,
  content,
  image,
  imagePosition = 'top',
}: ContentSectionProps) {
  const isHorizontal = imagePosition === 'left' || imagePosition === 'right';

  return (
    <SectionLayout title={title}>
      <Box className={isHorizontal ? 'flex-row gap-4' : 'flex-col gap-4'}>
        {image && (imagePosition === 'top' || imagePosition === 'left') ? (
          <Image
            source={image}
            width={isHorizontal ? '40%' : '100%'}
            height={isHorizontal ? 200 : 240}
            contentFit="cover"
            className="rounded-lg overflow-hidden"
          />
        ) : null}

        <Box className={isHorizontal ? 'flex-1' : ''}>
          <Typography variant="body" color="secondary">
            {content}
          </Typography>
        </Box>

        {image && (imagePosition === 'bottom' || imagePosition === 'right') ? (
          <Image
            source={image}
            width={isHorizontal ? '40%' : '100%'}
            height={isHorizontal ? 200 : 240}
            contentFit="cover"
            className="rounded-lg overflow-hidden"
          />
        ) : null}
      </Box>
    </SectionLayout>
  );
}
