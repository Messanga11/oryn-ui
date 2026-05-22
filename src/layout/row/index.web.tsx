import React from 'react';

/**
 * Row.web.tsx — SSR-safe DOM implementation of Row.
 *
 * Used by Vite in web/SSR builds. Replaces the react-native View-based Row so
 * no react-native-web import reaches the SSR module-runner.
 *
 * Produces a <div> with `display:flex; flex-direction:row` via Tailwind classes.
 * API is intentionally identical to the native Row so feature code never needs
 * platform guards.
 */

type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

const ALIGN_CLASS: Record<AlignItems, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const JUSTIFY_CLASS: Record<JustifyContent, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: AlignItems;
  justify?: JustifyContent;
  gap?: number;
  wrap?: boolean;
  className?: string;
  /** Maps react-native accessibilityRole to HTML role */
  accessibilityRole?: string;
  /** Maps react-native accessibilityLabel to aria-label */
  accessibilityLabel?: string;
}

export function Row({
  align = 'center',
  justify = 'start',
  gap = 0,
  wrap = false,
  className,
  style,
  accessibilityRole,
  accessibilityLabel,
  ...props
}: RowProps) {
  // Build gap style inline only when no class covers it (arbitrary value)
  const gapStyle: React.CSSProperties | undefined =
    gap > 0 ? { gap } : undefined;

  const composedClass = [
    'flex',
    'flex-row',
    ALIGN_CLASS[align],
    JUSTIFY_CLASS[justify],
    wrap ? 'flex-wrap' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: React.CSSProperties | undefined =
    gapStyle || style
      ? { ...gapStyle, ...(style as React.CSSProperties) }
      : undefined;

  return (
    <div
      className={composedClass}
      style={mergedStyle}
      role={accessibilityRole}
      aria-label={accessibilityLabel}
      {...props}
    />
  );
}
