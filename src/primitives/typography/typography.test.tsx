/**
 * TEST-02 — Typography component tests.
 * CRIT-09: VARIANT_ELEMENT mapping (display→h1, body→p, caption→span, mono→code).
 * CRIT-10: `as` prop overrides the element.
 * CRIT-01/02/03: typographyVariants values.
 */
import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { render } from '@testing-library/react';
import { typographyVariants } from '../../tokens/typography';

describe('Typography — VARIANT_ELEMENT mapping (CRIT-09)', () => {
  it('display variant renders as h1', async () => {
    const { Typography } = await import('./index.web');
    const { container } = render(createElement(Typography, { variant: 'display' }, 'Test'));
    expect(container.querySelector('h1')).not.toBeNull();
  });

  it('h2 variant renders as h2', async () => {
    const { Typography } = await import('./index.web');
    const { container } = render(createElement(Typography, { variant: 'h2' }, 'Test'));
    expect(container.querySelector('h2')).not.toBeNull();
  });

  it('body variant renders as p', async () => {
    const { Typography } = await import('./index.web');
    const { container } = render(createElement(Typography, { variant: 'body' }, 'Test'));
    expect(container.querySelector('p')).not.toBeNull();
  });

  it('caption variant renders as span', async () => {
    const { Typography } = await import('./index.web');
    const { container } = render(createElement(Typography, { variant: 'caption' }, 'Test'));
    expect(container.querySelector('span')).not.toBeNull();
  });

  it('label variant renders as span', async () => {
    const { Typography } = await import('./index.web');
    const { container } = render(createElement(Typography, { variant: 'label' }, 'Test'));
    expect(container.querySelector('span')).not.toBeNull();
  });

  it('mono variant renders as code', async () => {
    const { Typography } = await import('./index.web');
    const { container } = render(createElement(Typography, { variant: 'mono' }, 'Test'));
    expect(container.querySelector('code')).not.toBeNull();
  });
});

describe('Typography — as prop override (CRIT-10)', () => {
  it('as="span" overrides default element', async () => {
    const { Typography } = await import('./index.web');
    // display defaults to h1, but as="span" should render span
    const { container } = render(
      createElement(Typography, { variant: 'display', as: 'span' }, 'Override'),
    );
    expect(container.querySelector('span')).not.toBeNull();
    expect(container.querySelector('h1')).toBeNull();
  });

  it('as="div" overrides body (p) element', async () => {
    const { Typography } = await import('./index.web');
    const { container } = render(
      createElement(Typography, { variant: 'body', as: 'div' }, 'Override'),
    );
    expect(container.querySelector('div')).not.toBeNull();
    expect(container.querySelector('p')).toBeNull();
  });
});

describe('Typography — typographyVariants token assertions (CRIT-01 to CRIT-05)', () => {
  it('CRIT-01: display.letterSpacing === "-0.02em"', () => {
    expect(typographyVariants.display.letterSpacing).toBe('-0.02em');
  });

  it('CRIT-02: display.color === "#f0f0f0"', () => {
    expect(typographyVariants.display.color).toBe('#f0f0f0');
  });

  it('CRIT-03: display.fontFamily === "Clash Display"', () => {
    expect(typographyVariants.display.fontFamily).toBe('Clash Display');
  });

  it('CRIT-04: mono variant has fontFamily "JetBrains Mono"', () => {
    expect(typographyVariants.mono.fontFamily).toBe('JetBrains Mono');
  });

  it('CRIT-05: label.letterSpacing === "0.1em" and textTransform === "uppercase"', () => {
    expect(typographyVariants.label.letterSpacing).toBe('0.1em');
    expect(typographyVariants.label.textTransform).toBe('uppercase');
  });
});

describe('Typography — display clamp class (DESIGN-01)', () => {
  it('display variant class includes clamp(64px, 9vw, 140px)', async () => {
    // Access VARIANT_CLASS indirectly via render output
    const { Typography } = await import('./index.web');
    const { container } = render(
      createElement(Typography, { variant: 'display' }, 'Hero'),
    );
    const el = container.querySelector('h1');
    expect(el).not.toBeNull();
    // Verify the element has a class containing the clamp value
    expect(el?.className).toContain('clamp(64px');
  });
});
