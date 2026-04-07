import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import MemoryCard from "../MemoryCard";
import type { Memory } from "../../types/globle";

type ViewMode = "grid" | "timeline";

type Props = {
  memories: Memory[];
  viewMode: ViewMode;
  showDeleted: boolean;
  onToggleFavorite: (memory: Memory) => void;
  onSoftDelete: (id: string) => void;
  onRestore: (id: string) => void;
  onDeleteForever: (id: string) => void;
  onAddFirst: () => void;
};

function MemoryActions({
  memory,
  showDeleted,
  onToggleFavorite,
  onRestore,
  onRequestDelete,
}: {
  memory: Memory;
  showDeleted: boolean;
  onToggleFavorite: (memory: Memory) => void;
  onRestore: (id: string) => void;
  onRequestDelete: (id: string, mode: "soft" | "hard") => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Link to={`/memory/${memory.id}`} className="text-sm text-rose-600 hover:underline">
        View details
      </Link>
      <div className="flex flex-wrap gap-2">
        {!showDeleted ? (
          <>
            <button
              onClick={() => onToggleFavorite(memory)}
              className="btn-ghost text-xs"
              aria-label={memory.isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <FiHeart className={memory.isFavorite ? "text-rose-600" : "text-slate-400"} />
            </button>
            <button
              onClick={() => onRequestDelete(memory.id, "soft")}
              className="btn-ghost text-xs"
              aria-label="Delete memory"
            >
              <FiTrash2 className="text-slate-500" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onRestore(memory.id)} className="btn-ghost text-xs">
              Restore
            </button>
            <button
              onClick={() => onRequestDelete(memory.id, "hard")}
              className="btn-ghost text-xs"
              aria-label="Delete forever"
            >
              <FiTrash2 className="text-rose-600" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function MemoryItem({
  memory,
  showDeleted,
  onToggleFavorite,
  onRestore,
  onRequestDelete,
}: {
  memory: Memory;
  showDeleted: boolean;
  onToggleFavorite: (memory: Memory) => void;
  onRestore: (id: string) => void;
  onRequestDelete: (id: string, mode: "soft" | "hard") => void;
}) {
  return (
    <div className="space-y-3">
      <MemoryCard memory={memory} />
      <MemoryActions
        memory={memory}
        showDeleted={showDeleted}
        onToggleFavorite={onToggleFavorite}
        onRestore={onRestore}
        onRequestDelete={onRequestDelete}
      />
    </div>
  );
}

const cardGrid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

export default function MemoryGrid({
  memories,
  viewMode,
  showDeleted,
  onToggleFavorite,
  onSoftDelete,
  onRestore,
  onDeleteForever,
  onAddFirst,
}: Props) {
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; mode: "soft" | "hard" } | null>(null);

  const handleConfirmDelete = (target: { id: string; mode: "soft" | "hard" }) => {
    if (target.mode === "hard") {
      onDeleteForever(target.id);
    } else {
      onSoftDelete(target.id);
    }
    setDeleteTarget(null);
  };

  let content: ReactNode = null;

  if (memories.length === 0) {
    content = (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="page-card p-10 text-center text-slate-500"
      >
        {showDeleted ? (
          "No deleted memories."
        ) : (
          <div className="space-y-4">
            <p>No memories yet. Start with your first photo and a short note.</p>
            <button onClick={onAddFirst} className="btn-outline">
              Add your first memory
            </button>
          </div>
        )}
      </motion.div>
    );
  } else if (viewMode === "grid") {
    content = (
      <div className={cardGrid}>
        {memories.map((memory) => (
          <MemoryItem
            key={memory.id}
            memory={memory}
            showDeleted={showDeleted}
            onToggleFavorite={onToggleFavorite}
            onRestore={onRestore}
            onRequestDelete={setDeleteTarget}
          />
        ))}
      </div>
    );
  } else {
    const grouped = memories.reduce((acc, memory) => {
      const key = memory.date.toLocaleDateString(undefined, { year: "numeric", month: "long" });
      (acc[key] ||= []).push(memory);
      return acc;
    }, {} as Record<string, Memory[]>);

    content = (
      <div className="space-y-10">
        {Object.entries(grouped).map(([month, list]) => (
          <div key={month}>
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-3">
              <span>{month}</span>
              <span className="text-xs text-slate-400 font-normal">{list.length} memories</span>
            </h3>
            <div className={cardGrid}>
              {list.map((memory) => (
                <MemoryItem
                  key={memory.id}
                  memory={memory}
                  showDeleted={showDeleted}
                  onToggleFavorite={onToggleFavorite}
                  onRestore={onRestore}
                  onRequestDelete={setDeleteTarget}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {content}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="page-card w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-slate-800">
              {deleteTarget.mode === "hard" ? "Delete permanently?" : "Move to trash?"}
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              {deleteTarget.mode === "hard"
                ? "This will permanently delete the memory and cannot be undone."
                : "You can restore it later from the trash."}
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setDeleteTarget(null)} className="btn-ghost">
                Cancel
              </button>
              <button onClick={() => handleConfirmDelete(deleteTarget)} className="btn-primary">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
