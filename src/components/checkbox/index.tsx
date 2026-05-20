import type { ReactNode } from 'react';
import { Box } from '../../primitives/box';
import { Pressable } from '../../primitives/pressable';
import { Typography } from '../../primitives/typography';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({ checked, onChange, label, disabled, className }: CheckboxProps) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      disabled={disabled}
      className={['flex-row items-center gap-2.5', disabled ? 'opacity-50' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <Box
        className={[
          'w-5 h-5 rounded items-center justify-center border-2',
          checked ? 'bg-primary-500 border-primary-500' : 'bg-transparent border-bg-border-strong',
        ].join(' ')}
      >
        {checked ? (
          <Typography className="text-white text-xs font-bold leading-none">✓</Typography>
        ) : null}
      </Box>
      {label ? (
        typeof label === 'string' ? (
          <Typography variant="body">{label}</Typography>
        ) : (
          label
        )
      ) : null}
    </Pressable>
  );
}
