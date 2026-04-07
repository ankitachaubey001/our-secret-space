const musics = [
  { name: "Lo-Fi Beats", url: "/music/lofi.mp3" },
  { name: "Soft Piano", url: "/music/piano.mp3" },
  { name: "Ambient Rain", url: "/music/rain.mp3" },
];

export default function MusicSelector({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (url: string) => void;
}) {
  return (
    <div className="page-card p-5">
      <h2 className="text-lg font-semibold text-rose-700">Background music</h2>
      <p className="text-sm text-slate-500 mt-1">
        Pick a soundtrack for your memories.
      </p>
      <div className="space-y-2 mt-4">
        {musics.map((music) => (
          <label
            key={music.url}
            className="flex items-center gap-3 cursor-pointer text-sm text-slate-600"
          >
            <input
              type="radio"
              name="music"
              checked={selected === music.url}
              onChange={() => onChange(music.url)}
              className="accent-rose-500"
            />
            {music.name}
          </label>
        ))}
      </div>
    </div>
  );
}
