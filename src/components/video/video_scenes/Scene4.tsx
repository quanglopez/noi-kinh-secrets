import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import duocThienCover from '@/assets/ebook-duoc-thien-cover.jpg';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center px-[10vw]"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex w-full items-center justify-between">
        <div className="w-1/2 pr-12">
          <motion.p 
            className="text-[#8B1A1A] text-[1.8vw] uppercase tracking-[0.2em] mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8 }}
          >
            Ăn để chữa lành
          </motion.p>
          <motion.h2 
            className="text-[#F5E6C8] text-[4vw] font-serif font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            Dược Thiện Bổ Thận<br/>
            <span className="text-[2.5vw] text-[#8B1A1A]">49 Món Ăn Dưỡng Sinh</span>
          </motion.h2>
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex text-yellow-500 text-[1.5vw]">★★★★★</div>
            <span className="text-[1.2vw] text-white/60">4.7/5 (96 Đánh giá)</span>
          </motion.div>
          <motion.p 
            className="text-[1.5vw] text-white/80 leading-relaxed border-l-2 border-[#8B1A1A] pl-6"
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            140 trang ebook với 49 công thức món ăn bồi bổ tạng thận thuận theo 4 mùa.
          </motion.p>
        </div>
        
        <motion.div 
          className="w-[40%] perspective-[1000px]"
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1, rotateY: -15 } : { opacity: 0, scale: 0.8, rotateY: -30 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
        >
          <img 
            src={duocThienCover} 
            alt="Dược Thiện Bổ Thận" 
            className="w-full h-auto drop-shadow-2xl object-contain border-4 border-[#F5E6C8]/20"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
