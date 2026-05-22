/**
 * Image.web.tsx — web-specific image primitive.
 *
 * Vite resolves .web.tsx before .tsx for web builds (configured in vite.config.ts).
 * This avoids importing expo-image in web/SSR context — expo-image ships TypeScript
 * source only and cannot be loaded by Node's native module runner.
 *
 * Uses react-native-web's Image component, which renders as <img> on web and
 * is SSR-safe when react-native-web is externalized (Node loads CJS build natively).
 */
import { Image as RNImage } from "react-native-web";
import type { ImageStyle, StyleProp } from "react-native";

export type ImageContentFit = "contain" | "cover" | "fill" | "none" | "scale-down";

export interface ImageProps {
  source: string | { uri: string } | number;
  width?: number | string;
  height?: number | string;
  contentFit?: ImageContentFit;
  className?: string;
  style?: StyleProp<ImageStyle>;
  alt?: string;
  placeholder?: string;
  priority?: "low" | "normal" | "high";
  cachePolicy?: "none" | "disk" | "memory" | "memory-disk";
}

// Map expo-image's contentFit to react-native's resizeMode
const RESIZE_MODE_MAP: Record<ImageContentFit, string> = {
  contain: "contain",
  cover: "cover",
  fill: "stretch",
  none: "center",
  "scale-down": "contain",
};

export function Image({
  source,
  width,
  height,
  contentFit = "cover",
  className,
  style,
  alt,
}: ImageProps) {
  const resolvedSource =
    typeof source === "string" ? { uri: source } : source;

  return (
    <RNImage
      source={resolvedSource as Parameters<typeof RNImage>[0]["source"]}
      resizeMode={RESIZE_MODE_MAP[contentFit] as "contain" | "cover" | "stretch" | "center"}
      className={className}
      style={[{ width, height } as ImageStyle, style]}
      accessibilityLabel={alt}
    />
  );
}
