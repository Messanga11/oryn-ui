import type { ViewProps } from 'react-native';
import { View } from 'react-native';

type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

const ALIGN_CLASS: Record<AlignItems, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const JUSTIFY_CLASS: Record<JustifyContent, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const GAP_CLASS: Record<number | string, string> = {
  0: 'gap-0',
  4: 'gap-1',
  8: 'gap-2',
  12: 'gap-3',
  16: 'gap-4',
  20: 'gap-5',
  24: 'gap-6',
  32: 'gap-8',
  48: 'gap-12',
};

export interface RowProps extends ViewProps {
  align?: AlignItems;
  justify?: JustifyContent;
  gap?: number;
  wrap?: boolean;
  className?: string;
}

/**
 * Row — horizontal flex container.
 * Replaces <div style={{flexDirection:'row'}}> everywhere.
 */
export function Row({
  align = 'center',
  justify = 'start',
  gap = 0,
  wrap = false,
  className,
  style,
  ...props
}: RowProps) {
  const composedClass = [
    'flex-row',
    ALIGN_CLASS[align],
    JUSTIFY_CLASS[justify],
    GAP_CLASS[gap] ?? '',
    wrap ? 'flex-wrap' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <View className={composedClass} style={style} {...props} />;
}
