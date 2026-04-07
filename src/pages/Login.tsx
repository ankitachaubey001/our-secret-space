import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../hooks/firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [resetStatus, setResetStatus] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("secret-access", "unlocked");
      navigate("/home");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    setResetStatus("");
    setError("");
    if (!email) {
      setError("Enter your email first to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetStatus("Password reset email sent. Please check your inbox.");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Could not send reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative w-full max-w-4xl">
        <div className="absolute -top-12 -left-8 h-28 w-28 rounded-full bg-rose-300/40 blur-3xl" />
        <div className="absolute -bottom-12 right-4 h-28 w-28 rounded-full bg-amber-200/60 blur-3xl" />

        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] page-card p-6 sm:p-10">
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="font-cursive text-3xl text-rose-700">Our Secret Space</p>
              <h1 className="mt-4 text-4xl sm:text-5xl font-display text-slate-900 leading-tight">
                A private place to capture, relive, and celebrate your story.
              </h1>
              <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-md">
                Store memories, letters, and little moments in one calm space
                designed for just the two of you.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-4 text-xs text-slate-500">
              <span className="badge">Private</span>
              <span className="badge">Encrypted</span>
              <span className="badge">Made for two</span>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8">
            <h2 className="text-2xl font-display text-rose-700">Sign in</h2>
            <p className="text-sm text-slate-500 mt-1">
              Use your shared credentials to enter the space.
            </p>

            <div className="mt-6 space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="input-field"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input-field"
              />
            </div>

            {error && <p className="text-sm text-rose-600 mt-3">{error}</p>}
            {resetStatus && (
              <p className="text-sm text-emerald-600 mt-3">{resetStatus}</p>
            )}

            <button onClick={handleLogin} className="btn-primary w-full mt-6">
              Enter the space
            </button>

            <button
              onClick={handleResetPassword}
              className="btn-ghost w-full mt-3"
            >
              Forgot password?
            </button>

            <p className="text-xs text-slate-500 mt-2">
              Need a new access code? Visit the secret gate first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
