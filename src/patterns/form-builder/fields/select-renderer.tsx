import { Select } from '../../../components/select';
import type { FieldRendererComponentProps, SelectFieldConfig } from '../core/types';

export function SelectRenderer({ field, config }: FieldRendererComponentProps) {
  const selectConfig = config as SelectFieldConfig;
  const error = field.state.meta.errors[0] as string | undefined;

  return (
    <Select
      label={selectConfig.label}
      options={selectConfig.options ?? []}
      value={(field.state.value as string) ?? ''}
      onChange={(value) => field.handleChange(value)}
      placeholder={selectConfig.placeholder}
      helperText={selectConfig.helperText}
      errorText={error}
      disabled={selectConfig.disabled}
    />
  );
}
