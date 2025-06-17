// pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../hooks/firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("secret-access", "unlocked");
      navigate("/home");
    } catch (err) {
      setError("Invalid credentials 💔");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-200 to-rose-300 px-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-12 w-full max-w-md text-center border border-rose-200">
        <h1 className="text-4xl font-bold text-rose-600 mb-3 font-[DancingScript]">
          💖 Our Secret Space
        </h1>
        <p className="text-gray-600 text-sm mb-6 font-light">
          A private place to capture & cherish your most precious moments.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="📧 Email"
          className="w-full px-5 py-3 mb-4 rounded-full border border-rose-300 bg-rose-50 text-sm focus:ring-rose-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="🔐 Password"
          className="w-full px-5 py-3 mb-5 rounded-full border border-rose-300 bg-rose-50 text-sm focus:ring-rose-400"
        />

        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-rose-300"
        >
          ✨ Enter My Space
        </button>
      </div>
    </div>
  );
}
