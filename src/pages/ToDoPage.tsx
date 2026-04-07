import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  addTaskToFirestore,
  deleteTaskFromFirestore,
  fetchTasks,
  toggleTaskCompletion,
} from "../libs/firestoreHelpers";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function ToDoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const addTask = async () => {
    if (!input.trim()) return;
    const newTask = {
      text: input.trim(),
      completed: false,
    };
    await addTaskToFirestore(newTask);
    const updated = await fetchTasks();
    setTasks(updated);
    setInput("");
  };

  const handleToggle = async (task: Task) => {
    await toggleTaskCompletion(task.id, task.completed);
    const updated = await fetchTasks();
    setTasks(updated);
  };

  const handleDelete = async (id: string) => {
    await deleteTaskFromFirestore(id);
    const updated = await fetchTasks();
    setTasks(updated);
  };

  return (
    <div className="page-shell">
      <div className="max-w-3xl mx-auto">
        <div className="page-card p-6 sm:p-8">
          <h1 className="section-title">Shared To-Do</h1>
          <p className="section-subtitle mt-2">
            Keep your plans, errands, and little dreams in one list.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <input
              type="text"
              placeholder="Add something you want to do together..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-field flex-1"
            />
            <button onClick={addTask} className="btn-primary">
              Add
            </button>
          </div>
        </div>

        <div className="mt-6">
          {tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="page-card p-8 text-center text-slate-500"
            >
              Nothing planned yet. Add your first idea above.
            </motion.div>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between bg-white/80 border border-rose-100 rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggle(task)}
                      className="w-5 h-5 text-rose-500 accent-rose-500"
                    />
                    <span
                      className={`text-slate-700 ${
                        task.completed ? "line-through opacity-60" : ""
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="btn-ghost text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
