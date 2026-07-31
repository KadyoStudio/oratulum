import {
  ArrowUpRight,
  TrendingUp,
  BedDouble,
  Wallet,
  Sparkles,
  MessageCircle,
  Flame,
  ChevronRight,
} from "lucide-react";
import {
  KPIS,
  REVENUE_7D,
  THIS_WEEK_RETREAT,
  LEADS,
  AI_THREADS,
  STATUS_META,
} from "@/lib/mock";
import { usd, num } from "@/lib/format";

const toneClass: Record<string, string> = {
  clay: "bg-clay/12 text-clay",
  gold: "bg-gold/15 text-gold",
  jungle: "bg-jungle-700/12 text-jungle-700",
};

function ago(min: number) {
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  return `${h}h ago`;
}

export default function Dashboard() {
  const occPct = Math.round((KPIS.occupancyRooms / KPIS.occupancyTotal) * 100);
  const goalPct = Math.round((KPIS.revenueMonth / KPIS.revenueMonthGoal) * 100);
  const maxRev = Math.max(...REVENUE_7D.map((d) => d.value));

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <header className="animate-in flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Wednesday · July 29
          </p>
          <h1 className="mt-2 font-display text-[2.1rem] leading-[1.05] tracking-tight text-ink sm:text-[2.6rem]">
            Good morning, Chris.
          </h1>
          <p className="mt-1.5 max-w-md text-sm text-muted">
            Here's Ora at a glance — everything happening across your retreat, live.
          </p>
        </div>
        <div className="flex items-center gap-2.5 rounded-full border border-line bg-white/60 px-4 py-2">
          <Flame className="size-4 text-clay" strokeWidth={2} />
          <span className="text-sm font-medium text-ink">
            This week's retreat
          </span>
          <span className="font-mono text-xs text-muted">
            {THIS_WEEK_RETREAT.label}
          </span>
        </div>
      </header>

      {/* KPI grid */}
      <section className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <BigStat
          delay={0.04}
          label="Revenue today"
          value={usd(KPIS.revenueToday)}
          hint="+18% vs. avg"
          icon={<TrendingUp className="size-4" />}
          accent
        />
        <BigStat
          delay={0.08}
          label="Revenue this month"
          value={usd(KPIS.revenueMonth)}
          hint={`${goalPct}% of goal`}
          icon={<ArrowUpRight className="size-4" />}
          progress={goalPct}
        />
        <BigStat
          delay={0.12}
          label="Occupancy"
          value={`${KPIS.occupancyRooms}/${KPIS.occupancyTotal}`}
          hint={`${occPct}% of rooms`}
          icon={<BedDouble className="size-4" />}
          progress={occPct}
        />
        <BigStat
          delay={0.16}
          label="Outstanding balances"
          value={usd(KPIS.outstanding)}
          hint="6 guests"
          icon={<Wallet className="size-4" />}
        />
      </section>

      {/* Revenue + AI row */}
      <section className="grid gap-5 lg:grid-cols-3">
        {/* Revenue trend */}
        <div className="animate-in lg:col-span-2 rounded-3xl border border-line bg-white/70 p-6" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl text-ink">Revenue</h2>
              <p className="text-xs text-muted">Last 7 days · USD</p>
            </div>
            <div className="text-right">
              <div className="font-display text-2xl text-jungle-700">
                {usd(REVENUE_7D.reduce((s, d) => s + d.value, 0))}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
                this week
              </div>
            </div>
          </div>

          <div className="mt-7 flex h-40 items-end gap-2.5 sm:gap-4">
            {REVENUE_7D.map((d, i) => {
              const h = Math.round((d.value / maxRev) * 100);
              const isToday = i === REVENUE_7D.length - 1;
              return (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="grow-bar w-full rounded-t-md"
                      style={{
                        height: `${h}%`,
                        background: isToday
                          ? "linear-gradient(180deg,#cbb74c,#b9a43e)"
                          : "linear-gradient(180deg,#4a3d2f,#6b5a46)",
                        animationDelay: `${0.3 + i * 0.06}s`,
                      }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-muted">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI concierge */}
        <div className="animate-in rounded-3xl border border-jungle-700/20 bg-jungle-900 p-6 text-bone" style={{ animationDelay: "0.26s" }}>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-gold" strokeWidth={2} />
            <h2 className="font-display text-xl">AI concierge</h2>
          </div>

          <div className="mt-5 flex items-baseline gap-2">
            <span className="font-display text-5xl leading-none">{KPIS.aiResolvedPct}%</span>
            <span className="text-sm text-jungle-300">auto-resolved</span>
          </div>
          <p className="mt-2 text-xs text-jungle-300">
            {KPIS.whatsappToday} guest conversations today across WhatsApp & website.
          </p>

          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-jungle-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold to-clay-soft"
              style={{ width: `${KPIS.aiResolvedPct}%` }}
            />
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl bg-jungle-800/70 px-3.5 py-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="size-4 text-clay-soft" />
              <span className="text-sm">Needs your attention</span>
            </div>
            <span className="font-display text-lg">1</span>
          </div>
        </div>
      </section>

      {/* Inquiries + threads */}
      <section className="grid gap-5 lg:grid-cols-2">
        {/* New inquiries */}
        <Panel title="New inquiries" caption={`${KPIS.newInquiries} this week`} href delay={0.32}>
          <ul className="divide-y divide-line/70">
            {LEADS.slice(0, 5).map((l) => {
              const meta = STATUS_META[l.status];
              return (
                <li key={l.id} className="flex items-center gap-3 py-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-bone-200 font-display text-sm text-jungle-700">
                    {l.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium text-ink">{l.name}</span>
                      <span className="shrink-0 font-mono text-[10px] text-muted">{l.country}</span>
                    </div>
                    <div className="truncate text-xs text-muted">
                      {l.month} · {l.group} {l.group > 1 ? "guests" : "guest"} · {l.ceremony}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className={`whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${toneClass[meta.tone]}`}>
                      {meta.label}
                    </span>
                    <span className="font-mono text-[10px] text-muted">{usd(l.value)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>

        {/* Concierge threads */}
        <Panel title="Concierge activity" caption="Live" href delay={0.38}>
          <ul className="divide-y divide-line/70">
            {AI_THREADS.map((t) => {
              const tone =
                t.status === "Needs human"
                  ? "bg-clay/12 text-clay"
                  : t.status === "Following up"
                    ? "bg-gold/15 text-gold"
                    : "bg-jungle-700/12 text-jungle-700";
              return (
                <li key={t.id} className="flex items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium text-ink">{t.name}</span>
                      <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-muted">
                        {t.channel}
                      </span>
                    </div>
                    <div className="truncate text-xs text-muted">“{t.snippet}”</div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className={`whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${tone}`}>
                      {t.status}
                    </span>
                    <span className="font-mono text-[10px] text-muted">{ago(t.agoMin)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      </section>

      <p className="pt-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
        Preview · Ora Tulum × Kadyo Studio · demo data
      </p>
    </div>
  );
}

/* ---------- local components ---------- */

function BigStat({
  label,
  value,
  hint,
  icon,
  delay,
  accent,
  progress,
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ReactNode;
  delay: number;
  accent?: boolean;
  progress?: number;
}) {
  return (
    <div
      className={[
        "animate-in rounded-2xl border p-4 sm:p-5",
        accent
          ? "border-clay/25 bg-gradient-to-br from-clay/10 to-transparent"
          : "border-line bg-white/70",
      ].join(" ")}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {label}
        </span>
        <span className={accent ? "text-clay" : "text-jungle-500"}>{icon}</span>
      </div>
      <div className="mt-3 font-display text-[1.75rem] leading-none tracking-tight text-ink sm:text-[2rem]">
        {value}
      </div>
      {progress !== undefined ? (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-bone-300">
          <div
            className={`h-full rounded-full ${accent ? "bg-clay" : "bg-jungle-700"}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      ) : (
        <div className="mt-2 text-xs text-muted">{hint}</div>
      )}
      {progress !== undefined && <div className="mt-1.5 text-xs text-muted">{hint}</div>}
    </div>
  );
}

function Panel({
  title,
  caption,
  children,
  delay,
  href,
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
  delay: number;
  href?: boolean;
}) {
  return (
    <div className="animate-in rounded-3xl border border-line bg-white/70 p-6" style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-baseline gap-2.5">
          <h2 className="shrink-0 font-display text-xl text-ink">{title}</h2>
          <span className="truncate font-mono text-[10px] uppercase tracking-wider text-muted">
            {caption}
          </span>
        </div>
        {href && (
          <button className="flex shrink-0 items-center gap-1 text-xs font-medium text-jungle-700 transition-colors hover:text-clay">
            View all
            <ChevronRight className="size-3.5" />
          </button>
        )}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
