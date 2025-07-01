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
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const querySnapshot = await getDocs(collection(db, "secrets"));
      const codes = querySnapshot.docs.map((doc) => doc.data().code);

      if (codes.includes(code)) {
        localStorage.setItem("secret-access", "unlocked");
        navigate("/login");
      } else {
        setError("Invalid code 💔");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center space-y-4 w-80">
        <h2 className="text-2xl font-bold text-rose-500">🔐 Enter Secret Code</h2>

        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full"
          placeholder="Type your shared secret..."
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 w-full cursor-pointer"
        >
          {loading ? "Checking..." : "Unlock 💖"}
        </button>

        {error && <p className="text-sm text-rose-600">{error}</p>}
      </div>
    </div>
  );
}
