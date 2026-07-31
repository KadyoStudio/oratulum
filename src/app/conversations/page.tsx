"use client";

import { useMemo, useState } from "react";
import {
  Sparkles,
  MessageCircle,
  Mail,
  ArrowLeft,
  ShieldCheck,
  Send,
  Zap,
  Clock,
  UserRound,
} from "lucide-react";
import { CONVERSATIONS, CONCIERGE_STATS, type Conversation } from "@/lib/mock";

type Filter = "All" | "WhatsApp" | "Email" | "Needs human";

const statusTone: Record<Conversation["status"], string> = {
  "AI resolved": "bg-jungle-700/12 text-jungle-700",
  "Needs human": "bg-clay/15 text-clay",
  "Following up": "bg-gold/15 text-gold",
};

function ago(min: number) {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  return `${h}h`;
}

export default function ConciergePage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
  const [mobileChat, setMobileChat] = useState(false);

  const list = useMemo(() => {
    if (filter === "All") return CONVERSATIONS;
    if (filter === "Needs human")
      return CONVERSATIONS.filter((c) => c.status === "Needs human");
    return CONVERSATIONS.filter((c) => c.channel === filter);
  }, [filter]);

  const active = CONVERSATIONS.find((c) => c.id === activeId) ?? CONVERSATIONS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="animate-in">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Ora Command · Concierge
        </p>
        <h1 className="mt-2 font-display text-[2rem] leading-tight tracking-tight text-ink">
          AI Concierge
        </h1>
        <p className="mt-1.5 max-w-lg text-sm text-muted">
          One inbox, one AI brain — WhatsApp and email, English &amp; Spanish.
        </p>
      </header>

      {/* Stats */}
      <section className="animate-in grid grid-cols-2 gap-3.5 sm:grid-cols-4" style={{ animationDelay: "0.05s" }}>
        <Stat label="Today" value={String(CONCIERGE_STATS.today)} icon={<MessageCircle className="size-4" />} />
        <Stat label="Auto-resolved" value={`${CONCIERGE_STATS.autoResolved}%`} icon={<Zap className="size-4" />} accent />
        <Stat label="Avg. reply" value={CONCIERGE_STATS.avgResponse} icon={<Clock className="size-4" />} />
        <Stat label="Needs you" value={String(CONCIERGE_STATS.needsHuman)} icon={<UserRound className="size-4" />} />
      </section>

      {/* Filters */}
      <div className="animate-in flex flex-wrap gap-2" style={{ animationDelay: "0.1s" }}>
        {(["All", "WhatsApp", "Email", "Needs human"] as Filter[]).map((f) => (
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

      {/* Inbox + conversation */}
      <section className="animate-in grid grid-cols-1 gap-4 lg:grid-cols-[340px_1fr]" style={{ animationDelay: "0.15s" }}>
        {/* Thread list */}
        <div className={`${mobileChat ? "hidden" : "block"} lg:block`}>
          <ul className="flex flex-col gap-2">
            {list.map((c) => {
              const isActive = c.id === activeId;
              const last = c.messages[c.messages.length - 1];
              return (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      setActiveId(c.id);
                      setMobileChat(true);
                    }}
                    className={[
                      "w-full rounded-2xl border p-3.5 text-left transition",
                      isActive
                        ? "border-jungle-500/40 bg-white shadow-[0_6px_20px_-10px_rgba(31,59,50,0.3)]"
                        : "border-line bg-white/60 hover:bg-white",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-bone-200 font-display text-sm text-jungle-700">
                        {c.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-sm font-semibold text-ink">{c.name}</span>
                          {c.channel === "WhatsApp" ? (
                            <MessageCircle className="size-3 text-jungle-500" />
                          ) : (
                            <Mail className="size-3 text-muted" />
                          )}
                        </div>
                        <p className="truncate text-xs text-muted">{last.text}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] text-muted">{ago(c.agoMin)}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${statusTone[c.status]}`}>
                        {c.status}
                      </span>
                      <span className="rounded-full bg-bone-200 px-1.5 py-0.5 font-mono text-[9px] text-muted">
                        {c.lang}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Conversation */}
        <div className={`${mobileChat ? "block" : "hidden"} lg:block`}>
          <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-3xl border border-line bg-white/70">
            {/* Conversation header */}
            <div className="flex items-center gap-3 border-b border-line bg-white/60 px-4 py-3">
              <button
                onClick={() => setMobileChat(false)}
                className="lg:hidden grid size-8 place-items-center rounded-full hover:bg-bone-200"
                aria-label="Back"
              >
                <ArrowLeft className="size-4 text-ink" />
              </button>
              <div className="grid size-9 place-items-center rounded-full bg-jungle-900 font-display text-sm text-bone">
                {active.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-ink">{active.name}</span>
                  <span className="font-mono text-[10px] text-muted">· {active.country}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                  {active.channel === "WhatsApp" ? "WhatsApp" : "Email"} · {active.lang}
                </div>
              </div>
              <span className={`rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider ${statusTone[active.status]}`}>
                {active.status}
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
              {active.messages.map((m, i) => {
                if (m.from === "staff") {
                  return (
                    <div key={i} className="flex justify-center">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-clay/10 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-clay">
                        <ShieldCheck className="size-3" />
                        {m.text}
                      </span>
                    </div>
                  );
                }
                const isGuest = m.from === "guest";
                return (
                  <div key={i} className={`flex ${isGuest ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[78%] ${isGuest ? "" : "text-right"}`}>
                      {!isGuest && (
                        <div className="mb-1 flex items-center justify-end gap-1 font-mono text-[9px] uppercase tracking-wider text-jungle-500">
                          <Sparkles className="size-2.5" /> Ora AI
                        </div>
                      )}
                      <div
                        className={[
                          "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                          isGuest
                            ? "rounded-tl-sm bg-bone-200 text-ink"
                            : "rounded-tr-sm bg-jungle-900 text-bone",
                        ].join(" ")}
                      >
                        {m.text}
                      </div>
                      <div className="mt-1 font-mono text-[9px] text-muted/70">{m.t}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Composer */}
            <div className="border-t border-line bg-white/60 px-4 py-3">
              {active.status === "Needs human" ? (
                <div className="flex items-center gap-2 rounded-full bg-clay/10 px-4 py-2.5">
                  <ShieldCheck className="size-4 text-clay" />
                  <span className="text-xs text-clay">Handed to your team — reply when ready.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2">
                  <Sparkles className="size-4 text-jungle-500" />
                  <span className="flex-1 truncate text-xs text-muted">
                    AI reply ready — review &amp; send, or let it auto-send…
                  </span>
                  <button className="grid size-8 place-items-center rounded-full bg-jungle-900 text-bone">
                    <Send className="size-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

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
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-4",
        accent ? "border-jungle-700/25 bg-jungle-900 text-bone" : "border-line bg-white/70",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${accent ? "text-jungle-300" : "text-muted"}`}>
          {label}
        </span>
        <span className={accent ? "text-gold" : "text-jungle-500"}>{icon}</span>
      </div>
      <div className={`mt-2 font-display text-2xl leading-none ${accent ? "text-bone" : "text-ink"}`}>
        {value}
      </div>
    </div>
  );
}
