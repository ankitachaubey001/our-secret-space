import { useState } from "react";
import type { LetterCategory } from "../types/globle";
import { useNavigate } from "react-router-dom";
import { createLetter } from "../libs/firestoreHelpers";

const categories: LetterCategory[] = [
  "Open When You're Sad",
  "Anniversary Note",
  "First Fight",
  "Random Love",
];

export default function CreateLetter() {
  const [form, setForm] = useState({
    title: "",
    message: "",
    category: categories[0],
    isLocked: false,
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.title || !form.message) {
      alert("Title and message are required.");
      return;
    }

    await createLetter({
      title: form.title,
      message: form.message,
      category: form.category,
      isLocked: form.isLocked,
      password: form.isLocked ? form.password : "",
    });

    navigate("/letters");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-rose-600 mb-4">Write a Letter 💌</h1>

      <input
        type="text"
        placeholder="Title"
        className="w-full mb-3 p-3 border border-rose-300 rounded"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <select
        className="w-full mb-3 p-3 border border-rose-300 rounded"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value as LetterCategory })}
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <textarea
        placeholder="Your message..."
        className="w-full mb-3 p-3 border border-rose-300 rounded"
        rows={5}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <div className="mb-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isLocked}
            onChange={(e) => setForm({ ...form, isLocked: e.target.checked })}
          />
          Lock this letter with a password?
        </label>
      </div>

      {form.isLocked && (
        <input
          type="password"
          placeholder="Enter password"
          className="w-full mb-3 p-3 border border-rose-300 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      )}

      <button
        onClick={handleSubmit}
        className="bg-rose-500 text-white py-2 px-6 rounded hover:bg-rose-600 cursor-pointer"
      >
        Save 💖
      </button>
    </div>
  );
}
