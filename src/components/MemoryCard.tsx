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
<div className="p-4">
  {memory.tag && (
    <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
      {memory.tag}
    </span>
  )}
  <h2 className="text-xl font-bold mb-1">{memory.title}</h2>
  <p className="text-gray-600 text-sm">{memory.date.toLocaleDateString()}</p>
</div>

      
    </motion.div>
  );
}
