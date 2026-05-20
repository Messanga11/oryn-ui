import type { ViewProps } from 'react-native';
import { View } from 'react-native';

type AlignItems = 'start' | 'center' | 'end' | 'stretch';
type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around';

const ALIGN_CLASS: Record<AlignItems, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const JUSTIFY_CLASS: Record<JustifyContent, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export interface ColumnProps extends ViewProps {
  align?: AlignItems;
  justify?: JustifyContent;
  gap?: number;
  flex?: boolean;
  /** Grid column span (1–12 on web, 1–6 on mobile) */
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
}

/**
 * Column — vertical flex container.
 * Replaces <div style={{flexDirection:'column'}}> everywhere.
 * Also acts as a grid column via the `span` prop.
 */
export function Column({
  align = 'stretch',
  justify = 'start',
  gap = 0,
  flex = false,
  span,
  className,
  style,
  ...props
}: ColumnProps) {
  const gapStyle = gap > 0 ? { gap } : undefined;

  const composedClass = [
    'flex-col',
    ALIGN_CLASS[align],
    JUSTIFY_CLASS[justify],
    flex ? 'flex-1' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <View
      className={composedClass}
      style={[
        span ? { flex: span } : undefined,
        gapStyle,
        style,
      ]}
      {...props}
    />
  );
}
