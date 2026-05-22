import React from 'react';

/**
 * Pressable.web.tsx — SSR-safe DOM implementation of Pressable.
 *
 * Used by Vite in web/SSR builds. Replaces the react-native Pressable so no
 * react-native-web import reaches the SSR module-runner.
 *
 * Maps react-native-web conventions to proper HTML:
 * - onPress      → onClick
 * - onHoverIn    → onMouseEnter
 * - onHoverOut   → onMouseLeave
 * - accessibilityRole → button (default) or ARIA role via `role`
 * - accessibilityLabel → aria-label
 * - hitSlop is a touch concept — silently ignored on web
 *
 * Renders as <button> by default. When accessibilityRole is NOT "button"
 * (e.g. "link") it sets `role` and uses `type="button"` only if needed.
 */
export interface PressableProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onPress?: () => void;
  /** Web hover enter handler (replaces RN's onHoverIn) */
  onHoverIn?: () => void;
  /** Web hover leave handler (replaces RN's onHoverOut) */
  onHoverOut?: () => void;
  accessibilityRole?: string;
  accessibilityLabel?: string;
  /** Touch expansion — ignored on web */
  hitSlop?: number;
  children?: React.ReactNode;
}

export const Pressable = React.forwardRef<HTMLButtonElement, PressableProps>(
  (
    {
      className,
      style,
      onPress,
      onHoverIn,
      onHoverOut,
      accessibilityRole,
      accessibilityLabel,
      hitSlop: _hitSlop,
      disabled,
      children,
      ...rest
    },
    ref,
  ) => {
    // Map accessibilityRole to HTML role (only when not the default button role)
    const htmlRole =
      accessibilityRole && accessibilityRole !== 'button'
        ? accessibilityRole
        : undefined;

    // Merge aria-label: explicit prop wins over accessibilityLabel
    const ariaLabel =
      (rest as Record<string, unknown>)['aria-label'] !== undefined
        ? (rest as Record<string, unknown>)['aria-label'] as string | undefined
        : accessibilityLabel;

    const { 'aria-label': _ariaLabelProp, ...htmlRest } = rest as Record<string, unknown> & { 'aria-label'?: string };

    return (
      <button
        ref={ref}
        type="button"
        className={className}
        style={style as React.CSSProperties}
        onClick={onPress}
        onMouseEnter={onHoverIn}
        onMouseLeave={onHoverOut}
        role={htmlRole}
        aria-label={ariaLabel}
        disabled={disabled}
        {...(htmlRest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);

Pressable.displayName = 'Pressable';
