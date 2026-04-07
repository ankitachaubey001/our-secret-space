const colors = ["#fbcfe8", "#bfdbfe", "#bbf7d0", "#fde68a"];

export default function ThemeColorSelector({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (color: string) => void;
}) {
  return (
    <div className="page-card p-5">
      <h2 className="text-lg font-semibold text-rose-700">Theme color</h2>
      <p className="text-sm text-slate-500 mt-1">
        Pick a highlight color for your space.
      </p>
      <div className="flex gap-3 mt-4">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-9 h-9 rounded-full border-2 transition-all ${
              selected === color ? "border-rose-500 scale-110" : "border-gray-200"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            aria-label={`Select theme color ${color}`}
          />
        ))}
      </div>
    </div>
  );
}
