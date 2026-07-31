"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  MessagesSquare,
  ConciergeBell,
  CreditCard,
  BookOpen,
  Settings,
} from "lucide-react";

const NAV = [
  { href: "/", label: "Command", short: "Home", icon: LayoutDashboard, live: true },
  { href: "/leads", label: "Leads", short: "Leads", icon: Users, live: true },
  { href: "/reservations", label: "Reservations", short: "Rooms", icon: CalendarDays, live: true },
  { href: "/conversations", label: "Concierge", short: "Chat", icon: MessagesSquare, live: true },
  { href: "/staff", label: "Staff", short: "Staff", icon: ConciergeBell, live: true },
  { href: "/payments", label: "Payments", short: "Pay", icon: CreditCard, live: true },
  { href: "/sops", label: "SOPs", short: "SOPs", icon: BookOpen, live: false },
  { href: "/settings", label: "Settings", short: "Set", icon: Settings, live: false },
];

const MOBILE_NAV = NAV.filter((n) => n.live).slice(0, 6);

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="min-h-dvh md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:justify-between bg-jungle-900 text-bone px-5 py-7 sticky top-0 h-dvh">
        <div>
          <div className="px-2">
            <div className="font-display text-3xl leading-none tracking-tight">Ora</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-jungle-300">
              Tulum · Command
            </div>
          </div>

          <nav className="mt-10 flex flex-col gap-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.live ? item.href : "#"}
                  aria-disabled={!item.live}
                  className={[
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-bone text-jungle-900 font-semibold"
                      : item.live
                        ? "text-jungle-300 hover:bg-jungle-800 hover:text-bone"
                        : "text-jungle-300/45 cursor-default",
                  ].join(" ")}
                >
                  <Icon className="size-[18px]" strokeWidth={active ? 2.4 : 1.9} />
                  <span>{item.label}</span>
                  {!item.live && (
                    <span className="ml-auto font-mono text-[8px] uppercase tracking-wider text-jungle-300/60">
                      soon
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-jungle-800/60 px-3 py-2.5">
          <div className="grid size-9 place-items-center rounded-full bg-clay font-display text-lg text-bone">
            C
          </div>
          <div className="leading-tight">
            <div className="text-sm font-medium text-bone">Chris Barrett</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-jungle-300">
              Owner
            </div>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 pb-24 md:pb-0">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-20 flex items-center justify-between border-b border-line bg-bone/85 px-5 py-3 backdrop-blur">
          <div>
            <span className="font-display text-2xl leading-none">Ora</span>
            <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
              Command
            </span>
          </div>
          <div className="grid size-8 place-items-center rounded-full bg-jungle-900 font-display text-sm text-bone">
            C
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-5 py-6 md:px-9 md:py-9">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bone/90 backdrop-blur">
        <div className="mx-auto flex max-w-md items-stretch justify-between px-3 py-2">
          {MOBILE_NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[10px]",
                  active ? "text-jungle-900" : "text-muted",
                ].join(" ")}
              >
                <Icon className="size-5" strokeWidth={active ? 2.5 : 1.9} />
                <span className="font-medium">{item.short}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
