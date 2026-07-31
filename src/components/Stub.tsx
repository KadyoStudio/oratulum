export default function Stub({
  title,
  desc,
  points,
}: {
  title: string;
  desc: string;
  points: string[];
}) {
  return (
    <div className="animate-in space-y-6">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Ora Command
        </p>
        <h1 className="mt-2 font-display text-[2rem] leading-tight tracking-tight text-ink">
          {title}
        </h1>
        <p className="mt-1.5 max-w-lg text-sm text-muted">{desc}</p>
      </header>

      <div className="rounded-3xl border border-dashed border-line bg-white/50 p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-jungle-700/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-jungle-700">
          In this module
        </div>
        <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-ink">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
          Preview · full screen built during the project
        </p>
      </div>
    </div>
  );
}
