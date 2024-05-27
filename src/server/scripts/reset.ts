import * as dotenv from "dotenv";
import * as schema from "@/server/db/schema";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// helps the seeding script read from `.env`
// important for connecting to the database
dotenv.config();

const connector = neon(process.env.DATABASE_URL as string);

const db = drizzle(connector, { schema });

const main = async () => {
  try {
    console.log("🟠 Resetting database");

    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.courses);
    await db.delete(schema.challenges);
    await db.delete(schema.userProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    console.log("🟢 Resetting finished");
  } catch (error) {
    console.error(error);
    throw new Error("🔴 Failed to reset database");
  }
};

main();
