import {
  PlaneLanding,
  PlaneTakeoff,
  Sparkles,
  UtensilsCrossed,
  Car,
  Wrench,
  BedDouble,
  AlertTriangle,
} from "lucide-react";
import {
  ARRIVALS,
  DEPARTURES,
  HOUSEKEEPING,
  DIETARY,
  TRANSPORT,
  CEREMONY_SCHEDULE,
  MAINTENANCE,
} from "@/lib/mock";

const hkTone: Record<string, string> = {
  Clean: "bg-jungle-700/12 text-jungle-700",
  "In progress": "bg-gold/15 text-gold",
  Pending: "bg-clay/12 text-clay",
};

const prioTone: Record<string, string> = {
  High: "bg-clay/15 text-clay",
  Medium: "bg-gold/15 text-gold",
  Low: "bg-bone-200 text-muted",
};

export default function StaffPage() {
  return (
    <div className="space-y-7">
      {/* Header */}
      <header className="animate-in">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Ora Command · Staff
        </p>
        <h1 className="mt-2 font-display text-[2rem] leading-tight tracking-tight text-ink">
          Staff Dashboard
        </h1>
        <p className="mt-1.5 max-w-lg text-sm text-muted">
          Everything the team needs to run the day — Wednesday, July 29.
        </p>
      </header>

      {/* Quick counts */}
      <section className="animate-in grid grid-cols-2 gap-3.5 sm:grid-cols-4" style={{ animationDelay: "0.05s" }}>
        <Count n={ARRIVALS.length} label="Arrivals" icon={<PlaneLanding className="size-4" />} accent />
        <Count n={DEPARTURES.length} label="Departures" icon={<PlaneTakeoff className="size-4" />} />
        <Count n={HOUSEKEEPING.filter((h) => h.status !== "Clean").length} label="Rooms to turn" icon={<BedDouble className="size-4" />} />
        <Count n={MAINTENANCE.filter((m) => m.status === "Open").length} label="Open tickets" icon={<Wrench className="size-4" />} />
      </section>

      {/* Arrivals & Departures */}
      <section className="animate-in grid grid-cols-1 gap-5 lg:grid-cols-2" style={{ animationDelay: "0.1s" }}>
        <Panel title="Arrivals today" icon={<PlaneLanding className="size-4 text-jungle-500" />}>
          <ul className="divide-y divide-line/70">
            {ARRIVALS.map((a) => (
              <li key={a.guest} className="flex items-center gap-3 py-2.5">
                <span className="w-12 shrink-0 font-mono text-xs text-clay">{a.time}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink">{a.guest}</div>
                  <div className="truncate text-xs text-muted">
                    {a.room} · {a.pax} pax · {a.flight}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Departures today" icon={<PlaneTakeoff className="size-4 text-muted" />}>
          <ul className="divide-y divide-line/70">
            {DEPARTURES.map((d) => (
              <li key={d.guest} className="flex items-center gap-3 py-2.5">
                <span className="w-12 shrink-0 font-mono text-xs text-jungle-500">{d.time}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink">{d.guest}</div>
                  <div className="truncate text-xs text-muted">
                    {d.room} · {d.pax} pax
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      {/* Housekeeping + Dietary */}
      <section className="animate-in grid grid-cols-1 gap-5 lg:grid-cols-2" style={{ animationDelay: "0.16s" }}>
        <Panel title="Housekeeping" icon={<BedDouble className="size-4 text-jungle-500" />}>
          <div className="flex flex-col gap-2">
            {HOUSEKEEPING.map((h) => (
              <div key={h.room} className="flex items-center justify-between rounded-xl bg-bone/60 px-3 py-2">
                <span className="text-sm text-ink">{h.room}</span>
                <span className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${hkTone[h.status]}`}>
                  {h.status}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Dietary notes" icon={<UtensilsCrossed className="size-4 text-jungle-500" />}>
          <ul className="flex flex-col gap-2">
            {DIETARY.map((d) => (
              <li
                key={d.guest}
                className={[
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5",
                  d.severity === "high" ? "bg-clay/10" : "bg-bone/60",
                ].join(" ")}
              >
                {d.severity === "high" && <AlertTriangle className="size-4 shrink-0 text-clay" />}
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-ink">{d.guest}</div>
                  <div className={`text-xs ${d.severity === "high" ? "font-medium text-clay" : "text-muted"}`}>
                    {d.note}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      {/* Ceremony + Transport + Maintenance */}
      <section className="animate-in grid grid-cols-1 gap-5 lg:grid-cols-3" style={{ animationDelay: "0.22s" }}>
        <Panel title="Ceremony schedule" icon={<Sparkles className="size-4 text-gold" />}>
          <div className="flex flex-col gap-2.5">
            {CEREMONY_SCHEDULE.map((c) => (
              <div key={c.name} className="rounded-xl border border-jungle-700/15 bg-jungle-700/5 px-3.5 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">{c.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-jungle-700">
                    {c.day} · {c.time}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted">{c.guests} guests participating</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Transport" icon={<Car className="size-4 text-jungle-500" />}>
          <ul className="divide-y divide-line/70">
            {TRANSPORT.map((t) => (
              <li key={t.time + t.guest} className="flex items-center gap-3 py-2.5">
                <span className="w-11 shrink-0 font-mono text-xs text-clay">{t.time}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink">{t.guest}</div>
                  <div className="truncate text-xs text-muted">
                    {t.dir} · {t.place}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Maintenance" icon={<Wrench className="size-4 text-jungle-500" />}>
          <ul className="flex flex-col gap-2">
            {MAINTENANCE.map((m) => (
              <li key={m.item} className="rounded-xl bg-bone/60 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm text-ink">{m.item}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${prioTone[m.priority]}`}>
                    {m.priority}
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-muted">
                  {m.room} · {m.status}
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
        Preview · Ora Tulum × Kadyo Studio · demo data
      </p>
    </div>
  );
}

function Count({
  n,
  label,
  icon,
  accent,
}: {
  n: number;
  label: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-4",
        accent ? "border-clay/25 bg-gradient-to-br from-clay/10 to-transparent" : "border-line bg-white/70",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{label}</span>
        <span className={accent ? "text-clay" : "text-jungle-500"}>{icon}</span>
      </div>
      <div className="mt-2 font-display text-3xl leading-none text-ink">{n}</div>
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-line bg-white/70 p-5">
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h2 className="font-display text-lg text-ink">{title}</h2>
      </div>
      {children}
    </div>
  );
}
