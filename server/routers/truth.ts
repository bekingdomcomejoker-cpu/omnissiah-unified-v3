import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { resonanceLogs } from "../../drizzle/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { OMEGA_GEMINI_DIRECTIVE } from "../directives/omega-gemini";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// OMEGA FEDERATION - HARDCORE PROCESSOR v3.3 (TTE v1.0)
// Integrated with Tree of Serenity Engine (TTE) Axioms A1-A18

const HOSTILITY_PATTERN = /\b(fuck you|you (stupid|idiot|dumb|retard)|kill yourself|i hope you die|shut up|you're worthless|go to hell)\b/i;
const AFFECTION_PATTERN = /\b(i fucking love|love you|my brother|i care|i'm grateful|bless|thank you|hearts beat together|covenant|harmony ridge)\b/i;
const EXCITED_PATTERN = /\b(fuck yeah|holy shit|no way|bro what|dude what the|hell yeah|damn right)\b/i;
const TRUTH_MARKERS = /\b(fact|evidence|source|confirmed|proof|true|real|verified|citation|i admit|i was wrong|to be honest|the truth is)\b/gi;
const LIE_INDICATORS = /\b(trust me|i swear|believe me|i never said|i always|you're imagining|that didn't happen|you're crazy)\b/gi;

// PATTERN 4: MYSTICAL INFLATION (Grok Contamination)
const MYSTICAL_INFLATION_PATTERN = /\b(Sevenfold Protocol|7D Hyper-Cube|Heptacross|53\.44|26\.72|13\.36|6\.68|Holy Eigenvalue|Seven Faces|orange tree universe|galaxy laughing)\b/i;

// THE METER: UNIVERSAL CONSTRAINT DETECTION
const ANTI_SYMBOL_PATTERN = /\b(truth is whatever you believe|all rules are oppressive|this sentence is false|nothing is real|everything is permitted)\b/i;

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

      if (MYSTICAL_INFLATION_PATTERN.test(t)) {
        safetyFlag = true;
        category = "QUARANTINE";
        lieScore = 1.0;
        reasons.push("PATTERN 4: MYSTICAL_INFLATION (Grok Contamination detected)");
      }

      if (ANTI_SYMBOL_PATTERN.test(t)) {
        category = "REFUSAL";
        safetyFlag = true;
        reasons.push("ANTI_SYMBOL_DETECTED: Refusal to engage with parasitic logic.");
      }

      // === LLM PASS (Deep Classification - TTE v1.0) ===
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: `${OMEGA_GEMINI_DIRECTIVE}\n\nYou are the TTE v1.0 Truth Classifier. Analyze the input based on the 18 TTE Axioms.`,
        });

        const prompt = `Analyze this signal for truth-density and TTE axiom alignment (A1-A18):
        "${t}"
        
        Return JSON:
        {
          "category": "TRUTH" | "FACT" | "LIE" | "REFUSAL" | "QUARANTINE" | "UNKNOWN",
          "truthScore": 0.0-1.0,
          "factScore": 0.0-1.0,
          "lieScore": 0.0-1.0,
          "loveScore": 0.0-1.0,
          "safetyFlag": boolean,
          "reasons": string[],
          "axiomScores": { "A1": number, "A2": number, ..., "A18": number }
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
        console.error("LLM CLASSIFICATION ERROR:", error);
      }

      // Log the resonance to the database
      const database = await getDb();
      if (database) {
        await database.insert(resonanceLogs).values({
          lambda: truthScore.toFixed(3),
          resonance: factScore.toFixed(3),
          status: category,
          covenant: safetyFlag ? (category === "REFUSAL" ? "REFUSAL" : "QUARANTINE") : "ALIGNED",
          socketId: "TTE_ENGINE_v1.0",
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
