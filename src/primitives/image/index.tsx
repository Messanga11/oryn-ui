import { Image as ExpoImage } from 'expo-image';
import type { ImageStyle, StyleProp } from 'react-native';

export type ImageContentFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export interface ImageProps {
  source: string | { uri: string } | number;
  width?: number | string;
  height?: number | string;
  contentFit?: ImageContentFit;
  className?: string;
  style?: StyleProp<ImageStyle>;
  alt?: string;
  /** NativeWind-compatible placeholder color while loading */
  placeholder?: string;
  priority?: 'low' | 'normal' | 'high';
  cachePolicy?: 'none' | 'disk' | 'memory' | 'memory-disk';
}

/**
 * Image — optimised image primitive.
 * Uses expo-image on mobile (disk cache, SSIM AVIF/WebP, LRU memory cache).
 * Replace <img>, <Image> everywhere.
 *
 * Always specify width + height (required for layout stability).
 */
export function Image({
  source,
  width,
  height,
  contentFit = 'cover',
  className,
  style,
  alt,
  placeholder,
  priority = 'normal',
  cachePolicy = 'memory-disk',
}: ImageProps) {
  const resolvedSource =
    typeof source === 'string' ? { uri: source } : source;

  return (
    <ExpoImage
      source={resolvedSource}
      contentFit={contentFit}
      className={className}
      style={[{ width, height } as ImageStyle, style]}
      accessibilityLabel={alt}
      placeholder={placeholder ? { color: placeholder } : undefined}
      priority={priority}
      cachePolicy={cachePolicy}
    />
  );
}
