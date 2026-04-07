import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  content?: string;
};

export default function LetterEnvelope({ content }: Props) {
  const [opened, setOpened] = useState(false);

  const message =
    content ||
    `To my dearest,

You are my favorite hello and my hardest goodbye.

Every moment with you is a memory I want to frame forever.

Thank you for being the most beautiful chapter in my story.

Forever yours,
Your person`;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-6xl">
        <div className="relative flex-shrink-0">
          <motion.div
            className="relative w-80 h-56 bg-gradient-to-br from-rose-500 to-rose-600 rounded-3xl shadow-2xl cursor-pointer overflow-hidden"
            onClick={() => setOpened(true)}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-rose-600 to-rose-700 origin-top"
              initial={false}
              animate={opened ? { rotateX: -120 } : { rotateX: 0 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                transformOrigin: "top center",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />

            {!opened && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-white"
                initial={{ opacity: 1 }}
                animate={{ opacity: opened ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg font-semibold tracking-wide">Tap to open</p>
                <p className="text-xs opacity-80 mt-1">A special message awaits</p>
              </motion.div>
            )}

            {!opened && (
              <div className="absolute bottom-4 left-4 right-4 top-16 bg-white/20 rounded-2xl backdrop-blur-sm">
                <div className="p-3 text-white/70 text-xs leading-relaxed overflow-hidden">
                  <div className="line-clamp-5">
                    {message.substring(0, 120)}...
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {opened && (
          <motion.div
            className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl relative border border-rose-100"
            initial={{ x: 200, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-rose-50/20 rounded-2xl pointer-events-none" />
            <div className="absolute left-10 top-0 bottom-0 w-px bg-rose-100" />
            <div className="absolute left-0 right-0 top-14 h-px bg-rose-50" />
            <div className="absolute left-0 right-0 top-28 h-px bg-rose-50" />
            <div className="absolute left-0 right-0 top-40 h-px bg-rose-50" />

            <div className="relative z-10 p-8">
              <pre className="whitespace-pre-wrap leading-7 text-slate-700 font-serif text-sm">
                {message}
              </pre>
            </div>
          </motion.div>
        )}

        {opened && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            onClick={(e) => {
              e.stopPropagation();
              setOpened(false);
            }}
            className="absolute top-8 right-8 w-10 h-10 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg flex items-center justify-center text-sm transition-colors duration-200 z-30"
          >
            X
          </motion.button>
        )}
      </div>
    </div>
  );
}
