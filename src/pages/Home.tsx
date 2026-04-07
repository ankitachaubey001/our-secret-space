import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../hooks/firebaseConfig";
import dayjs from "dayjs";

const Home = () => {
  const [totalMemories, setTotalMemories] = useState(0);
  const [lastAddedDate, setLastAddedDate] = useState<string | null>(null);

  const fetchMemories = async () => {
    try {
      const memoriesRef = collection(db, "memories");
      const q = query(memoriesRef, orderBy("date", "desc"));
      const snapshot = await getDocs(q);

      const total = snapshot.size;
      setTotalMemories(total);

      if (!snapshot.empty) {
        const lastMemory = snapshot.docs[0].data();
        if (lastMemory.date) {
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
    <div className="page-shell">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="page-card p-6 sm:p-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="font-cursive text-2xl text-rose-700">Welcome back</p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display text-slate-900 leading-tight">
              Your shared story, organized and ready to relive.
            </h1>
            <p className="mt-4 text-base text-slate-600 max-w-xl">
              Capture moments, leave letters for later, and celebrate the days that
              matter. Everything lives here in one gentle, private space.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/memories?add=true" className="btn-primary">
                Add a new memory
              </Link>
              <Link to="/letters/new" className="btn-outline">
                Write a letter
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="glass-panel p-5">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Total memories
              </p>
              <p className="text-3xl font-display text-rose-700 mt-2">
                {totalMemories}
              </p>
            </div>
            <div className="glass-panel p-5">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Last memory added
              </p>
              <p className="text-lg font-semibold text-slate-700 mt-2">
                {lastAddedDate || "No memories yet"}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="page-card p-6">
            <h2 className="section-title">Quick actions</h2>
            <p className="section-subtitle mt-2">
              Jump into the parts of your story you want to revisit today.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link to="/memories" className="btn-ghost justify-start bg-white/70">
                Browse Memory Wall
              </Link>
              <Link to="/specialdays" className="btn-ghost justify-start bg-white/70">
                Plan Special Days
              </Link>
              <Link to="/letters" className="btn-ghost justify-start bg-white/70">
                Open Letters
              </Link>
              <Link to="/todo" className="btn-ghost justify-start bg-white/70">
                Shared To-Do
              </Link>
            </div>
          </div>

          <div className="page-card p-6">
            <h2 className="section-title">Todays note</h2>
            <p className="section-subtitle mt-2">
              A tiny reminder that helps keep this space intentional.
            </p>
            <div className="mt-5 rounded-2xl border border-rose-100 bg-white/80 p-5 text-slate-600">
              "Love is made of quiet, repeated gestures." Start with one new
              memory or one short letter today.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
