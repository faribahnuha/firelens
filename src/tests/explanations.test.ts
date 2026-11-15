import { describe, expect, it } from "vitest";
import type { FireLensMonth } from "../types/firelens";
import { historicalExplanation, monitoringPriority } from "../utils/explanations";

const month = { percentile: 100, anomaly_percent: 773.6 } as FireLensMonth;

describe("responder explanations", () => {
  it("flags a top-percentile historical month for priority review", () => {
    expect(monitoringPriority(month)).toBe("priority");
  });
  it("labels the evidence as historical rather than current", () => {
    expect(historicalExplanation(month)).toMatch(/historical replay, not a current/i);
  });
});
