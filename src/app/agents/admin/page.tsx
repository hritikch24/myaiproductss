"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  ArrowLeft,
  Search,
  Bot,
  Loader2,
  Database,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

interface Agent {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  system_prompt: string;
  personality_tone: string;
  icon: string;
  active: boolean;
}

const CATEGORIES = [
  "Sports",
  "Fitness",
  "Legal",
  "Finance",
  "Government Schemes",
  "Tech",
  "Career",
  "Education",
  "Mental Health",
  "Business",
];

const TONES = [
  "professional",
  "friendly",
  "casual",
  "analytical",
  "enthusiastic",
  "calm",
  "motivating",
  "technical",
  "empathetic",
  "authoritative",
  "passionate",
  "patient",
  "encouraging",
  "serious",
  "creative",
];

const EMPTY_AGENT: Omit<Agent, "id" | "active"> = {
  name: "",
  slug: "",
  category: "Tech",
  description: "",
  system_prompt: "",
  personality_tone: "professional",
  icon: "🤖",
};

export default function AdminDashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [editingAgent, setEditingAgent] = useState<Partial<Agent> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [dbStatus, setDbStatus] = useState<string>("");
  const [dbLoading, setDbLoading] = useState(false);

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

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
    } catch {
      showNotification("error", "Failed to fetch agents");
    } finally {
      setLoading(false);
    }
  }

  function showNotification(type: "success" | "error", message: string) {
    setNotification({ type, message });
  }

  async function handleDbAction(action: "migrate" | "seed" | "reset") {
    if (action === "reset" && !confirm("This will DELETE all agents and messages, then re-seed. Continue?")) return;
    setDbLoading(true);
    setDbStatus("");
    try {
      const res = await fetch("/api/agents/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      setDbStatus(data.message);
      if (data.success) {
        showNotification("success", data.message);
        fetchAgents();
      } else {
        showNotification("error", data.message || data.error);
      }
    } catch (err) {
      showNotification("error", `Database ${action} failed: ${err}`);
    } finally {
      setDbLoading(false);
    }
  }

  async function handleSave() {
    if (!editingAgent) return;
    setSaving(true);

    try {
      if (isCreating) {
        const slug = editingAgent.slug || editingAgent.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        const res = await fetch("/api/agents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editingAgent, slug }),
        });
        const data = await res.json();
        if (res.ok) {
          showNotification("success", `Created agent: ${data.agent.name}`);
          setEditingAgent(null);
          setIsCreating(false);
          fetchAgents();
        } else {
          showNotification("error", data.error);
        }
      } else {
        const res = await fetch(`/api/agents/${editingAgent.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingAgent),
        });
        const data = await res.json();
        if (res.ok) {
          showNotification("success", `Updated agent: ${data.agent.name}`);
          setEditingAgent(null);
          fetchAgents();
        } else {
          showNotification("error", data.error);
        }
      }
    } catch {
      showNotification("error", "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(agent: Agent) {
    if (!confirm(`Delete "${agent.name}"? This will also delete all chat history.`)) return;

    try {
      const res = await fetch(`/api/agents/${agent.slug}`, { method: "DELETE" });
      if (res.ok) {
        showNotification("success", `Deleted: ${agent.name}`);
        fetchAgents();
      } else {
        showNotification("error", "Delete failed");
      }
    } catch {
      showNotification("error", "Delete failed");
    }
  }

  const filteredAgents = agents.filter((a) => {
    const matchesSearch =
      !searchQuery ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || a.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-lg animate-fade-in ${
            notification.type === "success"
              ? "bg-green-500/20 border border-green-500/30 text-green-400"
              : "bg-red-500/20 border border-red-500/30 text-red-400"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/agents"
                className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Agent Admin</h1>
                <p className="text-sm text-gray-500">
                  Manage {agents.length} agents across {new Set(agents.map((a) => a.category)).size} categories
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingAgent({ ...EMPTY_AGENT });
                setIsCreating(true);
              }}
              className="btn-gradient px-4 py-2.5 rounded-xl text-white text-sm font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Agent
            </button>
          </div>
        </div>
      </div>

      {/* Database Management */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-semibold text-white">Database Management</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleDbAction("migrate")}
              disabled={dbLoading}
              className="px-3 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium rounded-lg hover:bg-blue-500/20 transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              {dbLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Database className="w-3 h-3" />}
              Run Migration
            </button>
            <button
              onClick={() => handleDbAction("seed")}
              disabled={dbLoading}
              className="px-3 py-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium rounded-lg hover:bg-green-500/20 transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              {dbLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
              Seed 200 Agents
            </button>
            <button
              onClick={() => handleDbAction("reset")}
              disabled={dbLoading}
              className="px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              {dbLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
              Reset & Re-seed
            </button>
          </div>
          {dbStatus && <p className="text-xs text-gray-400 mt-2">{dbStatus}</p>}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
            />
          </div>
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500/50"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingAgent && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="glass rounded-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <h2 className="text-lg font-bold text-white">
                {isCreating ? "Create New Agent" : `Edit: ${editingAgent.name}`}
              </h2>
              <button
                onClick={() => { setEditingAgent(null); setIsCreating(false); }}
                className="p-1.5 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Name</label>
                  <input
                    value={editingAgent.name || ""}
                    onChange={(e) => setEditingAgent({ ...editingAgent, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500/50"
                    placeholder="Agent name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Slug</label>
                  <input
                    value={editingAgent.slug || ""}
                    onChange={(e) => setEditingAgent({ ...editingAgent, slug: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500/50"
                    placeholder="auto-generated-from-name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Category</label>
                  <select
                    value={editingAgent.category || "Tech"}
                    onChange={(e) => setEditingAgent({ ...editingAgent, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500/50"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Tone</label>
                  <select
                    value={editingAgent.personality_tone || "professional"}
                    onChange={(e) => setEditingAgent({ ...editingAgent, personality_tone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500/50"
                  >
                    {TONES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Icon (emoji)</label>
                  <input
                    value={editingAgent.icon || ""}
                    onChange={(e) => setEditingAgent({ ...editingAgent, icon: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white text-center focus:outline-none focus:border-orange-500/50"
                    placeholder="🤖"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Description</label>
                <textarea
                  value={editingAgent.description || ""}
                  onChange={(e) => setEditingAgent({ ...editingAgent, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500/50 resize-none"
                  placeholder="Short description of the agent..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">System Prompt</label>
                <textarea
                  value={editingAgent.system_prompt || ""}
                  onChange={(e) => setEditingAgent({ ...editingAgent, system_prompt: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500/50 resize-none font-mono"
                  placeholder="You are a [ROLE]. Your job is to help users with [DOMAIN]..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-5 border-t border-white/5">
              <button
                onClick={() => { setEditingAgent(null); setIsCreating(false); }}
                className="px-4 py-2.5 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editingAgent.name || !editingAgent.system_prompt}
                className="btn-gradient px-5 py-2.5 rounded-xl text-white text-sm font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isCreating ? "Create" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agents Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 text-orange-400 animate-spin mx-auto mb-3" />
            <p className="text-gray-400">Loading agents...</p>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="text-center py-20">
            <Bot className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">
              {agents.length === 0
                ? "No agents yet. Run migration and seed above."
                : "No agents match your filter."}
            </p>
          </div>
        ) : (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Agent</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Tone</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Slug</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map((agent) => (
                    <tr
                      key={agent.id}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{agent.icon}</span>
                          <div>
                            <p className="font-medium text-white">{agent.name}</p>
                            <p className="text-xs text-gray-500 truncate max-w-xs">
                              {agent.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-md text-xs bg-white/5 text-gray-300">
                          {agent.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-gray-400 capitalize">{agent.personality_tone}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <code className="text-xs text-gray-500">{agent.slug}</code>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/agents/${agent.slug}`}
                            className="p-2 text-gray-500 hover:text-white transition-colors"
                            title="Open chat"
                          >
                            <Bot className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => { setEditingAgent({ ...agent }); setIsCreating(false); }}
                            className="p-2 text-gray-500 hover:text-orange-400 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(agent)}
                            className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
