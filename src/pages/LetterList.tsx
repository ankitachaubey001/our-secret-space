import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Letter } from "../types/globle";
import { fetchLetters } from "../libs/firestoreHelpers";
import { FiPlus } from "react-icons/fi";

export default function LetterList() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLetters().then(setLetters);
  }, []);

  const grouped = letters.reduce((acc, letter) => {
    (acc[letter.category] ||= []).push(letter);
    return acc;
  }, {} as Record<string, Letter[]>);

  return (
    <div className="page-shell">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="section-title">Letters</h1>
            <p className="section-subtitle mt-1">
              Notes to open on the right day or the right mood.
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={() => navigate("/letters/new")}
          >
            <FiPlus />
            Add letter
          </button>
        </div>

        {Object.entries(grouped).length === 0 ? (
          <div className="page-card p-10 text-center text-slate-500">
            No letters yet. Write one for a future moment.
          </div>
        ) : (
          Object.entries(grouped).map(([category, list]) => (
            <div key={category} className="mb-8">
              <h2 className="text-lg font-semibold text-rose-700 mb-3">
                {category}
              </h2>
              <ul className="space-y-3">
                {list.map((letter) => (
                  <li key={letter.id}>
                    <Link
                      to={`/letters/${letter.id}`}
                      className="block p-5 bg-white/80 border border-rose-100 rounded-2xl hover:border-rose-200 shadow-sm hover:shadow-md transition"
                    >
                      {letter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
