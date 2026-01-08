import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { autonomousRouter } from "./routers/autonomous";
import { analyticsRouter } from "./routers/analytics";
import { deploymentRouter } from "./routers/deployment";
import { warfareRouter } from "./routers/warfare";
import { truthRouter } from "./routers/truth";
import { tteRouter } from "./routers/tte";
import { localAIRouter } from "./routers/local-ai";
import { trinodeOrchestratorRouter } from "./routers/trinode-orchestrator";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Omnissiah Engine v3.0 Unified Routers
  autonomous: autonomousRouter,
  analytics: analyticsRouter,
  deployment: deploymentRouter,
  warfare: warfareRouter,
  truth: truthRouter,
  tte: tteRouter,
  localAI: localAIRouter,
  trinodeOrchestrator: trinodeOrchestratorRouter,
});

export type AppRouter = typeof appRouter;
