import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Sparkle = ({ style }: { style: React.CSSProperties; key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
    transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
    className="absolute w-1 h-1 bg-white rounded-full"
    style={style}
  />
);

const FloatingFlower = ({ style, delay, type }: { style: React.CSSProperties, delay: number, type: 'rose' | 'orchid'; key?: React.Key }) => (
  <motion.div
    initial={{ y: '110vh', opacity: 0, rotate: 0 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 0.4, 0],
      rotate: [0, 180, 360],
      x: ['0vw', '5vw', '-5vw', '0vw']
    }}
    transition={{ 
      duration: 15 + Math.random() * 10, 
      repeat: Infinity, 
      delay,
      ease: "linear" 
    }}
    className="absolute pointer-events-none"
    style={style}
  >
    {type === 'rose' ? (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-pink-200">
        <path d="M12 4C10 2 6 2 4 4C2 6 2 10 4 12C6 14 10 14 12 12C14 14 18 14 20 12C22 10 22 6 20 4C18 2 14 2 12 4Z"/>
      </svg>
    ) : (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-purple-200">
        <path d="M12 12C12 12 12 7 15 4C18 1 21 4 21 8C21 12 17 12 17 12 M12 12C12 12 12 7 9 4C6 1 3 4 3 8C3 12 7 12 7 12" />
      </svg>
    )}
  </motion.div>
);

export default function BackgroundEffects() {
  const sparkles = useMemo(() => Array.from({ length: 40 }), []);
  const flowers = useMemo(() => Array.from({ length: 20 }), []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#FDF2FF]">
      {/* Soft Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 opacity-60" />
      
      {sparkles.map((_, i) => (
        <Sparkle 
          key={i} 
          style={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            transitionDelay: `${Math.random() * 5}s`
          }} 
        />
      ))}

      {flowers.map((_, i) => (
        <FloatingFlower 
          key={i} 
          delay={i * 1.5}
          type={i % 2 === 0 ? 'rose' : 'orchid'}
          style={{ 
            left: `${Math.random() * 100}%`,
          }} 
        />
      ))}
    </div>
  );
}