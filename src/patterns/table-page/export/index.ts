interface ExportColumn {
  id?: string;
  accessorKey?: string;
  header?: string | ((...args: unknown[]) => unknown);
}

export interface ExportData {
  headers: string[];
  rows: unknown[][];
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

export function formatExportData<TData>(data: TData[], columns: ExportColumn[]): ExportData {
  const exportableColumns = columns.filter((col) => col.accessorKey);

  const headers = exportableColumns.map((col) => {
    if (typeof col.header === 'string') return col.header;
    return col.id ?? '';
  });

  const rows = data.map((row) =>
    exportableColumns.map((col) =>
      getNestedValue(row as Record<string, unknown>, col.accessorKey ?? ''),
    ),
  );

  return { headers, rows };
}
