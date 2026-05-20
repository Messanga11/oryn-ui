/**
 * FormBuilder — Universal form renderer for React Native + Web.
 *
 * Headless core (TanStack Form + Zod) is unchanged from Messanga11/formbuilder.
 * UI layer replaced with @oryn/ui primitives (no <div>, <form>, <input>).
 */
import { useForm } from '@tanstack/react-form';
import type { ReactNode, RefObject } from 'react';
import { useImperativeHandle, useMemo } from 'react';
import type { z } from 'zod';
import { Column } from '../../layout/column';
import { Row } from '../../layout/row';
import { Box } from '../../primitives/box';
import { useFieldRenderers } from './core/context';
import { useFormBuilderStyle } from './core/style-context';
import type { FormBuilderStyle } from './core/style-context';
import type { FieldConfig, FieldType } from './core/types';
import { extractFiles } from './file-handling';

export interface FormFieldConfig<TFormData, Name extends keyof TFormData = keyof TFormData> {
  name: Name;
  label?: string;
  type: FieldType | string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  optional?: boolean;
  props?: FieldConfig['props'];
  options?: readonly { readonly label: string; readonly value: string }[];
  fetchOptions?: (search: string) => Promise<{ label: string; value: string }[]>;
  debounceMs?: number;
  noResultsText?: string;
  loadingText?: string;
  accept?: string;
  maxFiles?: number;
  maxSizeBytes?: number;
  multiple?: boolean;
  component?: ReactNode;
  validation?: (validators: unknown) => z.ZodType<TFormData[Name]>;
  /** Number of flex-span columns this field occupies */
  colSpan?: number;
}

export interface FormBuilderHandle {
  submit: () => void;
  reset: () => void;
}

export interface FormBuilderProps<TFormData, TValidators = unknown> {
  fields: (FormFieldConfig<TFormData> | FormFieldConfig<TFormData>[])[];
  onSubmit: (data: TFormData) => Promise<unknown>;
  defaultValues?: Partial<TFormData>;
  validators?: TValidators;
  onSuccess?: (
    data: unknown,
    files?: Record<string, File[]>,
    fileOrders?: Record<string, string[]>,
  ) => void;
  onError?: (error: unknown) => void;
  children?: ReactNode;
  className?: string;
  id?: string;
  formRef?: RefObject<FormBuilderHandle | null>;
  formStyle?: FormBuilderStyle;
}

export function FormBuilder<TFormData, TValidators = unknown>({
  fields,
  onSubmit,
  defaultValues,
  validators,
  onSuccess,
  onError,
  children,
  className,
  id: _id,
  formRef,
  formStyle: formStyleProp,
}: Readonly<FormBuilderProps<TFormData, TValidators>>) {
  const renderers = useFieldRenderers();
  const globalStyle = useFormBuilderStyle();
  const style = useMemo(() => ({ ...globalStyle, ...formStyleProp }), [globalStyle, formStyleProp]);

  const fileFieldNames = useMemo(
    () =>
      new Set(
        fields
          .flatMap((f) => (Array.isArray(f) ? f : [f]))
          .filter((f) => f.type === 'file')
          .map((f) => String(f.name)),
      ),
    [fields],
  );

  const flatFields = useMemo(() => fields.flatMap((f) => (Array.isArray(f) ? f : [f])), [fields]);

  const fieldValidators = useMemo(() => {
    const map = new Map<string, z.ZodType<unknown>>();
    for (const field of flatFields) {
      if (field.type === 'component') continue;
      const schema = field.validation?.(validators);
      if (!schema) continue;
      map.set(String(field.name), schema);
    }
    return map;
  }, [flatFields, validators]);

  const form = useForm({
    defaultValues: defaultValues as TFormData,
    onSubmit: async ({ value }) => {
      try {
        const raw = value as Record<string, unknown>;
        const { cleanedData, files, fileOrders } = extractFiles(raw, fileFieldNames);
        const result = await onSubmit(cleanedData as TFormData);
        onSuccess?.(result, files, fileOrders);
      } catch (err) {
        onError?.(err);
      }
    },
  });

  useImperativeHandle(
    formRef,
    () => ({
      submit: () => {
        void form.validateAllFields('submit');
        void form.handleSubmit();
      },
      reset: () => form.reset(),
    }),
    [form],
  );

  function renderField(fieldConfig: FormFieldConfig<TFormData>) {
    if (fieldConfig.type === 'component') {
      return (
        <Box
          key={`field-${String(fieldConfig.name)}`}
          className={style.componentWrapperClassName}
          style={fieldConfig.colSpan ? { flex: fieldConfig.colSpan } : undefined}
        >
          {fieldConfig.component}
        </Box>
      );
    }

    const Renderer = renderers[fieldConfig.type as FieldType];
    const zodSchema = fieldValidators.get(String(fieldConfig.name));

    const validate = zodSchema
      ? (value: unknown) => {
          const result = zodSchema.safeParse(value);
          if (!result.success) return result.error.issues[0]?.message;
          return undefined;
        }
      : undefined;

    const fieldValidator = validate
      ? {
          onBlur: ({ value }: { value: unknown }) => validate(value),
          onChange: ({
            value,
            fieldApi,
          }: {
            value: unknown;
            fieldApi: { state: { meta: { isTouched: boolean } } };
          }) => {
            if (!fieldApi.state.meta.isTouched) return undefined;
            return validate(value);
          },
          onSubmit: ({ value }: { value: unknown }) => validate(value),
        }
      : undefined;

    return (
      <form.Field
        key={`field-${String(fieldConfig.name)}`}
        name={fieldConfig.name as never}
        validators={fieldValidator as never}
      >
        {(field) =>
          Renderer ? (
            <Box
              className={style.fieldWrapperClassName}
              style={fieldConfig.colSpan ? { flex: fieldConfig.colSpan } : undefined}
            >
              <Renderer field={field as never} config={fieldConfig as never} />
            </Box>
          ) : null
        }
      </form.Field>
    );
  }

  return (
    <Column gap={16} className={className}>
      {fields.map((fieldOrRow) => {
        if (Array.isArray(fieldOrRow)) {
          const rowKey = fieldOrRow.map((f) => String(f.name)).join('-');
          return (
            <Row key={`row-${rowKey}`} gap={16} align="start" className="flex-wrap">
              {fieldOrRow.map((f) => renderField(f))}
            </Row>
          );
        }
        return renderField(fieldOrRow);
      })}
      {/* Children typically contain the submit Button */}
      {children}
    </Column>
  );
}
