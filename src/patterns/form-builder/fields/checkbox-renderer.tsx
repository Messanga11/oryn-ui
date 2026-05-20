import { Checkbox } from '../../../components/checkbox';
import type { FieldRendererComponentProps } from '../core/types';

export function CheckboxRenderer({ field, config }: FieldRendererComponentProps) {
  if (config.type === 'component') return null;
  return (
    <Checkbox
      checked={(field.state.value as boolean) ?? false}
      onChange={(checked) => field.handleChange(checked)}
      label={config.label}
      disabled={config.disabled}
    />
  );
}
