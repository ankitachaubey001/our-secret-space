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
    <div className="p-6 max-w-3xl mx-auto">
 <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-rose-600">Letters 💌</h1>
        <button className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full shadow-md transition" onClick={()=>navigate("/letters/new")}>
          <FiPlus />
          Add Letter
        </button>
      </div>      {Object.entries(grouped).map(([category, list]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold text-rose-500 mb-3">{category}</h2>
          <ul className="space-y-3">
            {list.map((letter) => (
              <li key={letter.id}>
                <Link
                  to={`/letters/${letter.id}`}
                  className="block p-4 bg-pink-100 rounded-xl hover:bg-pink-200 shadow"
                >
                  {letter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
