import { useState } from "react";
import ThemeColorSelector from "../components/settings/ThemeColorSelector";
import BackgroundSelector from "../components/settings/BackgroundSelector";
import MusicSelector from "../components/settings/MusicSelector";

export default function SettingsPage() {
  const [color, setColor] = useState("#fbcfe8");
  const [bg, setBg] = useState("/bg/starry.jpg");
  const [music, setMusic] = useState("/music/lofi.mp3");

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-rose-600">⚙️ Customize Your Space</h1>

      <ThemeColorSelector selected={color} onChange={setColor} />
      <BackgroundSelector selected={bg} onChange={setBg} />
      <MusicSelector selected={music} onChange={setMusic} />
    </div>
  );
}
