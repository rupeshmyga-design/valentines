import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles } from 'lucide-react';

const OrchidIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C12 12 12 7 15 4C18 1 21 4 21 8C21 12 17 12 17 12" fill="currentColor" opacity="0.4"/>
    <path d="M12 12C12 12 12 7 9 4C6 1 3 4 3 8C3 12 7 12 7 12" fill="currentColor" opacity="0.4"/>
    <path d="M12 12C12 12 7 12 4 15C1 18 4 21 8 21C12 21 12 17 12 17" fill="currentColor" opacity="0.4"/>
    <path d="M12 12C12 12 17 12 20 15C23 18 20 21 16 21C12 21 12 17 12 17" fill="currentColor" opacity="0.4"/>
    <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.8"/>
  </svg>
);

export default function SecretNote() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center py-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <OrchidIcon size={32} className="text-purple-300" />
          <h3 className="text-3xl md:text-4xl font-romantic text-purple-700">A Secret Note For You</h3>
          <OrchidIcon size={32} className="text-purple-300" />
        </div>
        <p className="text-purple-400 mt-2">Only for your eyes...</p>
      </motion.div>
      
      <div className="relative w-80 h-80 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ y: -100, opacity: 0, rotateX: 90 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer"
            >
              <div className="relative w-72 h-52 bg-purple-200 rounded-xl shadow-2xl border-b-4 border-purple-300 overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/5" />
                
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#9C27B0 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                
                {/* Flap Tip */}
                <div className="absolute top-0 left-0 w-full h-32 bg-purple-300/80" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
                
                <motion.div 
                   animate={{ scale: [1, 1.2, 1] }} 
                   transition={{ repeat: Infinity, duration: 2 }}
                   className="z-10 bg-white/90 p-3 rounded-full shadow-lg"
                >
                  <OrchidIcon className="text-purple-500" size={32} />
                </motion.div>
                
                <div className="absolute bottom-4 right-4 opacity-50">
                   <Sparkles className="text-purple-600" size={20} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="opened-note"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-[#FFF9FF] p-10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border-t-[12px] border-purple-400 w-80 md:w-[28rem] text-center relative z-20 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <OrchidIcon size={120} className="text-purple-900" />
              </div>

              <div className="relative z-10">
                <p className="font-elegant text-4xl text-purple-900 mb-8 drop-shadow-sm leading-relaxed">
                  My Dearest,
                </p>
                <p className="font-romantic text-2xl md:text-3xl text-purple-800 leading-relaxed italic mb-8">
                  "Every single day with you feels like a beautiful dream I never want to wake up from. You make my world infinitely brighter, my heart fuller, and my life complete. Thank you for being my constant light.<br/><br/>
                  I love you more than words could ever say."
                </p>
                <p className="font-elegant text-3xl text-purple-700">Forever Yours.</p>
                
                <button 
                  className="mt-10 px-6 py-2 rounded-full text-purple-400 text-xs uppercase tracking-[0.2em] font-bold hover:text-purple-700 hover:bg-purple-50 transition-all"
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                >
                  Close & Keep Secret
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}