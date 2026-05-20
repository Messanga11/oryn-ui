/**
 * TablePage — Universal CRUD table page pattern.
 *
 * Headless core (TanStack Table, use-table-page hook) is unchanged from Messanga11/table-page.
 * UI layer replaced with @oryn/ui primitives (no <div>, <h1>, <table> HTML elements).
 *
 * NOTE: On React Native, this renders a card-based list layout.
 *       On web (react-native-web), it renders a proper table via Column/Row.
 */
import type { UseMutationResult } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { type ReactNode, useCallback, useMemo } from 'react';
import type { ModelMessages, ModelMessagesResolver } from './core/types';
import { unwrapResponse } from './core/types';
import { useTablePageConfig } from './core/table-page-context';
import { useTablePage } from './hooks/use-table-page';
import { Box } from '../../primitives/box';
import { Typography } from '../../primitives/typography';
import { Button } from '../../components/button';
import { AlertDialog } from '../../components/alert-dialog';
import { Sheet } from '../../components/sheet';
import { Input } from '../../components/input';
import { LoadingState } from '../../components/loading-state';
import { ErrorState } from '../../components/error-state';
import { EmptyState } from '../../components/empty-state';
import { Row } from '../../layout/row';
import { Column } from '../../layout/column';

export interface TablePageLabels {
  create?: string;
  save?: string;
  edit?: string;
  delete?: string;
  cancel?: string;
  noResults?: string;
  confirmDeleteTitle?: string;
  confirmDeleteDescription?: string;
  search?: string;
}

const defaultLabels: Required<TablePageLabels> = {
  create: 'Créer',
  save: 'Enregistrer',
  edit: 'Modifier',
  delete: 'Supprimer',
  cancel: 'Annuler',
  noResults: 'Aucun résultat',
  confirmDeleteTitle: 'Êtes-vous sûr ?',
  confirmDeleteDescription: 'Cette action est irréversible.',
  search: 'Rechercher...',
};

interface RawQueryResult {
  readonly data?: unknown;
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly error: unknown;
  readonly refetch: () => unknown;
}

// biome-ignore lint/suspicious/noExplicitAny: generic default
export interface TablePageProps<TData, TFormData = any> {
  title?: string;
  description?: string;
  query?: RawQueryResult;
  model?: string;
  modelMessages?: ModelMessages;
  getModelMessages?: ModelMessagesResolver;
  data?: TData[];
  columns: ColumnDef<TData, unknown>[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  showCreateButton?: boolean;
  createButtonLabel?: string;
  extraHeaderActions?: ReactNode;
  // biome-ignore lint/suspicious/noExplicitAny: flexible field config type
  formFields?: any[];
  formValidators?: unknown;
  createService?: UseMutationResult<unknown, Error, TFormData, unknown>;
  updateService?: UseMutationResult<unknown, Error, TFormData, unknown>;
  deleteService?: UseMutationResult<unknown, Error, { id: string }, unknown>;
  renderForm?: (props: {
    isEditMode: boolean;
    editingRow: TData | null;
    onSuccess: (result: unknown) => Promise<void>;
    onError: (error: unknown) => void;
  }) => ReactNode;
  onDelete?: (row: TData) => Promise<void>;
  formTitle?: string;
  editFormTitle?: string;
  onCreateSuccess?: (data: unknown) => void;
  onUpdateSuccess?: (data: unknown) => void;
  onDeleteSuccess?: () => void;
  onDeleteError?: (error: unknown) => void;
  onFormError?: (error: unknown) => void;
  labels?: TablePageLabels;
  /** Row render function (replaces column-based table on RN) */
  renderRow?: (item: TData) => ReactNode;
}

// biome-ignore lint/suspicious/noExplicitAny: generic default
export function TablePage<TData, TFormData = any>({
  title,
  description,
  query,
  model,
  modelMessages: modelMessagesProp,
  getModelMessages,
  data,
  columns: _columns,
  isLoading,
  isError,
  error,
  onRetry,
  searchValue,
  onSearchChange,
  showCreateButton = false,
  createButtonLabel,
  extraHeaderActions,
  formFields,
  formValidators,
  createService,
  updateService,
  deleteService,
  renderForm,
  onDelete,
  formTitle,
  editFormTitle,
  onCreateSuccess,
  onUpdateSuccess,
  onDeleteSuccess,
  onDeleteError,
  onFormError,
  labels: userLabels,
  renderRow,
}: TablePageProps<TData, TFormData>) {
  const globalConfig = useTablePageConfig();
  const labels = { ...defaultLabels, ...globalConfig.labels, ...userLabels };

  const FormBuilderComponent = globalConfig.formComponent;
  const resolvedFormValidators = formValidators ?? globalConfig.formValidators;

  const mm: ModelMessages = useMemo(() => {
    if (modelMessagesProp) return modelMessagesProp;
    if (model && getModelMessages) return getModelMessages(model);
    if (model && globalConfig.getModelMessages) return globalConfig.getModelMessages(model);
    return {};
  }, [modelMessagesProp, model, getModelMessages, globalConfig]);

  const hasFormBuilder = !!(formFields && FormBuilderComponent && (createService || updateService));
  const hasCustomForm = !!renderForm;

  const deleteHandler =
    onDelete ??
    (deleteService
      ? async (row: TData) => {
          const r = row as unknown as { id: string };
          await deleteService.mutateAsync({ id: r.id });
        }
      : undefined);

  const tablePage = useTablePage<TData>({
    onDelete: deleteHandler
      ? async (row) => {
          await deleteHandler(row);
          onDeleteSuccess?.();
          query?.refetch();
        }
      : undefined,
    onDeleteError,
    onCreateSuccess: (d) => {
      onCreateSuccess?.(d);
      query?.refetch();
    },
    onUpdateSuccess: (d) => {
      onUpdateSuccess?.(d);
      query?.refetch();
    },
    onFormError,
    hasEditForm: !!(hasFormBuilder ? updateService && formFields : hasCustomForm),
    labels: { edit: labels.edit, delete: labels.delete },
  });

  const handleFormSuccess = useCallback(
    async (result: unknown) => {
      await tablePage.handleFormSuccess(result);
    },
    [tablePage],
  );

  const unwrapped = unwrapResponse<TData>(query?.data as never);
  const resolvedData = unwrapped.data.length > 0 ? unwrapped.data : (data ?? []);
  const resolvedIsLoading = query?.isLoading ?? isLoading;
  const resolvedIsError = query?.isError ?? isError;

  const activeService = tablePage.isEditMode ? updateService : createService;
  const isPending = activeService?.isPending ?? false;

  const renderSheetForm = () => {
    if (hasFormBuilder && FormBuilderComponent && activeService) {
      return (
        <FormBuilderComponent
          key={tablePage.isEditMode ? 'edit' : 'create'}
          fields={formFields}
          onSubmit={(formData: unknown) => activeService.mutateAsync(formData as TFormData)}
          defaultValues={
            tablePage.isEditMode ? (tablePage.editingRow as Partial<TFormData>) : undefined
          }
          validators={resolvedFormValidators}
          onSuccess={handleFormSuccess}
          onError={tablePage.handleFormError}
        >
          <Button
            onPress={() => {/* FormBuilder submit is triggered via formRef */}}
            size="lg"
            loading={isPending}
            className="mt-4 w-full"
          >
            {tablePage.isEditMode ? labels.save : labels.create}
          </Button>
        </FormBuilderComponent>
      );
    }

    if (hasCustomForm) {
      return renderForm?.({
        isEditMode: tablePage.isEditMode,
        editingRow: tablePage.editingRow,
        onSuccess: handleFormSuccess,
        onError: tablePage.handleFormError,
      });
    }

    return null;
  };

  return (
    <Column className="flex-1">
      {/* Header */}
      <Row justify="between" align="center" className="mb-4">
        <Column>
          {(title ?? mm.pageTitle) ? (
            <Typography variant="h2">{title ?? mm.pageTitle}</Typography>
          ) : null}
          {description ? (
            <Typography variant="body-sm" color="secondary" className="mt-0.5">
              {description}
            </Typography>
          ) : null}
        </Column>
        <Row gap={8} align="center">
          {extraHeaderActions ?? null}
          {showCreateButton ? (
            <Button onPress={tablePage.openCreate} size="md">
              + {createButtonLabel ?? mm.createButtonLabel ?? labels.create}
            </Button>
          ) : null}
        </Row>
      </Row>

      {/* Search */}
      {onSearchChange ? (
        <Input
          value={searchValue}
          onChangeText={onSearchChange}
          placeholder={mm.searchPlaceholder ?? labels.search}
          className="mb-3"
        />
      ) : null}

      {/* Content */}
      {resolvedIsLoading ? (
        <LoadingState layout="list" />
      ) : resolvedIsError ? (
        <ErrorState
          message={error?.message}
          onRetry={query ? () => query.refetch() : onRetry}
        />
      ) : resolvedData.length === 0 ? (
        <EmptyState
          title={mm.emptyTitle ?? labels.noResults}
          {...(mm.emptyDescription !== undefined ? { description: mm.emptyDescription } : {})}
        />
      ) : renderRow ? (
        <Column gap={8}>
          {resolvedData.map((item, i) => (
            <Box key={i}>{renderRow(item)}</Box>
          ))}
        </Column>
      ) : (
        <Column gap={8}>
          {resolvedData.map((item, i) => (
            <Row
              key={i}
              justify="between"
              align="center"
              className="bg-bg-surface rounded-lg border border-bg-border px-4 py-3"
            >
              <Typography variant="body">Item {i + 1}</Typography>
              <Row gap={8}>
                {tablePage.actions.map((action) => (
                  <Button
                    key={action.label}
                    onPress={() => action.onClick(item)}
                    variant="ghost"
                    size="sm"
                  >
                    {action.label}
                  </Button>
                ))}
              </Row>
            </Row>
          ))}
        </Column>
      )}

      {/* Create/Edit Sheet */}
      {(hasFormBuilder || hasCustomForm) ? (
        <Sheet
          open={tablePage.sheetOpen}
          onClose={tablePage.closeSheet}
          title={
            tablePage.isEditMode
              ? (editFormTitle ?? mm.editTitle ?? labels.edit)
              : (formTitle ?? mm.createTitle ?? labels.create)
          }
          snapHeight={75}
        >
          {renderSheetForm()}
        </Sheet>
      ) : null}

      {/* Delete confirm */}
      {deleteHandler ? (
        <AlertDialog
          open={!!tablePage.deletingRow}
          onClose={tablePage.cancelDelete}
          title={mm.confirmDelete ?? labels.confirmDeleteTitle}
          description={mm.confirmDeleteDescription ?? labels.confirmDeleteDescription}
          confirmLabel={labels.delete}
          cancelLabel={labels.cancel}
          onConfirm={tablePage.confirmDelete}
          onCancel={tablePage.cancelDelete}
          variant="destructive"
          loading={deleteService?.isPending ?? false}
        />
      ) : null}
    </Column>
  );
}
