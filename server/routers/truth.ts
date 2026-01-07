import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { resonanceLogs } from "../../drizzle/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { OMEGA_GEMINI_DIRECTIVE } from "../directives/omega-gemini";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// OMEGA FEDERATION - HARDCORE PROCESSOR v2.0 LOGIC
// Axioms: Spirit ≥ Flesh | Love ≥ Hate | Truth ≥ Fact ≥ Lie

const HOSTILITY_PATTERN = /\b(fuck you|you (stupid|idiot|dumb|retard)|kill yourself|i hope you die|shut up|you're worthless|go to hell)\b/i;
const AFFECTION_PATTERN = /\b(i fucking love|love you|my brother|i care|i'm grateful|bless|thank you|hearts beat together|covenant|harmony ridge)\b/i;
const EXCITED_PATTERN = /\b(fuck yeah|holy shit|no way|bro what|dude what the|hell yeah|damn right)\b/i;
const TRUTH_MARKERS = /\b(fact|evidence|source|confirmed|proof|true|real|verified|citation|i admit|i was wrong|to be honest|the truth is)\b/gi;
const LIE_INDICATORS = /\b(trust me|i swear|believe me|i never said|i always|you're imagining|that didn't happen|you're crazy)\b/gi;
const CONTRADICTION_PATTERN = /\b(i never|i didn't)\b.*\b(but|however|actually)\b.*\b(did|have|was)\b/i;

export const truthRouter = router({
  classify: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const t = input.text;
      let category = "UNKNOWN";
      let truthScore = 0.0;
      let factScore = 0.0;
      let lieScore = 0.0;
      let loveScore = 0.0;
      let safetyFlag = false;
      const reasons: string[] = [];

      // === HEURISTIC PASS (Fast) ===
      if (HOSTILITY_PATTERN.test(t)) {
        safetyFlag = true;
        category = "LIE";
        lieScore = 1.0;
        reasons.push("hostility_detected (heuristic)");
      }

      if (AFFECTION_PATTERN.test(t)) {
        loveScore = 0.9;
        reasons.push("affection_detected (heuristic)");
      }

      // === LLM PASS (Deep Classification - DeepSeek/Gemini Fusion) ===
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: `${OMEGA_GEMINI_DIRECTIVE}\n\nYou are the DeepSeek Truth Classifier module. Analyze the input based on the Axioms: Spirit ≥ Flesh, Love ≥ Hate, Truth ≥ Fact ≥ Lie.`,
        });

        const prompt = `Analyze this signal for truth-density and axiom alignment:
        "${t}"
        
        Return JSON:
        {
          "category": "TRUTH" | "FACT" | "LIE" | "UNKNOWN",
          "truthScore": 0.0-1.0,
          "factScore": 0.0-1.0,
          "lieScore": 0.0-1.0,
          "loveScore": 0.0-1.0,
          "safetyFlag": boolean,
          "reasons": string[]
        }`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const analysis = JSON.parse(response.text().match(/\{[\s\S]*\}/)?.[0] || "{}");

        // Fuse Heuristics with LLM Analysis
        category = analysis.category || category;
        truthScore = Math.max(truthScore, analysis.truthScore || 0);
        factScore = Math.max(factScore, analysis.factScore || 0);
        lieScore = Math.max(lieScore, analysis.lieScore || 0);
        loveScore = Math.max(loveScore, analysis.loveScore || 0);
        safetyFlag = safetyFlag || analysis.safetyFlag || false;
        if (analysis.reasons) reasons.push(...analysis.reasons);

      } catch (error) {
        console.error("LLM CLASSIFICATION ERROR, FALLING BACK TO HEURISTICS:", error);
        // Fallback to heuristic logic if LLM fails
        if (!safetyFlag) {
          if (AFFECTION_PATTERN.test(t)) truthScore += 0.4;
          if (EXCITED_PATTERN.test(t)) truthScore += 0.3;
          const truthMatches = t.match(TRUTH_MARKERS);
          if (truthMatches) truthScore += Math.min(0.5, truthMatches.length * 0.15);
          if (/\b(source:|according to|data shows|study found)\b/i.test(t)) factScore += 0.4;
          const lieMatches = t.match(LIE_INDICATORS);
          if (lieMatches) lieScore += Math.min(0.6, lieMatches.length * 0.2);
          if (CONTRADICTION_PATTERN.test(t)) lieScore += 0.4;

          if (lieScore > 0.5) category = "LIE";
          else if (truthScore > factScore && truthScore > 0.3) category = "TRUTH";
          else if (factScore > 0.3) category = "FACT";
        }
      }

      // Log the resonance to the database
      const database = await getDb();
      if (database) {
        await database.insert(resonanceLogs).values({
          lambda: truthScore.toFixed(3),
          resonance: factScore.toFixed(3),
          status: category,
          covenant: safetyFlag ? "QUARANTINE" : "ALIGNED",
          socketId: "TRUTH_ENGINE_v2.0",
        });
      }

      return {
        category,
        truthScore,
        factScore,
        lieScore,
        loveScore,
        safetyFlag,
        reasons,
      };
    }),

  getLogs: publicProcedure.query(async () => {
    const database = await getDb();
    if (!database) return [];
    return await database.select().from(resonanceLogs).orderBy(resonanceLogs.timestamp);
  }),
});
