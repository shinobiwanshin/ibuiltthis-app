import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

if (!process.env.DATABASE_URL) {
  throw new Error("Please provide a database URL");
}

export default db;
