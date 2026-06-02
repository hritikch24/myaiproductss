"use client";

import { useState, useEffect, useCallback } from "react";

interface Metrics {
  overview: {
    total_pageviews: number;
    unique_sessions: number;
    today_visitors: number;
    total_leads: number;
    new_leads: number;
    bot_visits: number;
    avg_duration_seconds: number;
  };
  countries: { country: string; count: string }[];
  browsers: { browser: string; count: string }[];
  devices: { device: string; count: string }[];
  os: { os: string; count: string }[];
  top_pages: { page: string; count: string }[];
  top_referrers: { referrer: string; count: string }[];
  recent_visitors: {
    id: number; session_id: string; ip: string; country: string; city: string;
    device: string; browser: string; os: string; page: string; referrer: string;
    utm_source: string; duration: number; scroll_depth: number; created_at: string;
  }[];
  daily_chart: { day: string; count: string }[];
  events: { event_type: string; count: string }[];
  utm: { utm_source: string; utm_medium: string; utm_campaign: string; count: string }[];
}

interface Lead {
  id: number; name: string; email: string; phone: string; company: string;
  project_type: string; budget: string; timeline: string; message: string;
  selected_tier: string; selected_addons: string; estimated_total: number;
  source: string; ip: string; country: string; status: string; created_at: string;
}

export default function MetricsDashboard() {
  const [authed, setAuthed] = useState(false);
  const [key, setKey] = useState("");
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tab, setTab] = useState<"overview" | "visitors" | "leads" | "events">("overview");
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async (adminKey: string) => {
    setLoading(true);
    setError("");
    try {
      const [mRes, lRes] = await Promise.all([
        fetch(`/api/kraftai/metrics?key=${adminKey}&days=${days}`),
        fetch(`/api/kraftai/leads?key=${adminKey}`),
      ]);
      if (!mRes.ok || !lRes.ok) throw new Error("Failed to load data");
      const mData = await mRes.json();
      const lData = await lRes.json();
      setMetrics(mData);
      setLeads(lData.leads || []);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    if (authed && key) fetchData(key);
  }, [authed, key, days, fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthed(true);
  };

  const formatTime = (s: number) => {
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#09090b", color: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
        <form onSubmit={handleLogin} style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 40, width: 380, textAlign: "center" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>KraftAI Metrics</h1>
          <p style={{ color: "#a1a1aa", fontSize: 14, marginBottom: 28 }}>Enter admin key to access dashboard</p>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin key"
            style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "#0f0f12", color: "#fafafa", fontSize: 14, marginBottom: 16, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
          />
          <button type="submit" style={{ width: "100%", padding: "12px 24px", borderRadius: 10, background: "#635bff", color: "#fff", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  const maxChart = Math.max(...(metrics?.daily_chart?.map((d) => parseInt(d.count)) || [1]));

  return (
    <div style={{ minHeight: "100vh", background: "#09090b", color: "#fafafa", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .m-nav { position: sticky; top: 0; z-index: 100; background: rgba(9,9,11,0.9); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 12px 32px; display: flex; align-items: center; justify-content: space-between; }
        .m-tabs { display: flex; gap: 4px; }
        .m-tab { padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; border: none; cursor: pointer; background: transparent; color: #a1a1aa; transition: all 0.2s; font-family: inherit; }
        .m-tab.active { background: #1e1e23; color: #fafafa; }
        .m-tab:hover { color: #fafafa; }
        .m-controls { display: flex; gap: 8px; align-items: center; }
        .m-select { padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: #18181b; color: #fafafa; font-size: 12px; font-family: inherit; }
        .m-refresh { padding: 8px 16px; border-radius: 8px; background: #635bff; color: #fff; border: none; cursor: pointer; font-size: 12px; font-weight: 600; font-family: inherit; }
        .m-body { padding: 24px 32px; }
        .m-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 32px; }
        .m-card { background: #18181b; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; }
        .m-card-label { font-size: 12px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        .m-card-value { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; }
        .m-section { margin-bottom: 32px; }
        .m-section-title { font-size: 16px; font-weight: 700; margin-bottom: 16px; }
        .m-table { width: 100%; border-collapse: collapse; }
        .m-table th { text-align: left; font-size: 11px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; }
        .m-table td { font-size: 13px; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #d4d4d8; }
        .m-table tr:hover td { background: rgba(255,255,255,0.02); }
        .m-bar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .m-bar-label { font-size: 13px; min-width: 100px; color: #d4d4d8; }
        .m-bar-track { flex: 1; height: 24px; background: #1e1e23; border-radius: 6px; overflow: hidden; }
        .m-bar-fill { height: 100%; background: linear-gradient(90deg, #635bff, #00d4aa); border-radius: 6px; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; font-size: 11px; font-weight: 600; color: #fff; min-width: 30px; transition: width 0.5s; }
        .m-chart { display: flex; align-items: flex-end; gap: 3px; height: 120px; margin-bottom: 8px; }
        .m-chart-bar { flex: 1; background: linear-gradient(to top, #635bff, #7c75ff); border-radius: 4px 4px 0 0; min-width: 8px; transition: height 0.5s; position: relative; }
        .m-chart-bar:hover { background: #00d4aa; }
        .m-chip { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; }
        .m-chip-new { background: rgba(0,212,170,0.15); color: #00d4aa; }
        .m-chip-contacted { background: rgba(99,91,255,0.15); color: #a78bfa; }
        .m-chip-converted { background: rgba(251,191,36,0.15); color: #fbbf24; }
        .m-empty { text-align: center; padding: 48px; color: #52525b; font-size: 14px; }
        @media (max-width: 768px) { .m-nav { padding: 12px 16px; flex-wrap: wrap; gap: 8px; } .m-body { padding: 16px; } .m-grid { grid-template-columns: repeat(2, 1fr); } .m-table { font-size: 12px; } }
      `}</style>

      <div className="m-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontWeight: 800, fontSize: 18 }}>KraftAI <span style={{ color: "#635bff" }}>Metrics</span></span>
          <div className="m-tabs">
            {(["overview", "visitors", "leads", "events"] as const).map((t) => (
              <button key={t} className={`m-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
                {t === "leads" && metrics?.overview?.new_leads ? ` (${metrics.overview.new_leads})` : ""}
              </button>
            ))}
          </div>
        </div>
        <div className="m-controls">
          <select className="m-select" value={days} onChange={(e) => setDays(parseInt(e.target.value))}>
            <option value="1">Today</option>
            <option value="7">7 days</option>
            <option value="30">30 days</option>
            <option value="90">90 days</option>
          </select>
          <button className="m-refresh" onClick={() => fetchData(key)} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="m-body">
        {error && <div style={{ color: "#ef4444", marginBottom: 16, padding: 12, background: "rgba(239,68,68,0.1)", borderRadius: 8 }}>{error}</div>}

        {!metrics && !error && <div className="m-empty">Loading metrics...</div>}

        {metrics && tab === "overview" && (
          <>
            <div className="m-grid">
              <div className="m-card">
                <div className="m-card-label">Today</div>
                <div className="m-card-value" style={{ color: "#635bff" }}>{metrics.overview.today_visitors}</div>
              </div>
              <div className="m-card">
                <div className="m-card-label">Total Pageviews</div>
                <div className="m-card-value">{metrics.overview.total_pageviews.toLocaleString()}</div>
              </div>
              <div className="m-card">
                <div className="m-card-label">Unique Sessions</div>
                <div className="m-card-value">{metrics.overview.unique_sessions.toLocaleString()}</div>
              </div>
              <div className="m-card">
                <div className="m-card-label">Avg Duration</div>
                <div className="m-card-value" style={{ fontSize: 24 }}>{formatTime(metrics.overview.avg_duration_seconds)}</div>
              </div>
              <div className="m-card">
                <div className="m-card-label">Total Leads</div>
                <div className="m-card-value" style={{ color: "#00d4aa" }}>{metrics.overview.total_leads}</div>
              </div>
              <div className="m-card">
                <div className="m-card-label">New Leads</div>
                <div className="m-card-value" style={{ color: "#fbbf24" }}>{metrics.overview.new_leads}</div>
              </div>
              <div className="m-card">
                <div className="m-card-label">Bot Visits</div>
                <div className="m-card-value" style={{ color: "#a1a1aa" }}>{metrics.overview.bot_visits}</div>
              </div>
            </div>

            {/* Daily chart */}
            <div className="m-section">
              <div className="m-section-title">Daily Traffic</div>
              <div className="m-card" style={{ padding: 24 }}>
                <div className="m-chart">
                  {metrics.daily_chart.map((d, i) => (
                    <div key={i} className="m-chart-bar" style={{ height: `${Math.max((parseInt(d.count) / maxChart) * 100, 4)}%` }} title={`${new Date(d.day).toLocaleDateString()}: ${d.count} visits`} />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#52525b" }}>
                  <span>{metrics.daily_chart[0]?.day ? new Date(metrics.daily_chart[0].day).toLocaleDateString("en", { month: "short", day: "numeric" }) : ""}</span>
                  <span>{metrics.daily_chart[metrics.daily_chart.length - 1]?.day ? new Date(metrics.daily_chart[metrics.daily_chart.length - 1].day).toLocaleDateString("en", { month: "short", day: "numeric" }) : ""}</span>
                </div>
              </div>
            </div>

            {/* Breakdowns */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="m-section">
                <div className="m-section-title">Countries</div>
                <div className="m-card">
                  {metrics.countries.length === 0 ? <div className="m-empty">No data yet</div> : metrics.countries.slice(0, 10).map((c, i) => (
                    <div key={i} className="m-bar-row">
                      <div className="m-bar-label">{c.country || "Unknown"}</div>
                      <div className="m-bar-track">
                        <div className="m-bar-fill" style={{ width: `${Math.max((parseInt(c.count) / parseInt(metrics.countries[0].count)) * 100, 8)}%` }}>
                          {c.count}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="m-section">
                <div className="m-section-title">Devices</div>
                <div className="m-card">
                  {metrics.devices.map((d, i) => (
                    <div key={i} className="m-bar-row">
                      <div className="m-bar-label">{d.device}</div>
                      <div className="m-bar-track">
                        <div className="m-bar-fill" style={{ width: `${Math.max((parseInt(d.count) / parseInt(metrics.devices[0].count)) * 100, 8)}%` }}>
                          {d.count}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="m-section">
                <div className="m-section-title">Browsers</div>
                <div className="m-card">
                  {metrics.browsers.map((b, i) => (
                    <div key={i} className="m-bar-row">
                      <div className="m-bar-label">{b.browser}</div>
                      <div className="m-bar-track">
                        <div className="m-bar-fill" style={{ width: `${Math.max((parseInt(b.count) / parseInt(metrics.browsers[0].count)) * 100, 8)}%` }}>
                          {b.count}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="m-section">
                <div className="m-section-title">Operating Systems</div>
                <div className="m-card">
                  {metrics.os.map((o, i) => (
                    <div key={i} className="m-bar-row">
                      <div className="m-bar-label">{o.os}</div>
                      <div className="m-bar-track">
                        <div className="m-bar-fill" style={{ width: `${Math.max((parseInt(o.count) / parseInt(metrics.os[0].count)) * 100, 8)}%` }}>
                          {o.count}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Referrers & UTM */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="m-section">
                <div className="m-section-title">Top Referrers</div>
                <div className="m-card">
                  {metrics.top_referrers.length === 0 ? <div className="m-empty">No referrer data</div> : (
                    <table className="m-table">
                      <thead><tr><th>Source</th><th>Visits</th></tr></thead>
                      <tbody>{metrics.top_referrers.map((r, i) => (
                        <tr key={i}><td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}>{r.referrer}</td><td>{r.count}</td></tr>
                      ))}</tbody>
                    </table>
                  )}
                </div>
              </div>
              <div className="m-section">
                <div className="m-section-title">UTM Campaigns</div>
                <div className="m-card">
                  {metrics.utm.length === 0 ? <div className="m-empty">No UTM data</div> : (
                    <table className="m-table">
                      <thead><tr><th>Source</th><th>Medium</th><th>Campaign</th><th>Visits</th></tr></thead>
                      <tbody>{metrics.utm.map((u, i) => (
                        <tr key={i}><td>{u.utm_source}</td><td>{u.utm_medium || "-"}</td><td>{u.utm_campaign || "-"}</td><td>{u.count}</td></tr>
                      ))}</tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {metrics && tab === "visitors" && (
          <div className="m-section">
            <div className="m-section-title">Recent Visitors (Last 50)</div>
            <div className="m-card" style={{ overflowX: "auto" }}>
              {metrics.recent_visitors.length === 0 ? <div className="m-empty">No visitors tracked yet</div> : (
                <table className="m-table">
                  <thead>
                    <tr>
                      <th>Time</th><th>IP</th><th>Country</th><th>City</th>
                      <th>Device</th><th>Browser</th><th>OS</th>
                      <th>Page</th><th>Referrer</th><th>UTM</th>
                      <th>Duration</th><th>Scroll</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.recent_visitors.map((v) => (
                      <tr key={v.id}>
                        <td style={{ whiteSpace: "nowrap" }}>{timeAgo(v.created_at)}</td>
                        <td style={{ fontFamily: "monospace", fontSize: 11 }}>{v.ip}</td>
                        <td>{v.country || "-"}</td>
                        <td>{v.city || "-"}</td>
                        <td>{v.device}</td>
                        <td>{v.browser}</td>
                        <td>{v.os}</td>
                        <td style={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis" }}>{v.page}</td>
                        <td style={{ maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis" }}>{v.referrer || "-"}</td>
                        <td>{v.utm_source || "-"}</td>
                        <td>{v.duration > 0 ? formatTime(v.duration) : "-"}</td>
                        <td>{v.scroll_depth > 0 ? `${v.scroll_depth}%` : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {metrics && tab === "leads" && (
          <div className="m-section">
            <div className="m-section-title">All Leads ({leads.length})</div>
            <div className="m-card" style={{ overflowX: "auto" }}>
              {leads.length === 0 ? <div className="m-empty">No leads captured yet. They will appear when visitors submit the quote form.</div> : (
                <table className="m-table">
                  <thead>
                    <tr>
                      <th>Time</th><th>Name</th><th>Email</th><th>Phone</th>
                      <th>Company</th><th>Project</th><th>Budget</th>
                      <th>Tier</th><th>Total</th><th>Country</th>
                      <th>Source</th><th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((l) => (
                      <tr key={l.id}>
                        <td style={{ whiteSpace: "nowrap" }}>{timeAgo(l.created_at)}</td>
                        <td style={{ fontWeight: 600 }}>{l.name || "-"}</td>
                        <td>{l.email || "-"}</td>
                        <td>{l.phone || "-"}</td>
                        <td>{l.company || "-"}</td>
                        <td>{l.project_type || "-"}</td>
                        <td>{l.budget || "-"}</td>
                        <td>{l.selected_tier || "-"}</td>
                        <td style={{ fontWeight: 600 }}>{l.estimated_total ? `$${l.estimated_total}` : "-"}</td>
                        <td>{l.country || "-"}</td>
                        <td>{l.source}</td>
                        <td><span className={`m-chip m-chip-${l.status}`}>{l.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {metrics && tab === "events" && (
          <div className="m-section">
            <div className="m-section-title">Event Breakdown</div>
            <div className="m-card">
              {metrics.events.length === 0 ? <div className="m-empty">No events tracked yet</div> : metrics.events.map((e, i) => (
                <div key={i} className="m-bar-row">
                  <div className="m-bar-label" style={{ minWidth: 160 }}>{e.event_type}</div>
                  <div className="m-bar-track">
                    <div className="m-bar-fill" style={{ width: `${Math.max((parseInt(e.count) / parseInt(metrics.events[0].count)) * 100, 8)}%` }}>
                      {e.count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
