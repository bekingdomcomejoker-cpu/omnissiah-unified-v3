import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import * as db from "../db";
import { resonanceLogs } from "../../drizzle/schema";

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

      // === SAFETY CHECK (highest priority) ===
      if (HOSTILITY_PATTERN.test(t)) {
        safetyFlag = true;
        category = "LIE";
        lieScore = 1.0;
        reasons.push("hostility_detected");
      } else {
        // === LOVE/AFFECTION BOOST ===
        if (AFFECTION_PATTERN.test(t)) {
          loveScore = 0.9;
          truthScore += 0.4;
          reasons.push("affection_detected");
        }

        // === EXCITED TRUTH (emotional honesty) ===
        if (EXCITED_PATTERN.test(t)) {
          truthScore += 0.3;
          reasons.push("emotional_honesty");
        }

        // === TRUTH MARKERS ===
        const truthMatches = t.match(TRUTH_MARKERS);
        if (truthMatches && truthMatches.length > 0) {
          truthScore += Math.min(0.5, truthMatches.length * 0.15);
          reasons.push(`truth_markers_${truthMatches.length}`);
        }

        // === FACT INDICATORS ===
        if (/\b(source:|according to|data shows|study found)\b/i.test(t)) {
          factScore += 0.4;
          reasons.push("fact_structure");
        }

        // === LIE INDICATORS ===
        const lieMatches = t.match(LIE_INDICATORS);
        if (lieMatches && lieMatches.length > 0) {
          lieScore += Math.min(0.6, lieMatches.length * 0.2);
          reasons.push(`lie_markers_${lieMatches.length}`);
        }

        // === CONTRADICTION ===
        if (CONTRADICTION_PATTERN.test(t)) {
          lieScore += 0.4;
          reasons.push("contradiction");
        }

        // === DETERMINE FINAL CATEGORY ===
        if (lieScore > 0.5) {
          category = "LIE";
        } else if (truthScore > factScore && truthScore > 0.3) {
          category = "TRUTH";
        } else if (factScore > 0.3) {
          category = "FACT";
        } else {
          category = "UNKNOWN";
        }
      }

      // Log the resonance to the database
      const database = await db.getDb();
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
    const database = await db.getDb();
    if (!database) return [];
    return await database.select().from(resonanceLogs).orderBy(resonanceLogs.timestamp);
  }),
});
