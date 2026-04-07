import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../hooks/firebaseConfig";

export default function AccessPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unlocked = localStorage.getItem("secret-access");
    if (unlocked === "unlocked") {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const querySnapshot = await getDocs(collection(db, "secrets"));
      const codes = querySnapshot.docs.map((doc) => doc.data().code);

      if (codes.includes(code)) {
        localStorage.setItem("secret-access", "unlocked");
        navigate("/");
      } else {
        setError("That code does not match. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="page-card w-full max-w-lg p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-300 shadow-lg shadow-rose-200/60" />
          <div>
            <p className="font-cursive text-2xl text-rose-700">Secret Gate</p>
            <p className="text-xs text-slate-500">Only shared with the two of you</p>
          </div>
        </div>

        <h2 className="mt-6 text-3xl font-display text-slate-900">
          Enter your private access code
        </h2>
        <p className="section-subtitle mt-2">
          This code unlocks the shared space. Keep it safe and personal.
        </p>

        <div className="mt-6 space-y-4">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input-field"
            placeholder="Shared secret code"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Checking..." : "Unlock the space"}
          </button>

          {error && <p className="text-sm text-rose-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
