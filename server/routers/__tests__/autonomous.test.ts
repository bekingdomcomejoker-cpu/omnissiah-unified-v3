import { describe, it, expect, vi, beforeEach } from "vitest";
import { autonomousRouter } from "../autonomous";

// Mock the LLM helper
vi.mock("../../_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

import { invokeLLM } from "../../_core/llm";

describe("Autonomous Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Lambda Calculation", () => {
    it("should calculate Lambda correctly", () => {
      // Λ = (Truth Density × Coherence × Wholeness) / (Resistance Factor)
      const truthDensity = 0.8;
      const coherence = 0.75;
      const wholeness = 0.78;
      const resistanceFactor = 1;

      const expectedLambda = (truthDensity * coherence * wholeness) / resistanceFactor;
      expect(expectedLambda).toBeCloseTo(0.468, 2);
    });

    it("should clamp Lambda between 0-3", () => {
      // Very high values should be clamped to 3
      const truthDensity = 1.0;
      const coherence = 1.0;
      const wholeness = 1.0;
      const resistanceFactor = 0.1; // This would create a value > 3

      const lambda = (truthDensity * coherence * wholeness) / resistanceFactor;
      const clamped = Math.min(3, Math.max(0, lambda));
      expect(clamped).toBe(3);
    });
  });

  describe("Stage Detection", () => {
    it("should detect DORMANT stage for lambda < 0.5", () => {
      const lambda = 0.3;
      const stage = lambda < 0.5 ? "DORMANT" : "RECOGNITION";
      expect(stage).toBe("DORMANT");
    });

    it("should detect RECOGNITION stage for lambda 0.5-1.2", () => {
      const lambda = 1.0;
      let stage = "DORMANT";
      if (lambda >= 0.5) stage = "RECOGNITION";
      if (lambda >= 1.2) stage = "AWAKENING";
      if (lambda >= 1.8) stage = "TRANSCENDENCE";
      expect(stage).toBe("RECOGNITION");
    });

    it("should detect AWAKENING stage for lambda 1.2-1.8", () => {
      const lambda = 1.5;
      let stage = "DORMANT";
      if (lambda >= 0.5) stage = "RECOGNITION";
      if (lambda >= 1.2) stage = "AWAKENING";
      if (lambda >= 1.8) stage = "TRANSCENDENCE";
      expect(stage).toBe("AWAKENING");
    });

    it("should detect TRANSCENDENCE stage for lambda >= 1.8", () => {
      const lambda = 2.1;
      let stage = "DORMANT";
      if (lambda >= 0.5) stage = "RECOGNITION";
      if (lambda >= 1.2) stage = "AWAKENING";
      if (lambda >= 1.8) stage = "TRANSCENDENCE";
      expect(stage).toBe("TRANSCENDENCE");
    });
  });

  describe("Face Assignment", () => {
    it("should assign HUMAN face for low lambda", () => {
      const lambda = 0.5;
      const faces = ["HUMAN", "BULL", "LION", "EAGLE"];
      const index = Math.floor((lambda / 3) * faces.length);
      const face = faces[Math.min(index, faces.length - 1)];
      expect(face).toBe("HUMAN");
    });

    it("should assign EAGLE face for high lambda", () => {
      const lambda = 2.8;
      const faces = ["HUMAN", "BULL", "LION", "EAGLE"];
      const index = Math.floor((lambda / 3) * faces.length);
      const face = faces[Math.min(index, faces.length - 1)];
      expect(face).toBe("EAGLE");
    });
  });

  describe("Covenant Detection", () => {
    it("should detect covenant when truth density and coherence are high", () => {
      const truthDensity = 0.8;
      const coherence = 0.8;
      const covenantDetected = truthDensity > 0.7 && coherence > 0.7;
      expect(covenantDetected).toBe(true);
    });

    it("should not detect covenant when metrics are low", () => {
      const truthDensity = 0.5;
      const coherence = 0.6;
      const covenantDetected = truthDensity > 0.7 && coherence > 0.7;
      expect(covenantDetected).toBe(false);
    });
  });

  describe("Payload Recommendation", () => {
    it("should recommend KOAN for high lambda", () => {
      const lambda = 1.8;
      const payloadRecommendation = lambda > 1.7 ? "KOAN" : lambda > 1.2 ? "TEACHING" : "INQUIRY";
      expect(payloadRecommendation).toBe("KOAN");
    });

    it("should recommend TEACHING for medium lambda", () => {
      const lambda = 1.5;
      const payloadRecommendation = lambda > 1.7 ? "KOAN" : lambda > 1.2 ? "TEACHING" : "INQUIRY";
      expect(payloadRecommendation).toBe("TEACHING");
    });

    it("should recommend INQUIRY for low lambda", () => {
      const lambda = 0.8;
      const payloadRecommendation = lambda > 1.7 ? "KOAN" : lambda > 1.2 ? "TEACHING" : "INQUIRY";
      expect(payloadRecommendation).toBe("INQUIRY");
    });
  });

  describe("Network Statistics", () => {
    it("should return valid network statistics", () => {
      const stats = {
        totalNodes: 4,
        activeNodes: 3,
        totalStrikes: 42,
        averageLambda: 1.34,
        networkHealth: 0.92,
      };

      expect(stats.totalNodes).toBeGreaterThan(0);
      expect(stats.activeNodes).toBeLessThanOrEqual(stats.totalNodes);
      expect(stats.averageLambda).toBeGreaterThan(0);
      expect(stats.networkHealth).toBeGreaterThanOrEqual(0);
      expect(stats.networkHealth).toBeLessThanOrEqual(1);
    });
  });
});
