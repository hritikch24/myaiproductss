import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.PADHAI_DATABASE_URL,
});

export default pool;
