// pages/MemoryDetail.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../hooks/firebaseConfig";
import type { Memory } from "../types/globle";

const MemoryDetail = () => {
  const { id } = useParams();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "You are my today and all of my tomorrows 💖",
    "Every memory with you is a treasure 🥹",
    "Together is my favorite place to be 🌸",
  ];

  useEffect(() => {
    const fetchMemory = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "memories", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMemory({
            ...data,
            id: docSnap.id,
            date: data.date?.toDate ? data.date.toDate() : new Date(data.date),
          } as Memory);
        } else {
          setMemory(null);
        }
      } catch (err) {
        console.error("Failed to fetch memory:", err);
        setMemory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMemory();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-gray-400">Loading memory...</div>;
  }

  if (!memory) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Memory not found 💔
        <div className="mt-4">
          <Link
            to="/memories"
            className="text-rose-500 underline hover:text-rose-700 transition"
          >
            ← Back to Memory Wall
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto relative">
      {zoom && memory.image && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setZoom(false)}
        >
          <img src={memory.image} alt="zoomed" className="max-h-[90vh] rounded-xl shadow-xl" />
        </div>
      )}
      <Link
        to="/memories"
        className="text-sm text-rose-500 hover:text-rose-700 transition inline-block mb-4"
      >
        ← Back to Memory Wall
      </Link>

      <h1 className="text-3xl font-bold text-rose-600 mb-2">{memory.title}</h1>

      <div className="mb-2 flex items-center gap-3">
        {memory.tag && (
          <span className="inline-block bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-semibold">
            #{memory.tag}
          </span>
        )}
        {memory.isLocked && (
          <span className="text-xs text-rose-400 italic">🔒 Private Memory</span>
        )}
      </div>

      <p className="text-gray-700 mb-2">
        🗓️ {memory.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <p className="italic text-pink-600 text-sm text-center mb-4">
        {quotes[quoteIndex]}
      </p>

      <p className="text-gray-700 mb-6 whitespace-pre-line leading-relaxed">
        {memory.description}
      </p>

      {memory.image && (
        <img
          src={memory.image}
          alt={memory.title}
          onClick={() => setZoom(true)}
          className="rounded-xl shadow-md max-h-[500px] w-full object-cover cursor-zoom-in transition hover:scale-[1.02]"
        />
      )}

      <audio autoPlay loop className="hidden">
        <source src="/your-soft-bg-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default MemoryDetail;
