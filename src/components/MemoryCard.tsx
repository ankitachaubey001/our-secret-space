import { motion } from "framer-motion";
import type { Memory } from "../types/globle";

type MemoryCardProps = {
  memory: Memory;
};

export default function MemoryCard({ memory }: MemoryCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group rounded-3xl overflow-hidden bg-white/90 border border-rose-100 shadow-lg shadow-rose-100/70 hover:-translate-y-1 hover:shadow-xl transition"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100">
        <img src={memory.image} alt="memory" className="h-full w-full object-cover" />
      </div>

      <div className="p-5">
        {memory.tag && <span className="badge">{memory.tag}</span>}
        <h2 className="text-lg font-semibold text-slate-800 mt-3">
          {memory.title}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {memory.date.toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
}
