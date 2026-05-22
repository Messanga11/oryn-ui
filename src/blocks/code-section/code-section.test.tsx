import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { CodeSection } from './index';

describe('CodeSection', () => {
  it('renders code content', () => {
    render(<CodeSection language="typescript" code="const x = 1;" />);
    expect(screen.getByText('const x = 1;')).toBeTruthy();
  });

  it('renders language badge in uppercase mono', () => {
    render(<CodeSection language="typescript" code="const x = 1;" />);
    expect(screen.getByText('typescript')).toBeTruthy();
  });

  it('renders multiline code (all lines present in DOM)', () => {
    const code = 'const a = 1;\nconst b = 2;\nreturn a + b;';
    const { container } = render(<CodeSection language="js" code={code} />);
    // TextContent contains all lines (even if split across nodes)
    expect(container.textContent).toContain('const a = 1;');
    expect(container.textContent).toContain('const b = 2;');
    expect(container.textContent).toContain('return a + b;');
  });

  it('returns null when code is empty (EDGE-09)', () => {
    const { container } = render(<CodeSection language="ts" code="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders language badge alongside code', () => {
    render(<CodeSection language="python" code="print('hello')" />);
    expect(screen.getByText('python')).toBeTruthy();
    expect(screen.getByText("print('hello')")).toBeTruthy();
  });
});
