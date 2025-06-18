import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPlus } from "react-icons/fi";

import { Link } from "react-router-dom";
import type { Letter } from "../types/globle";
import { fetchLetters } from "../libs/firestoreHelpers";

const Letters = () => {
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    fetchLetters().then(setLetters);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-rose-600">Letters 💌</h1>
        <button className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full shadow-md transition">
          <FiPlus />
          Add Letter
        </button>
      </div>

      {letters.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 mt-20"
        >
          No letters yet... Start writing something sweet ✍️
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {letters.map((letter) => (
            <Link to={`/letter/${letter.id}`} key={letter.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-rose-500">{letter.title}</h2>
                  <FiMail className="text-rose-300" />
                </div>
                <p className="text-gray-500 text-sm mt-2 italic">
                  {letter.date.toLocaleDateString()}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Letters;
