import type { ReactNode } from 'react';
import { useState } from 'react';
import { Box } from '../../primitives/box';
import { Pressable } from '../../primitives/pressable';
import { Typography } from '../../primitives/typography';
import { ScrollContainer } from '../../primitives/scroll-container';

export interface TabItem {
  key: string;
  label: string;
  badge?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeKey?: string;
  onChange: (key: string) => void;
  children?: ReactNode;
  scrollable?: boolean;
  className?: string;
}

export function Tabs({
  tabs,
  activeKey,
  onChange,
  scrollable = false,
  className,
}: TabsProps) {
  const TabBar = (
    <Box className={['flex-row border-b border-bg-border', className].filter(Boolean).join(' ')}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            className={[
              'flex-row items-center px-4 py-3 mr-1 border-b-2',
              isActive ? 'border-primary-500' : 'border-transparent',
            ].join(' ')}
          >
            <Typography
              variant="label"
              className={isActive ? 'text-primary-400' : 'text-text-muted'}
            >
              {tab.label}
            </Typography>
            {tab.badge !== undefined && tab.badge > 0 ? (
              <Box className="ml-1.5 bg-primary-500 rounded-full px-1.5 py-0.5">
                <Typography className="text-white text-xs font-bold">{tab.badge}</Typography>
              </Box>
            ) : null}
          </Pressable>
        );
      })}
    </Box>
  );

  if (scrollable) {
    return (
      <ScrollContainer horizontal showsHorizontalScrollIndicator={false}>
        {TabBar}
      </ScrollContainer>
    );
  }

  return TabBar;
}
