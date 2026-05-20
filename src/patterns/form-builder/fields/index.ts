import type { FieldRendererRegistry } from '../core/types';
import { CheckboxRenderer } from './checkbox-renderer';
import { PasswordRenderer } from './password-renderer';
import { SelectRenderer } from './select-renderer';
import { TextRenderer } from './text-renderer';
import { TextareaRenderer } from './textarea-renderer';

/**
 * Default field renderer registry using @oryn/ui primitives.
 * Pass to <FormBuilderProvider renderers={defaultRenderers}>.
 */
export const defaultRenderers: FieldRendererRegistry = {
  text: TextRenderer,
  email: TextRenderer,
  password: PasswordRenderer,
  number: TextRenderer,
  textarea: TextareaRenderer,
  select: SelectRenderer,
  checkbox: CheckboxRenderer,
};

export { TextRenderer } from './text-renderer';
export { PasswordRenderer } from './password-renderer';
export { TextareaRenderer } from './textarea-renderer';
export { SelectRenderer } from './select-renderer';
export { CheckboxRenderer } from './checkbox-renderer';
