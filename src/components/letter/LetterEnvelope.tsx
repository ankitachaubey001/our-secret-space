import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  content?: string;
};

export default function LetterEnvelope({ content }: Props) {
  const [opened, setOpened] = useState(false);

  const message =
    content ||
    `To My Dearest 💖,

You are my favorite hello and my hardest goodbye.

Every moment with you is a memory I want to frame forever.

Forever yours,
💌`;

  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="relative w-72 h-48 perspective" onClick={() => setOpened(true)}>
        {/* Envelope Base */}
        <div className="relative w-full h-full bg-rose-300 rounded-b-xl shadow-lg overflow-hidden z-10">
          {/* Flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-24 bg-rose-400 rounded-b-xl origin-top z-20"
            initial={false}
            animate={opened ? { rotateX: -120 } : { rotateX: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              transformOrigin: "top center",
            }}
          />

          {/* Prompt (if not opened) */}
          {!opened && (
            <div className="absolute inset-0 flex items-center justify-center z-10 text-white font-semibold text-lg">
              💌 Tap to Open
            </div>
          )}

          {/* Letter Content */}
          <motion.div
            className="absolute inset-0 bg-white text-gray-800 p-4 text-sm rounded-xl z-0 overflow-y-auto"
            initial={{ y: 200, opacity: 0 }}
            animate={opened ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <p className="whitespace-pre-line">{message}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
