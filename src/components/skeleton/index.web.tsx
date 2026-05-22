/**
 * Skeleton.web.tsx — SSR-safe CSS-animated loading placeholder.
 *
 * Replaces the react-native Animated.View implementation on web.
 * Uses a CSS keyframe animation via Tailwind `animate-pulse` so SSR and CSR
 * produce identical markup — no react-native-web CSS-in-JS, no hydration mismatch.
 *
 * Vite resolves .web.tsx before .tsx for web builds.
 */
import React from 'react';

export interface SkeletonProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  className?: string;
}

export function Skeleton({ width, height = 16, borderRadius = 8, className }: SkeletonProps) {
  return (
    <div
      className={['animate-pulse bg-[#242840]', className].filter(Boolean).join(' ')}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  );
}

export function SkeletonListItem() {
  return (
    <div className="flex flex-row items-center px-4 py-3 gap-3">
      <Skeleton width={40} height={40} borderRadius={20} />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton height={14} borderRadius={7} />
        <Skeleton height={12} borderRadius={6} className="w-3/5" />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-bg-surface rounded-lg border border-bg-border p-4 flex flex-col gap-3">
      <Skeleton height={16} borderRadius={8} />
      <Skeleton height={12} borderRadius={6} className="w-4/5" />
      <Skeleton height={12} borderRadius={6} className="w-3/5" />
    </div>
  );
}
