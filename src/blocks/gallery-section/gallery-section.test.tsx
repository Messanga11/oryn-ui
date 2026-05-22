import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { GallerySection } from './index';

// Mock Image primitive directly (avoids .web.tsx react-native-web import issue)
vi.mock('../../primitives/image', () => ({
  Image: ({
    source,
    alt,
    contentFit: _cf,
    cachePolicy: _cp,
    priority: _p,
    placeholder: _ph,
    ...props
  }: {
    source?: string | { uri?: string } | number;
    alt?: string;
    contentFit?: string;
    cachePolicy?: string;
    priority?: string;
    placeholder?: string;
    [k: string]: unknown;
  }) => {
    const R = require('react');
    const uri = typeof source === 'string' ? source : (source as { uri?: string })?.uri;
    return R.createElement('img', { src: uri, alt: alt ?? '', ...props });
  },
}));

const FIXTURE_IMAGES = [
  { url: 'https://example.com/a.jpg', alt: 'Image A' },
  { url: 'https://example.com/b.jpg', alt: 'Image B' },
  { url: 'https://example.com/c.jpg' },
];

describe('GallerySection', () => {
  it('renders all images', () => {
    const { container } = render(<GallerySection images={FIXTURE_IMAGES} />);
    // Use querySelectorAll because alt="" img has presentation role, not "img" role
    const imgs = container.querySelectorAll('img');
    expect(imgs).toHaveLength(3);
  });

  it('renders alt text when provided', () => {
    render(<GallerySection images={FIXTURE_IMAGES} />);
    expect(screen.getByAltText('Image A')).toBeTruthy();
    expect(screen.getByAltText('Image B')).toBeTruthy();
  });

  it('uses empty alt for decorative images (A11Y-04)', () => {
    const { container } = render(<GallerySection images={FIXTURE_IMAGES} />);
    const imgs = container.querySelectorAll('img');
    // Third image has no alt → should be '' (decorative)
    expect(imgs[2]?.getAttribute('alt')).toBe('');
  });

  it('returns null when images is empty (EDGE-07)', () => {
    const { container } = render(<GallerySection images={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('handles single image', () => {
    const { container } = render(<GallerySection images={[{ url: 'https://example.com/x.jpg' }]} />);
    expect(container.querySelectorAll('img')).toHaveLength(1);
  });
});
