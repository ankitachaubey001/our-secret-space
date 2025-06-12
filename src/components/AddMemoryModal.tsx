import { useState } from "react";
import { motion } from "framer-motion";
import type { MemoryFormData } from "../types/globle";


type AddMemoryModalProps = {
  onClose: () => void;
  onSubmit: (formData: MemoryFormData) => void;
};

export default function AddMemoryModal({ onClose, onSubmit }: AddMemoryModalProps) {
  const [formData, setFormData] = useState<MemoryFormData>({
    title: "",
    message: "",
    date: "",
    image: "",
     tag: "",
  });

  const handleSubmit = () => {
if (!formData.title || !formData.message || !formData.date || !formData.tag) return;
    onSubmit(formData);
    setFormData({ title: "", message: "", date: "", image: "" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-rose-500 mb-4 text-center">New Memory</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Title 💖"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
          <textarea
            placeholder="Your sweet note ✨"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            rows={3}
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
          <input
            type="url"
            placeholder="Image URL (optional) 📷"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        </div>
<div>
  {/* <label className="block text-sm font-medium text-gray-700 mb-1">Category 🏷️</label> */}
  <select
    value={formData.tag || ""}
    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
    className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
  >
    <option value="">Select category</option>
    <option value="Anniversary">Anniversary</option>
    <option value="Trip">Trip</option>
    <option value="Casual">Casual</option>
    <option value="Celebration">Celebration</option>
    <option value="Other">Other</option>
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
            Add 💌
          </button>
        </div>
      </motion.div>
    </div>
  );
}
