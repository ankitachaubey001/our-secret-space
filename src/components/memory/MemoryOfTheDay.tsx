import { Link, useNavigate } from "react-router-dom";
import MemoryCard from "../MemoryCard";
import type { Memory } from "../../types/globle";

type Props = { memory: Memory | null };

export default function MemoryOfTheDay({ memory }: Props) {
  const navigate = useNavigate();

  return (
    <div className="page-card p-6 space-y-4">
      <div>
        <h2 className="section-title">Memory of the day</h2>
        <p className="section-subtitle mt-1">A small reminder from your shared archive.</p>
      </div>
      {memory ? (
        <>
          <MemoryCard memory={memory} />
          <div className="flex gap-3">
            <Link to={`/memory/${memory.id}`} className="btn-outline">
              Open memory
            </Link>
            <button
              onClick={() => navigate(`/memory/${memory.id}`)}
              className="btn-ghost"
            >
              Read more
            </button>
          </div>
        </>
      ) : (
        <p className="text-slate-500 text-sm">No memories yet. Add your first one!</p>
      )}
    </div>
  );
}