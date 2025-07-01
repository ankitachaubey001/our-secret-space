import { useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import type { Memory, MemoryFormData } from "../types/globle";
import { addMemoryToFirestore, fetchMemories } from "../libs/firestoreHelpers";
import AddMemoryModal from "../components/AddMemoryModal";
import MemoryCard from "../components/MemoryCard";

export default function MemoryWall() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();
  const add = searchParams.get("add");

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  const correctPassword = "loveYou123";

  useEffect(() => {
    if (add === "true") setShowModal(true);
  }, [add]);

  useEffect(() => {
    if (isUnlocked) {
      fetchMemories().then(setMemories);
    }
  }, [isUnlocked]);

  const handleAddMemory = async (formData: MemoryFormData) => {
    await addMemoryToFirestore(formData);
    const updated = await fetchMemories();
    console.log("Memory added successfully", updated);
    alert("Memory added successfully! 💖");
    setMemories(updated);
    setShowModal(false);
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center w-full max-w-sm">
          <h2 className="text-lg font-semibold text-rose-600 mb-3">Memory Wall Locked 🔐</h2>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-2 border border-rose-300 rounded mb-3"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <button
            onClick={() => {
              if (inputPassword === correctPassword) {
                setIsUnlocked(true);
              } else {
                alert("Incorrect password 💔");
              }
            }}
            className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition cursor-pointer"
          >
            Unlock 💖
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-rose-600">Memory Wall 💌</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-full shadow-md cursor-pointer"
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
}
