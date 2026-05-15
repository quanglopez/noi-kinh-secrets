import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative z-10 text-center px-12">
        <motion.div 
          className="w-[2px] h-24 bg-[#8B1A1A] mx-auto mb-8"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ originY: 0 }}
        />
        
        <motion.p 
          className="text-[#8B1A1A] text-[2.5vw] uppercase tracking-[0.4em] font-serif mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Trí tuệ ngàn năm
        </motion.p>
        
        <motion.h1 
          className="text-[#F5E6C8] text-[5.5vw] font-serif font-bold leading-tight drop-shadow-2xl"
          initial={{ opacity: 0, y: 30, rotateX: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: 20 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          Vì sức khoẻ &<br/>hạnh phúc lứa đôi
        </motion.h1>
      </div>
    </motion.div>
  );
}
