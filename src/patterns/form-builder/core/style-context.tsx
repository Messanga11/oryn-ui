'use client';

import { type ReactNode, createContext, useContext } from 'react';

export interface FormBuilderStyle {
  /** className applied to the <form> element */
  readonly formClassName?: string;
  /** className applied to the fields container div */
  readonly fieldsContainerClassName?: string;
  /** className applied to each individual field wrapper div */
  readonly fieldWrapperClassName?: string;
  /** className applied to component-type field wrapper div */
  readonly componentWrapperClassName?: string;
}

const FormBuilderStyleContext = createContext<FormBuilderStyle>({});

export interface FormBuilderStyleProviderProps {
  readonly style: FormBuilderStyle;
  readonly children: ReactNode;
}

export function FormBuilderStyleProvider({ style, children }: FormBuilderStyleProviderProps) {
  const parent = useContext(FormBuilderStyleContext);
  const merged = { ...parent, ...style };

  return (
    <FormBuilderStyleContext.Provider value={merged}>{children}</FormBuilderStyleContext.Provider>
  );
}

export function useFormBuilderStyle(): FormBuilderStyle {
  return useContext(FormBuilderStyleContext);
}
