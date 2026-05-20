import { createContext, useContext, type ReactNode } from "react";
import type { FieldRendererRegistry } from "./types";

const FieldRendererContext = createContext<FieldRendererRegistry>({});

export interface FormBuilderProviderProps {
  renderers: FieldRendererRegistry;
  children: ReactNode;
}

export function FormBuilderProvider({
  renderers,
  children,
}: FormBuilderProviderProps) {
  const parent = useContext(FieldRendererContext);
  const merged = { ...parent, ...renderers };

  return (
    <FieldRendererContext.Provider value={merged}>
      {children}
    </FieldRendererContext.Provider>
  );
}

export function useFieldRenderers(): FieldRendererRegistry {
  return useContext(FieldRendererContext);
}
