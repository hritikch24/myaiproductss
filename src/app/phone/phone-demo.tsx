"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowDownLeft, ArrowLeft, ArrowRight, ArrowRightLeft, ArrowUpRight, Box, Check, CheckCheck, ChevronDown, ChevronRight, CircleCheck, Clock3, ClipboardList, ExternalLink, LayoutDashboard, MapPin, Menu, MessageSquare, Package, Plus, RotateCcw, Search, ShieldCheck, Smartphone, Sparkles, Store, Wrench, X, type LucideIcon } from "lucide-react";
import { BRANCHES, STAGES, money, timeLabel, type Branch, type DemoAction, type Part, type Repair, type Stage } from "./demo-model";
import { dispatch, useDemoStore } from "./demo-store";
import styles from "./phone.module.css";

type View = "overview" | "repairs" | "stock" | "customer";
type Scope = "All stores" | Branch;
type RepairFilter = Stage | "All statuses" | "Open repairs";
const NAV: { id: View; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "repairs", label: "Repair desk", icon: Wrench },
  { id: "stock", label: "Parts & stock", icon: Package },
  { id: "customer", label: "Customer preview", icon: Smartphone },
];
const STAGE_CLASS: Record<Stage, string> = { Diagnosis: "diagnosis", "Awaiting approval": "awaiting", Approved: "approved", "In repair": "repairing", "Ready to collect": "ready", Collected: "collected" };
const TECHNICIANS: Record<Branch, string> = { Bromsgrove: "Jamie", Evesham: "Casey", Newark: "Riley", Redditch: "Robin" };
const DEVICES = [
  { name: "iPhone 14", partId: "iphone-14-screen", price: 79, colour: "#e8dff5" },
  { name: "Samsung Galaxy S23", partId: "s23-battery", price: 35, colour: "#dce8f5" },
  { name: "iPhone 13", partId: "iphone-13-port", price: 29, colour: "#e8e7dc" },
  { name: "iPad Air", partId: "ipad-air-screen", price: 99, colour: "#dcece6" },
];
const initials = (name: string) => name.split(" ").map(s => s[0]).slice(0, 2).join("");
const stageIndex = (stage: Stage) => STAGES.indexOf(stage);
const now = () => new Date().toISOString();

function Brand({ compact = false }: { compact?: boolean }) {
  return <div className={styles.brand}><span className={styles.brandMark}><Smartphone size={22} strokeWidth={2} /></span><span><strong>DPHONES<span className={styles.brandDot}>.</span></strong>{!compact && <small>WORKBENCH</small>}</span></div>;
}
function Badge({ stage }: { stage: Stage }) {
  return <span className={`${styles.badge} ${styles[STAGE_CLASS[stage]]}`}><span />{stage}</span>;
}
function Device({ repair, small = false }: { repair: Repair; small?: boolean }) {
  return <span className={`${styles.device} ${small ? styles.deviceSmall : ""}`} style={{ background: repair.colour }}><Smartphone size={small ? 18 : 23} strokeWidth={1.65} /></span>;
}
function Modal({ title, eyebrow, children, onClose, side = false }: { title: string; eyebrow?: string; children: ReactNode; onClose: () => void; side?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    const bodyOverflow = document.body.style.overflow;
    const documentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      if (dialog?.open) dialog.close();
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = documentOverflow;
    };
  }, []);
  return <dialog ref={ref} aria-labelledby={titleId} className={`${styles.modal} ${side ? styles.sideModal : ""}`} onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className={styles.modalInner}>
      <header className={styles.modalHeader}><div>{eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}<h2 id={titleId}>{title}</h2></div><button className={styles.iconButton} aria-label="Close dialog" onClick={onClose}><X size={20} /></button></header>
      {children}
    </div>
  </dialog>;
}

export default function PhoneDemo({ initialView = "overview" }: { initialView?: View }) {
  const state = useDemoStore();
  const [view, setView] = useState<View>(initialView);
  const [scope, setScope] = useState<Scope>("All stores");
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<RepairFilter>("All statuses");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState("DP-1042");
  const [transferPart, setTransferPart] = useState<string | null>(null);
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState<{ text: string; error: boolean } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);
  const notify = (text: string, error = false) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ text, error });
    toastTimer.current = setTimeout(() => setToast(null), 6500);
  };
  const act = (action: DemoAction) => {
    const result = dispatch(action);
    notify(result.message, !result.ok);
    return result.ok;
  };
  const navigate = (next: View) => { setView(next); setMobileNav(false); setSelectedId(null); };
  const scoped = state.repairs.filter(r => scope === "All stores" || r.branch === scope);
  const open = scoped.filter(r => r.stage !== "Collected");
  const awaiting = scoped.filter(r => r.stage === "Awaiting approval");
  const ready = scoped.filter(r => r.stage === "Ready to collect");
  const stockCount = state.parts.reduce((sum, p) => sum + BRANCHES.filter(b => scope === "All stores" || b === scope).filter(b => p.stock[b] <= p.reorderAt).length, 0);
  const filtered = scoped.filter(r => (stageFilter === "All statuses" || (stageFilter === "Open repairs" ? r.stage !== "Collected" : r.stage === stageFilter)) && `${r.id} ${r.customer} ${r.device} ${r.issue}`.toLowerCase().includes(query.toLowerCase()));
  const selected = state.repairs.find(r => r.id === selectedId);
  const customer = state.repairs.find(r => r.id === customerId) ?? state.repairs[0];
  const featured = state.repairs.find(r => r.id === "DP-1042")!;
  const partToTransfer = state.parts.find(p => p.id === transferPart);
  const showCustomer = (id: string) => { setCustomerId(id); navigate("customer"); };
  const showDesk = (id: string) => { navigate("repairs"); setSelectedId(id); };
  const filterBy = (stage: RepairFilter) => { navigate("repairs"); setQuery(""); setStageFilter(stage); };
  const startTour = () => {
    setScope("All stores"); setQuery(""); setStageFilter("All statuses"); showDesk("DP-1042");
  };

  return <div className={styles.app}>
    <a href="#phone-main" className={styles.skipLink}>Skip to workspace</a>
    {mobileNav && <button className={styles.navBackdrop} aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
    <aside className={`${styles.sidebar} ${mobileNav ? styles.sidebarOpen : ""}`}>
      <a href="/phone" className={styles.brandLink} aria-label="DPHONES demo overview"><Brand /></a>
      <div className={styles.workspacePill}><span className={styles.workspaceAvatar}>D</span><div><strong>DPHONES workspace</strong><small>Four stores. One team.</small></div><ChevronDown size={15} aria-hidden="true" /></div>
      <p className={styles.navLabel}>WORKSPACE</p>
      <nav aria-label="Workspace navigation">{NAV.map(item => <button key={item.id} className={`${styles.navItem} ${view === item.id ? styles.navActive : ""}`} aria-current={view === item.id ? "page" : undefined} onClick={() => navigate(item.id)}><item.icon size={18} /><span>{item.label}</span>{item.id === "repairs" && <span className={styles.navCount}>{state.repairs.filter(r => r.stage !== "Collected").length}</span>}{item.id === "customer" && <ArrowUpRight size={14} className={styles.navArrow} />}</button>)}</nav>
      <div className={styles.sidebarNote}><div><Sparkles size={17} /><strong>Take it for a spin.</strong></div><p>Follow a sample repair from the first quote to a happy handover.</p><button onClick={startTour}>Try a repair journey <ArrowRight size={14} /></button></div>
      <div className={styles.sidebarBottom}><button className={styles.sidebarLink} onClick={() => setAboutOpen(true)}><ShieldCheck size={17} /> About this preview</button><button className={styles.sidebarLink} onClick={() => { act({ type: "reset" }); setCustomerId("DP-1042"); setScope("All stores"); setQuery(""); setStageFilter("All statuses"); }}><RotateCcw size={16} /> Reset demo</button><a className={styles.builtBy} href="https://kraftai.in" target="_blank" rel="noreferrer">A concept by <strong>KraftAI</strong><ArrowUpRight size={13} /></a></div>
    </aside>

    <div className={styles.workspace}>
      <header className={styles.topbar}>
        <div className={styles.breadcrumb}><button className={`${styles.iconButton} ${styles.mobileMenu}`} aria-label="Open navigation" aria-expanded={mobileNav} onClick={() => setMobileNav(true)}><Menu size={21} /></button><span>Workspace</span><ChevronRight size={14} /><strong>{NAV.find(n => n.id === view)?.label}</strong></div>
        <div className={styles.topbarRight}>{view !== "customer" && <label className={styles.storeSelect}><Store size={15} /><span className={styles.srOnly}>Filter by store</span><select value={scope} onChange={e => setScope(e.target.value as Scope)}><option>All stores</option>{BRANCHES.map(b => <option key={b}>{b}</option>)}</select><ChevronDown size={13} /></label>}<span className={styles.demoBadge}><span />Concept demo</span><span className={styles.operator} title="Sample operator">D</span></div>
      </header>
      <div className={styles.demoStrip}><span><span className={styles.demoDot} />Interactive preview <span className={styles.stripDivider}>/</span> Sample records. Changes stay in this browser.</span><button onClick={() => setAboutOpen(true)}>How it works <ArrowUpRight size={12} /></button></div>

      <main id="phone-main" className={styles.main} tabIndex={-1}>
        {view === "overview" && <>
          <div className={styles.pageHeading}><div><p className={styles.eyebrow}>YOUR REPAIR OPERATIONS, TOGETHER</p><h1>A clearer day at the desk<span>.</span></h1><p>Keep the work moving. Give every customer a clear next step.</p></div><button className={styles.primaryButton} onClick={() => setIntakeOpen(true)}><Plus size={17} /> New repair</button></div>
          <div className={styles.stats}>
            <Stat label="Open repairs" value={open.length} detail="Across the selected stores" icon={Wrench} colour="green" onClick={() => filterBy("Open repairs")} />
            <Stat label="Awaiting approval" value={awaiting.length} detail="A clear next step for customers" icon={Clock3} colour="amber" onClick={() => filterBy("Awaiting approval")} />
            <Stat label="Ready to collect" value={ready.length} detail="Ready for the handover" icon={CircleCheck} colour="blue" onClick={() => filterBy("Ready to collect")} />
            <Stat label="Stock to replenish" value={stockCount} detail="Store / part counts at the low level" icon={Box} colour="purple" onClick={() => navigate("stock")} />
          </div>
          <section className={styles.journey} aria-labelledby="journey-title"><div className={styles.journeyIcon}><ArrowRightLeft size={23} /></div><div className={styles.journeyText}><span className={styles.pillLabel}>THE WHOLE JOURNEY</span><h2 id="journey-title">One repair. Both sides of the counter.</h2><p>Try Alex&apos;s {featured.device} repair. Approve the quote as a customer, then finish the job at the desk.</p><div className={styles.journeySteps}>{["Quote approved", "Repair complete", "Device collected"].map((label, i) => <span key={label} className={stageIndex(featured.stage) >= [2, 4, 5][i] ? styles.journeyComplete : ""}>{stageIndex(featured.stage) >= [2, 4, 5][i] ? <Check size={12} /> : <span>{i + 1}</span>}{label}{i < 2 && <ChevronRight size={12} />}</span>)}</div></div><button className={styles.secondaryButton} onClick={startTour}>Explore the journey <ArrowRight size={15} /></button></section>
          <div className={styles.overviewGrid}><div className={styles.overviewLeft}>
            <section className={styles.panel}><div className={styles.panelHeader}><div><h2>At the repair desk</h2><p>A quick look at the work in progress.</p></div><button className={styles.textButton} onClick={() => filterBy("All statuses")}>View all repairs <ArrowUpRight size={14} /></button></div><RepairTable repairs={open.slice(0, 5)} onOpen={setSelectedId} compact />{!open.length && <EmptyState title="Nothing waiting at this store" text="Change the store filter or add a sample repair." />}</section>
            <section className={styles.panel}><div className={styles.panelHeader}><div><h2>From check-in to collection</h2><p>The sample workload at a glance.</p></div><span className={styles.quietTag}>Sample shift</span></div><div className={styles.pipeline}>{STAGES.slice(0, 5).map(stage => <button key={stage} onClick={() => filterBy(stage)}><div className={styles.pipelineTop}><span className={`${styles.stageDot} ${styles[STAGE_CLASS[stage]]}`} /><strong>{scoped.filter(r => r.stage === stage).length}</strong><ArrowUpRight size={14} /></div><span>{stage}</span><div className={styles.pipelineBar}><div style={{ width: `${Math.max(8, scoped.filter(r => r.stage === stage).length / Math.max(scoped.length, 1) * 100)}%` }} /></div></button>)}</div></section>
          </div><div className={styles.overviewRight}>
            <section className={styles.panel}><div className={styles.panelHeader}><div><h2>Across your stores</h2><p>One shared picture.</p></div><Store size={18} className={styles.mutedIcon} /></div><div className={styles.branchList}>{BRANCHES.map(b => { const count = state.repairs.filter(r => r.branch === b && r.stage !== "Collected").length; return <button key={b} onClick={() => { setScope(b); filterBy("Open repairs"); }}><span className={styles.branchIcon}><Store size={16} /></span><span><strong>{b}</strong><small>{count} open {count === 1 ? "repair" : "repairs"}</small></span><span className={styles.branchBars} aria-hidden="true">{[0, 1, 2, 3, 4, 5].map(n => <i key={n} className={n < count ? styles.barFilled : ""} />)}</span><ChevronRight size={14} /></button>; })}</div></section>
            <section className={styles.panel}><div className={styles.panelHeader}><div><h2>Latest activity</h2><p>Every handover has a trail.</p></div><span className={styles.activityDot} /></div><div className={styles.activityList}>{state.activity.slice(0, 4).map(a => <div className={styles.activityItem} key={a.id}><span className={styles.activityIcon}>{a.kind === "stock" ? <ArrowRightLeft size={15} /> : a.kind === "quote" ? <ClipboardList size={15} /> : a.kind === "collection" ? <CheckCheck size={15} /> : <Wrench size={15} />}</span><div><p>{a.label}</p><small>{a.detail}</small><time dateTime={a.at}>{timeLabel(a.at)}</time></div></div>)}</div></section>
          </div></div>
        </>}

        {view === "repairs" && <>
          <div className={styles.pageHeading}><div><p className={styles.eyebrow}>THE REPAIR DESK</p><h1>A place for every job<span>.</span></h1><p>From a cracked screen to a collected device, keep the next step clear.</p></div><button className={styles.primaryButton} onClick={() => setIntakeOpen(true)}><Plus size={17} /> New repair</button></div>
          <section className={styles.panel}><div className={styles.repairToolbar}><label className={styles.search}><Search size={17} /><span className={styles.srOnly}>Search repairs</span><input placeholder="Search device, customer or repair…" value={query} onChange={e => setQuery(e.target.value)} /></label><label className={styles.filterSelect}><span className={styles.srOnly}>Filter by status</span><select value={stageFilter} onChange={e => setStageFilter(e.target.value as RepairFilter)}><option>All statuses</option><option>Open repairs</option>{STAGES.map(s => <option key={s}>{s}</option>)}</select><ChevronDown size={14} /></label><span className={styles.resultCount}>{filtered.length} {filtered.length === 1 ? "repair" : "repairs"}</span></div><RepairTable repairs={filtered} onOpen={setSelectedId} />{!filtered.length && <EmptyState title="No repairs found" text="Try another search, store or status." action={<button className={styles.secondaryButton} onClick={() => { setQuery(""); setStageFilter("All statuses"); setScope("All stores"); }}>Clear filters</button>} />}<div className={styles.tableFooter}><ShieldCheck size={14} />Sample customers and illustrative quotes. No real repair records.</div></section>
          <div className={styles.tip}><span className={styles.tipIcon}><MessageSquare size={17} /></span><div><strong>See the customer&apos;s side.</strong><p>Open any repair, then choose Customer preview to see their quote and progress.</p></div><button className={styles.textButton} onClick={() => showCustomer("DP-1042")}>Try customer view <ArrowUpRight size={14} /></button></div>
        </>}

        {view === "stock" && <>
          <div className={styles.pageHeading}><div><p className={styles.eyebrow}>PARTS & INVENTORY</p><h1>The right part. The right store<span>.</span></h1><p>See what&apos;s on the shelf, then record a sample transfer between stores.</p></div><button className={styles.primaryButton} onClick={() => setTransferPart(state.parts[0].id)}><ArrowRightLeft size={17} /> Transfer parts</button></div>
          <div className={`${styles.stats} ${styles.stockStats}`}><Stat label="Units across all stores" value={state.parts.reduce((n, p) => n + BRANCHES.reduce((sum, b) => sum + p.stock[b], 0), 0)} detail="Sample inventory available" icon={Package} colour="green" /><Stat label="Part types" value={state.parts.length} detail="Displays, batteries and charging ports" icon={Box} colour="blue" /><Stat label="Sample transfers" value={state.transfers.length} detail="Recorded in this browser" icon={ArrowRightLeft} colour="purple" /></div>
          <section className={styles.panel}><div className={styles.panelHeader}><div><h2>Stock by store</h2><p>Low stock is highlighted at two units or fewer.</p></div><span className={styles.quietTag}>Illustrative inventory</span></div><div className={styles.tableScroll}><table className={`${styles.table} ${styles.stockTable}`}><thead><tr><th>PART</th>{BRANCHES.map(b => <th key={b} className={scope === b ? styles.highlightColumn : ""}>{b}</th>)}<th><span className={styles.srOnly}>Action</span></th></tr></thead><tbody>{state.parts.map(p => <tr key={p.id}><td><div className={styles.partName}><span><Package size={20} /></span><div><strong>{p.name}</strong><small>{p.detail}</small></div></div></td>{BRANCHES.map(b => <td key={b} className={scope === b ? styles.highlightColumn : ""}><span className={`${styles.stockNumber} ${p.stock[b] === 0 ? styles.stockEmpty : p.stock[b] <= p.reorderAt ? styles.stockLow : ""}`}>{p.stock[b]}</span>{p.stock[b] === 0 && <span className={styles.stockHint}>Out of stock</span>}</td>)}<td><button className={styles.textButton} aria-label={`Transfer ${p.name}`} onClick={() => setTransferPart(p.id)}>Transfer <ArrowRightLeft size={14} /></button></td></tr>)}</tbody></table></div></section>
          <section className={styles.panel}><div className={styles.panelHeader}><div><h2>Transfer history</h2><p>See where the sample parts went.</p></div><ArrowRightLeft size={18} className={styles.mutedIcon} /></div>{state.transfers.length ? <div className={styles.transferHistory}>{state.transfers.map(t => <div key={t.id}><span className={styles.activityIcon}><ArrowRightLeft size={16} /></span><div><strong>{t.quantity} × {state.parts.find(p => p.id === t.partId)?.name}</strong><p>{t.from} <ArrowRight size={12} /> {t.to}</p></div><span className={styles.transferMeta}>{t.id}<small>{timeLabel(t.at)}</small></span><span className={styles.transferDone}><Check size={13} />Recorded</span></div>)}</div> : <EmptyState title="The next move is yours" text="Try moving an iPhone display from Evesham to Newark. Both stock counts will update." action={<button className={styles.secondaryButton} onClick={() => setTransferPart("iphone-14-screen")}>Record a sample transfer <ArrowRight size={15} /></button>} />}</section>
        </>}

        {view === "customer" && customer && <>
          <div className={styles.pageHeading}><div><p className={styles.eyebrow}>THE CUSTOMER EXPERIENCE</p><h1>Less chasing. More clarity<span>.</span></h1><p>A simple status link. A clear quote. One place to see what happens next.</p></div><button className={styles.secondaryButton} onClick={() => showDesk(customer.id)}><ArrowLeft size={15} /> Back to repair desk</button></div>
          <div className={styles.customerLayout}><div className={styles.customerContext}><span className={styles.pillLabel}>CUSTOMER PREVIEW</span><h2>The other side of a great repair.</h2><p>This sample portal follows the same repair as your staff dashboard. Try approving Alex&apos;s quote here, then return to the desk to continue the repair.</p><label className={styles.field}><span>Preview a sample customer</span><select value={customer.id} onChange={e => setCustomerId(e.target.value)}>{state.repairs.map(r => <option key={r.id} value={r.id}>{r.customer} · {r.id}</option>)}</select></label><div className={styles.customerBenefits}><div><ShieldCheck size={19} /><span><strong>A clear approval</strong><small>Show the cost before the work starts.</small></span></div><div><Clock3 size={19} /><span><strong>A visible next step</strong><small>Progress, without a phone call.</small></span></div><div><CheckCheck size={19} /><span><strong>A smooth handover</strong><small>Ready-to-collect status in the same place.</small></span></div></div><p className={styles.sampleNote}>Concept only. Sample names, prices and repair states. No messages or payments are sent.</p><a className={styles.textButton} href="/phone/customer" target="_blank" rel="noreferrer">Open standalone customer demo <ExternalLink size={13} /></a></div>
            <CustomerPortal repair={customer} onApprove={() => act({ type: "advance", id: customer.id, target: "Approved", at: now() })} />
          </div>
        </>}
        <footer className={styles.footer}><span>DPHONES Workbench <span>·</span> An interactive concept, made for your team.</span><a href="https://wa.me/447780443069?text=Hi%20KraftAI%2C%20let%27s%20discuss%20the%20DPHONES%20demo." target="_blank" rel="noreferrer">Discuss this workflow <ArrowUpRight size={14} /></a></footer>
      </main>
    </div>

    {selected && <RepairDetails repair={selected} part={state.parts.find(p => p.id === selected.partId)!} onClose={() => setSelectedId(null)} onCustomer={() => showCustomer(selected.id)} onAction={act} onTransfer={() => { setTransferPart(selected.partId); setSelectedId(null); navigate("stock"); }} />}
    {partToTransfer && <TransferDialog part={partToTransfer} onClose={() => setTransferPart(null)} onSave={action => { if (act(action)) setTransferPart(null); }} />}
    {intakeOpen && <IntakeDialog nextId={`DP-${Math.max(...state.repairs.map(r => Number(r.id.replace("DP-", "")))) + 1}`} defaultBranch={scope === "All stores" ? "Bromsgrove" : scope} onClose={() => setIntakeOpen(false)} onSave={r => { if (act({ type: "intake", repair: r, at: now() })) { setIntakeOpen(false); setScope("All stores"); setQuery(""); setStageFilter("All statuses"); showDesk(r.id); } }} />}
    {aboutOpen && <Modal title="A working idea for your team." eyebrow="DPHONES × KRAFTAI" onClose={() => setAboutOpen(false)}><div className={styles.aboutBody}><p>This is an independent concept demo by KraftAI, prepared for DPHONES to explore. It is not DPHONES&apos; live repair system.</p><ol><li>Open Alex&apos;s repair and view the sample customer quote.</li><li>Approve it, then start and complete the repair at the desk.</li><li>Check the customer status, or try a transfer in Parts & stock.</li></ol><p>All customers, jobs, prices and inventory are illustrative. Changes are saved on this device. There are no live customer messages, payments or integrations.</p><button className={styles.primaryButton} onClick={() => { setAboutOpen(false); startTour(); }}>Try the repair journey <ArrowRight size={16} /></button></div></Modal>}
    {toast && <div className={`${styles.toast} ${toast.error ? styles.toastError : ""}`} role={toast.error ? "alert" : "status"}>{toast.error ? <ShieldCheck size={18} /> : <CircleCheck size={18} />}<span>{toast.text}</span><button onClick={() => setToast(null)} aria-label="Dismiss notification"><X size={15} /></button></div>}
  </div>;
}

function Stat({ label, value, detail, icon: Icon, colour, onClick }: { label: string; value: number; detail: string; icon: LucideIcon; colour: string; onClick?: () => void }) {
  const content = <><div className={styles.statLabel}><span>{label}</span><span className={`${styles.statIcon} ${styles[`tint${colour}`]}`}><Icon size={17} /></span></div><strong className={styles.statNumber}>{String(value).padStart(2, "0")}</strong><span className={styles.statDetail}>{detail}{onClick && <ArrowUpRight size={13} />}</span></>;
  return onClick ? <button className={styles.stat} onClick={onClick}>{content}</button> : <div className={styles.stat}>{content}</div>;
}
function EmptyState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return <div className={styles.emptyState}><span><ClipboardList size={24} /></span><h3>{title}</h3><p>{text}</p>{action}</div>;
}
function RepairTable({ repairs, onOpen, compact = false }: { repairs: Repair[]; onOpen: (id: string) => void; compact?: boolean }) {
  return <div className={styles.tableScroll}><table className={`${styles.table} ${compact ? styles.compactTable : ""}`}><thead><tr><th>DEVICE & CUSTOMER</th>{!compact && <th>REPAIR ID</th>}<th>STORE</th><th>STATUS</th>{!compact && <th>QUOTE</th>}<th><span className={styles.srOnly}>Open repair</span></th></tr></thead><tbody>{repairs.map(r => <tr key={r.id}><td><button className={styles.deviceCell} onClick={() => onOpen(r.id)} aria-label={`Open repair ${r.id}`}><Device repair={r} small /><span><strong>{r.device}</strong><small>{r.customer}{compact && <span> · {r.id}</span>}</small></span></button></td>{!compact && <td className={styles.mono}>{r.id}</td>}<td><span className={styles.storeCell}>{r.branch}</span></td><td><Badge stage={r.stage} /></td>{!compact && <td className={styles.quoteCell}>{money(r.partsPrice + r.labour)}</td>}<td><button className={styles.rowArrow} onClick={() => onOpen(r.id)} aria-label={`View ${r.id} details`}><ChevronRight size={17} /></button></td></tr>)}</tbody></table></div>;
}

function RepairDetails({ repair: r, part, onClose, onCustomer, onAction, onTransfer }: { repair: Repair; part: Part; onClose: () => void; onCustomer: () => void; onAction: (action: DemoAction) => boolean; onTransfer: () => void }) {
  const [labour, setLabour] = useState(String(r.labour));
  const stock = part.stock[r.branch];
  return <Modal title={r.id} eyebrow="REPAIR DETAILS" side onClose={onClose}><div className={styles.repairDetailBody}>
    <div className={styles.detailDevice}><Device repair={r} /><div><h3>{r.device}</h3><p>{r.issue}</p></div></div>
    <div className={styles.detailStatus}><Badge stage={r.stage} /><span><MapPin size={13} />{r.branch}</span></div>
    <div className={styles.detailPeople}><div><span className={styles.personAvatar}>{initials(r.customer)}</span><span><small>Sample customer</small><strong>{r.customer}</strong></span></div><div><span className={styles.techAvatar}>{r.technician[0]}</span><span><small>Assigned technician</small><strong>{r.technician}</strong></span></div></div>
    <section className={styles.detailSection}><div className={styles.sectionTitle}><h3>Sample quote</h3><span className={styles.quietTag}>{r.stage === "Awaiting approval" ? "Approval needed" : stageIndex(r.stage) >= 2 ? "Approved" : "Draft"}</span></div><div className={styles.quoteLines}><div><span>{part.name}</span><strong>{money(r.partsPrice)}</strong></div><div><span>Labour & quality check</span><strong>{money(r.labour)}</strong></div><div className={styles.quoteTotal}><span>Sample total</span><strong>{money(r.partsPrice + r.labour)}</strong></div></div>
      {r.stage === "Diagnosis" && <form className={styles.quoteForm} onSubmit={e => { e.preventDefault(); onAction({ type: "quote", id: r.id, labour: Number(labour), at: now() }); }}><label className={styles.field}><span>Labour price (£)</span><input type="number" min="0" max="1000" step="0.01" required value={labour} onChange={e => setLabour(e.target.value)} /></label><button className={styles.primaryButton} type="submit">Prepare sample quote <ArrowRight size={15} /></button></form>}
      {r.stage === "Awaiting approval" && <div className={styles.detailCallout}><MessageSquare size={18} /><div><strong>Let the customer take the next step.</strong><p>Open their preview to approve this sample quote.</p></div></div>}
      <button className={`${styles.secondaryButton} ${styles.fullWidth}`} onClick={onCustomer}><Smartphone size={16} />Open customer preview<ArrowUpRight size={15} /></button>
    </section>
    <section className={styles.detailSection}><div className={styles.sectionTitle}><h3>Part availability</h3><Package size={16} /></div><div className={styles.partAvailability}><div><strong>{part.name}</strong><small>{r.branch} stock</small></div><span className={`${styles.stockNumber} ${stock <= part.reorderAt ? styles.stockLow : ""}`}>{stock}</span></div>{r.stage === "Approved" && stock === 0 && <button className={styles.textButton} onClick={onTransfer}>Transfer a part from another store <ArrowRight size={14} /></button>}</section>
    <section className={styles.detailSection}><div className={styles.sectionTitle}><h3>Repair history</h3><Clock3 size={16} /></div><ol className={styles.history}>{r.history.map((h, i) => <li key={`${h.at}-${i}`}><span><Check size={11} /></span><div><p>{h.label}</p><time dateTime={h.at}>{timeLabel(h.at)}</time></div></li>)}</ol></section>
    <div className={styles.detailActions}>{r.stage === "Approved" && <button className={`${styles.primaryButton} ${styles.fullWidth}`} onClick={() => onAction({ type: "advance", id: r.id, target: "In repair", at: now() })}><Wrench size={16} />Start repair<ArrowRight size={16} /></button>}{r.stage === "In repair" && <button className={`${styles.primaryButton} ${styles.fullWidth}`} onClick={() => onAction({ type: "advance", id: r.id, target: "Ready to collect", at: now() })}><CheckCheck size={17} />Complete repair & quality check</button>}{r.stage === "Ready to collect" && <button className={`${styles.primaryButton} ${styles.fullWidth}`} onClick={() => onAction({ type: "advance", id: r.id, target: "Collected", at: now() })}><CircleCheck size={17} />Mark as collected</button>}{r.stage === "Collected" && <div className={styles.completedNotice}><CircleCheck size={20} /><span>A complete journey. Device collected.</span></div>}<p>Demo actions update sample records only.</p></div>
  </div></Modal>;
}

function CustomerPortal({ repair: r, onApprove }: { repair: Repair; onApprove: () => void }) {
  const copy: Record<Stage, { title: string; text: string }> = {
    Diagnosis: { title: "We're taking a look.", text: "Your sample repair is checked in. A quote will appear here after diagnosis." },
    "Awaiting approval": { title: "Your quote is ready.", text: `Hi ${r.customer.split(" ")[0]}, here's the sample quote for your ${r.device}. Take a look before the repair starts.` },
    Approved: { title: "You're all set.", text: "Your sample quote is approved. The repair desk can now start work on your device." },
    "In repair": { title: "A little closer to good as new.", text: "Your sample device is with the technician. You'll see the next step here when the repair is complete." },
    "Ready to collect": { title: "Ready when you are.", text: `Your sample ${r.device} has passed its quality check and is ready for collection at ${r.branch}.` },
    Collected: { title: "Back in your hands.", text: "This sample repair is complete and the device has been collected. That's the full journey." },
  };
  const stages = ["Checked in", "Quote approved", "In repair", "Ready to collect", "Collected"];
  const completed = r.stage === "Diagnosis" || r.stage === "Awaiting approval" ? 0 : stageIndex(r.stage) - 1;
  return <section className={styles.customerCard} aria-label="Sample customer repair portal"><header className={styles.customerCardHeader}><Brand compact /><span><ShieldCheck size={14} />Sample portal</span></header><div className={styles.customerCardBody}><span className={styles.customerReference}>YOUR REPAIR <strong>{r.id}</strong></span><div className={`${styles.customerHeroIcon} ${stageIndex(r.stage) >= 4 ? styles.customerHeroDone : ""}`}>{stageIndex(r.stage) >= 4 ? <CheckCheck size={33} /> : r.stage === "Awaiting approval" ? <ClipboardList size={31} /> : <Smartphone size={32} />}</div><h2>{copy[r.stage].title}</h2><p className={styles.customerIntro}>{copy[r.stage].text}</p><div className={styles.customerDevice}><Device repair={r} small /><div><strong>{r.device}</strong><small>{r.issue}</small></div><Badge stage={r.stage} /></div>
    {r.stage !== "Diagnosis" && <div className={styles.customerQuote}><div><span>Replacement part</span><strong>{money(r.partsPrice)}</strong></div><div><span>Labour & quality check</span><strong>{money(r.labour)}</strong></div><div><span>Sample total</span><strong>{money(r.partsPrice + r.labour)}</strong></div>{r.stage === "Awaiting approval" ? <button className={`${styles.primaryButton} ${styles.fullWidth}`} onClick={onApprove}>Approve sample quote <ArrowRight size={16} /></button> : <p className={styles.approvedNote}><CircleCheck size={15} />Quote approved · {money(r.partsPrice + r.labour)}</p>}<small>No payment is taken. This is an interactive preview.</small></div>}
    <div className={styles.customerTimeline}><h3>Your repair, step by step</h3>{stages.map((s, i) => <div key={s} className={i <= completed ? styles.timelineComplete : ""}><span>{i <= completed ? <Check size={12} /> : i + 1}</span><p>{s}</p>{i === completed && <small>Current step</small>}</div>)}</div>
    <div className={styles.customerBranch}><Store size={19} /><div><strong>DPHONES · {r.branch}</strong><small>Your sample repair location</small></div></div>
    </div><footer className={styles.customerCardFooter}>A concept preview by KraftAI · Sample data only</footer></section>;
}

function TransferDialog({ part, onClose, onSave }: { part: Part; onClose: () => void; onSave: (action: DemoAction) => void }) {
  const [from, setFrom] = useState<Branch>(BRANCHES.reduce((best, b) => part.stock[b] > part.stock[best] ? b : best, BRANCHES[0]));
  const [to, setTo] = useState<Branch>(BRANCHES.reduce((best, b) => part.stock[b] < part.stock[best] ? b : best, BRANCHES[0]));
  const [quantity, setQuantity] = useState("1");
  const submit = (e: FormEvent) => { e.preventDefault(); onSave({ type: "transfer", partId: part.id, from, to, quantity: Number(quantity), at: now() }); };
  return <Modal title="Put the part where it's needed." eyebrow="SAMPLE STOCK TRANSFER" onClose={onClose}><form className={styles.formBody} onSubmit={submit}><div className={styles.transferPart}><Package size={24} /><div><strong>{part.name}</strong><small>{part.detail}</small></div></div><div className={styles.formColumns}><label className={styles.field}><span>From store</span><select value={from} onChange={e => setFrom(e.target.value as Branch)}>{BRANCHES.map(b => <option key={b}>{b}</option>)}</select><small>{part.stock[from]} available</small></label><label className={styles.field}><span>To store</span><select value={to} onChange={e => setTo(e.target.value as Branch)}>{BRANCHES.map(b => <option key={b}>{b}</option>)}</select><small>{part.stock[to]} currently in stock</small></label></div><label className={styles.field}><span>Quantity</span><input type="number" min="1" step="1" max={Math.max(1, part.stock[from])} required value={quantity} onChange={e => setQuantity(e.target.value)} /></label><div className={styles.detailCallout}><ArrowDownLeft size={18} /><div><strong>A move you can see on both sides.</strong><p>Recording this sample transfer immediately updates both stores&apos; demo stock.</p></div></div><button className={`${styles.primaryButton} ${styles.fullWidth}`} type="submit">Record sample transfer <ArrowRightLeft size={16} /></button></form></Modal>;
}

function IntakeDialog({ nextId, defaultBranch, onClose, onSave }: { nextId: string; defaultBranch: Branch; onClose: () => void; onSave: (r: Repair) => void }) {
  const [customer, setCustomer] = useState("");
  const [deviceName, setDeviceName] = useState(DEVICES[0].name);
  const [issue, setIssue] = useState("");
  const [branch, setBranch] = useState<Branch>(defaultBranch);
  const submit = (e: FormEvent) => {
    e.preventDefault(); const device = DEVICES.find(d => d.name === deviceName)!; const checkedIn = now();
    onSave({ id: nextId, customer: customer.trim(), device: device.name, colour: device.colour, issue: issue.trim(), branch, stage: "Diagnosis", technician: TECHNICIANS[branch], partId: device.partId, partsPrice: device.price, labour: 30, checkedIn, history: [{ label: "Sample device checked in", at: checkedIn }] });
  };
  return <Modal title="A good repair starts here." eyebrow={`SAMPLE CHECK-IN · ${nextId}`} onClose={onClose}><form className={styles.formBody} onSubmit={submit}><p className={styles.formIntro}>Create a sample repair and follow it through the desk. Please use fictional details.</p><label className={styles.field}><span>Sample customer name</span><input required maxLength={60} placeholder="e.g. Taylor Sample" autoComplete="off" value={customer} onChange={e => setCustomer(e.target.value)} /></label><div className={styles.formColumns}><label className={styles.field}><span>Device</span><select value={deviceName} onChange={e => setDeviceName(e.target.value)}>{DEVICES.map(d => <option key={d.name}>{d.name}</option>)}</select></label><label className={styles.field}><span>Store</span><select value={branch} onChange={e => setBranch(e.target.value as Branch)}>{BRANCHES.map(b => <option key={b}>{b}</option>)}</select></label></div><label className={styles.field}><span>What needs attention?</span><textarea required maxLength={240} rows={3} placeholder="e.g. Cracked screen, touch still works" value={issue} onChange={e => setIssue(e.target.value)} /></label><div className={styles.formFootnote}><ShieldCheck size={15} />Saved only in this browser. No customer is contacted.</div><button className={`${styles.primaryButton} ${styles.fullWidth}`} type="submit">Create sample repair <Plus size={16} /></button></form></Modal>;
}
