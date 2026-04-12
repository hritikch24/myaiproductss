import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Agent {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  system_prompt: string;
  personality_tone: string;
  icon: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AgentMessage {
  id: number;
  agent_id: number;
  session_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

// ─── Agent Queries ───────────────────────────────────────────────────────────

export async function getAllAgents(category?: string): Promise<Agent[]> {
  if (category && category !== "all") {
    const result = await pool.query(
      "SELECT * FROM agents WHERE active = true AND category = $1 ORDER BY category, name",
      [category]
    );
    return result.rows;
  }
  const result = await pool.query(
    "SELECT * FROM agents WHERE active = true ORDER BY category, name"
  );
  return result.rows;
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  const result = await pool.query("SELECT * FROM agents WHERE slug = $1", [
    slug,
  ]);
  return result.rows[0] || null;
}

export async function createAgent(
  agent: Omit<Agent, "id" | "created_at" | "updated_at">
): Promise<Agent> {
  const result = await pool.query(
    `INSERT INTO agents (name, slug, category, description, system_prompt, personality_tone, icon, active)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      agent.name,
      agent.slug,
      agent.category,
      agent.description,
      agent.system_prompt,
      agent.personality_tone,
      agent.icon,
      agent.active,
    ]
  );
  return result.rows[0];
}

export async function updateAgent(
  slug: string,
  updates: Partial<Omit<Agent, "id" | "created_at" | "updated_at">>
): Promise<Agent | null> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      fields.push(`${key} = $${idx}`);
      values.push(value);
      idx++;
    }
  }

  if (fields.length === 0) return getAgentBySlug(slug);

  fields.push(`updated_at = NOW()`);
  values.push(slug);

  const result = await pool.query(
    `UPDATE agents SET ${fields.join(", ")} WHERE slug = $${idx} RETURNING *`,
    values
  );
  return result.rows[0] || null;
}

export async function deleteAgent(slug: string): Promise<boolean> {
  const result = await pool.query("DELETE FROM agents WHERE slug = $1", [slug]);
  return (result.rowCount ?? 0) > 0;
}

// ─── Message Queries ─────────────────────────────────────────────────────────

export async function getMessages(
  agentId: number,
  sessionId: string,
  limit = 50
): Promise<AgentMessage[]> {
  const result = await pool.query(
    `SELECT * FROM agent_messages
     WHERE agent_id = $1 AND session_id = $2
     ORDER BY created_at ASC
     LIMIT $3`,
    [agentId, sessionId, limit]
  );
  return result.rows;
}

export async function saveMessage(
  agentId: number,
  sessionId: string,
  role: "user" | "assistant",
  content: string
): Promise<AgentMessage> {
  const result = await pool.query(
    `INSERT INTO agent_messages (agent_id, session_id, role, content)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [agentId, sessionId, role, content]
  );
  return result.rows[0];
}

export async function getCategories(): Promise<string[]> {
  const result = await pool.query(
    "SELECT DISTINCT category FROM agents WHERE active = true ORDER BY category"
  );
  return result.rows.map((r: { category: string }) => r.category);
}

export async function searchAgents(query: string): Promise<Agent[]> {
  const result = await pool.query(
    `SELECT * FROM agents
     WHERE active = true
       AND (name ILIKE $1 OR description ILIKE $1 OR category ILIKE $1)
     ORDER BY category, name
     LIMIT 50`,
    [`%${query}%`]
  );
  return result.rows;
}
