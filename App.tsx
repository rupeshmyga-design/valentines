
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Mail, Gift, ChevronDown } from 'lucide-react';
import BackgroundEffects from './components/BackgroundEffects';
import Proposal from './components/Proposal';
import SecretNote from './components/SecretNote';
import MemoriesGallery from './components/MemoriesGallery';
import LoveList from './components/LoveList';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [finalStage, setFinalStage] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Smooth scroll to next section
  const scrollToNext = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (finalStage) {
      const timer = setTimeout(() => setShowContent(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [finalStage]);

  return (
    <div className="min-h-screen selection:bg-purple-200">
      <BackgroundEffects />
      
      {/* Hero Section: The Proposal */}
      <section className="h-screen flex items-center justify-center relative px-4">
        <Proposal 
          onAccept={() => setAccepted(true)} 
          accepted={accepted}
          onFinalDenial={() => setFinalStage(true)}
          finalStage={finalStage}
        />
        
        {finalStage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-purple-400 cursor-pointer"
            onClick={() => scrollToNext('love-note')}
          >
            <p className="mb-2 text-sm uppercase tracking-widest font-semibold">Scroll Down</p>
            <ChevronDown className="mx-auto animate-bounce" />
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {showContent && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Secret Love Note */}
            <section id="love-note" className="py-24 flex items-center justify-center bg-white/30 backdrop-blur-sm">
              <SecretNote />
            </section>

            {/* Favorite Memories */}
            <section className="py-24 flex flex-col items-center justify-center">
              <MemoriesGallery />
            </section>

            {/* Things I Love About Her */}
            <section className="py-24 bg-gradient-to-b from-transparent to-purple-50">
              <LoveList />
            </section>

            {/* Music Section */}
            <section className="py-24 flex justify-center pb-40">
              <MusicPlayer />
            </section>

            {/* Footer */}
            <footer className="py-12 text-center text-purple-400 font-romantic text-2xl">
              Made with 💜 for you
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkles Toggle or Persistent Music icon could go here */}
    </div>
  );
}
