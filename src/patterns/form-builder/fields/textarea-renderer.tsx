import { TextArea } from '../../../components/text-area';
import type { FieldRendererComponentProps } from '../core/types';

export function TextareaRenderer({ field, config }: FieldRendererComponentProps) {
  const error = field.state.meta.errors[0] as string | undefined;

  return (
    <TextArea
      label={config.label}
      value={(field.state.value as string) ?? ''}
      onChangeText={(text) => field.handleChange(text)}
      onBlur={field.handleBlur}
      placeholder={config.placeholder}
      helperText={config.helperText}
      errorText={error}
      editable={!config.disabled}
    />
  );
}
