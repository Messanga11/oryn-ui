import { describe, expect, it, vi } from "vitest";

describe("Export Utilities", () => {
  it("exports formatExportData that extracts visible column data", async () => {
    const { formatExportData } = await import("../../export");

    const data = [
      { id: "1", name: "Product A", price: 100 },
      { id: "2", name: "Product B", price: 200 },
    ];

    const columns = [
      { id: "name", accessorKey: "name", header: "Name" },
      { id: "price", accessorKey: "price", header: "Price" },
    ];

    const result = formatExportData(data, columns as never);

    expect(result.headers).toEqual(["Name", "Price"]);
    expect(result.rows).toEqual([
      ["Product A", 100],
      ["Product B", 200],
    ]);
  });

  it("formatExportData skips columns without accessorKey", async () => {
    const { formatExportData } = await import("../../export");

    const data = [{ id: "1", name: "Test" }];

    const columns = [
      { id: "select" }, // selection column, no accessorKey
      { id: "name", accessorKey: "name", header: "Name" },
      { id: "actions" }, // actions column, no accessorKey
    ];

    const result = formatExportData(data, columns as never);

    expect(result.headers).toEqual(["Name"]);
    expect(result.rows).toEqual([["Test"]]);
  });

  it("formatExportData handles string header and function header", async () => {
    const { formatExportData } = await import("../../export");

    const data = [{ name: "Test" }];

    const columns = [
      { id: "name", accessorKey: "name", header: "Product Name" },
    ];

    const result = formatExportData(data, columns as never);
    expect(result.headers).toEqual(["Product Name"]);
  });

  it("formatExportData uses column id as fallback header", async () => {
    const { formatExportData } = await import("../../export");

    const data = [{ name: "Test" }];

    const columns = [
      { id: "name", accessorKey: "name" }, // no header prop
    ];

    const result = formatExportData(data, columns as never);
    expect(result.headers).toEqual(["name"]);
  });

  it("formatExportData handles nested accessorKey", async () => {
    const { formatExportData } = await import("../../export");

    const data = [{ user: { name: "John" } }];

    const columns = [
      { id: "userName", accessorKey: "user.name", header: "User" },
    ];

    const result = formatExportData(data, columns as never);
    expect(result.rows).toEqual([["John"]]);
  });
});
