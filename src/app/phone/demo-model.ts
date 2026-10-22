export const BRANCHES = ["Bromsgrove", "Evesham", "Newark", "Redditch"] as const;
export type Branch = (typeof BRANCHES)[number];
export const STAGES = ["Diagnosis", "Awaiting approval", "Approved", "In repair", "Ready to collect", "Collected"] as const;
export type Stage = (typeof STAGES)[number];

export type Repair = {
  id: string;
  customer: string;
  device: string;
  colour: string;
  issue: string;
  branch: Branch;
  stage: Stage;
  technician: string;
  partId: string;
  partsPrice: number;
  labour: number;
  checkedIn: string;
  history: { label: string; at: string }[];
};
export type Part = { id: string; name: string; detail: string; stock: Record<Branch, number>; reorderAt: number };
export type Activity = { id: string; label: string; detail: string; at: string; kind: "repair" | "quote" | "stock" | "collection" };
export type Transfer = { id: string; partId: string; from: Branch; to: Branch; quantity: number; at: string };
export type DemoState = { version: 1; repairs: Repair[]; parts: Part[]; activity: Activity[]; transfers: Transfer[] };

const at = (time: string) => `2026-10-22T${time}:00+01:00`;
const repair = (id: string, customer: string, device: string, colour: string, issue: string, branch: Branch, stage: Stage, technician: string, partId: string, partsPrice: number, labour: number, time: string): Repair => ({
  id, customer, device, colour, issue, branch, stage, technician, partId, partsPrice, labour,
  checkedIn: at(time), history: [{ label: "Device checked in", at: at(time) }, ...(stage === "Diagnosis" ? [] : [{ label: "Sample quote prepared", at: at(time) }])],
});

export const INITIAL_STATE: DemoState = {
  version: 1,
  repairs: [
    repair("DP-1042", "Alex Morgan", "iPhone 14", "#e8dff5", "Cracked screen · display replacement", "Bromsgrove", "Awaiting approval", "Jamie", "iphone-14-screen", 79, 30, "09:12"),
    repair("DP-1041", "Sam Taylor", "Samsung Galaxy S23", "#dce8f5", "Battery drains quickly", "Evesham", "In repair", "Casey", "s23-battery", 35, 25, "08:50"),
    repair("DP-1040", "Jordan Ellis", "iPhone 13", "#e8e7dc", "Charging port not responding", "Newark", "Diagnosis", "Riley", "iphone-13-port", 29, 30, "09:25"),
    repair("DP-1039", "Charlie Reed", "iPad Air", "#dcece6", "Screen replacement", "Redditch", "Ready to collect", "Robin", "ipad-air-screen", 99, 40, "08:40"),
    repair("DP-1038", "Robin Parker", "iPhone 14", "#ece0dc", "Cracked screen", "Evesham", "Approved", "Casey", "iphone-14-screen", 79, 30, "08:32"),
    repair("DP-1037", "Cameron Blake", "Samsung Galaxy S23", "#dde4ed", "Battery replacement", "Bromsgrove", "Ready to collect", "Jamie", "s23-battery", 35, 25, "08:20"),
    repair("DP-1036", "Avery Quinn", "iPhone 13", "#e5e2f0", "Charging port replacement", "Redditch", "Awaiting approval", "Robin", "iphone-13-port", 29, 30, "08:15"),
    repair("DP-1035", "Drew Finley", "iPad Air", "#e0e9eb", "Screen replacement", "Newark", "Collected", "Riley", "ipad-air-screen", 99, 40, "08:05"),
  ],
  parts: [
    { id: "iphone-14-screen", name: "iPhone 14 display", detail: "Screen assembly", stock: { Bromsgrove: 2, Evesham: 5, Newark: 0, Redditch: 3 }, reorderAt: 2 },
    { id: "s23-battery", name: "Galaxy S23 battery", detail: "Replacement battery", stock: { Bromsgrove: 4, Evesham: 2, Newark: 3, Redditch: 1 }, reorderAt: 2 },
    { id: "iphone-13-port", name: "iPhone 13 charging port", detail: "Charging port assembly", stock: { Bromsgrove: 3, Evesham: 1, Newark: 2, Redditch: 4 }, reorderAt: 2 },
    { id: "ipad-air-screen", name: "iPad Air display", detail: "Screen assembly", stock: { Bromsgrove: 1, Evesham: 3, Newark: 2, Redditch: 2 }, reorderAt: 2 },
  ],
  activity: [
    { id: "seed-1", label: "A quote is waiting for Alex", detail: "DP-1042 · Bromsgrove", at: at("09:35"), kind: "quote" },
    { id: "seed-2", label: "Charlie's iPad is ready to collect", detail: "DP-1039 · Redditch", at: at("09:28"), kind: "collection" },
    { id: "seed-3", label: "Jordan's repair checked in", detail: "DP-1040 · Newark", at: at("09:25"), kind: "repair" },
  ],
  transfers: [],
};

export type DemoAction =
  | { type: "advance"; id: string; target: Stage; at: string }
  | { type: "quote"; id: string; labour: number; at: string }
  | { type: "transfer"; partId: string; from: Branch; to: Branch; quantity: number; at: string }
  | { type: "intake"; repair: Repair; at: string }
  | { type: "reset" };

const NEXT: Partial<Record<Stage, Stage>> = { "Awaiting approval": "Approved", Approved: "In repair", "In repair": "Ready to collect", "Ready to collect": "Collected" };
const LABEL: Partial<Record<Stage, string>> = { Approved: "Customer approved the sample quote", "In repair": "Repair started · one part used", "Ready to collect": "Quality check complete · ready for collection", Collected: "Device collected" };

export function transition(state: DemoState, action: DemoAction): { state: DemoState; message: string; ok: boolean } {
  const fail = (message: string) => ({ state, message, ok: false });
  const result = (next: DemoState, message: string) => ({ state: next, message, ok: true });
  const log = (entry: Omit<Activity, "id" | "at">) => [{ ...entry, id: `activity-${action.type === "reset" ? "reset" : action.at}-${state.activity.length}`, at: action.type === "reset" ? "" : action.at }, ...state.activity].slice(0, 40);
  if (action.type === "reset") return result(structuredClone(INITIAL_STATE), "Sample workspace reset. You're ready to explore again.");
  if (action.type === "transfer") {
    const part = state.parts.find(p => p.id === action.partId);
    if (!part || !BRANCHES.includes(action.from) || !BRANCHES.includes(action.to) || action.from === action.to) return fail("Choose two different stores.");
    if (!Number.isInteger(action.quantity) || action.quantity < 1 || action.quantity > part.stock[action.from]) return fail("The sending store doesn't have enough stock for this transfer.");
    const stock = { ...part.stock, [action.from]: part.stock[action.from] - action.quantity, [action.to]: part.stock[action.to] + action.quantity };
    return result({ ...state, parts: state.parts.map(p => p.id === part.id ? { ...p, stock } : p), transfers: [{ id: `TR-${state.transfers.length + 101}`, partId: part.id, from: action.from, to: action.to, quantity: action.quantity, at: action.at }, ...state.transfers].slice(0, 30), activity: log({ label: `${action.quantity} × ${part.name} transferred`, detail: `${action.from} → ${action.to} · sample transfer`, kind: "stock" }) }, "Sample transfer complete. Both stores' stock counts have updated.");
  }
  if (action.type === "intake") {
    const r = action.repair;
    if (!r.customer.trim() || !r.device.trim() || !r.issue.trim() || !BRANCHES.includes(r.branch) || !state.parts.some(p => p.id === r.partId) || state.repairs.some(p => p.id === r.id) || r.stage !== "Diagnosis") return fail("Add a sample customer, device, issue and store.");
    return result({ ...state, repairs: [r, ...state.repairs], activity: log({ label: `${r.device} checked in`, detail: `${r.id} · ${r.branch} · sample repair`, kind: "repair" }) }, `Sample repair ${r.id} created.`);
  }
  const r = state.repairs.find(r => r.id === action.id);
  if (!r) return fail("That sample repair couldn't be found.");
  if (action.type === "quote") {
    if (r.stage !== "Diagnosis") return fail("This repair already has a quote.");
    if (!Number.isFinite(action.labour) || action.labour < 0 || action.labour > 1000) return fail("Enter a labour price between £0 and £1,000.");
    return result({ ...state, repairs: state.repairs.map(p => p.id === r.id ? { ...p, labour: Math.round(action.labour * 100) / 100, stage: "Awaiting approval", history: [...p.history, { label: "Sample quote prepared for customer approval", at: action.at }] } : p), activity: log({ label: `Quote prepared for ${r.customer.split(" ")[0]}`, detail: `${r.id} · customer approval available in preview`, kind: "quote" }) }, "Sample quote prepared. Open the customer view to approve it.");
  }
  if (NEXT[r.stage] !== action.target) return fail("Complete the previous repair step first.");
  const part = state.parts.find(p => p.id === r.partId);
  if (action.target === "In repair" && (!part || part.stock[r.branch] < 1)) return fail(`No part is available at ${r.branch}. Transfer one from another store first.`);
  return result({
    ...state,
    repairs: state.repairs.map(p => p.id === r.id ? { ...p, stage: action.target, history: [...p.history, { label: LABEL[action.target] ?? action.target, at: action.at }] } : p),
    parts: action.target === "In repair" ? state.parts.map(p => p.id === r.partId ? { ...p, stock: { ...p.stock, [r.branch]: p.stock[r.branch] - 1 } } : p) : state.parts,
    activity: log({ label: action.target === "Approved" ? `${r.customer.split(" ")[0]} approved their quote` : action.target === "Ready to collect" ? `${r.device} is ready to collect` : action.target === "Collected" ? `${r.customer.split(" ")[0]} collected their device` : `Repair started on ${r.device}`, detail: `${r.id} · ${r.branch}`, kind: action.target === "Approved" ? "quote" : action.target === "Ready to collect" || action.target === "Collected" ? "collection" : "repair" }),
  }, action.target === "Approved" ? "Sample quote approved. Switch to the repair desk to start the work." : action.target === "Ready to collect" ? "Repair ready. The customer preview now shows collection details." : action.target === "Collected" ? "Sample repair completed and collected." : "Repair started. One part has been deducted from this store's stock.");
}

export function parseSavedState(value: string | null): DemoState | null {
  try {
    const data: unknown = JSON.parse(value ?? "null");
    if (!data || typeof data !== "object") return null;
    const d = data as DemoState;
    if (d.version !== 1 || !Array.isArray(d.repairs) || !Array.isArray(d.parts) || !Array.isArray(d.activity) || !Array.isArray(d.transfers) || d.repairs.length > 200) return null;
    if (!d.repairs.every(r => typeof r.id === "string" && typeof r.customer === "string" && typeof r.device === "string" && typeof r.issue === "string" && typeof r.colour === "string" && typeof r.technician === "string" && typeof r.checkedIn === "string" && BRANCHES.includes(r.branch) && STAGES.includes(r.stage) && Number.isFinite(r.partsPrice) && r.partsPrice >= 0 && Number.isFinite(r.labour) && r.labour >= 0 && Array.isArray(r.history) && r.history.every(h => typeof h.label === "string" && !Number.isNaN(Date.parse(h.at))))) return null;
    if (!INITIAL_STATE.parts.every(seed => d.parts.some(p => p.id === seed.id)) || !d.parts.every(p => typeof p.id === "string" && typeof p.name === "string" && typeof p.detail === "string" && Number.isInteger(p.reorderAt) && p.reorderAt >= 0 && p.stock && BRANCHES.every(b => Number.isInteger(p.stock[b]) && p.stock[b] >= 0)) || !d.repairs.every(r => d.parts.some(p => p.id === r.partId))) return null;
    if (!d.activity.every(a => typeof a.id === "string" && typeof a.label === "string" && typeof a.detail === "string" && !Number.isNaN(Date.parse(a.at)) && ["repair", "quote", "stock", "collection"].includes(a.kind))) return null;
    if (!d.transfers.every(t => typeof t.id === "string" && d.parts.some(p => p.id === t.partId) && BRANCHES.includes(t.from) && BRANCHES.includes(t.to) && t.from !== t.to && Number.isInteger(t.quantity) && t.quantity > 0 && !Number.isNaN(Date.parse(t.at)))) return null;
    return d;
  } catch { return null; }
}

export const money = (value: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(value) ? 0 : 2 }).format(value);
export const timeLabel = (value: string) => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" }).format(new Date(value));
