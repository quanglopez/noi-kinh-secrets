import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

const SCENE_DURATIONS = { open: 4000, book1: 4500, book2: 4500, book3: 4500, cta: 5000 };

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({ durations: SCENE_DURATIONS });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1A1A1A] font-serif text-[#F5E6C8]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          src={`${import.meta.env.BASE_URL}videos/ink-wash-bg.mp4`}
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#1A1A1A]/80" />
      </div>

      {/* Persistent Midground */}
      <motion.div 
        className="absolute z-0 w-[40vw] h-[40vw] opacity-10"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/yin-yang.png)`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        animate={{ 
          rotate: currentScene * 45,
          scale: [1.2, 1, 1.3, 0.9, 1.1][currentScene],
          x: ['-10vw', '50vw', '-20vw', '60vw', '25vw'][currentScene],
          y: ['-10vh', '-20vh', '40vh', '10vh', '15vh'][currentScene],
        }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div 
        className="absolute z-0 w-[30vw] h-[30vw] opacity-20"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/herbs.png)`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        animate={{
          rotate: currentScene * -30,
          scale: [0.8, 1.2, 0.9, 1.4, 0.7][currentScene],
          x: ['60vw', '-10vw', '70vw', '-15vw', '35vw'][currentScene],
          y: ['50vh', '60vh', '-10vh', '50vh', '40vh'][currentScene],
        }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Foreground Scenes */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="popLayout">
          {currentScene === 0 && <Scene1 key="open" />}
          {currentScene === 1 && <Scene2 key="book1" />}
          {currentScene === 2 && <Scene3 key="book2" />}
          {currentScene === 3 && <Scene4 key="book3" />}
          {currentScene === 4 && <Scene5 key="cta" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
