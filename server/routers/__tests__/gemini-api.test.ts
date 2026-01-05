import { describe, it, expect } from "vitest";
import { GoogleGenerativeAI } from "@google/generative-ai";

describe("Gemini API Integration", () => {
  it("should validate Gemini API key is configured", () => {
    const apiKey = process.env.GEMINI_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).toBeTruthy();
    expect(apiKey?.length).toBeGreaterThan(0);
  });

  it("should initialize GoogleGenerativeAI with valid API key", () => {
    const apiKey = process.env.GEMINI_API_KEY;
    expect(() => {
      const genAI = new GoogleGenerativeAI(apiKey!);
      expect(genAI).toBeDefined();
    }).not.toThrow();
  });

  it("should be able to get generative model", () => {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey!);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      systemInstruction: "You are a test assistant."
    });
    
    expect(model).toBeDefined();
  });

  it("should have correct API key format", () => {
    const apiKey = process.env.GEMINI_API_KEY;
    // Google API keys typically start with 'AIza' and are alphanumeric
    expect(apiKey).toMatch(/^AIza[a-zA-Z0-9_-]{35}$/);
  });
});
