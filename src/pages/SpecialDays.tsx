import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, Heart, Clock, Sparkles, Gift, X } from "lucide-react";

// Mock data and functions for demo
const mockDays = [
  {
    id: "1",
    title: "Anniversary 💕",
    date: "2025-09-15",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Birthday Party 🎂",
    date: "2025-08-25",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Graduation Day 🎓",
    date: "2025-12-10",
    createdAt: new Date(),
  },
];

const fetchSpecialDays = async () => mockDays;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addSpecialDay = async (_day: { title: string; date: string }) => Math.random().toString(36);

type SpecialDay = {
  id: string;
  title: string;
  date: string;
  createdAt: Date;
};

const SpecialDays = () => {
  const [days, setDays] = useState<SpecialDay[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newDay, setNewDay] = useState({ title: "", date: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchSpecialDays();
      setDays(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleAdd = async () => {
    if (!newDay.title || !newDay.date) return;

    const id = await addSpecialDay({ title: newDay.title, date: newDay.date });
    const newSpecial = {
      id,
      title: newDay.title,
      date: newDay.date,
      createdAt: new Date(),
    };
    setDays([...days, newSpecial]);
    setNewDay({ title: "", date: "" });
    setShowModal(false);
  };

  const getCountdown = (date: string | number | Date) => {
    const today = new Date();
    const targetDate = new Date(date);
    const diff = Math.ceil(
      (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diff < 0) return { text: "Past event", isPast: true, isToday: false };
    if (diff === 0) return { text: "Today! 🎉", isPast: false, isToday: true };
    if (diff === 1) return { text: "Tomorrow", isPast: false, isToday: false };
    return { text: `${diff} days left`, isPast: false, isToday: false };
  };

  const getEventIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes("birthday") || lower.includes("🎂"))
      return <Gift className="w-5 h-5" />;
    if (lower.includes("anniversary") || lower.includes("💕"))
      return <Heart className="w-5 h-5" />;
    return <Sparkles className="w-5 h-5" />;
  };

  const sortedDays = [...days].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="p-3 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Calendar className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Special Days
            </h1>
          </motion.div>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Keep track of your most precious moments
          </motion.p>
        </motion.div>

        {/* Add Button */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.button
            onClick={() => setShowModal(true)}
            className="group bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-2xl shadow-lg flex items-center gap-3"
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Plus className="w-5 h-5" />
            </motion.div>
            <span className="font-semibold">Add Special Day</span>
          </motion.button>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="flex justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="h-12 w-12 border-b-2 border-rose-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Days Grid */}
        <AnimatePresence>
          {!loading && (
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {sortedDays.map((day, index) => {
                const countdown = getCountdown(day.date);
                return (
                  <motion.div
                    key={day.id}
                    className={`group relative bg-white/80 backdrop-blur-sm border-2 p-6 rounded-3xl shadow-lg ${
                      countdown.isToday
                        ? "border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50"
                        : countdown.isPast
                        ? "border-gray-200 opacity-75"
                        : "border-rose-200"
                    }`}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotate: -1,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                    layout
                  >
                    {/* Floating Icon */}
                    <motion.div
                      className={`absolute -top-3 -right-3 p-3 rounded-full shadow-lg ${
                        countdown.isToday
                          ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                          : "bg-gradient-to-r from-rose-400 to-pink-400"
                      }`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      {getEventIcon(day.title)}
                    </motion.div>

                    <div className="space-y-4">
                      <motion.h3
                        className="text-xl font-bold text-gray-800 group-hover:text-rose-600 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        {day.title}
                      </motion.h3>

                      <motion.div
                        className="flex items-center gap-2 text-gray-600"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </motion.div>

                      <motion.div
                        className={`flex items-center gap-2 px-3 py-2 rounded-full font-semibold text-sm ${
                          countdown.isToday
                            ? "bg-yellow-100 text-yellow-800"
                            : countdown.isPast
                            ? "bg-gray-100 text-gray-600"
                            : "bg-rose-100 text-rose-700"
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Clock className="w-4 h-4" />
                        {countdown.text}
                      </motion.div>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-rose-400/10 to-pink-400/10 rounded-3xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {!loading && days.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Calendar className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                </motion.div>
                <motion.h3
                  className="text-2xl font-bold text-gray-600 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  No special days yet
                </motion.h3>
                <motion.p
                  className="text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Add your first special day to get started!
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                className="bg-white rounded-3xl w-full max-w-md shadow-2xl"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.div
                        className="p-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Plus className="w-5 h-5 text-white" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Add Special Day
                      </h2>
                    </motion.div>
                    <motion.button
                      onClick={() => setShowModal(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </motion.button>
                  </div>
                </div>

                <motion.div
                  className="p-6 space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Event Title
                    </label>
                    <motion.input
                      type="text"
                      placeholder="Enter event name (e.g., Anniversary 💕)"
                      value={newDay.title}
                      onChange={(e) =>
                        setNewDay({ ...newDay, title: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition-all outline-none text-gray-800"
                      autoFocus
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date
                    </label>
                    <motion.input
                      type="date"
                      value={newDay.date}
                      onChange={(e) =>
                        setNewDay({ ...newDay, date: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition-all outline-none text-gray-800"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="p-6 border-t border-gray-100 flex gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold"
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleAdd}
                    disabled={!newDay.title || !newDay.date}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{
                      scale: !newDay.title || !newDay.date ? 1 : 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Save Event
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SpecialDays;
