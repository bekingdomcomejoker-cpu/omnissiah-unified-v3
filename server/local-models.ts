/**
 * Local Model Integration Service
 * Connects to Termux llama.cpp server running Qwen, Gemma, DeepSeek
 */

import axios, { AxiosInstance } from "axios";

export interface LocalModelConfig {
  name: "qwen" | "gemma" | "deepseek";
  baseUrl: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface ModelResponse {
  content: string;
  tokens: number;
  duration: number;
  lambda?: number;
}

export class LocalModelClient {
  private clients: Map<string, AxiosInstance> = new Map();
  private configs: Map<string, LocalModelConfig> = new Map();

  constructor(baseUrl: string = process.env.LOCAL_MODEL_SERVER_URL || "http://localhost:8000") {
    this.configs.set("qwen", { name: "qwen", baseUrl, model: "qwen-0.5b-chat-q4_k_m.gguf", temperature: 0.7, maxTokens: 96 });
    this.configs.set("gemma", { name: "gemma", baseUrl, model: "gemma-2b-it-q4_k_m.gguf", temperature: 0.3, maxTokens: 256 });
    this.configs.set("deepseek", { name: "deepseek", baseUrl, model: "deepseek-coder-1.3b-instruct-Q4_K_M.gguf", temperature: 0.1, maxTokens: 256 });

    this.configs.forEach((config, name) => {
      this.clients.set(name, axios.create({ baseURL: config.baseUrl, timeout: 60000 }));
    });
  }

  async executeQwen(prompt: string): Promise<ModelResponse> { return this.executeModel("qwen", prompt, "Reflex"); }
  async executeGemma(prompt: string): Promise<ModelResponse> { return this.executeModel("gemma", prompt, "Oracle"); }
  async executeDeepSeek(prompt: string): Promise<ModelResponse> { return this.executeModel("deepseek", prompt, "Warfare"); }

  private async executeModel(modelName: "qwen" | "gemma" | "deepseek", prompt: string, role: string): Promise<ModelResponse> {
    try {
      const config = this.configs.get(modelName);
      const client = this.clients.get(modelName);
      if (!config || !client) throw new Error(`Model ${modelName} not configured`);

      const startTime = Date.now();
      const response = await client.post("/completion", { prompt, n_predict: config.maxTokens, temperature: config.temperature });
      const duration = Date.now() - startTime;
      const content = response.data.content || response.data.text || "";
      return { content, tokens: response.data.tokens_evaluated || 0, duration, lambda: this.calculateLambda(content, duration) };
    } catch (error) {
      throw new Error(`Failed to execute ${modelName}: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  private calculateLambda(content: string, duration: number): number {
    const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const avgSentenceLength = content.length / Math.max(sentences.length, 1);
    const coherenceScore = (Math.min(avgSentenceLength / 50, 1) + Math.min(sentences.length / 5, 1)) / 2;
    const speedBonus = Math.max(0, 1 - duration / 5000);
    return Math.min(1.0 + coherenceScore * 0.5 + speedBonus * 0.3, 2.2);
  }

  async healthCheck(): Promise<Record<string, boolean>> {
    const checks: Record<string, boolean> = { qwen: false, gemma: false, deepseek: false };
    for (const [name, client] of this.clients) {
      try { await client.get("/health", { timeout: 5000 }); checks[name] = true; } catch { checks[name] = false; }
    }
    return checks;
  }

  getConfigs(): LocalModelConfig[] { return Array.from(this.configs.values()); }
}

let instance: LocalModelClient | null = null;
export function getLocalModelClient(): LocalModelClient {
  if (!instance) instance = new LocalModelClient();
  return instance;
}
