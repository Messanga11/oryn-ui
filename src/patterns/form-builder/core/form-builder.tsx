import { useForm } from "@tanstack/react-form";
import type { ReactNode, RefObject } from "react";
import { useImperativeHandle, useMemo } from "react";
import type { z } from "zod";
import { useFieldRenderers } from "./context";
import { useFormBuilderStyle } from "./style-context";
import type { FormBuilderStyle } from "./style-context";
import type { FieldConfig, FieldType } from "./types";
import { cn } from "../lib/utils";
import { extractFiles } from "../utils/file-handling";

export interface FormFieldConfig<
  TFormData,
  Name extends keyof TFormData = keyof TFormData,
> {
  name: Name;
  label?: string;
  type: FieldType | string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  optional?: boolean;
  props?: FieldConfig["props"];
  options?: readonly { readonly label: string; readonly value: string }[];
  fetchOptions?: (
    search: string,
  ) => Promise<{ label: string; value: string }[]>;
  debounceMs?: number;
  noResultsText?: string;
  loadingText?: string;
  accept?: string;
  maxFiles?: number;
  maxSizeBytes?: number;
  multiple?: boolean;
  component?: ReactNode;
  validation?: (validators: unknown) => z.ZodType<TFormData[Name]>;
  /** Number of grid columns this field should span */
  colSpan?: number;
}

export interface FormBuilderHandle {
  /** Trigger form validation and submission */
  submit: () => void;
  /** Reset form to default values */
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
  /** HTML id attribute for the form element */
  id?: string;
  /** Ref exposing the form handle (submit, reset, getFormApi) */
  formRef?: RefObject<FormBuilderHandle | null>;
  /** Per-instance style overrides (merged with FormBuilderStyleProvider) */
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
  id: idProp,
  formRef,
  formStyle: formStyleProp,
}: Readonly<FormBuilderProps<TFormData, TValidators>>) {
  const renderers = useFieldRenderers();
  const globalStyle = useFormBuilderStyle();
  const style = useMemo(
    () => ({ ...globalStyle, ...formStyleProp }),
    [globalStyle, formStyleProp],
  );

  const generatedId = useMemo(() => crypto.randomUUID(), []);
  const formId = idProp ?? generatedId;

  // Flatten nested row arrays into a single list for validation & file handling
  const flatFields = useMemo(
    () => fields.flatMap((f) => (Array.isArray(f) ? f : [f])),
    [fields],
  );

  const fileFieldNames = useMemo(
    () =>
      new Set(
        flatFields.filter((f) => f.type === "file").map((f) => String(f.name)),
      ),
    [flatFields],
  );

  // Build field-level zod validators
  const fieldValidators = useMemo(() => {
    const map = new Map<string, z.ZodType<unknown>>();
    for (const field of flatFields) {
      if (field.type === "component") continue;
      const zodSchema = field.validation?.(validators);
      if (!zodSchema) continue;
      map.set(String(field.name), zodSchema);
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

  useImperativeHandle(formRef, () => ({
    submit: () => {
      void form.validateAllFields("submit");
      void form.handleSubmit();
    },
    reset: () => form.reset(),
  }), [form]);

  function renderField(fieldConfig: FormFieldConfig<TFormData>) {
    const colStyle = fieldConfig.colSpan
      ? { gridColumn: `span ${fieldConfig.colSpan}` }
      : undefined;

    if (fieldConfig.type === "component") {
      return (
        <div
          key={`${formId}-${String(fieldConfig.name)}`}
          className={style.componentWrapperClassName}
          style={colStyle}
        >
          {fieldConfig.component}
        </div>
      );
    }

    const Renderer = renderers[fieldConfig.type as FieldType];
    const zodSchema = fieldValidators.get(String(fieldConfig.name));

    const validate = zodSchema
      ? (value: unknown) => {
          const result = zodSchema.safeParse(value);
          if (!result.success) {
            return result.error.issues[0]?.message;
          }
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
            fieldApi: {
              state: { meta: { isTouched: boolean } };
            };
          }) => {
            if (!fieldApi.state.meta.isTouched) return undefined;
            return validate(value);
          },
          onSubmit: ({ value }: { value: unknown }) => validate(value),
        }
      : undefined;

    return (
      <form.Field
        key={`${formId}-${String(fieldConfig.name)}`}
        name={fieldConfig.name as never}
        validators={fieldValidator as never}
      >
        {(field) =>
          Renderer ? (
            style.fieldWrapperClassName ? (
              <div className={style.fieldWrapperClassName} style={colStyle}>
                <Renderer
                  field={field as never}
                  config={fieldConfig as never}
                />
              </div>
            ) : colStyle ? (
              <div style={colStyle}>
                <Renderer
                  field={field as never}
                  config={fieldConfig as never}
                />
              </div>
            ) : (
              <Renderer
                field={field as never}
                config={fieldConfig as never}
              />
            )
          ) : null
        }
      </form.Field>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.validateAllFields("submit");
        void form.handleSubmit();
      }}
      className={cn(style.formClassName, className)}
    >
      <div className={cn("flex flex-col gap-4", style.fieldsContainerClassName)}>
        {fields.map((fieldOrRow) => {
          // Row grouping: if the entry is an array, render fields side-by-side
          if (Array.isArray(fieldOrRow)) {
            const rowKey = fieldOrRow.map((f) => String(f.name)).join("-");
            return (
              <div
                key={`${formId}-row-${rowKey}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${fieldOrRow.length}, minmax(0, 1fr))`,
                  gap: "1rem",
                }}
              >
                {fieldOrRow.map((fieldConfig) =>
                  renderField(fieldConfig),
                )}
              </div>
            );
          }

          return renderField(fieldOrRow);
        })}
      </div>
      {children}
    </form>
  );
}
