import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.KRAFTAI_DATABASE_URL || process.env.PADHAI_DATABASE_URL,
});

export default pool;
