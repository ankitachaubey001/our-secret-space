type Props = { total: number; favorites: number; thisMonth: number };

const stats = [
  { label: "Total memories", key: "total" as const, icon: "🗂" },
  { label: "Favorites", key: "favorites" as const, icon: "♥" },
  { label: "This month", key: "thisMonth" as const, icon: "📅" },
];

export default function StatsBar({ total, favorites, thisMonth }: Props) {
  const values = { total, favorites, thisMonth };
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map(({ label, key, icon }) => (
        <div key={key} className="page-card p-5 flex items-center gap-4">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
            <p className="text-3xl font-display text-rose-700 mt-1">{values[key]}</p>
          </div>
        </div>
      ))}
    </section>
  );
}