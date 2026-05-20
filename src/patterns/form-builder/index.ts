// FormBuilder component
export { FormBuilder } from './form-builder';
export type { FormBuilderHandle, FormBuilderProps, FormFieldConfig } from './form-builder';

// Context (headless — unchanged from Messanga11/formbuilder)
export { FormBuilderProvider, useFieldRenderers } from './core/context';
export type { FormBuilderProviderProps } from './core/context';
export {
  FormBuilderStyleProvider,
  useFormBuilderStyle,
} from './core/style-context';
export type {
  FormBuilderStyle,
  FormBuilderStyleProviderProps,
} from './core/style-context';

// Types
export type {
  FieldConfig,
  FieldType,
  SelectOption,
  FormFieldState,
  FieldRendererComponentProps,
  FieldRendererComponent,
  FieldRendererRegistry,
  BaseFieldConfig,
  TextFieldConfig,
  PasswordFieldConfig,
  SelectFieldConfig,
  CheckboxFieldConfig,
  TextareaFieldConfig,
} from './core/types';
export { getFieldError } from './core/types';

// Validators (headless — unchanged)
export { createValidators } from './validators';
export type { Validators, ValidatorMessages } from './validators';

// Utils
export { extractFiles } from './file-handling';

// Default renderers (NativeWind-based)
export { defaultRenderers } from './fields';
export { TextRenderer } from './fields';
export { PasswordRenderer } from './fields';
export { TextareaRenderer } from './fields';
export { SelectRenderer } from './fields';
export { CheckboxRenderer } from './fields';
