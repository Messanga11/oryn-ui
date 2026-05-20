/**
 * Merge Tailwind/NativeWind class strings — deduplicates conflicting utilities.
 * Simple implementation without clsx/tailwind-merge dependency (mobile-safe).
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
