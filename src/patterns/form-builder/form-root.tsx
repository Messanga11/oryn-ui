/**
 * Native FormRoot: renders a <Column> since React Native has no <form> concept.
 * Submit is triggered via the formRef.submit() imperative API.
 */
import type { ReactNode } from 'react';
import { Column } from '../../layout/column';

export interface FormRootProps {
  onSubmit: () => void;
  className?: string;
  children: ReactNode;
}

export function FormRoot({ className, children }: FormRootProps) {
  return <Column className={className}>{children}</Column>;
}
