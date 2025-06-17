// pages/ToDoPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function ToDoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setInput("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-rose-600 mb-6">📝 Our To-Do List</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="e.g. 🧺 Go on a picnic"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border border-rose-200 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
        <button
          onClick={addTask}
          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full shadow"
        >
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 mt-20"
        >
          Nothing planned yet… let's dream something 💭
        </motion.p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center bg-pink-50 rounded-xl p-3 shadow"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  setTasks((prev) =>
                    prev.map((t) =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }
                className="mr-3 w-5 h-5 text-rose-500 accent-rose-500"
              />
              <span
                className={`text-gray-700 ${
                  task.completed ? "line-through opacity-60" : ""
                }`}
              >
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
