
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
    <div>
      <h2 className="text-lg font-semibold text-rose-500 mb-2">🖼️ Background</h2>
      <div className="flex gap-4 overflow-x-auto">
        {backgrounds.map((bg) => (
          <div
            key={bg.name}
            className={`w-32 h-20 rounded-lg overflow-hidden shadow cursor-pointer border-2 transition-all ${
              selected === bg.url ? "border-rose-500" : "border-transparent"
            }`}
            onClick={() => onChange(bg.url)}
          >
            <img src={bg.url} alt={bg.name} className="w-full h-full object-cover" />
            <p className="text-center text-xs mt-1">{bg.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
