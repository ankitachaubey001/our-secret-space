const backgrounds = [
  { name: "Starry Sky", url: "/bg/starry.jpg" },
  { name: "Cherry Blossom", url: "/bg/blossom.jpg" },
  { name: "Cozy Room", url: "/bg/cozy.jpg" },
];

export default function BackgroundSelector({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (url: string) => void;
}) {
  return (
    <div className="page-card p-5">
      <h2 className="text-lg font-semibold text-rose-700">Background</h2>
      <p className="text-sm text-slate-500 mt-1">
        Choose a backdrop to set the mood.
      </p>
      <div className="flex gap-4 overflow-x-auto mt-4">
        {backgrounds.map((bg) => (
          <button
            key={bg.name}
            className={`w-32 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
              selected === bg.url ? "border-rose-500" : "border-transparent"
            }`}
            onClick={() => onChange(bg.url)}
          >
            <img src={bg.url} alt={bg.name} className="w-full h-20 object-cover" />
            <p className="text-center text-xs text-slate-600 py-2">{bg.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
