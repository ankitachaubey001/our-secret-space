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
    alert("Memory added successfully.");
    setMemories(updated);
    setShowModal(false);
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="page-card w-full max-w-md p-6 sm:p-8">
          <h2 className="text-2xl font-display text-rose-700">
            Memory Wall Locked
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Enter the shared password to view and add memories.
          </p>
          <input
            type="password"
            placeholder="Shared password"
            className="input-field mt-5"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <button
            onClick={() => {
              if (inputPassword === correctPassword) {
                setIsUnlocked(true);
              } else {
                alert("Incorrect password.");
              }
            }}
            className="btn-primary w-full mt-4"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="section-title">Memory Wall</h1>
            <p className="section-subtitle mt-1">
              A visual timeline of your favorite shared moments.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary"
          >
            Add memory
          </button>
        </div>

        {showModal && (
          <AddMemoryModal
            onClose={() => setShowModal(false)}
            onSubmit={handleAddMemory}
          />
        )}

        {memories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="page-card p-10 text-center text-slate-500"
          >
            No memories yet. Start with your first photo and a short note.
            <div className="mt-6">
              <button
                onClick={() => setShowModal(true)}
                className="btn-outline"
              >
                Add your first memory
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((memory) => (
              <div key={memory.id}>
                <MemoryCard memory={memory} />
                <div className="text-right mt-2">
                  <Link to={`/memory/${memory.id}`} className="text-sm text-rose-600 hover:underline">
                    View details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
