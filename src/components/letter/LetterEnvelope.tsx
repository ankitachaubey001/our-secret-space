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

Your smile lights up my darkest days, and your laughter is the sweetest melody I've ever heard.

Thank you for being the most beautiful chapter in my story.

I love how you make ordinary moments feel extraordinary, and how your presence turns any place into home.

You are my sunshine on cloudy days, my calm in every storm, and my greatest adventure.

Forever yours,
💌`;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-4">
      <div className="flex items-center justify-start gap-8 w-full max-w-7xl">
        
        <div className="relative flex-shrink-0">
          <div className="absolute top-4 left-4 w-96 h-64 bg-black/10 rounded-b-2xl blur-sm" />
          
          <div 
            className="relative w-96 h-64 cursor-pointer transform transition-transform hover:scale-105 z-10"
            onClick={() => setOpened(true)}
            style={{ perspective: "1000px" }}
          >
            <div className="relative w-full h-full bg-gradient-to-br from-rose-400 to-rose-500 rounded-b-2xl shadow-2xl overflow-hidden">
              
              <motion.div
                className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-rose-500 to-rose-600 origin-top shadow-lg"
                initial={false}
                animate={opened ? { rotateX: -120 } : { rotateX: 0 }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeInOut"
                }}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  transformOrigin: "top center",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)"
                }}
              >
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-600 rounded-full shadow-md border-2 border-amber-700">
                  <div className="absolute inset-1 bg-amber-500 rounded-full flex items-center justify-center text-xs">
                    💌
                  </div>
                </div>
              </motion.div>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="h-0.5 bg-rose-600/30 rounded"></div>
                <div className="h-0.5 bg-rose-600/30 rounded w-3/4"></div>
                <div className="h-0.5 bg-rose-600/30 rounded w-1/2"></div>
              </div>

              {!opened && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center text-white z-10"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: opened ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeInOut"
                    }}
                    className="text-center"
                  >
                    <div className="text-4xl mb-2">💌</div>
                    <div className="text-xl font-semibold tracking-wide">Tap to Open</div>
                    <div className="text-sm opacity-80 mt-1">A special message awaits</div>
                  </motion.div>
                </motion.div>
              )}

              {!opened && (
                <div className="absolute bottom-4 left-4 right-4 top-20 bg-white/20 rounded-lg backdrop-blur-sm">
                  <div className="p-3 text-white/70 text-xs leading-relaxed overflow-hidden">
                    <div className="line-clamp-6">
                      {message.substring(0, 100)}...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {opened && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-rose-400 text-xl"
                    initial={{ 
                      x: Math.random() * 300, 
                      y: 300, 
                      opacity: 0,
                      scale: 0 
                    }}
                    animate={{ 
                      y: -50, 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0.5],
                      x: Math.random() * 300 + Math.sin(i) * 50
                    }}
                    transition={{ 
                      duration: 3,
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    {['💖', '💕', '💗', '💝'][Math.floor(Math.random() * 4)]}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {opened && (
          <motion.div
            className="w-[850px] h-[550px] bg-white shadow-2xl rounded-lg relative border border-gray-200 flex-shrink-0"
            initial={{ x: 200, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ 
              delay: 1.0,
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 to-rose-50/20 rounded-lg pointer-events-none"></div>
            
            <div className="absolute left-12 top-0 bottom-0 w-px bg-red-200"></div>
            <div className="absolute left-0 right-0 top-16 h-px bg-blue-100"></div>
            <div className="absolute left-0 right-0 top-32 h-px bg-blue-100"></div>
            <div className="absolute left-0 right-0 top-48 h-px bg-blue-100"></div>
            <div className="absolute left-0 right-0 top-64 h-px bg-blue-100"></div>

            <div className="relative z-10 p-8 h-full">
              <div className="text-base leading-relaxed font-serif text-gray-800">
                <pre className="whitespace-pre-wrap leading-7 text-gray-700 font-serif text-sm">
                  {message}
                </pre>
              </div>
            </div>

            <div className="absolute -bottom-2 -right-2 w-full h-full bg-gray-300/20 rounded-lg -z-10"></div>
            
            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-gray-100 to-transparent opacity-60 rounded-tr-lg"></div>
          </motion.div>
        )}

        {opened && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
            onClick={(e) => {
              e.stopPropagation();
              setOpened(false);
            }}
            className="absolute top-8 right-8 w-12 h-12 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg flex items-center justify-center text-xl transition-colors duration-200 z-30"
          >
            ✕
          </motion.button>
        )}
      </div>
    </div>
  );
}