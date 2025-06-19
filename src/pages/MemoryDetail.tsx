import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Memory } from "../types/globle";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../hooks/firebaseConfig";

const MemoryDetail = () => {
  const { id } = useParams();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(true);

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
            date: new Date(data.date), // convert timestamp to Date
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
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4">
        <Link
          to="/memories"
          className="text-sm text-rose-500 hover:text-rose-700 transition inline-block mb-4"
        >
          ← Back to Memory Wall
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-rose-600 mb-2">{memory.title}</h1>

      {memory.tag && (
        <p className="text-sm inline-block bg-rose-100 text-rose-600 px-3 py-1 rounded-full font-semibold mb-2">
          #{memory.tag}
        </p>
      )}

      <p className="text-gray-700 mb-2">🗓️ {memory.date.toLocaleDateString()}</p>

      <p className="text-gray-700 mb-6 whitespace-pre-line">{memory.description}</p>

      {memory.image && (
        <img
          src={memory.image}
          alt={memory.title}
          className="rounded-xl shadow-md max-h-[500px] w-full object-cover"
        />
      )}
    </div>
  );
};

export default MemoryDetail;
