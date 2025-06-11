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
      className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm border border-pink-100 hover:shadow-lg hover:-translate-y-1 transition-transform"
    >
      {memory.image && (
        <img
          src={memory.image}
          alt="memory"
          className="w-full h-48 object-cover rounded-xl mb-3"
        />
      )}
      <h3 className="text-xl font-semibold text-rose-500 mb-1">
        {memory.title}
      </h3>
      <p className="text-gray-600 text-sm mb-2 whitespace-pre-wrap">
        {memory.message}
      </p>
      <div className="text-xs text-right text-rose-400">
        {memory.date.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    </motion.div>
  );
}
