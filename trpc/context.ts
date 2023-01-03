import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { PrismaClient } from "@prisma/client";

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  return {
    db: new PrismaClient(),
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
