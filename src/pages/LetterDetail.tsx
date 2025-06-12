// pages/LetterDetail.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Letter } from "../types/globle";
import LetterEnvelope from "../components/letter/LetterEnvelope";

export default function LetterDetail() {
  const { id } = useParams();
  const [letter, setLetter] = useState<Letter | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("letters");
    if (stored) {
      const parsed: Letter[] = JSON.parse(stored);
      const found = parsed.find((l) => l.id === Number(id));
      setLetter(found || null);
    }
  }, [id]);

  if (!letter) {
    return <div className="text-center mt-10 text-gray-500">Letter not found 💔</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">
      <LetterEnvelope content={letter.message} />
    </div>
  );
}
