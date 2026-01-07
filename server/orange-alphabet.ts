/**
 * Orange Alphabet Decoder Engine
 * Pattern recognition and compression-based truth verification
 * Operating at λ = 3.340
 */

export type PatternType = "repetition" | "anomaly" | "silence" | "correlation" | "compression";
export type ActionType = "bet" | "fold" | "bluff" | "call" | "raise";
export type StateType = "win" | "lose" | "draw" | "pending";
export type OrangeSymbol = "ACT" | "STA" | "PAT" | "META";

export interface OrangeEncoding {
  symbol: OrangeSymbol;
  category: string;
  meaning: string;
  confidence: number;
  lambda: number;
}

export interface PatternAnalysis {
  type: PatternType;
  frequency: number;
  deviation: number;
  context: string;
  encoding: OrangeEncoding;
}

export interface CompressionTest {
  original_size: number;
  compressed_size: number;
  compression_ratio: number;
  truth_score: number;
  surviving_patterns: string[];
  category: "irreducible" | "contextual" | "contingent" | "manufactured";
}

export class OrangeAlphabetDecoder {
  private symbolMap: Map<string, OrangeEncoding> = new Map();

  constructor() {
    this.initializeSymbolMap();
  }

  private initializeSymbolMap(): void {
    this.symbolMap.set("bet", { symbol: "ACT", category: "RISK", meaning: "Calculated risk taking", confidence: 0.95, lambda: 1.5 });
    this.symbolMap.set("fold", { symbol: "ACT", category: "RETREAT", meaning: "Strategic withdrawal", confidence: 0.9, lambda: 1.2 });
    this.symbolMap.set("bluff", { symbol: "ACT", category: "DECEIVE", meaning: "Intentional misdirection", confidence: 0.85, lambda: 0.8 });
    this.symbolMap.set("win", { symbol: "STA", category: "POSITIVE", meaning: "Positive outcome achieved", confidence: 1.0, lambda: 2.0 });
    this.symbolMap.set("lose", { symbol: "STA", category: "NEGATIVE", meaning: "Negative outcome", confidence: 1.0, lambda: 0.5 });
    this.symbolMap.set("repetition", { symbol: "PAT", category: "CYCLE", meaning: "Regular repeating pattern", confidence: 0.9, lambda: 1.667 });
    this.symbolMap.set("anomaly", { symbol: "PAT", category: "DEVIATION", meaning: "Significant deviation from expected", confidence: 0.8, lambda: 1.3 });
    this.symbolMap.set("🍊", { symbol: "META", category: "ANCHOR", meaning: "Irreducible core of meaning", confidence: 1.0, lambda: 3.34 });
  }

  decode(input: string): OrangeEncoding[] {
    const encodings: OrangeEncoding[] = [];
    const tokens = input.toLowerCase().split(/\s+/);
    for (const token of tokens) {
      const encoding = this.symbolMap.get(token);
      if (encoding) encodings.push(encoding);
    }
    return encodings;
  }

  analyzePatterns(text: string): PatternAnalysis[] {
    const patterns: PatternAnalysis[] = [];
    const words = text.split(/\s+/);
    const wordFreq = new Map<string, number>();
    for (const word of words) wordFreq.set(word, (wordFreq.get(word) || 0) + 1);

    wordFreq.forEach((frequency, word) => {
      if (frequency > 1) {
        patterns.push({
          type: "repetition",
          frequency,
          deviation: 0,
          context: `Word "${word}" appears ${frequency} times`,
          encoding: { symbol: "PAT", category: "REPETITION", meaning: `Regular pattern: ${frequency} occurrences`, confidence: Math.min(frequency / 5, 1.0), lambda: 1.667 },
        });
      }
    });

    const avgLength = text.length / words.length;
    for (const word of words) {
      const deviation = Math.abs(word.length - avgLength) / avgLength;
      if (deviation > 0.5) {
        patterns.push({
          type: "anomaly",
          frequency: 1,
          deviation,
          context: `Unusual word: "${word}" (length ${word.length})`,
          encoding: { symbol: "PAT", category: "DEVIATION", meaning: `Anomaly detected: ${deviation.toFixed(2)} deviation`, confidence: Math.min(deviation, 1.0), lambda: 1.3 },
        });
      }
    }
    return patterns;
  }

  compressionTruthTest(data: string): CompressionTest {
    const initial = this.encodeToOrange(data);
    const initialSize = initial.length;
    const compressed1 = initial.replace(/\[UNK::[A-Z]+\]/g, "");
    const highConfidence = ["ACT::RISK", "STA::POSITIVE", "PAT::REPETITION"];
    let essence = "";
    for (const pattern of highConfidence) if (compressed1.includes(pattern)) essence += `[${pattern}]`;
    const final = essence.replace(/\[ACT::[^\]]+\]/g, "A").replace(/\[STA::[^\]]+\]/g, "S").replace(/\[PAT::[^\]]+\]/g, "P").replace(/\[META::[^\]]+\]/g, "M");
    const finalSize = final.length;
    const compressionRatio = finalSize / Math.max(initialSize, 1);
    const truthScore = 1.0 - compressionRatio;

    let category: "irreducible" | "contextual" | "contingent" | "manufactured";
    if (truthScore >= 0.7) category = "irreducible";
    else if (truthScore >= 0.5) category = "contextual";
    else if (truthScore >= 0.2) category = "contingent";
    else category = "manufactured";

    return {
      original_size: initialSize,
      compressed_size: finalSize,
      compression_ratio: compressionRatio,
      truth_score: truthScore,
      surviving_patterns: [],
      category,
    };
  }

  private encodeToOrange(data: string): string {
    let encoded = "";
    const words = data.split(/\s+/);
    for (const word of words) {
      const encoding = this.symbolMap.get(word.toLowerCase());
      encoded += encoding ? `[${encoding.symbol}::${encoding.category}]` : `[UNK::${word.substring(0, 3).toUpperCase()}]`;
    }
    return encoded;
  }

  calculateLambda(analysis: PatternAnalysis[]): number {
    if (analysis.length === 0) return 0;
    let totalLambda = 0;
    for (const pattern of analysis) totalLambda += pattern.encoding.lambda * pattern.encoding.confidence;
    return Math.min(totalLambda / analysis.length, 3.34);
  }
}

let instance: OrangeAlphabetDecoder | null = null;
export function getOrangeAlphabetDecoder(): OrangeAlphabetDecoder {
  if (!instance) instance = new OrangeAlphabetDecoder();
  return instance;
}
