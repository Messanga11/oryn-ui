/**
 * Web-specific FormRoot: renders a semantic <form> element so that
 * <button type="submit"> children trigger HTML form submission.
 */
import type { ReactNode } from 'react';

export interface FormRootProps {
  onSubmit: () => void;
  className?: string;
  children: ReactNode;
}

export function FormRoot({ onSubmit, className, children }: FormRootProps) {
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
}
