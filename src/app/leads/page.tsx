"use client";

import { useMemo, useState } from "react";
import { Search, Send, Layers } from "lucide-react";
import {
  LEADS,
  PIPELINE_ORDER,
  STAGE_COLOR,
  STATUS_META,
  type Lead,
  type LeadStatus,
} from "@/lib/mock";
import { usd, num } from "@/lib/format";

function ago(min: number) {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

const sourceDot: Record<string, string> = {
  WhatsApp: "#6b5a46",
  "Website form": "#be6b3c",
  Instagram: "#cbb74c",
  Referral: "#8a7c68",
};

export default function LeadsPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return LEADS;
    return LEADS.filter((l) =>
      [l.name, l.ceremony, l.country, l.month].join(" ").toLowerCase().includes(t)
    );
  }, [q]);

  const totalValue = filtered.reduce((s, l) => s + l.value, 0);
  const confirmedValue = filtered
    .filter((l) => l.status === "Confirmed")
    .reduce((s, l) => s + l.value, 0);
  const confPct = LEADS.length
    ? Math.round(
        (LEADS.filter((l) => l.status === "Confirmed").length / LEADS.length) * 100
      )
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="animate-in flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Ora Command · Pipeline
          </p>
          <h1 className="mt-2 font-display text-[2rem] leading-tight tracking-tight text-ink">
            Leads &amp; Pipeline
          </h1>
          <p className="mt-1.5 max-w-lg text-sm text-muted">
            Every reservation request, from first contact to a paid stay.
          </p>
        </div>

        <label className="flex w-full items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-2.5 transition focus-within:border-jungle-500 focus-within:bg-white sm:w-72">
          <Search className="size-4 shrink-0 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, ceremony…"
            className="w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
        </label>
      </header>

      {/* Summary chips */}
      <section className="animate-in grid grid-cols-3 gap-2.5 sm:gap-3.5" style={{ animationDelay: "0.05s" }}>
        <SummaryChip label="Pipeline value" value={usd(totalValue)} icon={<Layers className="size-4" />} />
        <SummaryChip label="Active leads" value={num(filtered.length)} />
        <SummaryChip label="Confirmed" value={usd(confirmedValue)} hint={`${confPct}% conversion`} accent />
      </section>

      {/* Board */}
      <section className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
        {PIPELINE_ORDER.map((status, ci) => {
          const items = filtered.filter((l) => l.status === status);
          const colTotal = items.reduce((s, l) => s + l.value, 0);
          const color = STAGE_COLOR[status];
          return (
            <div
              key={status}
              className="animate-in w-[80vw] max-w-[290px] shrink-0 lg:w-auto lg:max-w-none"
              style={{ animationDelay: `${0.1 + ci * 0.05}s` }}
            >
              {/* Column header */}
              <div className="mb-3 flex items-center justify-between rounded-xl bg-white/60 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ background: color }} />
                  <span className="text-sm font-semibold text-ink">
                    {STATUS_META[status].label}
                  </span>
                  <span className="grid size-5 place-items-center rounded-full bg-bone-200 font-mono text-[10px] text-muted">
                    {items.length}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted">{usd(colTotal)}</span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2.5">
                {items.map((l) => (
                  <LeadCard key={l.id} lead={l} color={color} />
                ))}
                {items.length === 0 && (
                  <div className="rounded-xl border border-dashed border-line py-6 text-center font-mono text-[10px] uppercase tracking-wider text-muted/60">
                    empty
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
        Preview · Ora Tulum × Kadyo Studio · demo data
      </p>
    </div>
  );
}

/* ---------- components ---------- */

function LeadCard({ lead, color }: { lead: Lead; color: string }) {
  return (
    <article
      className="group cursor-pointer overflow-hidden rounded-2xl border border-line bg-white/80 p-3.5 transition-all hover:-translate-y-0.5 hover:border-jungle-500/40 hover:shadow-[0_6px_20px_-8px_rgba(31,59,50,0.25)]"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-ink">{lead.name}</span>
            <span className="shrink-0 font-mono text-[9px] text-muted">{lead.country}</span>
          </div>
          <div className="mt-0.5 truncate text-xs text-muted">
            {lead.month} · {lead.group} {lead.group > 1 ? "guests" : "guest"}
          </div>
        </div>
        <span className="shrink-0 font-display text-base leading-none text-jungle-700">
          {usd(lead.value)}
        </span>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="rounded-md bg-bone-200 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-jungle-700">
          {lead.ceremony}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-line/70 pt-2.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <span
            className="size-1.5 shrink-0 rounded-full"
            style={{ background: sourceDot[lead.source] ?? "#8b8271" }}
          />
          <span className="truncate font-mono text-[10px] text-muted">{lead.source}</span>
          <span className="shrink-0 font-mono text-[10px] text-muted/60">· {ago(lead.agoMin)}</span>
        </div>
        <button
          className="flex shrink-0 items-center gap-1 rounded-full bg-jungle-900 px-2.5 py-1 text-[10px] font-medium text-bone transition-colors hover:bg-clay"
          title="Send booking / payment link"
        >
          <Send className="size-3" />
          Link
        </button>
      </div>
    </article>
  );
}

function SummaryChip({
  label,
  value,
  hint,
  icon,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "min-w-0 rounded-2xl border p-3 sm:p-4",
        accent
          ? "border-jungle-700/25 bg-jungle-900 text-bone"
          : "border-line bg-white/70",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-1">
        <span
          className={[
            "font-mono text-[9px] uppercase tracking-[0.14em] sm:text-[10px]",
            accent ? "text-jungle-300" : "text-muted",
          ].join(" ")}
        >
          {label}
        </span>
        {icon && <span className={`shrink-0 ${accent ? "text-gold" : "text-jungle-500"}`}>{icon}</span>}
      </div>
      <div
        className={[
          "mt-2 font-display text-base leading-none tracking-tight sm:text-2xl",
          accent ? "text-bone" : "text-ink",
        ].join(" ")}
      >
        {value}
      </div>
      {hint && (
        <div className={["mt-1.5 text-xs", accent ? "text-jungle-300" : "text-muted"].join(" ")}>
          {hint}
        </div>
      )}
    </div>
  );
}
