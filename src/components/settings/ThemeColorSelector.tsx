import React from "react";

const colors = ["#fbcfe8", "#bfdbfe", "#bbf7d0", "#fde68a"];

export default function ThemeColorSelector({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (color: string) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-rose-500 mb-2">🎨 Theme Color</h2>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selected === color ? "border-rose-500 scale-110" : "border-gray-300"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
          />
        ))}
      </div>
    </div>
  );
}