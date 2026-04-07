import { useState } from "react";
import BackgroundSelector from "../components/settings/BackgroundSelector";
import MusicSelector from "../components/settings/MusicSelector";
import ThemeColorSelector from "../components/settings/ThemeColorSelector";

export default function SettingsPage() {
  const [color, setColor] = useState("#fbcfe8");
  const [bg, setBg] = useState("/bg/starry.jpg");
  const [music, setMusic] = useState("/music/lofi.mp3");

  return (
    <div className="page-shell">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="page-card p-6">
          <h1 className="section-title">Customize your space</h1>
          <p className="section-subtitle mt-2">
            Choose the mood, background, and soundtrack that fits you.
          </p>
        </div>

        <ThemeColorSelector selected={color} onChange={setColor} />
        <BackgroundSelector selected={bg} onChange={setBg} />
        <MusicSelector selected={music} onChange={setMusic} />
      </div>
    </div>
  );
}
