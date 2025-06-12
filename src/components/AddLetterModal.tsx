import { useState } from "react";
import { motion } from "framer-motion";

export type LetterFormData = {
  title: string;
  message: string;
  category: string;
};

type AddLetterModalProps = {
  onClose: () => void;
  onSubmit: (formData: LetterFormData) => void;
};

const categories = [
  "Open When You're Sad",
  "Open When You're Happy",
  "Anniversary Note",
  "Just Because",
];

export default function AddLetterModal({ onClose, onSubmit }: AddLetterModalProps) {
  const [formData, setFormData] = useState<LetterFormData>({
    title: "",
    message: "",
    category: categories[0],
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.message) return;
    onSubmit(formData);
    setFormData({ title: "", message: "", category: categories[0] });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-rose-500 mb-4 text-center">
          New Letter ✉️
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Title 💖"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
          />

          <textarea
            placeholder="Your sweet letter ✨"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            rows={4}
          />

          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
          >
            Add ✍️
          </button>
        </div>
      </motion.div>
    </div>
  );
}
