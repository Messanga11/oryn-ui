import { useState } from 'react';
import { Input } from '../../../components/input';
import { IconButton } from '../../../components/icon-button';
import { Typography } from '../../../primitives/typography';
import type { FieldRendererComponentProps } from '../core/types';

export function PasswordRenderer({ field, config }: FieldRendererComponentProps) {
  const [visible, setVisible] = useState(false);
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
      secureTextEntry={!visible}
      autoCapitalize="none"
      rightIcon={
        <IconButton
          icon={<Typography className="text-text-muted">{visible ? '🙈' : '👁'}</Typography>}
          onPress={() => setVisible((v) => !v)}
          accessibilityLabel={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          size="sm"
        />
      }
    />
  );
}
