import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { StatsSection } from './index';

const FIXTURE_ITEMS = [
  { label: 'Users', value: '100K' },
  { label: 'Revenue', value: '$2M' },
  { label: 'NPS', value: '87' },
  { label: 'Uptime', value: '99.9%' },
];

describe('StatsSection', () => {
  it('renders all stat values', () => {
    render(<StatsSection items={FIXTURE_ITEMS} />);
    expect(screen.getByText('100K')).toBeTruthy();
    expect(screen.getByText('$2M')).toBeTruthy();
    expect(screen.getByText('87')).toBeTruthy();
    expect(screen.getByText('99.9%')).toBeTruthy();
  });

  it('renders all stat labels', () => {
    render(<StatsSection items={FIXTURE_ITEMS} />);
    expect(screen.getByText('Users')).toBeTruthy();
    expect(screen.getByText('Revenue')).toBeTruthy();
    expect(screen.getByText('NPS')).toBeTruthy();
    expect(screen.getByText('Uptime')).toBeTruthy();
  });

  it('returns null when items is empty (EDGE-08)', () => {
    const { container } = render(<StatsSection items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('handles single item', () => {
    render(<StatsSection items={[{ label: 'Users', value: '1K' }]} />);
    expect(screen.getByText('1K')).toBeTruthy();
    expect(screen.getByText('Users')).toBeTruthy();
  });
});
