import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { getLocalModelClient } from "../local-models";
import { getOrangeAlphabetDecoder } from "../orange-alphabet";
import { getPhaseLockSynchronizer } from "../phase-lock";
import { storeQuery, storeResponse, storeConsensus } from "../db-trinode";

const localModelClient = getLocalModelClient();
const orangeDecoder = getOrangeAlphabetDecoder();
const phaseLock = getPhaseLockSynchronizer();

export const localAIRouter = router({
  executeSequentialPipeline: publicProcedure
    .input(z.object({ query: z.string().min(1).max(1000) }))
    .mutation(async ({ input }: any) => {
      try {
        const queryResult = await storeQuery(1, input.query, "consensus");
        const queryId = (queryResult as any).insertId || 1;

        const qwenResponse = await localModelClient.executeQwen(input.query);
        await storeResponse(queryId, "reflex", qwenResponse.content, qwenResponse.lambda || 1.5, qwenResponse.duration);

        const oracleInput = `Original Query: ${input.query}\n\nQwen's Response: ${qwenResponse.content}`;
        const gemmaResponse = await localModelClient.executeGemma(oracleInput);
        await storeResponse(queryId, "oracle", gemmaResponse.content, gemmaResponse.lambda || 1.6, gemmaResponse.duration);

        const warfareInput = `Original Query: ${input.query}\n\nQwen's Response: ${qwenResponse.content}\n\nGemma's Analysis: ${gemmaResponse.content}`;
        const deepseekResponse = await localModelClient.executeDeepSeek(warfareInput);
        await storeResponse(queryId, "warfare", deepseekResponse.content, deepseekResponse.lambda || 1.7, deepseekResponse.duration);

        const consensusLambda = (qwenResponse.lambda || 1.5) * 0.2 + (gemmaResponse.lambda || 1.6) * 0.3 + (deepseekResponse.lambda || 1.7) * 0.5;
        const isAwakened = consensusLambda > 2.2;

        await storeConsensus(queryId, qwenResponse.content, gemmaResponse.content, deepseekResponse.content, `Consensus Lambda: ${consensusLambda.toFixed(4)}`, consensusLambda, isAwakened);

        return { success: true, queryId, pipeline: { qwen: qwenResponse, gemma: gemmaResponse, deepseek: deepseekResponse, consensus: { lambda: consensusLambda, isAwakened } } };
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
      }
    }),

  decodeWithOrangeAlphabet: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }: any) => {
      try {
        const encodings = orangeDecoder.decode(input.text);
        const patterns = orangeDecoder.analyzePatterns(input.text);
        const truthTest = orangeDecoder.compressionTruthTest(input.text);
        const lambda = orangeDecoder.calculateLambda(patterns);
        return { success: true, encodings, patterns, truthTest, lambda };
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
      }
    }),

  getPhaseLockStatus: publicProcedure.query(async () => {
    try { return { success: true, report: phaseLock.getReport() }; } catch (error) { return { success: false, error: error instanceof Error ? error.message : "Unknown error" }; }
  }),

  triggerSelfCorrection: publicProcedure.mutation(async () => {
    try { phaseLock.selfCorrect(); return { success: true, message: "Self-correction triggered", report: phaseLock.getReport() }; } catch (error) { return { success: false, error: error instanceof Error ? error.message : "Unknown error" }; }
  }),
});
