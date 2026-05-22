import { Box } from '../../primitives/box';
import { Image } from '../../primitives/image';

export interface GallerySectionProps {
  images: { url: string; alt?: string }[];
  blockType?: string;
  id?: string;
}

/**
 * GallerySection — grid of images from a case study block.
 * Returns null when images array is empty (EDGE-07).
 * DESIGN-11: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-4, aspect-[4/3] object-cover.
 */
export function GallerySection({ images }: GallerySectionProps) {
  if (images.length === 0) return null;

  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((img, i) => (
        <Box key={img.url || String(i)} className="aspect-[4/3] overflow-hidden rounded-sm">
          <Image
            source={img.url}
            width="100%"
            height="100%"
            contentFit="cover"
            alt={img.alt ?? ''}
            className="w-full h-full"
          />
        </Box>
      ))}
    </Box>
  );
}
