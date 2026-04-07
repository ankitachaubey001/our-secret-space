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

  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.message || !formData.date || !formData.tag) return;
    onSubmit(formData);
    setFormData({ title: "", message: "", date: "", image: "", tag: "" });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="page-card w-full max-w-xl p-6 sm:p-8"
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display text-rose-700">New Memory</h2>
            <p className="text-sm text-slate-500 mt-1">
              Add a title, a quick note, and a photo.
            </p>
          </div>
          <button onClick={onClose} className="btn-ghost">
            Close
          </button>
        </div>

        <div className="space-y-4 mt-6">
          <input
            type="text"
            placeholder="Memory title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
          />
          <textarea
            placeholder="Write a short note..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="input-field min-h-[120px]"
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="input-field"
          />

          <div
            className={`w-full p-4 border-2 ${
              dragActive ? "border-rose-400" : "border-rose-200"
            } border-dashed rounded-2xl text-center text-slate-500 cursor-pointer transition bg-white/70`}
            onClick={() => document.getElementById("imageInput")?.click()}
          >
            {formData.image ? (
              <img src={formData.image} alt="Uploaded" className="mx-auto max-h-48 rounded-2xl" />
            ) : (
              <p>Drag & drop an image, or click to upload</p>
            )}
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="hidden"
            />
          </div>

          <select
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            className="input-field"
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
          <button onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-primary">
            Add memory
          </button>
        </div>
      </motion.div>
    </div>
  );
}
