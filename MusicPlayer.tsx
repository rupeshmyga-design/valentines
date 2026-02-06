import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Heart, Disc } from 'lucide-react';

// Using distinct SoundHelix IDs to ensure the user hears a different track for each selection
const TRACKS = [
  { 
    id: 1, 
    title: 'Veyyira Cheyyi Veyyira', 
    artist: 'Panja', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' 
  },
  { 
    id: 2, 
    title: 'Oh Priya Priya', 
    artist: 'Ishq', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' 
  },
  { 
    id: 3, 
    title: 'Avunu Nijam', 
    artist: 'Athadu', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' 
  },
  { 
    id: 4, 
    title: 'Singari', 
    artist: 'Dude', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3' 
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked."));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const selectTrack = (index: number) => {
    // If selecting the same track, just toggle play/pause
    if (currentTrackIndex === index && isPlaying) {
      togglePlay();
      return;
    }

    setCurrentTrackIndex(index);
    // Auto-play when a new track is selected
    // Use a slight delay to allow the src to update
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load(); // Force load the new source
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(e => {
          console.log("Audio play blocked by browser. User interaction required.");
          setIsPlaying(false);
        });
      }
    }, 50);
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % TRACKS.length;
    selectTrack(nextIndex);
  };

  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    selectTrack(prevIndex);
  };

  // Sync mute state manually if needed, though the attribute handles it
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="bg-white/60 backdrop-blur-2xl p-8 rounded-[3rem] shadow-[0_20px_70px_rgba(126,87,194,0.15)] border border-white/50 w-full max-w-md flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-purple-500 p-2.5 rounded-2xl shadow-lg shadow-purple-200">
            <Music className="text-white" size={20} />
          </div>
          <div>
            <h4 className="text-2xl font-romantic text-purple-800 leading-none">Our Playlist</h4>
            <p className="text-[10px] text-purple-400 uppercase tracking-widest mt-1 font-bold">4 Special Tracks</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 flex items-center justify-center bg-purple-50 rounded-full text-purple-500 hover:bg-purple-100 transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </motion.button>
      </div>

      <div className="relative w-40 h-40 mb-8">
        <motion.div
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full border-[6px] border-purple-100 p-1.5 bg-white shadow-xl flex items-center justify-center overflow-hidden"
        >
           <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-500 via-indigo-400 to-purple-300 flex items-center justify-center text-white/90 relative">
             <Heart fill="currentColor" size={48} className="drop-shadow-lg" />
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
           </div>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg z-10 border-4 border-purple-50" />
      </div>

      <div className="text-center mb-8 h-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrack.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h5 className="text-2xl font-bold text-purple-900 truncate px-4 drop-shadow-sm">{currentTrack.title}</h5>
            <p className="text-purple-500 font-medium text-lg font-romantic mt-1 italic">Movie: {currentTrack.artist}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-8 mb-10">
        <motion.button whileHover={{ scale: 1.2, x: -5 }} whileTap={{ scale: 0.9 }} onClick={prevTrack} className="text-purple-300 hover:text-purple-500 transition-colors">
          <SkipBack size={28} fill="currentColor" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-purple-300 border-4 border-white"
        >
          {isPlaying ? <Pause size={38} fill="currentColor" /> : <Play size={38} className="ml-1" fill="currentColor" />}
        </motion.button>

        <motion.button whileHover={{ scale: 1.2, x: 5 }} whileTap={{ scale: 0.9 }} onClick={nextTrack} className="text-purple-300 hover:text-purple-500 transition-colors">
          <SkipForward size={28} fill="currentColor" />
        </motion.button>
      </div>

      {/* Visibly separate 4 tracks for clicking */}
      <div className="w-full space-y-3 mb-4">
        <p className="text-[11px] text-purple-400 font-bold uppercase tracking-[0.2em] mb-4 text-center">Select a Memory</p>
        <div className="grid grid-cols-1 gap-2">
          {TRACKS.map((track, index) => (
            <motion.button
              key={track.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectTrack(index)}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                currentTrackIndex === index 
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-100 border-purple-400' 
                : 'bg-white/80 text-purple-800 border-purple-100 hover:bg-purple-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentTrackIndex === index ? 'bg-white/20' : 'bg-purple-100'}`}>
                {currentTrackIndex === index && isPlaying ? (
                  <Disc className="animate-spin" size={16} />
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <div className="text-left flex-1">
                <p className={`text-sm font-bold truncate ${currentTrackIndex === index ? 'text-white' : 'text-purple-900'}`}>{track.title}</p>
                <p className={`text-[10px] uppercase tracking-wider ${currentTrackIndex === index ? 'text-purple-100' : 'text-purple-400'}`}>{track.artist}</p>
              </div>
              {currentTrackIndex === index && (
                <motion.div layoutId="active-indicator">
                  <Heart size={14} fill="currentColor" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="w-full flex gap-1.5 items-end justify-center h-6 mt-4">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={isPlaying ? { height: [4, Math.random() * 20 + 4, 4] } : { height: 4 }}
            transition={{ repeat: Infinity, duration: 0.4 + Math.random() * 0.4, delay: i * 0.04 }}
            className={`w-1.5 rounded-full ${isPlaying ? 'bg-purple-400' : 'bg-purple-100'}`}
          />
        ))}
      </div>

      <audio 
        ref={audioRef}
        loop={false}
        src={currentTrack.url}
        muted={isMuted}
        onEnded={nextTrack}
      />
    </div>
  );
}