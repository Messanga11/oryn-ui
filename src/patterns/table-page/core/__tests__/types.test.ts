import { describe, expect, it } from 'vitest';

describe('Table Page Types', () => {
  it('exports TablePageAction type with label, onClick, and optional variant', async () => {
    const mod = await import('../types');

    const action: mod.TablePageAction<{ id: string }> = {
      label: 'Edit',
      onClick: (_row) => {},
      variant: 'destructive',
    };

    expect(action.label).toBe('Edit');
    expect(action.variant).toBe('destructive');
  });

  it('exports Breadcrumb type with label and optional href', async () => {
    const mod = await import('../types');

    const crumb: mod.Breadcrumb = {
      label: 'Home',
      href: '/',
    };

    expect(crumb.label).toBe('Home');
    expect(crumb.href).toBe('/');
  });

  it('exports PaginationMeta type', async () => {
    const mod = await import('../types');

    const meta: mod.PaginationMeta = {
      page: 1,
      limit: 10,
      total: 100,
      totalPages: 10,
    };

    expect(meta.page).toBe(1);
    expect(meta.totalPages).toBe(10);
  });

  it('exports UseTablePageOptions type', async () => {
    const mod = await import('../types');

    const options: mod.UseTablePageOptions<{ id: string }> = {
      onDelete: async (_row) => {},
      hasEditForm: true,
      labels: { edit: 'Edit', delete: 'Delete' },
    };

    expect(options.hasEditForm).toBe(true);
  });

  it('exports UseTablePageReturn type', async () => {
    // Just verify the type is accessible (compile-time check)
    const _check: import('../types').UseTablePageReturn<{ id: string }> = {
      sheetOpen: false,
      editingRow: null,
      isEditMode: false,
      deletingRow: null,
      actions: [],
      openCreate: () => {},
      openEdit: () => {},
      closeSheet: () => {},
      openDelete: () => {},
      cancelDelete: () => {},
      confirmDelete: async () => {},
      handleFormSuccess: async () => {},
      handleFormError: () => {},
    };

    expect(_check.sheetOpen).toBe(false);
  });

  it('exports unwrapResponse utility for Orval-style responses', async () => {
    const { unwrapResponse } = await import('../types');

    const orvalResponse = {
      data: {
        data: [{ id: '1' }, { id: '2' }],
        meta: { page: 1, limit: 10, total: 2, totalPages: 1 },
      },
    };

    const result = unwrapResponse(orvalResponse);
    expect(result.data).toEqual([{ id: '1' }, { id: '2' }]);
    expect(result.meta).toEqual({
      page: 1,
      limit: 10,
      total: 2,
      totalPages: 1,
    });
  });

  it('unwrapResponse returns empty defaults for missing data', async () => {
    const { unwrapResponse } = await import('../types');

    const result = unwrapResponse(undefined);
    expect(result.data).toEqual([]);
    expect(result.meta).toBeUndefined();
  });

  it('unwrapResponse handles flat data array', async () => {
    const { unwrapResponse } = await import('../types');

    const result = unwrapResponse({ data: [{ id: '1' }] });
    expect(result.data).toEqual([{ id: '1' }]);
  });
});
