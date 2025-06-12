// pages/LetterList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Letter } from "../types/globle";

export default function LetterList() {
  const [letters, setLetters] = useState<Letter[]>([]);

useEffect(() => {
  const stored = localStorage.getItem("letters");
  if (!stored) {
    const sampleLetters = [
      {
        id: 1,
        title: "Open When You're Sad",
        message: "Hey love, if you're reading this, know that I'm always with you 💖",
        category: "Open When You're Sad" as Letter["category"],
        date: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Anniversary Love Note",
        message: "Happy Anniversary, my forever person 🥂✨",
        category: "Anniversary" as Letter["category"],
        date: new Date().toISOString(),
      },
      {
        id: 3,
        title: "After Our First Fight",
        message: "No matter what, I love you even through storms 💌",
        category: "After a Fight" as Letter["category"],
        date: new Date().toISOString(),
      },
    ];

    localStorage.setItem("letters", JSON.stringify(sampleLetters));
    setLetters(sampleLetters);
  } else {
    setLetters(JSON.parse(stored));
  }
}, []);


  const grouped = letters.reduce((acc, letter) => {
    (acc[letter.category] ||= []).push(letter);
    return acc;
  }, {} as Record<string, Letter[]>);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-rose-600 mb-6">💌 Letters</h1>
      {Object.entries(grouped).map(([category, list]) => (
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
