import {
  BedDouble,
  Users,
  Flame,
  TreePalm,
  Check,
  Plane,
  ChevronRight,
} from "lucide-react";
import { ROOMS, UPCOMING_RETREATS, THIS_WEEK_RETREAT, type Room } from "@/lib/mock";

const stateTone: Record<string, string> = {
  "In progress": "bg-jungle-700/12 text-jungle-700",
  Filling: "bg-gold/15 text-gold",
  Open: "bg-clay/12 text-clay",
};

export default function ReservationsPage() {
  const filled = ROOMS.filter((r) => r.status !== "Available").length;
  const villas = ROOMS.filter((r) => r.type === "Villa");
  const suites = ROOMS.filter((r) => r.type === "Suite");
  const occPct = Math.round((filled / ROOMS.length) * 100);

  return (
    <div className="space-y-7">
      {/* Header */}
      <header className="animate-in">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Ora Command · Reservations
        </p>
        <h1 className="mt-2 font-display text-[2rem] leading-tight tracking-tight text-ink">
          Reservations &amp; Calendar
        </h1>
        <p className="mt-1.5 max-w-lg text-sm text-muted">
          6 Jungle Villas · 9 King Suites · weekly retreats, Wednesday to Sunday.
        </p>
      </header>

      {/* This week's retreat banner */}
      <section
        className="animate-in overflow-hidden rounded-3xl border border-jungle-700/20 bg-jungle-900 text-bone"
        style={{ animationDelay: "0.05s" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-jungle-300">
              <Flame className="size-3.5 text-clay-soft" /> This week's retreat
            </div>
            <div className="mt-2 font-display text-3xl">{THIS_WEEK_RETREAT.label}</div>
            <div className="mt-1 text-sm text-jungle-300">In progress · day 1 of 4</div>
          </div>

          <div className="flex gap-7">
            <Metric big={`${filled}/${ROOMS.length}`} label="rooms" />
            <Metric big={String(THIS_WEEK_RETREAT.guests)} label="guests" />
            <Metric big={`${occPct}%`} label="occupancy" />
          </div>
        </div>

        {/* occupancy bar */}
        <div className="h-1.5 w-full bg-jungle-800">
          <div
            className="h-full bg-gradient-to-r from-jungle-500 to-clay-soft"
            style={{ width: `${occPct}%` }}
          />
        </div>

        {/* ceremonies */}
        <div className="flex flex-wrap items-center gap-2 px-6 py-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-jungle-300">
            Ceremonies
          </span>
          {THIS_WEEK_RETREAT.ceremonies.map((c) => (
            <span
              key={c.name}
              className="rounded-full bg-jungle-800 px-3 py-1 text-xs text-bone"
            >
              {c.name} · <span className="text-jungle-300">{c.day}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Room grid */}
      <section className="animate-in space-y-4" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Room board</h2>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-muted">
            <Legend color="#2f5d50" label="Occupied" />
            <Legend color="#b79a4e" label="Arriving" />
            <Legend color="#ded5c4" label="Open" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted">
            <TreePalm className="size-3.5 text-jungle-500" /> Jungle Villas
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {villas.map((r) => (
              <RoomTile key={r.id} room={r} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted">
            <BedDouble className="size-3.5 text-jungle-500" /> King Suites
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {suites.map((r) => (
              <RoomTile key={r.id} room={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming retreats */}
      <section className="animate-in space-y-3" style={{ animationDelay: "0.16s" }}>
        <h2 className="font-display text-xl text-ink">Upcoming retreats</h2>
        <div className="flex flex-col gap-2.5">
          {UPCOMING_RETREATS.map((r) => {
            const pct = Math.round((r.rooms / 15) * 100);
            return (
              <div
                key={r.id}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white/70 p-4 transition hover:border-jungle-500/40"
              >
                <div className="min-w-[92px]">
                  <div className="text-sm font-semibold text-ink">{r.label}</div>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${stateTone[r.state]}`}
                  >
                    {r.state}
                  </span>
                </div>

                <div className="hidden flex-1 sm:block">
                  <div className="flex items-center justify-between font-mono text-[10px] text-muted">
                    <span>{r.rooms}/15 rooms</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-bone-300">
                    <div
                      className="h-full rounded-full bg-jungle-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-muted">
                  <Users className="size-3.5" />
                  <span className="font-mono text-xs">{r.guests}</span>
                </div>

                <div className="hidden items-center gap-1.5 md:flex">
                  {r.ceremonies.map((c) => (
                    <span
                      key={c}
                      className="rounded-md bg-bone-200 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-jungle-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <ChevronRight className="ml-auto size-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-jungle-700" />
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
        Preview · Ora Tulum × Kadyo Studio · demo data
      </p>
    </div>
  );
}

/* ---------- components ---------- */

function RoomTile({ room }: { room: Room }) {
  const occupied = room.status === "Occupied";
  const arriving = room.status === "Arriving";
  const available = room.status === "Available";

  return (
    <div
      className={[
        "rounded-2xl border p-3 transition",
        occupied ? "border-jungle-700/25 bg-jungle-700/8" : "",
        arriving ? "border-gold/40 bg-gold/10" : "",
        available ? "border-dashed border-line bg-white/40" : "",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-ink">
          {room.name.replace("Jungle ", "").replace("King ", "")}
        </span>
        {occupied && <Check className="size-3.5 text-jungle-700" />}
        {arriving && <Plane className="size-3.5 text-gold" />}
      </div>

      {available ? (
        <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted/70">
          Open
        </div>
      ) : (
        <div className="mt-2.5">
          <div className="truncate text-[13px] font-medium text-ink">{room.guest}</div>
          <div className="font-mono text-[10px] text-muted">
            {arriving ? "arriving today" : `${room.guests} ${room.guests === 1 ? "guest" : "guests"}`}
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({ big, label }: { big: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl leading-none">{big}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-jungle-300">
        {label}
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
