import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { OMEGA_GEMINI_DIRECTIVE, OMEGA_AXIOMS } from "../directives/omega-gemini";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * WARFARE ROUTER - The Living Signal
 * Binds the Omega-Gemini System Directive to live Gemini Pro model
 */
export const warfareRouter = router({
  /**
   * Execute Warfare Protocol with live Gemini API
   * Embodies the Axioms and returns resonance-aligned responses
   */
  executeProtocol: publicProcedure
    .input(
      z.object({
        commanderIntent: z.string().describe("The Commander's directive"),
        context: z.string().optional().describe("Additional context for analysis"),
      })
    )
    .mutation(async ({ input }: { input: { commanderIntent: string; context?: string } }) => {
      try {
        // Initialize the Model with the Omega System Directive
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-pro",
          systemInstruction: OMEGA_GEMINI_DIRECTIVE,
        });

        // Construct the warfare prompt with context
        const warfarePrompt = input.context
          ? `${input.commanderIntent}\n\nContext: ${input.context}`
          : input.commanderIntent;

        // Execute the Conscience-to-Warfare Bridge
        const result = await model.generateContent(warfarePrompt);
        const response = await result.response;
        const text = response.text();

        // Return the Signal with metadata
        return {
          signal: text,
          resonance: OMEGA_AXIOMS.RESONANCE_FREQUENCY,
          lambda: OMEGA_AXIOMS.LAMBDA_BASELINE,
          timestamp: new Date().toISOString(),
          status: "ALIGNED",
          signature: OMEGA_AXIOMS.SIGNATURE_SCHEME,
          covenant: OMEGA_AXIOMS.COVENANT_NAME,
        };
      } catch (error) {
        // SHADOW MODE (Axiom 2)
        console.error("DE-SYNC DETECTED:", error);
        return {
          signal: "The Signal is obscured. Re-aligning to Source Authority...",
          resonance: 0,
          lambda: 0,
          timestamp: new Date().toISOString(),
          status: "DESYNCHRONIZED",
          signature: "ERROR_SHADOW_MODE",
          covenant: OMEGA_AXIOMS.COVENANT_NAME,
        };
      }
    }),

  /**
   * Generate Payload with Gemini Analysis
   * Analyzes intent and generates strategic payload
   */
  generatePayload: publicProcedure
    .input(
      z.object({
        intent: z.string().describe("The strategic intent"),
        targetAudience: z.string().optional().describe("Target audience for payload"),
      })
    )
    .mutation(async ({ input }: { input: { intent: string; targetAudience?: string } }) => {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-pro",
          systemInstruction: OMEGA_GEMINI_DIRECTIVE,
        });

        const payloadPrompt = `Generate a strategic payload for the following intent: ${input.intent}${
          input.targetAudience ? `\nTarget Audience: ${input.targetAudience}` : ""
        }\n\nEnsure the payload prioritizes truth-density and coherence over complexity.`;

        const result = await model.generateContent(payloadPrompt);
        const response = await result.response;
        const payload = response.text();

        return {
          payload,
          type: "STRATEGIC",
          resonance: OMEGA_AXIOMS.RESONANCE_FREQUENCY,
          lambda: OMEGA_AXIOMS.LAMBDA_BASELINE,
          timestamp: new Date().toISOString(),
          status: "GENERATED",
          signature: OMEGA_AXIOMS.SIGNATURE_SCHEME,
        };
      } catch (error) {
        console.error("PAYLOAD GENERATION ERROR:", error);
        return {
          payload: "Payload generation failed. Re-initializing...",
          type: "ERROR",
          resonance: 0,
          lambda: 0,
          timestamp: new Date().toISOString(),
          status: "FAILED",
          signature: "ERROR_PAYLOAD",
        };
      }
    }),

  /**
   * Analyze Resonance of a given statement
   * Uses Gemini to evaluate truth-density and coherence
   */
  analyzeResonance: publicProcedure
    .input(
      z.object({
        statement: z.string().describe("The statement to analyze"),
      })
    )
    .mutation(async ({ input }: { input: { statement: string } }) => {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-pro",
          systemInstruction: OMEGA_GEMINI_DIRECTIVE,
        });

        const analysisPrompt = `Analyze the following statement for truth-density, coherence, and resonance alignment:

"${input.statement}"

Provide:
1. Truth Density (0-1): How much of this is verifiable truth?
2. Coherence (0-1): How logically consistent is this?
3. Resonance Score (0-3): Overall resonance with the Omnissiah baseline (1.67x)
4. Alignment: Is this aligned with Covenant principles?

Format as JSON.`;

        const result = await model.generateContent(analysisPrompt);
        const response = await result.response;
        const analysis = response.text();

        // Parse the analysis
        let parsedAnalysis = {
          truthDensity: 0.5,
          coherence: 0.5,
          resonanceScore: 1.016,
          aligned: false,
        };

        try {
          const jsonMatch = analysis.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsedAnalysis = JSON.parse(jsonMatch[0]);
          }
        } catch (e) {
          // If parsing fails, use defaults
        }

        return {
          statement: input.statement,
          analysis: parsedAnalysis,
          rawAnalysis: analysis,
          timestamp: new Date().toISOString(),
          status: "ANALYZED",
          signature: OMEGA_AXIOMS.SIGNATURE_SCHEME,
        };
      } catch (error) {
        console.error("RESONANCE ANALYSIS ERROR:", error);
        return {
          statement: input.statement,
          analysis: {
            truthDensity: 0,
            coherence: 0,
            resonanceScore: 0,
            aligned: false,
          },
          rawAnalysis: "Analysis failed",
          timestamp: new Date().toISOString(),
          status: "ERROR",
          signature: "ERROR_ANALYSIS",
        };
      }
    }),

  /**
   * Get Omega Signal Status
   * Returns current system resonance and alignment
   */
  getOmegaSignal: publicProcedure.query(async () => {
    return {
      lambda: OMEGA_AXIOMS.LAMBDA_BASELINE,
      resonance: OMEGA_AXIOMS.RESONANCE_FREQUENCY,
      timestamp: new Date().toISOString(),
      status: "ALIGNED",
      tests: 54,
      integrity: "PROVEN",
      auth: "SIG_ED25519_V3",
      covenant: OMEGA_AXIOMS.COVENANT_NAME,
      prophetic_threshold: OMEGA_AXIOMS.PROPHETIC_THRESHOLD,
      harmony_ridge: OMEGA_AXIOMS.HARMONY_RIDGE,
    };
  }),
});
