import type { ReactNode } from "react";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "phone"
  | "otp"
  | "checkbox"
  | "number"
  | "select"
  | "async-select"
  | "textarea"
  | "file"
  | "component";

export interface BaseFieldConfig {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  optional?: boolean;
  /** Number of grid columns this field should span (e.g. 2 for full-width in a 2-col grid) */
  colSpan?: number;
}

export interface TextFieldConfig extends BaseFieldConfig {
  type: "text" | "email";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  props?: React.ComponentProps<"input">;
}

export interface PasswordFieldConfig extends BaseFieldConfig {
  type: "password";
  props?: React.ComponentProps<"input">;
}

export interface PhoneFieldConfig extends BaseFieldConfig {
  type: "phone";
  props?: React.ComponentProps<"input">;
}

export interface OTPFieldConfig extends BaseFieldConfig {
  type: "otp";
  maxLength?: number;
  props?: React.ComponentProps<"input">;
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: "checkbox";
  props?: React.ComponentProps<"input">;
}

export interface NumberFieldConfig extends BaseFieldConfig {
  type: "number";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  props?: React.ComponentProps<"input">;
}

export interface SelectOption {
  readonly label: string;
  readonly value: string;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  options: SelectOption[];
  props?: React.ComponentProps<"select">;
}

export interface AsyncSelectFieldConfig extends BaseFieldConfig {
  type: "async-select";
  fetchOptions: (search: string) => Promise<SelectOption[]>;
  debounceMs?: number;
  noResultsText?: string;
  loadingText?: string;
  props?: React.ComponentProps<"input">;
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  type: "textarea";
  rows?: number;
  props?: React.ComponentProps<"textarea">;
}

export interface FileFieldConfig extends BaseFieldConfig {
  type: "file";
  accept?: string;
  maxFiles?: number;
  maxSizeBytes?: number;
  multiple?: boolean;
  props?: React.ComponentProps<"input">;
}

export interface ComponentFieldConfig {
  type: "component";
  name: string;
  component: ReactNode;
  props?: React.ComponentProps<"div">;
  /** Number of grid columns this field should span */
  colSpan?: number;
}

export type FieldConfig =
  | TextFieldConfig
  | PasswordFieldConfig
  | PhoneFieldConfig
  | OTPFieldConfig
  | CheckboxFieldConfig
  | NumberFieldConfig
  | SelectFieldConfig
  | AsyncSelectFieldConfig
  | TextareaFieldConfig
  | FileFieldConfig
  | ComponentFieldConfig;

export interface FormFieldState {
  value: unknown;
  errors: string[];
  errorMap: Record<string, string | undefined>;
}

export function getFieldError(state: FormFieldState): string | undefined {
  if (state.errors.length > 0) {
    return state.errors[0];
  }
  return state.errorMap.onSubmit ?? state.errorMap.onChange ?? state.errorMap.onBlur;
}

export interface FieldRendererComponentProps {
  field: {
    name: string;
    state: {
      value: unknown;
      meta: {
        errors: unknown[];
        errorMap: Record<string, string | undefined>;
        isTouched: boolean;
        isDirty: boolean;
      };
    };
    handleChange: (value: unknown) => void;
    handleBlur: () => void;
    form: {
      state: {
        isSubmitting: boolean;
        canSubmit: boolean;
      };
    };
  };
  config: FieldConfig;
}

export type FieldRendererComponent = React.ComponentType<FieldRendererComponentProps>;

export type FieldRendererRegistry = Partial<
  Record<FieldType, FieldRendererComponent>
>;
