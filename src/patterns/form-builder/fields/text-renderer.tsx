import { Input } from '../../../components/input';
import type { FieldRendererComponentProps } from '../core/types';

/**
 * Text / email field renderer using @oryn/ui Input primitive.
 */
export function TextRenderer({ field, config }: FieldRendererComponentProps) {
  if (config.type === 'component') return null;
  const error = field.state.meta.errors[0] as string | undefined;

  return (
    <Input
      label={config.label}
      value={(field.state.value as string) ?? ''}
      onChangeText={(text) => field.handleChange(text)}
      onBlur={field.handleBlur}
      placeholder={config.placeholder}
      helperText={config.helperText}
      errorText={error}
      editable={!config.disabled}
      keyboardType={config.type === 'email' ? 'email-address' : 'default'}
      autoCapitalize={config.type === 'email' ? 'none' : 'sentences'}
    />
  );
}
