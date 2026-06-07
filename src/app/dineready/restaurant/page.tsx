'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

/* ───────── Types ───────── */
interface OrderItem {
  name: string;
  qty: number;
  prepMin: number;
}

type Stage = 'far' | 'soon' | 'now' | 'cooking' | 'served';

interface Order {
  id: string;
  name: string;
  eta: number;
  stage: Stage;
  placedAt: string;
  items: OrderItem[];
  total: string;
  note?: string;
  cooking: Record<number, boolean>;
  ready: Record<number, boolean>;
}

/* ───────── Constants ───────── */
const STAGE_CONFIG: Record<Stage, { color: string; label: string; btn: string }> = {
  far:     { color: '#3a3a5c', label: 'Far Away',   btn: 'Start Cooking' },
  soon:    { color: '#f5c842', label: 'Start Soon',  btn: 'Start Prep' },
  now:     { color: '#FF6B35', label: 'Start NOW',   btn: 'Cooking ✓' },
  cooking: { color: '#2ecc71', label: 'Cooking',     btn: 'Mark Ready' },
  served:  { color: '#4a9eff', label: 'Served',      btn: 'Served ✓' },
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'DR-4421', name: 'Arjun', eta: 35, stage: 'far', placedAt: '9:42 AM',
    items: [
      { name: 'Butter Chicken', qty: 1, prepMin: 15 },
      { name: 'Garlic Naan', qty: 2, prepMin: 6 },
      { name: 'Mango Lassi', qty: 1, prepMin: 3 },
    ],
    total: '₹680', note: 'Less spicy please',
    cooking: {}, ready: {},
  },
  {
    id: 'DR-4422', name: 'Priya', eta: 14, stage: 'soon', placedAt: '9:51 AM',
    items: [
      { name: 'Paneer Tikka', qty: 1, prepMin: 12 },
      { name: 'Dal Makhani', qty: 1, prepMin: 18 },
      { name: 'Butter Naan', qty: 3, prepMin: 6 },
    ],
    total: '₹890',
    cooking: {}, ready: {},
  },
  {
    id: 'DR-4423', name: 'Rohit', eta: 3, stage: 'now', placedAt: '9:58 AM',
    items: [
      { name: 'Chicken Biryani', qty: 2, prepMin: 20 },
      { name: 'Raita', qty: 1, prepMin: 2 },
      { name: 'Gulab Jamun', qty: 2, prepMin: 4 },
    ],
    total: '₹1,140', note: 'Extra raita',
    cooking: { 0: true, 1: true, 2: true }, ready: {},
  },
  {
    id: 'DR-4419', name: 'Meera', eta: 0, stage: 'served', placedAt: '9:22 AM',
    items: [
      { name: 'Masala Dosa', qty: 1, prepMin: 10 },
      { name: 'Sambar', qty: 1, prepMin: 5 },
      { name: 'Filter Coffee', qty: 2, prepMin: 3 },
    ],
    total: '₹420',
    cooking: { 0: true, 1: true, 2: true }, ready: { 0: true, 1: true, 2: true },
  },
];

/* ───────── CircleTimer ───────── */
function CircleTimer({ eta, stage, size = 70 }: { eta: number; stage: Stage; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const maxEta = 40;
  const progress = stage === 'served' ? 1 : Math.max(0, 1 - eta / maxEta);
  const offset = circ * (1 - progress);
  const cfg = STAGE_CONFIG[stage];

  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={4} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={cfg.color} strokeWidth={4} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        fill="#e8e8f0" fontSize={stage === 'served' ? 22 : 16} fontFamily="'DM Mono', monospace" fontWeight={700}>
        {stage === 'served' ? '✓' : `${eta}m`}
      </text>
    </svg>
  );
}

/* ───────── ETABar ───────── */
function ETABar({ eta, stage }: { eta: number; stage: Stage }) {
  const stops = ['Ordered', 'En Route', 'Nearby', 'Arrived'];
  const maxEta = 40;
  const progress = stage === 'served' ? 100 : Math.max(0, Math.min(100, ((maxEta - eta) / maxEta) * 100));
  const cfg = STAGE_CONFIG[stage];

  return (
    <div style={{ width: '100%', padding: '12px 0' }}>
      <div style={{ position: 'relative', height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: cfg.color, borderRadius: 3, transition: 'width .4s' }} />
        <div style={{
          position: 'absolute', top: -8, left: `${progress}%`, transform: 'translateX(-50%)',
          fontSize: 16, transition: 'left .4s',
        }}>🚗</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        {stops.map((s) => (
          <span key={s} style={{ fontSize: 11, color: '#7a7a9a', fontFamily: "'DM Sans', sans-serif" }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

/* ───────── PrepRing (small SVG for modal items) ───────── */
function PrepRing({ prepMin, cooking, ready }: { prepMin: number; cooking: boolean; ready: boolean }) {
  const size = 44;
  const r = 16;
  const circ = 2 * Math.PI * r;
  const progress = ready ? 1 : cooking ? 0.5 : 0;
  const color = ready ? '#4a9eff' : cooking ? '#2ecc71' : '#3a3a5c';

  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={3} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={3}
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        fill="#e8e8f0" fontSize={10} fontFamily="'DM Mono', monospace">{prepMin}m</text>
    </svg>
  );
}

/* ───────── OrderCard ───────── */
function OrderCard({ order, onClick }: { order: Order; onClick: () => void }) {
  const cfg = STAGE_CONFIG[order.stage];
  const isNow = order.stage === 'now';
  const isSoon = order.stage === 'soon';

  return (
    <div onClick={onClick} style={{
      background: '#16213e', borderRadius: 16, padding: 20, cursor: 'pointer',
      border: `1px solid ${isNow ? cfg.color : 'rgba(255,255,255,0.07)'}`,
      boxShadow: isNow ? `0 0 24px ${cfg.color}33` : isSoon ? `0 0 12px ${cfg.color}18` : 'none',
      position: 'relative', overflow: 'hidden', transition: 'transform .2s, box-shadow .2s',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4)`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = isNow ? `0 0 24px ${cfg.color}33` : 'none'; }}
    >
      {isNow && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${cfg.color}, #ffaa35)`,
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        <CircleTimer eta={order.eta} stage={order.stage} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#e8e8f0', fontFamily: "'DM Sans', sans-serif" }}>{order.name}</span>
            <span style={{ fontSize: 12, color: '#7a7a9a', fontFamily: "'DM Mono', monospace", background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: 6 }}>{order.id}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: cfg.color, display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: cfg.color, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{cfg.label}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
        {order.items.map((item, i) => {
          const dotColor = order.ready[i] ? '#4a9eff' : order.cooking[i] ? '#2ecc71' : '#3a3a5c';
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#e8e8f0', flex: 1, fontFamily: "'DM Sans', sans-serif" }}>
                {item.name} × {item.qty}
              </span>
              <span style={{ fontSize: 11, color: '#7a7a9a', fontFamily: "'DM Mono', monospace" }}>{item.prepMin}m</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12 }}>
        <span style={{ fontSize: 12, color: '#7a7a9a', fontFamily: "'DM Sans', sans-serif" }}>{order.placedAt}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#e8e8f0', fontFamily: "'DM Mono', monospace" }}>{order.total}</span>
      </div>
    </div>
  );
}

/* ───────── OrderDetail Modal ───────── */
function OrderDetail({ order, onClose, onUpdate }: {
  order: Order;
  onClose: () => void;
  onUpdate: (updated: Order) => void;
}) {
  const cfg = STAGE_CONFIG[order.stage];
  const longestPrep = Math.max(...order.items.map(i => i.prepMin));
  const prepWarning = longestPrep > order.eta && order.stage !== 'served';

  const toggleCooking = (idx: number) => {
    const next = { ...order, cooking: { ...order.cooking, [idx]: !order.cooking[idx] } };
    onUpdate(next);
  };

  const toggleReady = (idx: number) => {
    const next = { ...order, ready: { ...order.ready, [idx]: !order.ready[idx] } };
    onUpdate(next);
  };

  const advanceStage = () => {
    const flow: Stage[] = ['far', 'soon', 'now', 'cooking', 'served'];
    const idx = flow.indexOf(order.stage);
    if (idx < flow.length - 1) {
      onUpdate({ ...order, stage: flow[idx + 1] });
    }
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#16213e', borderRadius: 20, width: 520, maxHeight: '85vh', overflowY: 'auto',
        border: '1px solid rgba(255,255,255,0.07)', padding: 28,
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: '#e8e8f0', fontFamily: "'DM Sans', sans-serif" }}>{order.name}</span>
              <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", background: 'rgba(255,255,255,0.06)', color: '#7a7a9a', padding: '3px 10px', borderRadius: 8 }}>{order.id}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: cfg.color, background: `${cfg.color}18`, padding: '3px 10px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.color }} />
                {cfg.label}
              </span>
            </div>
            <div style={{ fontSize: 13, color: '#7a7a9a', fontFamily: "'DM Sans', sans-serif" }}>
              Placed at {order.placedAt} &middot; Total <strong style={{ color: '#e8e8f0' }}>{order.total}</strong>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.06)', border: 'none', color: '#7a7a9a', width: 36, height: 36,
            borderRadius: 10, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        {order.note && (
          <div style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.15)', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#ffaa35', fontFamily: "'DM Sans', sans-serif" }}>
            📝 {order.note}
          </div>
        )}

        <ETABar eta={order.eta} stage={order.stage} />

        {prepWarning && (
          <div style={{ background: 'rgba(245,72,66,0.1)', border: '1px solid rgba(245,72,66,0.2)', borderRadius: 10, padding: '10px 14px', marginTop: 8, marginBottom: 8, fontSize: 13, color: '#f54842', fontFamily: "'DM Sans', sans-serif" }}>
            ⚠️ Longest prep ({longestPrep}m) exceeds remaining ETA ({order.eta}m)
          </div>
        )}

        {/* Items */}
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {order.items.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.03)',
              borderRadius: 12, padding: '10px 14px',
            }}>
              <PrepRing prepMin={item.prepMin} cooking={!!order.cooking[i]} ready={!!order.ready[i]} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#e8e8f0', fontFamily: "'DM Sans', sans-serif" }}>{item.name} × {item.qty}</div>
                <div style={{ fontSize: 12, color: '#7a7a9a', fontFamily: "'DM Mono', monospace" }}>{item.prepMin}m prep</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => toggleCooking(i)} style={{
                  padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  border: 'none', fontFamily: "'DM Sans', sans-serif",
                  background: order.cooking[i] ? '#2ecc71' : 'rgba(255,255,255,0.06)',
                  color: order.cooking[i] ? '#fff' : '#7a7a9a',
                }}>Cooking</button>
                <button onClick={() => toggleReady(i)} style={{
                  padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  border: 'none', fontFamily: "'DM Sans', sans-serif",
                  background: order.ready[i] ? '#4a9eff' : 'rgba(255,255,255,0.06)',
                  color: order.ready[i] ? '#fff' : '#7a7a9a',
                }}>Ready</button>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          {order.stage === 'far' && (
            <button onClick={onClose} style={{
              flex: 1, padding: '12px 0', borderRadius: 12, border: '1px solid rgba(245,72,66,0.3)',
              background: 'rgba(245,72,66,0.08)', color: '#f54842', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            }}>Reject</button>
          )}
          <button onClick={advanceStage} style={{
            flex: 1, padding: '12px 0', borderRadius: 12, border: 'none',
            background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)`,
            color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          }}>{cfg.btn}</button>
        </div>
      </div>
    </div>
  );
}

/* ───────── Main Page ───────── */
export default function RestaurantDashboard() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [acceptingOrders, setAcceptingOrders] = useState(true);
  const [clock, setClock] = useState('');

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ETA countdown
  useEffect(() => {
    const id = setInterval(() => {
      setOrders(prev => prev.map(o => o.eta > 0 ? { ...o, eta: o.eta - 1 } : o));
    }, 60000);
    return () => clearInterval(id);
  }, []);

  const handleOrderUpdate = useCallback((updated: Order) => {
    setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
  }, []);

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || null;
  const activeCount = orders.filter(o => o.stage !== 'served').length;

  const stageOrder: Stage[] = ['now', 'soon', 'cooking', 'far', 'served'];
  const sortedOrders = [...orders].sort((a, b) => stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        html, body { margin:0; padding:0; overflow:hidden; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>

      <div style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        background: '#0f0f1a', color: '#e8e8f0', fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* ── TopBar ── */}
        <div style={{
          height: 64, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', background: '#16213e', borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, #FF6B35, #ffaa35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            }}>🌶</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>Spice Junction</div>
              <div style={{ fontSize: 11, color: '#7a7a9a' }}>DineReady Kitchen</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            {/* Active Orders */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', padding: '6px 14px', borderRadius: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2ecc71', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>{activeCount} Active Orders</span>
            </div>

            {/* Clock */}
            <span style={{ fontSize: 15, fontFamily: "'DM Mono', monospace", color: '#7a7a9a', fontWeight: 500 }}>{clock}</span>

            {/* Bell */}
            <div style={{ position: 'relative', cursor: 'pointer', fontSize: 20 }}>
              🔔
              <span style={{
                position: 'absolute', top: -4, right: -6, width: 16, height: 16, borderRadius: '50%',
                background: '#f54842', fontSize: 10, fontWeight: 700, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>2</span>
            </div>

            {/* Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: acceptingOrders ? '#2ecc71' : '#f54842', fontWeight: 600 }}>
                {acceptingOrders ? 'Accepting Orders' : 'Paused'}
              </span>
              <div onClick={() => setAcceptingOrders(!acceptingOrders)} style={{
                width: 44, height: 24, borderRadius: 12, cursor: 'pointer', position: 'relative',
                background: acceptingOrders ? '#2ecc71' : '#f54842', transition: 'background .3s',
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute',
                  top: 3, left: acceptingOrders ? 23 : 3, transition: 'left .3s',
                }} />
              </div>
            </div>

            {/* Back link */}
            <Link href="/dineready/" style={{
              fontSize: 12, color: '#7a7a9a', textDecoration: 'none', padding: '6px 12px',
              borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)',
            }}>← DineReady</Link>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* ── Sidebar ── */}
          <div style={{
            width: 220, flexShrink: 0, background: '#16213e', borderRight: '1px solid rgba(255,255,255,0.07)',
            padding: 20, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#7a7a9a', textTransform: 'uppercase', letterSpacing: 1 }}>Today&apos;s Stats</div>

            {/* Stat Cards */}
            {([
              { label: 'Pre-orders today', value: '17', sub: '+3 from yesterday', color: '#4a9eff' },
              { label: 'Avg sit→served', value: '4.2m', sub: 'Top 10%', color: '#2ecc71' },
              { label: 'Tables turned', value: '31', sub: '', color: '#f5c842' },
              { label: 'DineReady revenue', value: '₹12,840', sub: '↑18% vs last Fri', color: '#FF6B35' },
            ] as const).map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '14px 14px 12px',
                borderLeft: `3px solid ${s.color}`,
              }}>
                <div style={{ fontSize: 11, color: '#7a7a9a', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#e8e8f0', fontFamily: "'DM Mono', monospace" }}>{s.value}</div>
                {s.sub && <div style={{ fontSize: 11, color: s.color, marginTop: 2 }}>{s.sub}</div>}
              </div>
            ))}

            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '4px 0' }} />

            <div style={{ fontSize: 12, fontWeight: 700, color: '#7a7a9a', textTransform: 'uppercase', letterSpacing: 1 }}>Status Key</div>
            {stageOrder.map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: STAGE_CONFIG[s].color }} />
                <span style={{ fontSize: 12, color: '#e8e8f0' }}>{STAGE_CONFIG[s].label}</span>
              </div>
            ))}
          </div>

          {/* ── Main Content ── */}
          <div style={{ flex: 1, padding: 28, overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Live Orders</h1>
              <span style={{ fontSize: 12, color: '#7a7a9a', background: 'rgba(255,255,255,0.04)', padding: '5px 12px', borderRadius: 8 }}>
                Last synced <span style={{ color: '#2ecc71' }}>just now</span>
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {sortedOrders.map(order => (
                <OrderCard key={order.id} order={order} onClick={() => setSelectedOrderId(order.id)} />
              ))}
            </div>

            {/* Bottom info bar */}
            <div style={{
              marginTop: 28, background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.12)',
              borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 18 }}>⚡</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#ffaa35' }}>Smart Kitchen Trigger</div>
                <div style={{ fontSize: 12, color: '#7a7a9a' }}>
                  Orders automatically move from &quot;Far Away&quot; to &quot;Start Soon&quot; and &quot;Start NOW&quot; based on real-time customer ETA — so you cook at the perfect moment.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Modal ── */}
        {selectedOrder && (
          <OrderDetail
            order={selectedOrder}
            onClose={() => setSelectedOrderId(null)}
            onUpdate={handleOrderUpdate}
          />
        )}
      </div>
    </>
  );
}
