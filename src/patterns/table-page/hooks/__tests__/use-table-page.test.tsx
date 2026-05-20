import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('useTablePage', () => {
  it('manages sheet open/close state', async () => {
    const { useTablePage } = await import('../../index');

    const { result } = renderHook(() =>
      useTablePage({
        onDelete: vi.fn(),
      }),
    );

    expect(result.current.sheetOpen).toBe(false);

    act(() => result.current.openCreate());
    expect(result.current.sheetOpen).toBe(true);
    expect(result.current.editingRow).toBeNull();
    expect(result.current.isEditMode).toBe(false);

    act(() => result.current.closeSheet());
    expect(result.current.sheetOpen).toBe(false);
  });

  it('opens sheet in edit mode with row data', async () => {
    const { useTablePage } = await import('../../index');

    const row = { id: '1', name: 'Test' };

    const { result } = renderHook(() =>
      useTablePage({
        onDelete: vi.fn(),
      }),
    );

    act(() => result.current.openEdit(row));

    expect(result.current.sheetOpen).toBe(true);
    expect(result.current.editingRow).toBe(row);
    expect(result.current.isEditMode).toBe(true);
  });

  it('manages delete confirmation state', async () => {
    const { useTablePage } = await import('../../index');

    const row = { id: '1', name: 'Test' };

    const { result } = renderHook(() =>
      useTablePage({
        onDelete: vi.fn(),
      }),
    );

    expect(result.current.deletingRow).toBeNull();

    act(() => result.current.openDelete(row));
    expect(result.current.deletingRow).toBe(row);

    act(() => result.current.cancelDelete());
    expect(result.current.deletingRow).toBeNull();
  });

  it('calls onDelete and resets state on confirmDelete', async () => {
    const { useTablePage } = await import('../../index');

    const onDelete = vi.fn().mockResolvedValue(undefined);
    const row = { id: '1', name: 'Test' };

    const { result } = renderHook(() => useTablePage({ onDelete }));

    act(() => result.current.openDelete(row));

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(onDelete).toHaveBeenCalledWith(row);
    expect(result.current.deletingRow).toBeNull();
  });

  it('calls onDeleteError when delete fails', async () => {
    const { useTablePage } = await import('../../index');

    const error = new Error('Delete failed');
    const onDelete = vi.fn().mockRejectedValue(error);
    const onDeleteError = vi.fn();
    const row = { id: '1', name: 'Test' };

    const { result } = renderHook(() => useTablePage({ onDelete, onDeleteError }));

    act(() => result.current.openDelete(row));

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(onDeleteError).toHaveBeenCalledWith(error);
  });

  it('handles form success: calls onSuccess callback and closes sheet', async () => {
    const { useTablePage } = await import('../../index');

    const onCreateSuccess = vi.fn();

    const { result } = renderHook(() =>
      useTablePage({
        onDelete: vi.fn(),
        onCreateSuccess,
      }),
    );

    act(() => result.current.openCreate());

    await act(async () => {
      await result.current.handleFormSuccess({ id: '1' });
    });

    expect(onCreateSuccess).toHaveBeenCalledWith({ id: '1' });
    expect(result.current.sheetOpen).toBe(false);
  });

  it('calls onUpdateSuccess in edit mode', async () => {
    const { useTablePage } = await import('../../index');

    const onUpdateSuccess = vi.fn();

    const { result } = renderHook(() =>
      useTablePage({
        onDelete: vi.fn(),
        onUpdateSuccess,
      }),
    );

    act(() => result.current.openEdit({ id: '1' }));

    await act(async () => {
      await result.current.handleFormSuccess({ id: '1' });
    });

    expect(onUpdateSuccess).toHaveBeenCalledWith({ id: '1' });
    expect(result.current.sheetOpen).toBe(false);
  });

  it('handles form error via callback', async () => {
    const { useTablePage } = await import('../../index');

    const onFormError = vi.fn();
    const error = new Error('Save failed');

    const { result } = renderHook(() =>
      useTablePage({
        onDelete: vi.fn(),
        onFormError,
      }),
    );

    act(() => result.current.handleFormError(error));

    expect(onFormError).toHaveBeenCalledWith(error);
  });

  it('builds actions array with edit and delete when handlers are provided', async () => {
    const { useTablePage } = await import('../../index');

    const { result } = renderHook(() =>
      useTablePage({
        onDelete: vi.fn(),
        hasEditForm: true,
        labels: { edit: 'Modifier', delete: 'Supprimer' },
      }),
    );

    expect(result.current.actions).toHaveLength(2);
    expect(result.current.actions[0].label).toBe('Modifier');
    expect(result.current.actions[1].label).toBe('Supprimer');
    expect(result.current.actions[1].variant).toBe('destructive');
  });

  it('merges custom actions with built-in actions', async () => {
    const { useTablePage } = await import('../../index');

    const customActions = [{ label: 'View', onClick: vi.fn() }];

    const { result } = renderHook(() =>
      useTablePage({
        onDelete: vi.fn(),
        hasEditForm: true,
        extraActions: customActions,
        labels: { edit: 'Edit', delete: 'Delete' },
      }),
    );

    expect(result.current.actions).toHaveLength(3);
    expect(result.current.actions[2].label).toBe('View');
  });

  it('returns empty actions when no edit/delete handlers', async () => {
    const { useTablePage } = await import('../../index');

    const { result } = renderHook(() => useTablePage({}));

    expect(result.current.actions).toHaveLength(0);
  });
});
