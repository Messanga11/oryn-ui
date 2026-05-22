import React from 'react';

/**
 * Box.web.tsx — SSR-safe DOM implementation of Box.
 *
 * Used by Vite in web/SSR builds (resolve.extensions prefers .web.tsx).
 * Replaces the react-native View-based Box so no react-native-web import
 * reaches the SSR module-runner (which can't evaluate rnw's CJS sub-paths).
 *
 * Maps react-native-web conventions to proper HTML attributes:
 * - accessibilityRole → role (ARIA landmark roles: "navigation", "contentinfo", etc.)
 * - accessibilityLabel → aria-label
 * - All other props are forwarded as-is to <div>
 *
 * Supports ref forwarding so sentinelRef in Header resolves to HTMLDivElement.
 */
export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  /** Maps to HTML `role` attribute on web */
  accessibilityRole?: string;
  /** Maps to `aria-label` on web */
  accessibilityLabel?: string;
  children?: React.ReactNode;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      style,
      accessibilityRole,
      accessibilityLabel,
      children,
      ...rest
    },
    ref,
  ) => {
    // Merge aria-label: explicit aria-label prop wins over accessibilityLabel
    const ariaLabel =
      (rest as Record<string, unknown>)['aria-label'] !== undefined
        ? (rest as Record<string, unknown>)['aria-label'] as string | undefined
        : accessibilityLabel;

    // Build clean props (remove RN-specific keys already handled above)
    const { 'aria-label': _ariaLabelProp, ...htmlRest } = rest as Record<string, unknown> & { 'aria-label'?: string };

    return (
      <div
        ref={ref}
        className={className}
        style={style}
        role={accessibilityRole}
        aria-label={ariaLabel}
        {...(htmlRest as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  },
);

Box.displayName = 'Box';
