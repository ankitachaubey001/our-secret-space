import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const [secret, setSecret] = useState('');
  const navigate = useNavigate();

  const handleEnter = () => {
    if (secret.trim()) {
      navigate("/memories");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-200 to-rose-300 px-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-12 w-full max-w-md text-center border border-rose-200">
        <h1 className="text-4xl font-bold text-rose-600 mb-3 font-[DancingScript]">
          💖 Our Secret Space
        </h1>
        <p className="text-gray-600 text-sm mb-10 font-light">
          A private place to capture & cherish your most precious moments.
        </p>

        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="💌 Your secret key..."
          className="w-full px-5 py-3 rounded-full border border-rose-300 bg-rose-50 placeholder:text-rose-300 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition mb-5"
        />

        <button
          onClick={handleEnter}
          className="w-full bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 hover:from-rose-500 hover:to-pink-600 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-rose-300 transition-all duration-300"
        >
          ✨ Enter My Space
        </button>
      </div>
    </div>
  );
}
