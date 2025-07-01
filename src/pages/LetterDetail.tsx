import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Letter } from "../types/globle";
import LetterEnvelope from "../components/letter/LetterEnvelope";
import { fetchLetterById } from "../libs/firestoreHelpers";


export default function LetterDetail() {
  const { id } = useParams();
  const [letter, setLetter] = useState<Letter | null>(null);
  const [inputPassword, setInputPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (id) {
      fetchLetterById(id).then((data) => {
        setLetter(data);
        setIsUnlocked(!!data && !data?.isLocked);
      });
    }
  }, [id]);

  const handleUnlock = () => {
    if (letter && inputPassword === letter.password) {
      setIsUnlocked(true);
    } else {
      alert("Incorrect password!");
    }
  };

  if (!letter) {
    return <div className="text-center mt-10 text-gray-500">Letter not found 💔</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">
      {!isUnlocked ? (
        <div className="bg-white shadow-lg rounded-xl p-6 text-center w-full max-w-sm">
          <h2 className="text-lg text-rose-600 font-semibold mb-3">🔒 This letter is locked</h2>
          <input
            type="password"
            className="w-full p-2 border border-rose-300 rounded mb-3"
            placeholder="Enter password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <button
            onClick={handleUnlock}
            className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 cursor-pointer"
          >
            Unlock 💖
          </button>
        </div>
      ) : (
        <LetterEnvelope content={letter.message} />
      )}
    </div>
  );
}
