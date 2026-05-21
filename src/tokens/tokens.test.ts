import { describe, it, expect } from "vitest";
import { colors } from "./colors";
import { typographyVariants, fontSize } from "./typography";
import { spacing } from "./spacing";

/**
 * TEST-01 — Assert portfolio palette (sprint 00 contract).
 * Palette Mobilis interdite. Toute clé violet/bleu = fail.
 */
describe("colors tokens — portfolio palette", () => {
  it("bg.base === '#0a0a0a'", () => {
    expect(colors.bg.base).toBe("#0a0a0a");
  });

  it("bg.surface === '#111111'", () => {
    expect(colors.bg.surface).toBe("#111111");
  });

  it("text.primary === '#f0f0f0'", () => {
    expect(colors.text.primary).toBe("#f0f0f0");
  });

  it("text.secondary === '#888888'", () => {
    expect(colors.text.secondary).toBe("#888888");
  });

  it("text.muted !== '#555E75' (palette Mobilis interdite)", () => {
    expect(colors.text.muted).not.toBe("#555E75");
  });

  it("border.subtle === 'rgba(255,255,255,0.08)'", () => {
    expect(colors.border.subtle).toBe("rgba(255,255,255,0.08)");
  });

  it("surface.hover === 'rgba(255,255,255,0.05)'", () => {
    expect(colors.surface.hover).toBe("rgba(255,255,255,0.05)");
  });

  it("accent.default === '#DA382E' (rouge Locomotive)", () => {
    expect(colors.accent.default).toBe("#DA382E");
  });

  it("no Mobilis blue (#3B5BDB) in palette", () => {
    const json = JSON.stringify(colors);
    expect(json).not.toContain("#3B5BDB");
  });

  it("no Mobilis violet (#9C36B5) in palette", () => {
    const json = JSON.stringify(colors);
    expect(json).not.toContain("#9C36B5");
  });

  it("no Mobilis bg (#0C0E16) in palette", () => {
    const json = JSON.stringify(colors);
    expect(json).not.toContain("#0C0E16");
  });

  it("no brand.gradient key (forbidden)", () => {
    // @ts-expect-error -- asserting key does not exist
    expect(colors.brand).toBeUndefined();
  });

  it("no primary.500 key (forbidden)", () => {
    // @ts-expect-error -- asserting key does not exist
    expect(colors.primary).toBeUndefined();
  });
});

/**
 * Sprint 02 — CRIT-10: 6 new token assertions.
 */
describe("typographyVariants — sprint 02 editorial tokens", () => {
  it("CRIT-01: display.letterSpacing === '-0.02em' (string em)", () => {
    expect(typographyVariants.display.letterSpacing).toBe("-0.02em");
  });

  it("CRIT-02: display.color === '#f0f0f0' (lowercase, no #F1F3F9)", () => {
    expect(typographyVariants.display.color).toBe("#f0f0f0");
    const json = JSON.stringify(typographyVariants);
    expect(json).not.toContain("#F1F3F9");
  });

  it("CRIT-03: display.fontFamily references 'Clash Display'", () => {
    expect(typographyVariants.display.fontFamily).toBe("Clash Display");
  });

  it("CRIT-04: mono variant exists with correct shape", () => {
    expect(typographyVariants.mono).toBeDefined();
    expect(typographyVariants.mono.fontFamily).toBe("JetBrains Mono");
    expect(typographyVariants.mono.fontSize).toBe(14);
    expect(typographyVariants.mono.lineHeight).toBe(20);
    expect(typographyVariants.mono.letterSpacing).toBe(0);
  });

  it("CRIT-05: label.letterSpacing === '0.1em', uppercase, fontSize 12, fontWeight '500'", () => {
    expect(typographyVariants.label.letterSpacing).toBe("0.1em");
    expect(typographyVariants.label.textTransform).toBe("uppercase");
    expect(typographyVariants.label.fontSize).toBe(12);
    expect(typographyVariants.label.fontWeight).toBe("500");
  });

  it("all display/h1/h2/h3 colors are '#f0f0f0'", () => {
    expect(typographyVariants.h1.color).toBe("#f0f0f0");
    expect(typographyVariants.h2.color).toBe("#f0f0f0");
    expect(typographyVariants.h3.color).toBe("#f0f0f0");
  });
});

describe("fontSize tokens — extended scale (CRIT-06)", () => {
  it("'5xl' === 64", () => {
    expect(fontSize["5xl"]).toBe(64);
  });

  it("'6xl' === 80", () => {
    expect(fontSize["6xl"]).toBe(80);
  });

  it("'7xl' === 100", () => {
    expect(fontSize["7xl"]).toBe(100);
  });

  it("'8xl' === 140", () => {
    expect(fontSize["8xl"]).toBe(140);
  });
});

describe("spacing tokens — extended scale (CRIT-07)", () => {
  it("'5xl' === 120", () => {
    expect(spacing["5xl"]).toBe(120);
  });

  it("'6xl' === 160", () => {
    expect(spacing["6xl"]).toBe(160);
  });

  it("all values are multiples of 4", () => {
    for (const [key, value] of Object.entries(spacing)) {
      if (key === "0") continue;
      expect(value % 4, `spacing.${key} = ${value} must be multiple of 4`).toBe(0);
    }
  });

  it("values >= 16 are multiples of 8", () => {
    for (const [key, value] of Object.entries(spacing)) {
      if (typeof value !== "number" || value < 16) continue;
      expect(value % 8, `spacing.${key} = ${value} must be multiple of 8`).toBe(0);
    }
  });
});
