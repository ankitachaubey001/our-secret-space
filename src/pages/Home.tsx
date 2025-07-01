import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../hooks/firebaseConfig";
import dayjs from "dayjs";


const Home = () => {
  const [totalMemories, setTotalMemories] = useState(0);
  const [lastAddedDate, setLastAddedDate] = useState<string | null>(null);
console.log("totalMemories", totalMemories , "lastAddedDate", lastAddedDate);
const fetchMemories = async () => {
  try {
    const memoriesRef = collection(db, "memories");
    const q = query(memoriesRef, orderBy("date", "desc")); // ✅ Updated field name
    const snapshot = await getDocs(q);

    const total = snapshot.size;
    setTotalMemories(total);

    if (!snapshot.empty) {
      const lastMemory = snapshot.docs[0].data();
      if (lastMemory.date) { // ✅ Updated field name
        const date = lastMemory.date.toDate();
        setLastAddedDate(dayjs(date).format("MMMM D, YYYY"));
      }
    }
  } catch (error) {
    console.error("Error fetching memories:", error);
  }
};


  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-bold text-rose-600 mb-4 text-center">Welcome back, Lovebirds 💞</h1>
      <p className="text-gray-600 mb-8 text-center italic">
        “Love is made of moments, not milestones.”
      </p>

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <p className="text-lg text-gray-700">❤️ Total Memories: <strong>{totalMemories}</strong></p>
          <p className="text-lg text-gray-700">
            📅 Last Added: <strong>{lastAddedDate || "No memories yet"}</strong>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            to="/memories"
            className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-full font-semibold transition"
          >
            ✨ View Memory Wall
          </Link>
          <Link
            to="/memories?add=true"
            className="border border-rose-400 text-rose-500 hover:bg-rose-100 py-2 px-4 rounded-full font-semibold transition"
          >
            📸 Add New Memory
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
