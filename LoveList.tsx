import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

const REASONS = [
  "The way your eyes sparkle when you're truly excited about something.",
  "Your kindness that touches every person and animal you meet.",
  "How you always know exactly how to make me laugh when I'm stressed.",
  "The peaceful, home-like feeling I get just by being in your presence.",
  "Your incredible passion and dedication to everything you love.",
  "The adorable way you scrunch your nose when you're thinking hard.",
  "How you are my best friend, my soulmate, and my partner in crime."
];

const RoseIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4C10 2 6 2 4 4C2 6 2 10 4 12C6 14 10 14 12 12C14 14 18 14 20 12C22 10 22 6 20 4C18 2 14 2 12 4Z" fill="currentColor" opacity="0.8"/>
    <path d="M12 12V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 15C12 15 15 16 16 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 18C12 18 9 19 8 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function LoveList() {
  return (
    <div className="max-w-4xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-16 relative"
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-20">
           <RoseIcon size={120} className="text-purple-300" />
        </div>
        <div className="inline-flex items-center justify-center gap-3 mb-4 relative">
          <RoseIcon className="text-purple-400" size={28} />
          <h3 className="text-4xl md:text-5xl font-romantic text-purple-700">Things I Love About You</h3>
          <RoseIcon className="text-purple-400" size={28} />
        </div>
        <p className="text-purple-400 max-w-lg mx-auto">Every petal represents a unique part of why you're my everything.</p>
      </motion.div>
      
      <div className="grid gap-6">
        {REASONS.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-6 bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(126,87,194,0.05)] hover:shadow-[0_8px_30px_rgb(126,87,194,0.1)] transition-all group text-left"
          >
            <div className="flex-shrink-0 relative">
              <motion.div
                whileHover={{ rotate: [0, 360] }}
                transition={{ duration: 1 }}
                className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-purple-500 group-hover:text-purple-600 transition-colors"
              >
                <RoseIcon size={24} />
              </motion.div>
            </div>
            <p className="text-xl md:text-2xl text-purple-900 font-romantic leading-tight">
              {reason}
            </p>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-16 flex justify-center gap-4"
      >
        {[...Array(3)].map((_, i) => (
          <RoseIcon key={i} className="text-purple-200" size={20} />
        ))}
      </motion.div>
    </div>
  );
}