import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Heart } from 'lucide-react';

const MEMORIES = [
  { id: 1, url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600', caption: 'The way you look at me' },
  { id: 2, url: 'https://images.unsplash.com/photo-1522673607200-164883eecd0c?auto=format&fit=crop&q=80&w=600', caption: 'Pure happiness' },
  { id: 3, url: 'https://images.unsplash.com/photo-1516589174184-c685266e430c?auto=format&fit=crop&q=80&w=600', caption: 'Dreaming together' },
  { id: 4, url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=600', caption: 'Every heartbeat for you' },
  { id: 5, url: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e3225c?auto=format&fit=crop&q=80&w=600', caption: 'Forever & Always' },
  { id: 6, url: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&q=80&w=600', caption: 'Our beautiful journey' },
];

const LotusIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 17 18 17 13C17 11.5 16 10 14.5 9.5C13 9 12 10.5 12 10.5C12 10.5 11 9 9.5 9.5C8 10 7 11.5 7 13C7 18 12 22 12 22Z" fill="currentColor" opacity="0.6"/>
    <path d="M12 22C12 22 19 19 19 12C19 10 17.5 8 15.5 8C13.5 8 12 10 12 10C12 10 10.5 8 8.5 8C6.5 8 5 10 5 12C5 19 12 22 12 22Z" fill="currentColor" opacity="0.4"/>
    <path d="M12 22C12 22 21 20 21 11C21 8.5 19 6.5 16.5 6.5C14 6.5 12 9 12 9C12 9 10 6.5 7.5 6.5C5 6.5 3 8.5 3 11C3 20 12 22 12 22Z" fill="currentColor" opacity="0.2"/>
  </svg>
);

export default function MemoriesGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleCapture = () => {
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      setIsOpen(true);
    }, 200);
  };

  return (
    <div className="w-full max-w-6xl px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative"
      >
        <div className="flex justify-center mb-4 gap-2">
          <LotusIcon className="text-purple-300" size={32} />
          <h3 className="text-4xl md:text-5xl font-romantic text-purple-700">Our Favorite Memories</h3>
          <LotusIcon className="text-purple-300" size={32} />
        </div>
        <p className="text-purple-400 font-medium">Click the camera to snap back into our best moments</p>
      </motion.div>

      <div className="relative w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="camera-box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0, y: -50 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleCapture}
              className="cursor-pointer relative group flex flex-col items-center"
            >
              {/* Flash Overlay */}
              {flash && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-white z-[100] pointer-events-none"
                />
              )}

              <div className="relative w-64 h-48 bg-zinc-800 rounded-3xl shadow-2xl border-b-8 border-zinc-900 flex items-center justify-center">
                {/* Camera Lens */}
                <div className="relative w-32 h-32 bg-zinc-900 rounded-full border-4 border-zinc-700 shadow-inner flex items-center justify-center">
                   <div className="w-24 h-24 bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-400/20 rounded-full blur-sm" />
                   </div>
                   <div className="absolute top-4 right-4 w-3 h-3 bg-white/10 rounded-full" />
                </div>
                
                {/* Shutter Button */}
                <div className="absolute -top-3 left-12 w-12 h-6 bg-zinc-700 rounded-t-lg group-hover:-translate-y-1 transition-transform" />
                
                {/* Viewfinder */}
                <div className="absolute top-4 left-6 w-10 h-6 bg-zinc-900 border border-zinc-700 rounded-sm" />
                
                {/* Flash Window */}
                <div className="absolute top-4 right-6 w-8 h-6 bg-zinc-600 border border-zinc-500 rounded-sm flex items-center justify-center">
                  <div className="w-4 h-4 bg-white/20 rounded-full" />
                </div>
              </div>
              
              <motion.div 
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-10 text-purple-600 font-bold tracking-[0.3em] text-xs uppercase flex items-center gap-2"
              >
                <Camera size={16} /> CLICK TO CAPTURE <Camera size={16} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {MEMORIES.map((memory, index) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, y: 50, rotate: Math.random() * 6 - 3 }}
                    animate={{ opacity: 1, y: 0, rotate: Math.random() * 4 - 2 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                    className="bg-white p-4 pb-12 rounded-sm shadow-xl border border-gray-100"
                  >
                    <div className="aspect-square overflow-hidden mb-6 bg-gray-50 border border-gray-100 relative group">
                      <img 
                        src={memory.url} 
                        alt={memory.caption} 
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute top-2 right-2">
                         <LotusIcon className="text-white/40" size={20} />
                      </div>
                    </div>
                    <p className="text-center font-elegant text-3xl text-gray-800 tracking-tight">{memory.caption}</p>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center mt-20">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-10 py-4 rounded-full bg-white border-2 border-purple-100 text-purple-500 hover:bg-purple-50 hover:border-purple-200 transition-all font-bold flex items-center gap-3 shadow-lg"
                >
                  <Heart size={20} className="fill-purple-200" /> RESET CAMERA
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}