import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a database URL');
}

export default db;
