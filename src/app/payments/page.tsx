"use client";

import { useMemo, useState } from "react";
import {
  Wallet,
  Clock,
  AlertCircle,
  CircleCheck,
  Landmark,
  CreditCard,
  Bitcoin,
  Send,
} from "lucide-react";
import { PAY_SUMMARY, INSTALLMENTS, type PayStatus, type Installment } from "@/lib/mock";
import { usd } from "@/lib/format";

type Filter = "All" | "Pending" | "Overdue" | "Paid";

const statusTone: Record<PayStatus, string> = {
  Paid: "bg-jungle-700/12 text-jungle-700",
  Pending: "bg-gold/15 text-gold",
  Overdue: "bg-clay/15 text-clay",
};

const methodIcon: Record<Installment["method"], React.ReactNode> = {
  "Bank transfer": <Landmark className="size-3.5" />,
  Card: <CreditCard className="size-3.5" />,
  Crypto: <Bitcoin className="size-3.5" />,
};

export default function PaymentsPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const rows = useMemo(() => {
    if (filter === "All") return INSTALLMENTS;
    return INSTALLMENTS.filter((i) => i.status === filter);
  }, [filter]);

  const collectPct = Math.round(
    (PAY_SUMMARY.collectedMonth /
      (PAY_SUMMARY.collectedMonth + PAY_SUMMARY.outstanding)) *
      100
  );

  return (
    <div className="space-y-7">
      {/* Header */}
      <header className="animate-in">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Ora Command · Payments
        </p>
        <h1 className="mt-2 font-display text-[2rem] leading-tight tracking-tight text-ink">
          Payments
        </h1>
        <p className="mt-1.5 max-w-lg text-sm text-muted">
          Deposits, balances and reschedules — all-inclusive stays, paid up front.
        </p>
      </header>

      {/* Summary */}
      <section className="animate-in grid grid-cols-2 gap-3.5 lg:grid-cols-4" style={{ animationDelay: "0.05s" }}>
        <Stat label="Collected · month" value={usd(PAY_SUMMARY.collectedMonth)} icon={<Wallet className="size-4" />} accent />
        <Stat label="Outstanding" value={usd(PAY_SUMMARY.outstanding)} icon={<Clock className="size-4" />} />
        <Stat label="Deposits pending" value={usd(PAY_SUMMARY.depositsPending)} icon={<CircleCheck className="size-4" />} />
        <Stat label="Overdue" value={usd(PAY_SUMMARY.overdue)} icon={<AlertCircle className="size-4" />} danger />
      </section>

      {/* Collection bar */}
      <section className="animate-in rounded-3xl border border-line bg-white/70 p-6" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-ink">Collection this month</h2>
          <span className="font-mono text-sm text-jungle-700">{collectPct}%</span>
        </div>
        <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-bone-300">
          <div className="grow-bar h-full bg-jungle-700" style={{ width: `${collectPct}%` }} />
          <div className="h-full flex-1 bg-clay/30" />
        </div>
        <div className="mt-3 flex gap-5 font-mono text-[10px] uppercase tracking-wider text-muted">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-jungle-700" /> Collected {usd(PAY_SUMMARY.collectedMonth)}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-clay/50" /> Outstanding {usd(PAY_SUMMARY.outstanding)}
          </span>
        </div>
      </section>

      {/* Filters */}
      <div className="animate-in flex flex-wrap gap-2" style={{ animationDelay: "0.14s" }}>
        {(["All", "Pending", "Overdue", "Paid"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={[
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition",
              filter === f
                ? "bg-jungle-900 text-bone"
                : "border border-line bg-white/60 text-muted hover:text-ink",
            ].join(" ")}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Installments */}
      <section className="animate-in space-y-2.5" style={{ animationDelay: "0.18s" }}>
        {rows.map((i) => (
          <div
            key={i.id}
            className="flex items-center gap-3 rounded-2xl border border-line bg-white/70 p-4 transition hover:border-jungle-500/40"
          >
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-bone-200 font-display text-sm text-jungle-700">
              {i.guest.charAt(0)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-ink">{i.guest}</div>
              <div className="truncate text-xs text-muted">{i.kind}</div>
            </div>

            <div className="hidden items-center gap-1.5 text-muted sm:flex">
              {methodIcon[i.method]}
              <span className="font-mono text-[10px]">{i.method}</span>
            </div>

            <div className="hidden w-16 text-right sm:block">
              <span className="font-mono text-[11px] text-muted">due {i.due}</span>
            </div>

            <div className="w-20 shrink-0 text-right font-display text-base text-ink">
              {usd(i.amount)}
            </div>

            <span className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider ${statusTone[i.status]}`}>
              {i.status}
            </span>

            {i.status !== "Paid" ? (
              <button
                className="hidden shrink-0 items-center gap-1 rounded-full bg-jungle-900 px-2.5 py-1 text-[10px] font-medium text-bone transition-colors hover:bg-clay sm:flex"
                title="Send payment reminder / link"
              >
                <Send className="size-3" />
                Remind
              </button>
            ) : (
              <span className="hidden w-16 sm:block" />
            )}
          </div>
        ))}
      </section>

      <p className="rounded-2xl border border-dashed border-line bg-white/40 px-4 py-3 text-center text-xs text-muted">
        Bookings are non-refundable — the system offers <span className="font-medium text-ink">reschedules</span> instead of refunds, in line with your policy.
      </p>

      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
        Preview · Ora Tulum × Kadyo Studio · demo data
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
  accent,
  danger,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent?: boolean;
  danger?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-4",
        accent
          ? "border-jungle-700/25 bg-jungle-900 text-bone"
          : danger
            ? "border-clay/30 bg-gradient-to-br from-clay/10 to-transparent"
            : "border-line bg-white/70",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${accent ? "text-jungle-300" : "text-muted"}`}>
          {label}
        </span>
        <span className={accent ? "text-gold" : danger ? "text-clay" : "text-jungle-500"}>{icon}</span>
      </div>
      <div className={`mt-2 font-display text-[1.7rem] leading-none tracking-tight ${accent ? "text-bone" : "text-ink"}`}>
        {value}
      </div>
    </div>
  );
}
