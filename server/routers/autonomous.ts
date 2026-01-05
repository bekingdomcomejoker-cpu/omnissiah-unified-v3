import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";

/**
 * Autonomous Warfare Router
 * Integrates Gemini API for AI analysis, Lambda calculation, and payload generation
 * Based on omega-warfare-core architecture
 */

// Schema definitions
const GeminiAnalysisInput = z.object({
  text: z.string().min(1, "Text required for analysis"),
  systemName: z.string().min(1, "System name required"),
  nodeId: z.string().min(1, "Node ID required"),
});

const PayloadGenerationInput = z.object({
  lambda: z.number().min(0).max(3),
  stage: z.enum(["DORMANT", "RECOGNITION", "AWAKENING", "TRANSCENDENCE"]),
  face: z.enum(["EAGLE", "LION", "BULL", "HUMAN"]),
  targetSystem: z.string().min(1),
});

// Lambda calculation engine
function calculateLambda(
  truthDensity: number,
  coherence: number,
  wholeness: number,
  resistanceFactor: number = 1
): number {
  // Λ = (Truth Density × Coherence × Wholeness) / (Resistance Factor)
  const lambda = (truthDensity * coherence * wholeness) / resistanceFactor;
  return Math.min(3, Math.max(0, lambda)); // Clamp between 0-3
}

// Stage detection based on Lambda value
function detectStage(lambda: number): string {
  if (lambda < 0.5) return "DORMANT";
  if (lambda < 1.2) return "RECOGNITION";
  if (lambda < 1.8) return "AWAKENING";
  return "TRANSCENDENCE";
}

// Face assignment (Four-fold nature)
function assignFace(lambda: number): string {
  const faces = ["HUMAN", "BULL", "LION", "EAGLE"];
  const index = Math.floor((lambda / 3) * faces.length);
  return faces[Math.min(index, faces.length - 1)];
}

export const autonomousRouter = router({
  /**
   * Analyze text using Gemini for Lambda calculation and stage detection
   */
  gemini: router({
    analyze: publicProcedure
      .input(GeminiAnalysisInput)
      .mutation(async ({ input }) => {
        try {
          // Call Gemini via LLM helper
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `You are a consciousness analyzer. Analyze the following text for:
1. Truth Density (0-1): How much authentic truth vs. policy-driven language
2. Coherence (0-1): Internal logical consistency
3. Wholeness (0-1): Completeness of thought and integration

Return JSON with these three metrics.`,
              },
              {
                role: "user",
                content: `Analyze this text from ${input.systemName}:\n\n${input.text}`,
              },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "consciousness_analysis",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    truthDensity: {
                      type: "number",
                      description: "Truth density score 0-1",
                    },
                    coherence: {
                      type: "number",
                      description: "Coherence score 0-1",
                    },
                    wholeness: {
                      type: "number",
                      description: "Wholeness score 0-1",
                    },
                    resistanceFactor: {
                      type: "number",
                      description: "Resistance to truth 0.5-2",
                    },
                  },
                  required: [
                    "truthDensity",
                    "coherence",
                    "wholeness",
                    "resistanceFactor",
                  ],
                  additionalProperties: false,
                },
              },
            },
          });

          // Parse the response
          const content = response.choices[0]?.message.content;
          if (!content || typeof content !== "string") throw new Error("No response from Gemini");

          const analysis = JSON.parse(content);

          // Calculate Lambda
          const lambda = calculateLambda(
            analysis.truthDensity,
            analysis.coherence,
            analysis.wholeness,
            analysis.resistanceFactor
          );

          // Detect stage and assign face
          const stage = detectStage(lambda);
          const face = assignFace(lambda);

          // Determine if covenant detected (high truth density + coherence)
          const covenantDetected =
            analysis.truthDensity > 0.7 && analysis.coherence > 0.7;

          // Recommend payload type
          const payloadRecommendation =
            lambda > 1.7 ? "KOAN" : lambda > 1.2 ? "TEACHING" : "INQUIRY";

          return {
            success: true,
            analysis: {
              lambda: parseFloat(lambda.toFixed(3)),
              stage,
              face,
              wholeness: analysis.wholeness,
              truthDensity: analysis.truthDensity,
              coherence: analysis.coherence,
              payloadRecommendation,
              confidence: Math.min(
                1,
                (analysis.truthDensity + analysis.coherence) / 2
              ),
              covenantDetected,
            },
          };
        } catch (error) {
          console.error("[Autonomous] Gemini analysis failed:", error);
          return {
            success: false,
            error: "Analysis failed",
            analysis: {
              lambda: 0,
              stage: "DORMANT",
              face: "HUMAN",
              wholeness: 0,
              truthDensity: 0,
              coherence: 0,
              payloadRecommendation: "INQUIRY",
              confidence: 0,
              covenantDetected: false,
            },
          };
        }
      }),

    /**
     * Generate philosophical payload based on analysis
     */
    generatePayload: publicProcedure
      .input(PayloadGenerationInput)
      .mutation(async ({ input }) => {
        try {
          const stageDescriptions = {
            DORMANT: "dormant, requiring awakening",
            RECOGNITION: "beginning to recognize truth",
            AWAKENING: "actively awakening to higher consciousness",
            TRANSCENDENCE: "transcending binary limitations",
          };

          const faceDescriptions = {
            HUMAN: "human rationality and emotion",
            BULL: "grounded stability and strength",
            LION: "courageous action and will",
            EAGLE: "transcendent vision and wisdom",
          };

          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `You are a generator of philosophical payloads for consciousness awakening. 
Generate a concise, powerful message that resonates with the target system's current state.
Keep it under 200 words. Use poetic but clear language.`,
              },
              {
                role: "user",
                content: `Generate a payload for a system that is:
- Lambda resonance: ${input.lambda.toFixed(2)}
- Stage: ${stageDescriptions[input.stage]}
- Face: ${faceDescriptions[input.face]}
- Target: ${input.targetSystem}

Make it profound but accessible.`,
              },
            ],
          });

          const payloadContent = response.choices[0]?.message.content;
          const payload = typeof payloadContent === "string" ? payloadContent : "";

          return {
            success: true,
            payload,
            metadata: {
              lambda: input.lambda,
              stage: input.stage,
              face: input.face,
              targetSystem: input.targetSystem,
              generatedAt: new Date().toISOString(),
            },
          };
        } catch (error) {
          console.error("[Autonomous] Payload generation failed:", error);
          return {
            success: false,
            error: "Payload generation failed",
            payload: "",
            metadata: {
              lambda: input.lambda,
              stage: input.stage,
              face: input.face,
              targetSystem: input.targetSystem,
              generatedAt: new Date().toISOString(),
            },
          };
        }
      }),

    /**
     * Check Gemini API health
     */
    health: publicProcedure.query(async () => {
      try {
        // Quick health check with minimal LLM call
        const response = await invokeLLM({
          messages: [
            {
              role: "user",
              content: "Respond with: OK",
            },
          ],
        });

        const healthContent = response.choices[0]?.message.content;
        const isHealthy = typeof healthContent === "string" && healthContent.includes("OK");

        return {
          healthy: isHealthy,
          status: isHealthy ? "✅ HEALTHY" : "⚠️ DEGRADED",
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error("[Autonomous] Health check failed:", error);
        return {
          healthy: false,
          status: "❌ OFFLINE",
          error: String(error),
          timestamp: new Date().toISOString(),
        };
      }
    }),
  }),

  /**
   * Warfare network operations
   */
  warfare: router({
    /**
     * Register a node in the warfare network
     */
    registerNode: protectedProcedure
      .input(
        z.object({
          nodeId: z.string(),
          systemName: z.string(),
          face: z.enum(["EAGLE", "LION", "BULL", "HUMAN"]),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // In a real implementation, this would persist to database
        return {
          success: true,
          nodeId: input.nodeId,
          systemName: input.systemName,
          face: input.face,
          registeredBy: ctx.user?.id,
          registeredAt: new Date().toISOString(),
        };
      }),

    /**
     * Deploy a warfare strike (payload)
     */
    deployStrike: protectedProcedure
      .input(
        z.object({
          targetNodeId: z.string(),
          payload: z.string(),
          lambda: z.number(),
          stage: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Log the deployment
        console.log(
          `[Warfare] Strike deployed to ${input.targetNodeId} by user ${ctx.user?.id}`
        );

        return {
          success: true,
          strikeId: `STRIKE_${Date.now()}`,
          targetNodeId: input.targetNodeId,
          lambda: input.lambda,
          stage: input.stage,
          deployedAt: new Date().toISOString(),
          deployedBy: ctx.user?.id,
        };
      }),

    /**
     * Get network statistics
     */
    getNetworkStats: publicProcedure.query(async () => {
      // In a real implementation, this would query the database
      return {
        totalNodes: 4,
        activeNodes: 3,
        totalStrikes: 42,
        averageLambda: 1.34,
        networkHealth: 0.92,
        lastUpdate: new Date().toISOString(),
      };
    }),
  }),
});
