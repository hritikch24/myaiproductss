import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.GYM_DATABASE_URL || process.env.DATABASE_URL,
});

export default pool;
