import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_STORAGE: z.enum(["in-memory", "local-storage"]),
  },
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((analyze) => analyze === "true"),
  },
  shared: {
    NODE_ENV: z.enum(["development", "production"]),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_STORAGE: process.env.NEXT_PUBLIC_STORAGE,
  },
});
