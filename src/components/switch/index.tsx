import { Switch as RNSwitch } from 'react-native';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';

export interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({ value, onChange, label, disabled, className }: SwitchProps) {
  return (
    <Box
      className={['flex-row items-center justify-between', className]
        .filter(Boolean)
        .join(' ')}
    >
      {label ? <Typography variant="body">{label}</Typography> : null}
      <RNSwitch
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{ false: '#3A4055', true: '#3B5BDB' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#3A4055"
      />
    </Box>
  );
}
