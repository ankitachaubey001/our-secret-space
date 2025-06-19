
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
    <div>
      <h2 className="text-lg font-semibold text-rose-500 mb-2">🎵 Background Music</h2>
      <div className="space-y-2">
        {musics.map((music) => (
          <label key={music.url} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="music"
              checked={selected === music.url}
              onChange={() => onChange(music.url)}
            />
            {music.name}
          </label>
        ))}
      </div>
    </div>
  );
}
