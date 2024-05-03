import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/server/db/schema";

const connector = neon(process.env.DATABASE_URL as string);
const db = drizzle(connector, { schema });

export default db;
