export interface Breadcrumb {
  readonly label: string;
  readonly href?: string;
}

export interface ModelMessages {
  readonly pageTitle?: string;
  readonly searchPlaceholder?: string;
  readonly createButtonLabel?: string;
  readonly createTitle?: string;
  readonly createDescription?: string;
  readonly editTitle?: string;
  readonly editDescription?: string;
  readonly emptyTitle?: string;
  readonly emptyDescription?: string;
  readonly createSuccess?: string;
  readonly updateSuccess?: string;
  readonly deleteSuccess?: string;
  readonly createError?: string;
  readonly updateError?: string;
  readonly deleteError?: string;
  readonly confirmDelete?: string;
  readonly confirmDeleteDescription?: string;
}

export type ModelMessagesResolver = (model: string) => ModelMessages;

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TablePageAction<TData> {
  label: string;
  onClick: (row: TData) => void;
  variant?: 'default' | 'destructive';
}

export interface UseTablePageOptions<TData> {
  onDelete?: (row: TData) => Promise<void>;
  onDeleteError?: (error: unknown) => void;
  onCreateSuccess?: (data: unknown) => void;
  onUpdateSuccess?: (data: unknown) => void;
  onFormError?: (error: unknown) => void;
  hasEditForm?: boolean;
  extraActions?: TablePageAction<TData>[];
  labels?: {
    edit?: string;
    delete?: string;
  };
}

export interface UseTablePageReturn<TData> {
  sheetOpen: boolean;
  editingRow: TData | null;
  isEditMode: boolean;
  deletingRow: TData | null;
  actions: TablePageAction<TData>[];
  openCreate: () => void;
  openEdit: (row: TData) => void;
  closeSheet: () => void;
  openDelete: (row: TData) => void;
  cancelDelete: () => void;
  confirmDelete: () => Promise<void>;
  handleFormSuccess: (data: unknown) => Promise<void>;
  handleFormError: (error: unknown) => void;
}

interface OrvalResponse<TData> {
  data?:
    | {
        data?: TData[];
        meta?: PaginationMeta;
      }
    | TData[];
}

export interface UnwrappedResponse<TData> {
  data: TData[];
  meta?: PaginationMeta;
}

export function unwrapResponse<TData>(
  response: OrvalResponse<TData> | undefined,
): UnwrappedResponse<TData> {
  if (!response?.data) {
    return { data: [], meta: undefined };
  }

  // Flat array: { data: TData[] }
  if (Array.isArray(response.data)) {
    return { data: response.data, meta: undefined };
  }

  // Nested Orval: { data: { data: TData[], meta: PaginationMeta } }
  return {
    data: response.data.data ?? [],
    meta: response.data.meta,
  };
}
