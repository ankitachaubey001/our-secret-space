import { useState } from "react";

type Props = { onUnlock: () => void };

const CORRECT_PASSWORD = "loveYou123";

export default function PasswordGate({ onUnlock }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input === CORRECT_PASSWORD) {
      onUnlock();
    } else {
      alert("Incorrect password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="page-card w-full max-w-md p-6 sm:p-8 space-y-4">
        <div>
          <h2 className="text-2xl font-display text-rose-700">Memory Wall</h2>
          <p className="text-sm text-slate-500 mt-1">
            Enter the shared password to continue.
          </p>
        </div>
        <input
          type="password"
          placeholder="Shared password"
          className="input-field w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          autoFocus
        />
        <button onClick={handleSubmit} className="btn-primary w-full">
          Unlock
        </button>
      </div>
    </div>
  );
}