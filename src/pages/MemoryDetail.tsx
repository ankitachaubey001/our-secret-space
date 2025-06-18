import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Memory } from "../types/globle";

const MemoryDetail = () => {
  const { id } = useParams();
  const [memory, setMemory] = useState<Memory | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("memories");
    if (stored) {
      const memories: Memory[] = JSON.parse(stored).map((m: { date: string | number | Date; }) => ({
        ...m,
        date: new Date(m.date),
      }));
      const found = memories.find((m) => Number(m.id) === Number(id));
      setMemory(found || null);
    }
  }, [id]);

  if (!memory) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Memory not found 💔
        <div className="mt-4">
          <Link
            to="/memories"
            className="text-rose-500 underline hover:text-rose-700 transition"
          >
            ← Back to Memory Wall
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4">
        <Link
          to="/memories"
          className="text-sm text-rose-500 hover:text-rose-700 transition inline-block mb-4"
        >
          ← Back to Memory Wall
        </Link>
      </div>
<h1 className="text-3xl font-bold text-rose-600 mb-2">{memory.title}</h1>
{memory.tag && (
  <p className="text-sm inline-block bg-rose-100 text-rose-600 px-3 py-1 rounded-full font-semibold mb-2">
    #{memory.tag}
  </p>
)}
<p className="text-gray-700 mb-2">🗓️ {memory.date.toLocaleDateString()}</p>
      <p className="text-gray-700 mb-6 whitespace-pre-line">{memory.description}</p>
      {memory.image && (
        <img
          src={memory.image}
          alt={memory.title}
          className="rounded-xl shadow-md max-h-[500px] w-full object-cover"
        />
      )}
      
    </div>
  );
};

export default MemoryDetail;
