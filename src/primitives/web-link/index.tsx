import type { AnchorHTMLAttributes, ReactNode } from 'react';

export interface WebLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** data-cursor attribute for custom cursor hover state */
  'data-cursor'?: string;
  children?: ReactNode;
}

/**
 * WebLink — semantic <a> element for web-only external links.
 * Use for footer social icons, project live URLs, etc.
 * Lives in @oryn/ui so features/ never contains raw <a> tags (ARCH-02).
 */
export function WebLink({ children, ...props }: WebLinkProps) {
  return <a {...props}>{children}</a>;
}
