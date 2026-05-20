import { useCallback, useMemo, useState } from "react";
import type {
  TablePageAction,
  UseTablePageOptions,
  UseTablePageReturn,
} from "../core/types";

export function useTablePage<TData>(
  options: UseTablePageOptions<TData>,
): UseTablePageReturn<TData> {
  const {
    onDelete,
    onDeleteError,
    onCreateSuccess,
    onUpdateSuccess,
    onFormError,
    hasEditForm,
    extraActions,
    labels,
  } = options;

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<TData | null>(null);
  const [deletingRow, setDeletingRow] = useState<TData | null>(null);

  const isEditMode = editingRow !== null;

  const openCreate = useCallback(() => {
    setEditingRow(null);
    setSheetOpen(true);
  }, []);

  const openEdit = useCallback((row: TData) => {
    setEditingRow(row);
    setSheetOpen(true);
  }, []);

  const closeSheet = useCallback(() => {
    setSheetOpen(false);
    setEditingRow(null);
  }, []);

  const openDelete = useCallback((row: TData) => {
    setDeletingRow(row);
  }, []);

  const cancelDelete = useCallback(() => {
    setDeletingRow(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deletingRow || !onDelete) return;
    try {
      await onDelete(deletingRow);
      setDeletingRow(null);
    } catch (err) {
      onDeleteError?.(err);
    }
  }, [deletingRow, onDelete, onDeleteError]);

  const handleFormSuccess = useCallback(
    async (data: unknown) => {
      if (isEditMode) {
        onUpdateSuccess?.(data);
      } else {
        onCreateSuccess?.(data);
      }
      setSheetOpen(false);
      setEditingRow(null);
    },
    [isEditMode, onCreateSuccess, onUpdateSuccess],
  );

  const handleFormError = useCallback(
    (error: unknown) => {
      onFormError?.(error);
    },
    [onFormError],
  );

  const actions = useMemo(() => {
    const built: TablePageAction<TData>[] = [];

    if (hasEditForm) {
      built.push({
        label: labels?.edit ?? "Edit",
        onClick: openEdit,
      });
    }

    if (onDelete) {
      built.push({
        label: labels?.delete ?? "Delete",
        onClick: openDelete,
        variant: "destructive",
      });
    }

    if (extraActions) {
      built.push(...extraActions);
    }

    return built;
  }, [hasEditForm, onDelete, extraActions, labels, openEdit, openDelete]);

  return {
    sheetOpen,
    editingRow,
    isEditMode,
    deletingRow,
    actions,
    openCreate,
    openEdit,
    closeSheet,
    openDelete,
    cancelDelete,
    confirmDelete,
    handleFormSuccess,
    handleFormError,
  };
}
