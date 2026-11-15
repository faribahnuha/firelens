import { describe, expect, it } from "vitest";
import { cividisColor, readableTextColor } from "../utils/colorScale";

describe("cividisColor", () => {
  it("clamps values below and above the scale", () => {
    expect(cividisColor(-10, 0, 100)).toBe(cividisColor(0, 0, 100));
    expect(cividisColor(200, 0, 100)).toBe(cividisColor(100, 0, 100));
  });

  it("returns a valid hex color for a constant range", () => {
    expect(cividisColor(5, 5, 5)).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("selects contrasting text colors", () => {
    expect(readableTextColor("#00204c")).toBe("#f4f7f6");
    expect(readableTextColor("#fee838")).toBe("#06151e");
  });
});
