import { useState } from 'react';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';
import { Pressable } from '../../primitives/pressable';
import { Sheet } from '../sheet';
import { Checkbox } from '../checkbox';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  errorText?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  label,
  placeholder = 'Sélectionner...',
  errorText,
  helperText,
  disabled,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);
  const hasError = !!errorText;

  const borderClass = hasError
    ? 'border-error'
    : 'border-bg-border-strong';

  return (
    <Box className={['w-full', className].filter(Boolean).join(' ')}>
      {label ? (
        <Typography variant="label" className="mb-1.5">
          {label}
        </Typography>
      ) : null}

      <Pressable
        onPress={() => !disabled && setOpen(true)}
        className={[
          'flex-row items-center justify-between h-11 rounded-lg border bg-bg-surface px-3',
          borderClass,
          disabled ? 'opacity-60' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Typography
          variant="body"
          color={selected ? 'primary' : 'muted'}
        >
          {selected ? selected.label : placeholder}
        </Typography>
        <Typography variant="caption" color="muted">▼</Typography>
      </Pressable>

      {hasError ? (
        <Typography variant="caption" color="error" className="mt-1">
          {errorText}
        </Typography>
      ) : helperText ? (
        <Typography variant="caption" color="muted" className="mt-1">
          {helperText}
        </Typography>
      ) : null}

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title={label ?? 'Sélectionner une option'}
        snapHeight={60}
      >
        {options.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => {
              onChange(option.value);
              setOpen(false);
            }}
            className="flex-row items-center justify-between py-3 border-b border-bg-border"
          >
            <Typography variant="body">{option.label}</Typography>
            {option.value === value ? (
              <Typography className="text-primary-500 font-semibold">✓</Typography>
            ) : null}
          </Pressable>
        ))}
      </Sheet>
    </Box>
  );
}
