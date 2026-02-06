import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface ProposalProps {
  onAccept: () => void;
  accepted: boolean;
  onFinalDenial: () => void;
  finalStage: boolean;
}

const LotusIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 17 18 17 13C17 11.5 16 10 14.5 9.5C13 9 12 10.5 12 10.5C12 10.5 11 9 9.5 9.5C8 10 7 11.5 7 13C7 18 12 22 12 22Z" fill="currentColor" opacity="0.6"/>
    <path d="M12 22C12 22 19 19 19 12C19 10 17.5 8 15.5 8C13.5 8 12 10 12 10C12 10 10.5 8 8.5 8C6.5 8 5 10 5 12C5 19 12 22 12 22Z" fill="currentColor" opacity="0.4"/>
  </svg>
);

export default function Proposal({ onAccept, accepted, onFinalDenial, finalStage }: ProposalProps) {
  const [hasOpenedInvite, setHasOpenedInvite] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoHover = () => {
    if (accepted && !finalStage) return;
    
    const range = 300;
    const newX = (Math.random() - 0.5) * range;
    const newY = (Math.random() - 0.5) * range;
    
    setNoButtonPos({ x: newX, y: newY });
  };

  return (
    <div className="text-center z-10 w-full max-w-2xl mx-auto px-4" ref={containerRef}>
      <AnimatePresence mode="wait">
        {!hasOpenedInvite ? (
          <motion.div
            key="invitation-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            className="flex flex-col items-center"
          >
            <div className="relative group cursor-pointer" onClick={() => setHasOpenedInvite(true)}>
              <div className="absolute inset-0 bg-purple-400 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="relative bg-white/60 backdrop-blur-md p-12 rounded-[3rem] border-2 border-white shadow-2xl flex flex-col items-center gap-6"
              >
                <div className="absolute -top-6 -left-6 rotate-[-20deg]">
                  <LotusIcon size={64} className="text-purple-200" />
                </div>
                <div className="absolute -bottom-6 -right-6 rotate-[160deg]">
                  <LotusIcon size={64} className="text-purple-200" />
                </div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-200"
                >
                  <Heart className="text-white fill-white" size={40} />
                </motion.div>
                
                <div className="space-y-2 relative">
                  <h2 className="text-4xl md:text-5xl font-elegant text-purple-900">An Official Invitation</h2>
                  <p className="text-purple-500 font-romantic text-2xl">From your boyfriend</p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-8 py-3 bg-purple-100 text-purple-700 rounded-full font-bold text-sm tracking-widest hover:bg-purple-200 transition-colors flex items-center gap-2 border border-purple-200"
                >
                  <Sparkles size={16} /> OPEN INVITATION
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        ) : !accepted ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="space-y-12"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-romantic text-purple-700 leading-tight drop-shadow-sm">
                Will you be my Valentine?
              </h1>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12 relative h-48 sm:h-auto">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={onAccept}
                className="order-1 sm:order-none z-20 px-14 py-5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-3xl font-bold shadow-[0_10px_30px_rgba(126,87,194,0.4)] border-2 border-white/20"
              >
                YES! ✨
              </motion.button>

              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                className="order-2 sm:order-none px-10 py-4 border-2 border-purple-200 text-purple-400 rounded-full text-xl transition-all bg-white/40 backdrop-blur-md"
              >
                No
              </motion.button>
            </div>
          </motion.div>
        ) : !finalStage ? (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-7xl"
            >
              💜
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-romantic text-purple-800 leading-snug">
              Good choice babe, now you are stuck with me forever.
            </h2>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1 }}
              className="pt-6"
            >
              <button 
                onClick={onFinalDenial}
                className="text-purple-400 text-sm hover:text-purple-600 hover:underline decoration-purple-300 transition-all underline-offset-8"
              >
                If you want to change your mind, click NO.
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-romantic text-purple-700 px-4 leading-tight">
              Too late cutie. You already said yes, which means you’re mine now — deal with it. 😉
            </h2>
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotateY: [0, 360] 
              }}
              transition={{ 
                y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                rotateY: { repeat: Infinity, duration: 5, ease: "linear" }
              }}
              className="text-8xl flex justify-center drop-shadow-lg"
            >
              💍
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}