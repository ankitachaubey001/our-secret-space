import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  fetchSpecialDays,
  addSpecialDay,
} from "../libs/firestoreHelpers";
import type { SpecialDay } from "../types/globle";

const SpecialDays = () => {
  const [days, setDays] = useState<SpecialDay[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newDay, setNewDay] = useState({ title: "", date: "" });

  useEffect(() => {
    const load = async () => {
      const data = await fetchSpecialDays();
      setDays(data);
    };
    load();
  }, []);

  const handleAdd = async () => {
    if (!newDay.title || !newDay.date) return;

    const id = await addSpecialDay({ title: newDay.title, date: newDay.date });
    const newSpecial: SpecialDay = {
      id,
      title: newDay.title,
      date: newDay.date,
      createdAt: new Date(),
    };
    setDays([...days, newSpecial]);
    setNewDay({ title: "", date: "" });
    setShowModal(false);
  };

  const getCountdown = (date: string) => {
    const diff = Math.ceil(
      (new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff >= 0 ? `${diff} day${diff !== 1 ? "s" : ""} left` : "Past 💭";
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-rose-600">📅 Special Days</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-rose-500 text-white px-4 py-2 rounded-lg shadow hover:bg-rose-600 transition cursor-pointer"
        >
          ➕ Add
        </button>
      </div>

      <div className="space-y-4">
        {days.map((day) => (
          <div
            key={day.id}
            className="bg-pink-100 border border-rose-200 p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-rose-500">{day.title}</h2>
            <p className="text-gray-700">🗓️ {new Date(day.date).toDateString()}</p>
            <p className="text-sm text-gray-600">⏳ {getCountdown(day.date)}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl"
          >
            <h2 className="text-2xl font-bold text-rose-500 mb-4 text-center">Add Special Day</h2>
            <input
              type="text"
              placeholder="Event Title (e.g. First Trip 🌸)"
              value={newDay.title}
              onChange={(e) => setNewDay({ ...newDay, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-rose-300"
            />
            <input
              type="date"
              value={newDay.date}
              onChange={(e) => setNewDay({ ...newDay, date: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg mb-6 focus:ring-2 focus:ring-rose-300"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition cursor-pointer cursor-pointer"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SpecialDays;
