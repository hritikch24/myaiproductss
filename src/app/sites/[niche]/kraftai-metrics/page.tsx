'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export const NICHE_NAMES: Record<string, string> = {
  homeservices: 'Home Services',
  staffing: 'Staffing & Recruiting',
  insurance: 'Insurance',
  lawfirms: 'Law Firms',
  accounting: 'Accounting',
};

interface MetricsData {
  period: { days: number; since: string };
  overview: {
    total_pageviews: number;
    unique_sessions: number;
    today_visitors: number;
    total_leads: number;
    new_leads: number;
    bot_visits: number;
    avg_duration_seconds: number;
    conversion_rate: string;
    pages_per_session: string;
  };
  traffic: {
    countries: { country: string; count: string }[];
    browsers: { browser: string; count: string }[];
    devices: { device: string; count: string }[];
    os: { os: string; count: string }[];
    top_pages: { page: string; count: string }[];
    top_referrers: { referrer: string; count: string }[];
    daily: { date: string; views: string }[];
    recent: { id: string; session_id: string; ip: string; country: string; city: string; device: string; browser: string; page: string; referrer: string; utm_source: string; duration: number; scroll_depth: number; created_at: string }[];
    utm: { utm_source: string; utm_medium: string; utm_campaign: string; count: number }[];
  };
  leads: {
    by_status: { status: string; count: number }[];
    by_source: { source: string; count: number }[];
    by_country: { country: string; count: number }[];
    daily: { date: string; count: number }[];
    recent: { id: string; name: string; email: string; phone: string; company: string; message: string; source: string; country: string; created_at: string }[];
  };
  events: { event_type: string; count: number }[];
}

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Shared styles
const card = { background: '#18181b', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' as const };
const cardHeader = { padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const };
const cardTitle = { fontSize: 14, fontWeight: 700, margin: 0 };
const subtleText = { fontSize: 11, color: '#52525b' };

export function NicheMetricsDashboard({ nicheSlug }: { nicheSlug: string }) {
  const niche = nicheSlug;
  const nicheName = NICHE_NAMES[niche] || niche;

  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authed, setAuthed] = useState(false);
  const [key, setKey] = useState('');
  const [days, setDays] = useState(30);
  const [tab, setTab] = useState<'overview' | 'traffic' | 'leads' | 'events'>('overview');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? sessionStorage.getItem('_kraft_niche_key') : null;
    if (saved) { setKey(saved); setAuthed(true); }
  }, []);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/kraftai/metrics?subdomain=${niche}&days=${days}&key=${encodeURIComponent(key)}`);
      if (res.status === 401) {
        setError('Invalid admin key');
        setAuthed(false);
        sessionStorage.removeItem('_kraft_niche_key');
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch {
      setError('Failed to load metrics');
    } finally {
      setLoading(false);
    }
  }, [niche, key, days]);

  useEffect(() => {
    if (authed) fetchMetrics();
  }, [authed, fetchMetrics]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) { sessionStorage.setItem('_kraft_niche_key', key.trim()); setAuthed(true); }
  };

  // --- Login Screen ---
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <form onSubmit={handleLogin} style={{ background: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 40, width: 400, maxWidth: '90vw', textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, background: 'rgba(99,91,255,0.15)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#635bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fafafa', marginBottom: 4 }}>{nicheName} Metrics</h1>
          <p style={{ fontSize: 14, color: '#71717a', marginBottom: 28 }}>Enter your admin key to access the dashboard</p>
          <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Admin key" autoFocus
            style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: '#0f0f12', color: '#fafafa', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', marginBottom: 14 }} />
          <button type="submit" disabled={!key.trim()} style={{ width: '100%', padding: 14, borderRadius: 12, background: '#635bff', color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit', opacity: key.trim() ? 1 : 0.5 }}>
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div style={{ minHeight: '100vh', background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 32, height: 32, border: '3px solid rgba(99,91,255,0.3)', borderTopColor: '#635bff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#71717a', fontSize: 14 }}>Loading metrics...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const { overview, traffic, leads, events } = data;

  // Build daily chart data (fill gaps)
  const dailyMap: Record<string, number> = {};
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now); d.setDate(d.getDate() - i);
    dailyMap[d.toISOString().split('T')[0]] = 0;
  }
  traffic.daily.forEach((d) => { dailyMap[d.date] = parseInt(d.views); });
  const dailyTraffic = Object.entries(dailyMap).map(([date, views]) => ({ date, views }));
  const maxViews = Math.max(...dailyTraffic.map((d) => d.views), 1);

  const dailyLeadMap: Record<string, number> = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now); d.setDate(d.getDate() - i);
    dailyLeadMap[d.toISOString().split('T')[0]] = 0;
  }
  leads.daily.forEach((d) => { dailyLeadMap[d.date] = d.count; });
  const dailyLeads = Object.entries(dailyLeadMap).map(([date, count]) => ({ date, count }));
  const maxLeads = Math.max(...dailyLeads.map((d) => d.count), 1);

  const tabBtn = (t: typeof tab, label: string) => (
    <button key={t} onClick={() => setTab(t)}
      style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: tab === t ? 'rgba(99,91,255,0.2)' : 'transparent', color: tab === t ? '#a78bfa' : '#71717a', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
      {label}
    </button>
  );

  const dayBtn = (d: number) => (
    <button key={d} onClick={() => setDays(d)}
      style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: days === d ? 'rgba(99,91,255,0.15)' : 'transparent', color: days === d ? '#a78bfa' : '#52525b', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
      {d}d
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', fontFamily: "'Inter', -apple-system, sans-serif", color: '#fafafa' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#0f0f12', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, background: 'rgba(99,91,255,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#635bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: 16 }}>
              KraftAI <span style={{ color: '#635bff' }}>{nicheName}</span> <span style={{ color: '#71717a', fontWeight: 500 }}>Metrics</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/" style={{ fontSize: 13, color: '#71717a', textDecoration: 'none' }}>← Back to site</Link>
            <button onClick={() => fetchMetrics()} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#a1a1aa', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' }}>Refresh</button>
            <button onClick={() => { sessionStorage.removeItem('_kraft_niche_key'); setAuthed(false); setKey(''); }} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: 'transparent', color: '#71717a', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' }}>Sign out</button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        {error && <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: 13, marginBottom: 24 }}>{error}</div>}

        {/* Tabs + Period */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {tabBtn('overview', 'Overview')}
            {tabBtn('traffic', 'Traffic')}
            {tabBtn('leads', 'Leads')}
            {tabBtn('events', 'Events')}
          </div>
          <div style={{ display: 'flex', gap: 2, background: '#18181b', borderRadius: 8, padding: 2 }}>
            {[7, 14, 30, 90].map(dayBtn)}
          </div>
        </div>

        {/* ===== OVERVIEW TAB ===== */}
        {tab === 'overview' && (
          <>
            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
              {[
                { label: 'Pageviews', value: overview.total_pageviews, color: '#635bff' },
                { label: 'Unique Sessions', value: overview.unique_sessions, color: '#8b5cf6' },
                { label: 'Today', value: overview.today_visitors, color: '#10b981' },
                { label: 'Leads', value: overview.total_leads, color: '#3b82f6' },
                { label: 'New Leads', value: overview.new_leads, color: '#f59e0b' },
                { label: 'Conversion', value: `${overview.conversion_rate}%`, color: '#ec4899' },
                { label: 'Avg Duration', value: `${overview.avg_duration_seconds}s`, color: '#06b6d4' },
                { label: 'Bot Visits', value: overview.bot_visits, color: '#71717a' },
              ].map((s) => (
                <div key={s.label} style={{ ...card, padding: 20 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#71717a', marginBottom: 10 }}>{s.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Daily Traffic Chart */}
            <div style={{ ...card, marginBottom: 24 }}>
              <div style={cardHeader}>
                <h2 style={cardTitle}>Traffic — Last {days} Days</h2>
                <span style={subtleText}>Total: {overview.total_pageviews}</span>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 120 }}>
                  {dailyTraffic.map((d, i) => (
                    <div key={i} title={`${d.date}: ${d.views} views`}
                      style={{ flex: 1, height: `${Math.max((d.views / maxViews) * 100, 3)}%`, background: d.views > 0 ? 'rgba(99,91,255,0.5)' : 'rgba(255,255,255,0.04)', borderRadius: '3px 3px 0 0', minWidth: 3, cursor: 'default', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => { if (d.views > 0) (e.target as HTMLElement).style.background = 'rgba(99,91,255,0.8)'; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.background = d.views > 0 ? 'rgba(99,91,255,0.5)' : 'rgba(255,255,255,0.04)'; }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, ...subtleText }}>
                  <span>{dailyTraffic[0]?.date.slice(5)}</span>
                  <span>{dailyTraffic[dailyTraffic.length - 1]?.date.slice(5)}</span>
                </div>
              </div>
            </div>

            {/* Conversion Funnel + Events */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div style={card}>
                <div style={cardHeader}><h2 style={cardTitle}>Conversion Funnel</h2></div>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { stage: 'Page Views', value: overview.total_pageviews, pct: 100, color: '#635bff' },
                    { stage: 'Unique Sessions', value: overview.unique_sessions, pct: overview.total_pageviews > 0 ? (overview.unique_sessions / overview.total_pageviews) * 100 : 0, color: '#8b5cf6' },
                    { stage: 'Leads Submitted', value: overview.total_leads, pct: overview.unique_sessions > 0 ? (overview.total_leads / overview.unique_sessions) * 100 : 0, color: '#3b82f6' },
                  ].map((f) => (
                    <div key={f.stage}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 13, color: '#a1a1aa' }}>{f.stage}</span>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{f.value}</span>
                      </div>
                      <div style={{ height: 6, background: 'rgba(255,255,255,0.04)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${Math.max(f.pct, 2)}%`, background: f.color, borderRadius: 3, transition: 'width 0.5s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={card}>
                <div style={cardHeader}><h2 style={cardTitle}>Events</h2></div>
                <div style={{ padding: 20 }}>
                  {events.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#3f3f46', fontSize: 13, padding: 32 }}>No events recorded yet</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {events.map((ev) => (
                        <div key={ev.event_type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 13, color: '#d4d4d8' }}>{ev.event_type}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: '#a78bfa' }}>{ev.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== TRAFFIC TAB ===== */}
        {tab === 'traffic' && (
          <>
            {/* Device / Browser / OS breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
              {[
                { title: 'Devices', items: traffic.devices.map((d) => ({ label: d.device, count: parseInt(d.count) })) },
                { title: 'Browsers', items: traffic.browsers.map((d) => ({ label: d.browser, count: parseInt(d.count) })) },
                { title: 'OS', items: traffic.os.map((d) => ({ label: d.os, count: parseInt(d.count) })) },
              ].map((section) => (
                <div key={section.title} style={card}>
                  <div style={cardHeader}><h2 style={cardTitle}>{section.title}</h2></div>
                  <div style={{ padding: 20 }}>
                    {section.items.length === 0 ? (
                      <p style={{ textAlign: 'center', color: '#3f3f46', fontSize: 13, padding: 20 }}>No data</p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {section.items.map((item) => (
                          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 13, color: '#d4d4d8' }}>{item.label}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{item.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Countries + Top Pages */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div style={card}>
                <div style={cardHeader}><h2 style={cardTitle}>Countries</h2></div>
                <div style={{ padding: 20 }}>
                  {traffic.countries.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#3f3f46', fontSize: 13, padding: 20 }}>No data</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {traffic.countries.map((c) => (
                        <div key={c.country} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 13, color: '#d4d4d8' }}>{c.country}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{c.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div style={card}>
                <div style={cardHeader}><h2 style={cardTitle}>Top Pages</h2></div>
                <div style={{ padding: 20 }}>
                  {traffic.top_pages.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#3f3f46', fontSize: 13, padding: 20 }}>No data</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {traffic.top_pages.map((p) => (
                        <div key={p.page} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                          <span style={{ fontSize: 13, color: '#d4d4d8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.page}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{p.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Referrers + UTM */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div style={card}>
                <div style={cardHeader}><h2 style={cardTitle}>Top Referrers</h2></div>
                <div style={{ padding: 20 }}>
                  {traffic.top_referrers.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#3f3f46', fontSize: 13, padding: 20 }}>No referrer data</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {traffic.top_referrers.map((r) => (
                        <div key={r.referrer} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                          <span style={{ fontSize: 13, color: '#d4d4d8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.referrer}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{r.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div style={card}>
                <div style={cardHeader}><h2 style={cardTitle}>UTM Campaigns</h2></div>
                <div style={{ padding: 20 }}>
                  {traffic.utm.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#3f3f46', fontSize: 13, padding: 20 }}>No UTM data</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {traffic.utm.map((u, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                          <span style={{ fontSize: 13, color: '#d4d4d8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {u.utm_source}{u.utm_medium ? ` / ${u.utm_medium}` : ''}{u.utm_campaign ? ` / ${u.utm_campaign}` : ''}
                          </span>
                          <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{u.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Visitors */}
            <div style={{ ...card, marginBottom: 24 }}>
              <div style={cardHeader}>
                <h2 style={cardTitle}>Recent Visitors</h2>
                <span style={subtleText}>{traffic.recent.length} shown</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Page', 'Country', 'Device', 'Browser', 'Referrer', 'Duration', 'When'].map((h) => (
                        <th key={h} style={{ textAlign: 'left', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#52525b', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {traffic.recent.length === 0 ? (
                      <tr><td colSpan={7} style={{ textAlign: 'center', padding: 48, color: '#3f3f46', fontSize: 13 }}>No visitors yet</td></tr>
                    ) : traffic.recent.map((v) => (
                      <tr key={v.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '10px 12px', fontSize: 12, color: '#d4d4d8', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.page}</td>
                        <td style={{ padding: '10px 12px', fontSize: 12, color: '#d4d4d8' }}>{v.country || '—'}{v.city ? `, ${v.city}` : ''}</td>
                        <td style={{ padding: '10px 12px', fontSize: 12, color: '#d4d4d8' }}>{v.device}</td>
                        <td style={{ padding: '10px 12px', fontSize: 12, color: '#d4d4d8' }}>{v.browser}</td>
                        <td style={{ padding: '10px 12px', fontSize: 12, color: '#71717a', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.referrer || '—'}</td>
                        <td style={{ padding: '10px 12px', fontSize: 12, color: '#d4d4d8' }}>{v.duration > 0 ? `${v.duration}s` : '—'}</td>
                        <td style={{ padding: '10px 12px', fontSize: 11, color: '#71717a', whiteSpace: 'nowrap' }} title={new Date(v.created_at).toLocaleString()}>{getTimeAgo(v.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ===== LEADS TAB ===== */}
        {tab === 'leads' && (
          <>
            {/* Daily Leads Chart */}
            <div style={{ ...card, marginBottom: 24 }}>
              <div style={cardHeader}>
                <h2 style={cardTitle}>Leads — Last {days} Days</h2>
                <span style={subtleText}>Total: {overview.total_leads}</span>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 120 }}>
                  {dailyLeads.map((d, i) => (
                    <div key={i} title={`${d.date}: ${d.count} lead${d.count !== 1 ? 's' : ''}`}
                      style={{ flex: 1, height: `${Math.max((d.count / maxLeads) * 100, 3)}%`, background: d.count > 0 ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.04)', borderRadius: '3px 3px 0 0', minWidth: 3, cursor: 'default', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => { if (d.count > 0) (e.target as HTMLElement).style.background = 'rgba(59,130,246,0.8)'; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.background = d.count > 0 ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.04)'; }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, ...subtleText }}>
                  <span>{dailyLeads[0]?.date.slice(5)}</span>
                  <span>{dailyLeads[dailyLeads.length - 1]?.date.slice(5)}</span>
                </div>
              </div>
            </div>

            {/* Leads by Source + Country */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div style={card}>
                <div style={cardHeader}><h2 style={cardTitle}>By Source</h2></div>
                <div style={{ padding: 20 }}>
                  {leads.by_source.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#3f3f46', fontSize: 13, padding: 20 }}>No leads yet</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {leads.by_source.map((s) => (
                        <div key={s.source} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 13, color: '#d4d4d8' }}>{s.source}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{s.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div style={card}>
                <div style={cardHeader}><h2 style={cardTitle}>By Country</h2></div>
                <div style={{ padding: 20 }}>
                  {leads.by_country.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#3f3f46', fontSize: 13, padding: 20 }}>No leads yet</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {leads.by_country.map((c) => (
                        <div key={c.country} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 13, color: '#d4d4d8' }}>{c.country}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{c.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Leads Table */}
            <div style={{ ...card, marginBottom: 24 }}>
              <div style={cardHeader}>
                <h2 style={cardTitle}>Recent Leads</h2>
                <span style={subtleText}>{leads.recent.length} shown</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Name', 'Email', 'Phone', 'Company', 'Source', 'Country', 'When'].map((h) => (
                        <th key={h} style={{ textAlign: 'left', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#52525b', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leads.recent.length === 0 ? (
                      <tr><td colSpan={7} style={{ textAlign: 'center', padding: 48, color: '#3f3f46', fontSize: 13 }}>No leads captured yet</td></tr>
                    ) : leads.recent.map((lead) => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '10px 12px', fontSize: 13 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(99,91,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#a78bfa', flexShrink: 0 }}>
                              {lead.name?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <span style={{ fontWeight: 600 }}>{lead.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '10px 12px', fontSize: 12, color: '#d4d4d8' }}>{lead.email}</td>
                        <td style={{ padding: '10px 12px', fontSize: 12, color: '#d4d4d8' }}>{lead.phone}</td>
                        <td style={{ padding: '10px 12px', fontSize: 12, color: '#d4d4d8' }}>{lead.company}</td>
                        <td style={{ padding: '10px 12px', fontSize: 12, color: '#a78bfa' }}>{lead.source}</td>
                        <td style={{ padding: '10px 12px', fontSize: 12, color: '#d4d4d8' }}>{lead.country || '—'}</td>
                        <td style={{ padding: '10px 12px', fontSize: 11, color: '#71717a', whiteSpace: 'nowrap' }} title={new Date(lead.created_at).toLocaleString()}>{getTimeAgo(lead.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ===== EVENTS TAB ===== */}
        {tab === 'events' && (
          <div style={{ ...card, marginBottom: 24 }}>
            <div style={cardHeader}>
              <h2 style={cardTitle}>Events Breakdown</h2>
              <span style={subtleText}>{events.reduce((a, e) => a + e.count, 0)} total</span>
            </div>
            <div style={{ padding: 20 }}>
              {events.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#3f3f46', fontSize: 13, padding: 48 }}>No events recorded yet. Events are tracked automatically when visitors interact with CTAs, scroll, and navigate.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {events.map((ev) => {
                    const total = events.reduce((a, e) => a + e.count, 0);
                    const pct = total > 0 ? (ev.count / total) * 100 : 0;
                    return (
                      <div key={ev.event_type}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 13, color: '#d4d4d8' }}>{ev.event_type}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{ev.count}</span>
                        </div>
                        <div style={{ height: 6, background: 'rgba(255,255,255,0.04)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: '#635bff', borderRadius: 3, transition: 'width 0.5s' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <style>{`
        @media (max-width: 768px) {
          main > div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
          main > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// Default export for the [niche] dynamic route fallback
export default function NicheMetricsPage() {
  const params = useParams();
  return <NicheMetricsDashboard nicheSlug={params.niche as string} />;
}
