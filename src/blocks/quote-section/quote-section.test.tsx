import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { QuoteSection } from './index';

describe('QuoteSection', () => {
  it('renders quoted text with guillemets', () => {
    render(<QuoteSection text="Design is not just what it looks like" />);
    // Text wrapped in « »
    expect(screen.getByText(/Design is not just what it looks like/)).toBeTruthy();
  });

  it('renders author when provided', () => {
    render(<QuoteSection text="Simplicity is the ultimate sophistication" author="Leonardo da Vinci" />);
    expect(screen.getByText(/Leonardo da Vinci/)).toBeTruthy();
  });

  it('does not render author element when author is omitted', () => {
    render(<QuoteSection text="Some great quote" />);
    expect(screen.queryByText(/\u2014/)).toBeNull();
  });

  it('returns null when text is empty', () => {
    const { container } = render(<QuoteSection text="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders em-dash before author name', () => {
    render(<QuoteSection text="Quote" author="Author" />);
    expect(screen.getByText(/\u2014 Author/)).toBeTruthy();
  });
});
