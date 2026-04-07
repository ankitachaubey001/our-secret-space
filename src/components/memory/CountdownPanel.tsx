import { useNavigate } from "react-router-dom";
import type { Memory, SpecialDay } from "../../types/globle";

type SpecialDayWithTarget = SpecialDay & { target: Date };

type Props = {
  nextSpecialDay: SpecialDayWithTarget | null;
  activeMemories: Memory[];
};

export default function CountdownPanel({ nextSpecialDay, activeMemories }: Props) {
  const navigate = useNavigate();

  const goRandom = () => {
    if (!activeMemories.length) return;
    const random = activeMemories[Math.floor(Math.random() * activeMemories.length)];
    navigate(`/memory/${random.id}`);
  };

  const daysToGo = nextSpecialDay
    ? Math.ceil((nextSpecialDay.target.getTime() - Date.now()) / 86400000)
    : null;

  return (
    <div className="page-card p-6 space-y-6">
      <div>
        <h2 className="section-title">Next special day</h2>
        <p className="section-subtitle mt-1">Always worth preparing for.</p>
        <div className="mt-4">
          {nextSpecialDay ? (
            <div className="space-y-1">
              <p className="text-lg font-semibold text-slate-800">{nextSpecialDay.title}</p>
              <p className="text-sm text-slate-500">
                <span className="text-rose-600 font-semibold">{daysToGo}</span> days to go
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Add a special day to start counting.</p>
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold text-slate-700">Surprise me</h3>
        <p className="text-xs text-slate-500 mt-1">Jump to a random memory.</p>
        <button onClick={goRandom} className="btn-outline mt-3" disabled={!activeMemories.length}>
          Take me there
        </button>
      </div>
    </div>
  );
}