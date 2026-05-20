interface ExistingImage {
  id: string;
  url: string;
}

export interface ExtractFilesResult {
  cleanedData: Record<string, unknown>;
  files?: Record<string, File[]>;
  fileOrders?: Record<string, string[]>;
}

export function extractFiles(
  raw: Record<string, unknown>,
  fileFieldNames: Set<string>,
): ExtractFilesResult {
  const cleaned: Record<string, unknown> = {};
  const collectedFiles: Record<string, File[]> = {};
  const collectedFileOrders: Record<string, string[]> = {};

  for (const key of Object.keys(raw)) {
    if (fileFieldNames.has(key)) {
      const items = raw[key];
      if (Array.isArray(items)) {
        const actualFiles: File[] = [];
        const existingIds: string[] = [];
        const fullOrder: string[] = [];

        for (const item of items) {
          if (item instanceof File) {
            fullOrder.push(`__new_${actualFiles.length}__`);
            actualFiles.push(item);
          } else if (
            item !== null &&
            typeof item === "object" &&
            "id" in item
          ) {
            const id = (item as ExistingImage).id;
            fullOrder.push(id);
            existingIds.push(id);
          }
        }

        if (actualFiles.length > 0) {
          collectedFiles[key] = actualFiles;
        }
        if (existingIds.length > 0) {
          cleaned[`${key}Order`] = existingIds;
        }
        if (actualFiles.length > 0 && existingIds.length > 0) {
          collectedFileOrders[key] = fullOrder;
        }
      }
      continue;
    }
    if (raw[key] === "" || raw[key] === undefined) continue;
    cleaned[key] = raw[key];
  }

  const hasFiles = Object.keys(collectedFiles).length > 0;
  const hasFileOrders = Object.keys(collectedFileOrders).length > 0;

  return {
    cleanedData: cleaned,
    files: hasFiles ? collectedFiles : undefined,
    fileOrders: hasFileOrders ? collectedFileOrders : undefined,
  };
}
