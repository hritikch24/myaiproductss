import { NextRequest, NextResponse } from "next/server";
import { getAllAgents, createAgent, searchAgents, getCategories } from "@/lib/agents-db";

// GET /api/agents?category=Sports&search=cricket
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search");

    if (search) {
      const agents = await searchAgents(search);
      return NextResponse.json({ agents });
    }

    const [agents, categories] = await Promise.all([
      getAllAgents(category),
      getCategories(),
    ]);

    return NextResponse.json({ agents, categories });
  } catch (error) {
    console.error("GET /api/agents error:", error);
    return NextResponse.json(
      { error: "Failed to fetch agents" },
      { status: 500 }
    );
  }
}

// POST /api/agents — create a new agent (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, category, description, system_prompt, personality_tone, icon } = body;

    if (!name || !slug || !category || !description || !system_prompt) {
      return NextResponse.json(
        { error: "Missing required fields: name, slug, category, description, system_prompt" },
        { status: 400 }
      );
    }

    const agent = await createAgent({
      name,
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      category,
      description,
      system_prompt,
      personality_tone: personality_tone || "professional",
      icon: icon || "🤖",
      active: true,
    });

    return NextResponse.json({ agent }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/agents error:", error);
    const msg = error instanceof Error ? error.message : "Failed to create agent";
    if (msg.includes("duplicate key") || msg.includes("unique")) {
      return NextResponse.json(
        { error: "An agent with this slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
