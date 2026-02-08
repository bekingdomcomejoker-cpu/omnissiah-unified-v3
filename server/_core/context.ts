import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export function createContext({ req, res }: CreateExpressContextOptions) {
  return {
    req,
    res,
    user: null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
