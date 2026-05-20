"use client";

import { createContext, useContext, type ReactNode } from "react";

export interface TablePageFormStyle {
	/** className applied to the form container inside the Sheet */
	readonly formContainerClassName?: string;
	/** className applied to the FormBuilder's <form> element */
	readonly formClassName?: string;
	/** className applied to the submit Button */
	readonly submitButtonClassName?: string;
	/** className applied to the SheetContent */
	readonly sheetContentClassName?: string;
	/** className applied to the SheetHeader */
	readonly sheetHeaderClassName?: string;
}

export interface TablePageConfig {
	/** Global form style overrides */
	readonly formStyle?: TablePageFormStyle;
	/** Default FormBuilder component — avoids passing formComponent on every TablePage */
	// biome-ignore lint/suspicious/noExplicitAny: accepts generic FormBuilder component
	readonly formComponent?: React.ComponentType<any>;
	/** Default model messages resolver */
	readonly getModelMessages?: (model: string) => Record<string, string | undefined>;
	/** Default form validators */
	readonly formValidators?: unknown;
	/** Default labels (merged with per-instance labels) */
	readonly labels?: Record<string, string>;
}

const TablePageContext = createContext<TablePageConfig | null>(null);

export interface TablePageProviderProps {
	readonly config: TablePageConfig;
	readonly children: ReactNode;
}

export function TablePageProvider({ config, children }: TablePageProviderProps) {
	return (
		<TablePageContext.Provider value={config}>
			{children}
		</TablePageContext.Provider>
	);
}

export function useTablePageConfig(): TablePageConfig {
	return useContext(TablePageContext) ?? {};
}
