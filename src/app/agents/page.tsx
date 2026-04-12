"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, Bot, ArrowRight, Sparkles, Zap } from "lucide-react";

interface Agent {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  icon: string;
  personality_tone: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Sports: "from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30",
  Fitness: "from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30",
  Legal: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30",
  Finance: "from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30",
  "Government Schemes": "from-purple-500/20 to-violet-500/20 text-purple-400 border-purple-500/30",
  Tech: "from-cyan-500/20 to-teal-500/20 text-cyan-400 border-cyan-500/30",
  Career: "from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30",
  Education: "from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/30",
  "Mental Health": "from-teal-500/20 to-green-500/20 text-teal-400 border-teal-500/30",
  Business: "from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30",
};

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  Sports: "bg-green-500/15 text-green-400 border-green-500/30",
  Fitness: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Legal: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Finance: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  "Government Schemes": "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Tech: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  Career: "bg-pink-500/15 text-pink-400 border-pink-500/30",
  Education: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  "Mental Health": "bg-teal-500/15 text-teal-400 border-teal-500/30",
  Business: "bg-violet-500/15 text-violet-400 border-violet-500/30",
};

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  async function fetchAgents(retries = 2) {
    try {
      const res = await fetch("/api/agents");
      if (!res.ok) {
        if (retries > 0) {
          await new Promise((r) => setTimeout(r, 500));
          return fetchAgents(retries - 1);
        }
        throw new Error(`API returned ${res.status}`);
      }
      const data = await res.json();
      setAgents(data.agents || []);
      setCategories(data.categories || []);
    } catch (err) {
      console.error("Failed to fetch agents:", err);
    } finally {
      setLoading(false);
    }
  }

  const filteredAgents = useMemo(() => {
    let result = agents;
    if (selectedCategory !== "all") {
      result = result.filter((a) => a.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [agents, selectedCategory, searchQuery]);

  // Group by category for display
  const groupedAgents = useMemo(() => {
    if (selectedCategory !== "all") return { [selectedCategory]: filteredAgents };
    const groups: Record<string, Agent[]> = {};
    for (const agent of filteredAgents) {
      if (!groups[agent.category]) groups[agent.category] = [];
      groups[agent.category].push(agent);
    }
    return groups;
  }, [filteredAgents, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="gradient-orb w-96 h-96 bg-orange-500/20 -top-48 -left-48" />
          <div className="gradient-orb w-96 h-96 bg-purple-500/20 -top-48 right-0" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-400 font-medium">
                {agents.length}+ AI Agents Available
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              KraftAI{" "}
              <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                Agents
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              200+ specialized AI personas for every domain. Get expert guidance on
              sports, law, fitness, finance, government schemes, and more.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search agents by name, category, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all text-base"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="sticky top-0 z-30 bg-[#030712]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              All ({agents.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat} ({agents.filter((a) => a.category === cat).length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 animate-pulse">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/5" />
                  <div className="flex-1">
                    <div className="h-5 bg-white/5 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-white/5 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-4 bg-white/5 rounded w-full mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="text-center py-20">
            <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No agents found</h3>
            <p className="text-gray-500">
              Try adjusting your search or category filter
            </p>
          </div>
        ) : (
          Object.entries(groupedAgents).map(([category, categoryAgents]) => (
            <div key={category} className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xl font-bold text-white">{category}</h2>
                <span className="text-sm text-gray-500">
                  {categoryAgents.length} agents
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categoryAgents.map((agent) => (
                  <Link
                    key={agent.slug}
                    href={`/agents/${agent.slug}`}
                    className="group glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                          CATEGORY_COLORS[agent.category] || "from-gray-500/20 to-gray-600/20"
                        } flex items-center justify-center text-2xl flex-shrink-0 border`}
                      >
                        {agent.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors truncate">
                          {agent.name}
                        </h3>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium border ${
                            CATEGORY_BADGE_COLORS[agent.category] || "bg-gray-500/15 text-gray-400 border-gray-500/30"
                          }`}
                        >
                          {agent.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                      {agent.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Zap className="w-3 h-3" />
                        <span className="capitalize">{agent.personality_tone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Chat now</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            Powered by{" "}
            <Link href="/" className="text-orange-400 hover:text-orange-300">
              KraftAI
            </Link>{" "}
            — From Idea to Reality
          </p>
        </div>
      </div>
    </div>
  );
}
