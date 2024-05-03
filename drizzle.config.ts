import type { Config } from "drizzle-kit";

export default {
  driver: "pg",
  schema: "./src/server/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  out: "./drizzle",
} satisfies Config;
