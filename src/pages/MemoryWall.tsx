import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import AddMemoryModal from "../components/AddMemoryModal";
import MemoryCard from "../components/MemoryCard";
import type { Memory, MemoryFormData } from "../types/globle";

const MemoryWall = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [searchParams] = useSearchParams();
  const add = searchParams.get("add");

  const [showModal, setShowModal] = useState(add === "true");

  useEffect(() => {
    const stored = localStorage.getItem("memories");
    if (stored) {
      const parsed = (JSON.parse(stored) as Memory[]).map((m: Memory) => ({
        ...m,
        date: new Date(m.date),
      }));
      setMemories(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("memories", JSON.stringify(memories));
  }, [memories]);

  const handleAddMemory = (data: MemoryFormData) => {
    const newMemory: Memory = {
      id: Date.now(),
      ...data,
      date: new Date(data.date),
    };
    setMemories([newMemory, ...memories]);
    setShowModal(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-rose-600">Memory Wall 💌</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-full shadow-md"
        >
          + Add Memory
        </button>
        
      </div>

      {showModal && (
        <AddMemoryModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddMemory}
        />
      )}

      {memories.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 mt-20"
        >
          No memories yet... Start by adding one! 🌸
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {memories.map((memory) => (
  <div key={memory.id}>
    <MemoryCard memory={memory} />
    <div className="text-right mt-2">
      <Link
        to={`/memory/${memory.id}`}
        className="text-sm text-rose-500 hover:underline"
      >
        View Details →
      </Link>
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default MemoryWall;
