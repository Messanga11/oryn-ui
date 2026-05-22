/**
 * Image.web.tsx — SSR-safe DOM implementation of Image.
 *
 * Uses a plain <img> element so that SSR and CSR produce identical markup —
 * no react-native-web CSS-in-JS classes, no hydration mismatches.
 *
 * Vite resolves .web.tsx before .tsx for web builds (configured in vite.config.ts).
 */
import React from 'react';

export type ImageContentFit = "contain" | "cover" | "fill" | "none" | "scale-down";

export interface ImageProps {
  source: string | { uri: string } | number;
  width?: number | string;
  height?: number | string;
  contentFit?: ImageContentFit;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  placeholder?: string;
  priority?: "low" | "normal" | "high";
  cachePolicy?: "none" | "disk" | "memory" | "memory-disk";
}

export function Image({
  source,
  width,
  height,
  contentFit = "cover",
  className,
  style,
  alt = "",
}: ImageProps) {
  const src =
    typeof source === "string"
      ? source
      : typeof source === "object" && source !== null && "uri" in source
        ? (source as { uri: string }).uri
        : "";

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ width, height, objectFit: contentFit, ...style }}
    />
  );
}
