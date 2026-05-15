import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import noiKinhCover from '@/assets/ebook-noi-kinh-cover.png';
import biKipCover from '@/assets/ebook-21-bi-kip-cover.jpg';
import duocThienCover from '@/assets/ebook-duoc-thien-cover.jpg';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center pt-[5vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]" />

      <motion.h2 
        className="relative z-10 text-[#F5E6C8] text-[3.5vw] font-serif font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
      >
        Trọn Bộ Cẩm Nang Đông Y Dưỡng Sinh
      </motion.h2>

      <div className="relative z-10 flex items-end justify-center gap-8 mb-16 h-[40vh]">
        {/* Book 2 (Left) */}
        <motion.img 
          src={biKipCover} 
          alt="21 Bí Kíp"
          className="w-[18vw] h-auto object-contain shadow-2xl border-2 border-[#8B1A1A]/30"
          initial={{ opacity: 0, x: 50, rotate: 10, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, x: 0, rotate: -5, y: 0 } : { opacity: 0, x: 50, rotate: 10, y: 20 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
        
        {/* Book 1 (Center) */}
        <motion.img 
          src={noiKinhCover} 
          alt="Hoàng Đế Nội Kinh"
          className="w-[22vw] h-auto object-contain shadow-2xl z-20 -mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
        />

        {/* Book 3 (Right) */}
        <motion.img 
          src={duocThienCover} 
          alt="Dược Thiện"
          className="w-[18vw] h-auto object-contain shadow-2xl border-2 border-[#8B1A1A]/30 z-10"
          initial={{ opacity: 0, x: -50, rotate: -10, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, x: 0, rotate: 5, y: 0 } : { opacity: 0, x: -50, rotate: -10, y: 20 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.4 }}
        />
      </div>

      <motion.div 
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[#8B1A1A] text-[1.5vw] uppercase tracking-widest mb-4">Khám phá ngay tại</p>
        <div className="bg-[#8B1A1A] px-8 py-4 border border-[#F5E6C8]/30">
          <p className="text-[#F5E6C8] text-[2.5vw] font-bold tracking-wider">
            hoangdenoikinh.online/sach
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
