"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ──────────────────────────────────────────────

interface Overview {
  total_pageviews: number; unique_sessions: number; today_visitors: number;
  total_leads: number; new_leads: number; bot_visits: number;
  avg_duration_seconds: number; conversion_rate: string; pages_per_session: string;
}

interface Lead {
  id: number; name: string; email: string; phone: string; company: string;
  project_type: string; budget: string; timeline: string; message: string;
  selected_tier: string; selected_addons: string; estimated_total: number;
  source: string; ip: string; country: string; status: string; notes: string;
  created_at: string;
}

interface Metrics {
  period: { days: number; since: string };
  overview: Overview;
  traffic: {
    countries: { country: string; count: string }[];
    browsers: { browser: string; count: string }[];
    devices: { device: string; count: string }[];
    os: { os: string; count: string }[];
    top_pages: { page: string; count: string }[];
    top_referrers: { referrer: string; count: string }[];
    ips: { ip: string; count: string }[];
    daily: { date: string; views: string }[];
    recent: {
      id: number; session_id: string; ip: string; country: string; city: string;
      device: string; browser: string; os: string; page: string; referrer: string;
      utm_source: string; duration: number; scroll_depth: number; created_at: string;
    }[];
    utm: { utm_source: string; utm_medium: string; utm_campaign: string; count: string }[];
  };
  leads: {
    by_status: { status: string; count: number }[];
    by_tier: { tier: string; count: number }[];
    by_country: { country: string; count: number }[];
    by_source: { source: string; count: number }[];
    daily: { date: string; count: number }[];
    recent: Lead[];
  };
  events: { event_type: string; count: number }[];
}

// ── Helpers ──────────────────────────────────────────────

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  new: { bg: "rgba(59,130,246,0.12)", text: "#3b82f6", dot: "#3b82f6" },
  contacted: { bg: "rgba(245,158,11,0.12)", text: "#f59e0b", dot: "#f59e0b" },
  quoted: { bg: "rgba(139,92,246,0.12)", text: "#8b5cf6", dot: "#8b5cf6" },
  won: { bg: "rgba(16,185,129,0.12)", text: "#10b981", dot: "#10b981" },
  lost: { bg: "rgba(239,68,68,0.12)", text: "#ef4444", dot: "#ef4444" },
};

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function formatDuration(s: number) {
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

// ── Reusable Components ──────────────────────────────────────────────

function StatCard({ label, value, sub, icon, color }: {
  label: string; value: string | number; sub?: string; icon?: React.ReactNode; color?: string;
}) {
  return (
    <div className="stat-card">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <span className="stat-label">{label}</span>
        {icon && <span style={{ color: "#52525b" }}>{icon}</span>}
      </div>
      <div className="stat-value" style={color ? { color } : {}}>{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

function SectionCard({ title, sub, children }: {
  title: string; sub?: string; children: React.ReactNode;
}) {
  return (
    <div className="section-card">
      <div className="section-card-header">
        <h3 className="section-card-title">{title}</h3>
        {sub && <span className="section-card-sub">{sub}</span>}
      </div>
      <div className="section-card-body">{children}</div>
    </div>
  );
}

function BarChart({ data, labelKey, valueKey, maxBars = 10, color = "#635bff" }: {
  data: Record<string, unknown>[]; labelKey: string; valueKey: string;
  maxBars?: number; color?: string;
}) {
  const sliced = data.slice(0, maxBars);
  const max = Math.max(...sliced.map((d) => Number(d[valueKey]) || 0), 1);

  if (sliced.length === 0) return <div className="empty-state">No data yet</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {sliced.map((row, i) => {
        const val = Number(row[valueKey]) || 0;
        const pct = (val / max) * 100;
        return (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span className="bar-label" title={String(row[labelKey])}>{String(row[labelKey]) || "(direct)"}</span>
              <span className="bar-value">{val.toLocaleString()}</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${Math.max(pct, 3)}%`, background: color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MiniChart({ data, valueKey, height = 100 }: {
  data: Record<string, unknown>[]; valueKey: string; height?: number;
}) {
  const values = data.map((d) => Number(d[valueKey]) || 0);
  const max = Math.max(...values, 1);
  const total = values.reduce((a, b) => a + b, 0);
  const avg = values.length > 0 ? Math.round(total / values.length) : 0;

  if (data.length < 2) return <div className="empty-state">Not enough data to chart</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height }}>
        {values.map((v, i) => (
          <div
            key={i}
            className="chart-bar"
            style={{ height: `${Math.max((v / max) * 100, 3)}%`, flex: 1 }}
            title={`${String((data[i] as Record<string, unknown>).date || "").slice(5)}: ${v}`}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "#71717a" }}>
        <span>{String((data[0] as Record<string, unknown>).date || "").slice(5)}</span>
        <span style={{ fontWeight: 600, color: "#a1a1aa" }}>Avg: {avg}/day</span>
        <span>{String((data[data.length - 1] as Record<string, unknown>).date || "").slice(5)}</span>
      </div>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────

function ViewsIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
}
function UsersIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}
function LeadsIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}
function TrendIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
}

// ── Period Labels ──────────────────────────────────────────────

const PERIODS = [
  { value: "1h", label: "Last 1 hour" },
  { value: "6h", label: "Last 6 hours" },
  { value: "24h", label: "Last 24 hours" },
  { value: "7d", label: "Last 7 days" },
  { value: "14d", label: "Last 14 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "365d", label: "Last year" },
];

function periodLabel(p: string) {
  return PERIODS.find((x) => x.value === p)?.label || p;
}

// ── Main Dashboard ──────────────────────────────────────────────

export default function MetricsDashboard() {
  const [apiKey, setApiKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<Metrics | null>(null);
  const [period, setPeriod] = useState("30d");
  const [tab, setTab] = useState<"overview" | "traffic" | "leads" | "events">("overview");
  const [expandedLead, setExpandedLead] = useState<number | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("_kraft_metrics_key");
    if (saved) { setApiKey(saved); setAuthed(true); }
  }, []);

  const fetchData = useCallback(async (key: string, p: string) => {
    setLoading(true);
    setError("");
    try {
      const param = p.endsWith("h") ? `hours=${p.slice(0, -1)}` : `days=${p.slice(0, -1)}`;
      const res = await fetch(`/api/kraftai/metrics?${param}&key=${encodeURIComponent(key)}`);
      if (res.status === 401) {
        setError("Invalid admin key");
        setAuthed(false);
        sessionStorage.removeItem("_kraft_metrics_key");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
      setAuthed(true);
      sessionStorage.setItem("_kraft_metrics_key", key);
    } catch {
      setError("Failed to load metrics. Check your connection or database.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed && apiKey) fetchData(apiKey, period);
  }, [authed, apiKey, period, fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) fetchData(apiKey.trim(), period);
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/kraftai/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ status }),
      });
      if (res.ok && data) {
        setData({
          ...data,
          leads: {
            ...data.leads,
            recent: data.leads.recent.map((l) => (l.id === id ? { ...l, status } : l)),
          },
        });
      }
    } catch { /* retry on next refresh */ }
  };

  // ── Login Screen ──────────────────────────────────────────────

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#09090b", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <style>{baseStyles}</style>
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#635bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h1 className="login-title">KraftAI Metrics</h1>
          <p className="login-sub">Enter your admin key to access the dashboard</p>
          <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Admin key" className="login-input" autoFocus />
          {error && <div className="login-error"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>{error}</div>}
          <button type="submit" disabled={!apiKey.trim() || loading} className="login-btn">
            {loading ? <><div className="spinner" /> Verifying...</> : "Access Dashboard"}
          </button>
        </form>
      </div>
    );
  }

  // ── Loading Screen ──────────────────────────────────────────────

  if (loading && !data) {
    return (
      <div style={{ minHeight: "100vh", background: "#09090b", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <style>{baseStyles}</style>
        <div style={{ textAlign: "center" }}>
          <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3, margin: "0 auto 16px" }} />
          <p style={{ color: "#71717a", fontSize: 14 }}>Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const o = data.overview;
  const newLeads = data.leads.by_status.find((s) => s.status === "new")?.count || 0;

  return (
    <div style={{ minHeight: "100vh", background: "#09090b", fontFamily: "'Inter', -apple-system, sans-serif", color: "#fafafa" }}>
      <style>{baseStyles}</style>

      {/* ── Header ── */}
      <header className="dash-header">
        <div className="dash-header-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="header-logo"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#635bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <span className="header-title">KraftAI <span style={{ color: "#635bff" }}>Metrics</span></span>
            </div>
            {loading && <div className="spinner" style={{ width: 16, height: 16 }} />}
          </div>

          <nav className="dash-tabs">
            {(["overview", "traffic", "leads", "events"] as const).map((t) => (
              <button key={t} className={`dash-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
                {t === "leads" && newLeads > 0 && <span className="tab-badge">{newLeads}</span>}
              </button>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="period-select">
              {PERIODS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
            <button onClick={() => fetchData(apiKey, period)} className="icon-btn" title="Refresh">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
            </button>
            <button onClick={() => { sessionStorage.removeItem("_kraft_metrics_key"); setAuthed(false); setData(null); setApiKey(""); }} className="icon-btn" title="Sign out" style={{ color: "#71717a" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Tabs ── */}
      <div className="mobile-tabs">
        {(["overview", "traffic", "leads", "events"] as const).map((t) => (
          <button key={t} className={`mobile-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
            {t === "leads" && newLeads > 0 ? `Leads (${newLeads})` : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <main className="dash-main">
        {/* ── Period Badge ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <span className="period-badge"><span className="pulse-dot" />{periodLabel(period)}</span>
          {newLeads > 0 && <span className="leads-badge">{newLeads} new lead{newLeads !== 1 ? "s" : ""} awaiting action</span>}
        </div>

        {/* ──────────── OVERVIEW / TRAFFIC TAB ──────────── */}
        {(tab === "overview" || tab === "traffic") && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="stat-grid">
              <StatCard label="Page Views" value={o.total_pageviews.toLocaleString()} sub={periodLabel(period)} icon={<ViewsIcon />} color="#635bff" />
              <StatCard label="Sessions" value={o.unique_sessions.toLocaleString()} icon={<UsersIcon />} />
              <StatCard label="Today" value={o.today_visitors.toLocaleString()} color="#10b981" />
              <StatCard label="Pages / Session" value={o.pages_per_session} />
              <StatCard label="Total Leads" value={o.total_leads} icon={<LeadsIcon />} color="#00d4aa" />
              <StatCard label="Conversion" value={`${o.conversion_rate}%`} sub="Leads / Sessions" icon={<TrendIcon />} color="#f59e0b" />
              <StatCard label="Avg Duration" value={formatDuration(o.avg_duration_seconds)} />
              <StatCard label="Bots Blocked" value={o.bot_visits.toLocaleString()} color="#71717a" />
            </div>

            <div className="grid-2">
              <SectionCard title="Daily Page Views"><MiniChart data={data.traffic.daily} valueKey="views" /></SectionCard>
              <SectionCard title="Daily Leads"><MiniChart data={data.leads.daily} valueKey="count" /></SectionCard>
            </div>

            <div className="grid-3">
              <SectionCard title="Top Pages"><BarChart data={data.traffic.top_pages} labelKey="page" valueKey="count" /></SectionCard>
              <SectionCard title="Referrers"><BarChart data={data.traffic.top_referrers} labelKey="referrer" valueKey="count" color="#3b82f6" /></SectionCard>
              <SectionCard title="UTM Sources"><BarChart data={data.traffic.utm} labelKey="utm_source" valueKey="count" color="#10b981" /></SectionCard>
            </div>

            {tab === "traffic" && (
              <div className="grid-4">
                <SectionCard title="Devices"><BarChart data={data.traffic.devices} labelKey="device" valueKey="count" /></SectionCard>
                <SectionCard title="Browsers"><BarChart data={data.traffic.browsers} labelKey="browser" valueKey="count" color="#6366f1" /></SectionCard>
                <SectionCard title="Countries"><BarChart data={data.traffic.countries} labelKey="country" valueKey="count" color="#0ea5e9" /></SectionCard>
                <SectionCard title="Top IPs"><BarChart data={data.traffic.ips} labelKey="ip" valueKey="count" color="#8b5cf6" /></SectionCard>
              </div>
            )}

            {tab === "traffic" && (
              <SectionCard title="Recent Visitors" sub={`${data.traffic.recent.length} shown`}>
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead><tr>
                      <th>When</th><th>IP</th><th>Country</th><th>City</th>
                      <th>Device</th><th>Browser</th><th>OS</th>
                      <th>Page</th><th>Referrer</th><th>UTM</th><th>Duration</th><th>Scroll</th>
                    </tr></thead>
                    <tbody>
                      {data.traffic.recent.map((v) => (
                        <tr key={v.id}>
                          <td style={{ whiteSpace: "nowrap" }}>{getTimeAgo(v.created_at)}</td>
                          <td className="mono">{v.ip}</td>
                          <td>{v.country || "-"}</td><td>{v.city || "-"}</td>
                          <td><span className="chip">{v.device}</span></td>
                          <td>{v.browser}</td><td>{v.os}</td>
                          <td className="truncate-cell">{v.page}</td>
                          <td className="truncate-cell">{v.referrer || "-"}</td>
                          <td>{v.utm_source || "-"}</td>
                          <td>{v.duration > 0 ? formatDuration(v.duration) : "-"}</td>
                          <td>{v.scroll_depth > 0 ? `${v.scroll_depth}%` : "-"}</td>
                        </tr>
                      ))}
                      {data.traffic.recent.length === 0 && <tr><td colSpan={12} className="empty-state">No visitors tracked yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              </SectionCard>
            )}
          </div>
        )}

        {/* ──────────── LEADS TAB ──────────── */}
        {(tab === "overview" || tab === "leads") && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: tab === "overview" ? 24 : 0 }}>
            {tab === "leads" && (
              <div className="stat-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
                <StatCard label="Total Leads" value={o.total_leads} icon={<LeadsIcon />} color="#635bff" />
                <StatCard label="New" value={newLeads} color={newLeads > 0 ? "#3b82f6" : undefined} />
                <StatCard label="Conversion" value={`${o.conversion_rate}%`} icon={<TrendIcon />} />
                <StatCard label="Won" value={data.leads.by_status.find((s) => s.status === "won")?.count || 0} color="#10b981" />
              </div>
            )}

            <div className="grid-4">
              <SectionCard title="By Status">
                {data.leads.by_status.length === 0 ? <div className="empty-state">No leads yet</div> : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {data.leads.by_status.map((row) => {
                      const sc = STATUS_COLORS[row.status] || { bg: "rgba(113,113,122,0.12)", text: "#71717a", dot: "#71717a" };
                      return (
                        <div key={row.status} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ width: 8, height: 8, borderRadius: "50%", background: sc.dot }} />
                            <span style={{ fontSize: 13, color: "#d4d4d8" }}>{row.status.charAt(0).toUpperCase() + row.status.slice(1)}</span>
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{row.count}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </SectionCard>
              <SectionCard title="By Project Type"><BarChart data={data.leads.by_tier} labelKey="tier" valueKey="count" /></SectionCard>
              <SectionCard title="By Country"><BarChart data={data.leads.by_country} labelKey="country" valueKey="count" color="#0ea5e9" /></SectionCard>
              <SectionCard title="By Source"><BarChart data={data.leads.by_source} labelKey="source" valueKey="count" color="#10b981" /></SectionCard>
            </div>

            {/* Recent Leads Table */}
            <SectionCard title="Recent Leads" sub={`${data.leads.recent.length} shown · Click row to expand`}>
              <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                  <thead><tr>
                    <th>Contact</th><th>Phone</th><th>Project</th><th>Budget</th>
                    <th>Country</th><th>Status</th><th>When</th><th style={{ width: 28 }}></th>
                  </tr></thead>
                  <tbody>
                    {data.leads.recent.map((lead) => (
                      <>
                        <tr key={lead.id} onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)} style={{ cursor: "pointer" }}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div className="lead-avatar">{(lead.name || lead.email || "?").charAt(0).toUpperCase()}</div>
                              <div>
                                <div style={{ fontWeight: 600, fontSize: 13 }}>{lead.name || "-"}</div>
                                <div style={{ fontSize: 11, color: "#71717a" }}>{lead.email || "-"}</div>
                              </div>
                            </div>
                          </td>
                          <td>{lead.phone ? <a href={`tel:${lead.phone}`} className="phone-link" onClick={(e) => e.stopPropagation()}>{lead.phone}</a> : "-"}</td>
                          <td><span className="chip">{lead.selected_tier || lead.project_type || "-"}</span></td>
                          <td style={{ fontWeight: 600 }}>{lead.estimated_total ? `$${lead.estimated_total.toLocaleString()}` : lead.budget || "-"}</td>
                          <td>{lead.country || "-"}</td>
                          <td>
                            <select
                              value={lead.status}
                              onChange={(e) => { e.stopPropagation(); handleStatusChange(lead.id, e.target.value); }}
                              onClick={(e) => e.stopPropagation()}
                              className="status-select"
                              style={{ background: STATUS_COLORS[lead.status]?.bg || "rgba(113,113,122,0.12)", color: STATUS_COLORS[lead.status]?.text || "#71717a" }}
                            >
                              {["new", "contacted", "quoted", "won", "lost"].map((s) => (
                                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                              ))}
                            </select>
                          </td>
                          <td style={{ whiteSpace: "nowrap", fontSize: 12, color: "#71717a" }} title={new Date(lead.created_at).toLocaleString()}>{getTimeAgo(lead.created_at)}</td>
                          <td>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" style={{ transform: expandedLead === lead.id ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </td>
                        </tr>
                        {expandedLead === lead.id && (
                          <tr key={`${lead.id}-expanded`} className="expanded-row">
                            <td colSpan={8}>
                              <div style={{ marginLeft: 46, display: "flex", flexDirection: "column", gap: 8 }}>
                                {lead.message && <div><span className="detail-label">Message</span><p style={{ fontSize: 13, color: "#d4d4d8", lineHeight: 1.6 }}>{lead.message}</p></div>}
                                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                                  {lead.company && <div><span className="detail-label">Company</span><span style={{ fontSize: 13, color: "#d4d4d8" }}>{lead.company}</span></div>}
                                  {lead.timeline && <div><span className="detail-label">Timeline</span><span style={{ fontSize: 13, color: "#d4d4d8" }}>{lead.timeline}</span></div>}
                                  {lead.selected_addons && <div><span className="detail-label">Add-ons</span><span style={{ fontSize: 13, color: "#d4d4d8" }}>{lead.selected_addons}</span></div>}
                                  {lead.source && <div><span className="detail-label">Source</span><span style={{ fontSize: 13, color: "#d4d4d8" }}>{lead.source}</span></div>}
                                  {lead.ip && <div><span className="detail-label">IP</span><span className="mono" style={{ fontSize: 12 }}>{lead.ip}</span></div>}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                    {data.leads.recent.length === 0 && (
                      <tr><td colSpan={8} className="empty-state">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="1" style={{ margin: "0 auto 8px", display: "block" }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                        No leads in this period
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </div>
        )}

        {/* ──────────── EVENTS TAB ──────────── */}
        {tab === "events" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="grid-2">
              <SectionCard title="Event Breakdown" sub={`${data.events.reduce((a, e) => a + e.count, 0)} total events`}>
                <BarChart data={data.events} labelKey="event_type" valueKey="count" color="#8b5cf6" />
              </SectionCard>
              <SectionCard title="Top Pages"><BarChart data={data.traffic.top_pages} labelKey="page" valueKey="count" /></SectionCard>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────

const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  .spinner { width: 16px; height: 16px; border: 2px solid rgba(99,91,255,0.3); border-top-color: #635bff; border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Login */
  .login-form { background: #18181b; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px; width: 400px; max-width: 90vw; text-align: center; }
  .login-icon { width: 56px; height: 56px; background: rgba(99,91,255,0.15); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
  .login-title { font-size: 24px; font-weight: 800; color: #fafafa; margin-bottom: 4px; }
  .login-sub { font-size: 14px; color: #71717a; margin-bottom: 28px; }
  .login-input { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.12); background: #0f0f12; color: #fafafa; font-size: 14px; outline: none; box-sizing: border-box; font-family: inherit; margin-bottom: 14px; transition: border-color 0.2s; }
  .login-input:focus { border-color: #635bff; }
  .login-error { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 10px; background: rgba(239,68,68,0.1); color: #ef4444; font-size: 13px; margin-bottom: 14px; }
  .login-btn { width: 100%; padding: 14px; border-radius: 12px; background: #635bff; color: #fff; font-size: 14px; font-weight: 700; border: none; cursor: pointer; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
  .login-btn:hover { background: #7c75ff; }
  .login-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* Header */
  .dash-header { position: sticky; top: 0; z-index: 100; background: #0f0f12; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .dash-header-inner { max-width: 1400px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 56px; }
  .header-logo { width: 32px; height: 32px; background: rgba(99,91,255,0.15); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
  .header-title { font-weight: 800; font-size: 16px; }

  .dash-tabs { display: flex; gap: 2px; background: rgba(255,255,255,0.04); border-radius: 10px; padding: 3px; }
  .dash-tab { padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; border: none; cursor: pointer; background: transparent; color: #71717a; transition: all 0.2s; font-family: inherit; display: flex; align-items: center; gap: 6px; }
  .dash-tab.active { background: #635bff; color: #fff; }
  .dash-tab:hover { color: #d4d4d8; }
  .tab-badge { background: #ef4444; color: #fff; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 999px; min-width: 18px; text-align: center; }

  .period-select { padding: 6px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #fafafa; font-size: 12px; font-family: inherit; cursor: pointer; }
  .icon-btn { padding: 6px; border-radius: 8px; border: none; background: transparent; color: #a1a1aa; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; }
  .icon-btn:hover { color: #635bff; background: rgba(99,91,255,0.1); }

  /* Mobile tabs */
  .mobile-tabs { display: none; position: sticky; top: 56px; z-index: 90; background: #0f0f12; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .mobile-tab { flex: 1; padding: 12px; font-size: 13px; font-weight: 600; border: none; border-bottom: 2px solid transparent; cursor: pointer; background: transparent; color: #71717a; font-family: inherit; }
  .mobile-tab.active { color: #fafafa; border-bottom-color: #635bff; }

  /* Main */
  .dash-main { max-width: 1400px; margin: 0 auto; padding: 24px; }

  .period-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 999px; background: rgba(99,91,255,0.1); color: #a78bfa; font-size: 12px; font-weight: 600; }
  .pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
  .leads-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 999px; background: rgba(59,130,246,0.1); color: #60a5fa; font-size: 12px; font-weight: 600; }

  /* Stat cards */
  .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
  .stat-card { background: #18181b; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 20px; transition: all 0.2s; }
  .stat-card:hover { border-color: rgba(255,255,255,0.12); }
  .stat-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #71717a; }
  .stat-value { font-size: 28px; font-weight: 800; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .stat-sub { font-size: 11px; color: #52525b; margin-top: 4px; }

  /* Section cards */
  .section-card { background: #18181b; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; overflow: hidden; }
  .section-card-header { padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.04); display: flex; align-items: center; justify-content: space-between; }
  .section-card-title { font-size: 14px; font-weight: 700; }
  .section-card-sub { font-size: 11px; color: #52525b; }
  .section-card-body { padding: 20px; }

  /* Bar charts */
  .bar-label { font-size: 13px; color: #a1a1aa; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bar-value { font-size: 13px; font-weight: 700; font-variant-numeric: tabular-nums; }
  .bar-track { height: 6px; background: rgba(255,255,255,0.04); border-radius: 3px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 3px; transition: width 0.5s; }

  /* Mini chart */
  .chart-bar { background: rgba(99,91,255,0.25); border-radius: 3px 3px 0 0; min-width: 4px; transition: all 0.3s; cursor: default; }
  .chart-bar:hover { background: rgba(99,91,255,0.6); }

  /* Tables */
  .data-table { width: 100%; border-collapse: collapse; }
  .data-table th { text-align: left; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #52525b; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .data-table td { font-size: 13px; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.03); color: #d4d4d8; }
  .data-table tr:hover td { background: rgba(255,255,255,0.02); }
  .mono { font-family: 'JetBrains Mono', monospace; font-size: 11px; }
  .truncate-cell { max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chip { display: inline-block; padding: 2px 10px; border-radius: 6px; background: rgba(255,255,255,0.06); font-size: 12px; font-weight: 500; }
  .empty-state { text-align: center; padding: 32px 16px; color: #3f3f46; font-size: 13px; }

  /* Lead rows */
  .lead-avatar { width: 32px; height: 32px; border-radius: 50%; background: rgba(99,91,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #a78bfa; flex-shrink: 0; }
  .phone-link { color: #d4d4d8; text-decoration: none; font-size: 13px; }
  .phone-link:hover { color: #635bff; }
  .status-select { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; border: none; cursor: pointer; appearance: none; font-family: inherit; }
  .expanded-row td { background: rgba(255,255,255,0.02); padding: 16px 12px; }
  .detail-label { display: block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #52525b; margin-bottom: 2px; }

  /* Grids */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

  @media (max-width: 1024px) {
    .grid-4 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(2, 1fr); }
    .dash-tabs { display: none; }
    .mobile-tabs { display: flex; }
  }
  @media (max-width: 768px) {
    .dash-header-inner { padding: 0 16px; }
    .dash-main { padding: 16px; }
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
  }
`;
