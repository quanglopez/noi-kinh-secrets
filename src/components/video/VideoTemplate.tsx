import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

const SCENE_DURATIONS = { open: 4000, book1: 4500, book2: 4500, book3: 4500, cta: 5000 };
const TOTAL_MS = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0); // 22 500 ms

type RecState = 'idle' | 'waiting' | 'recording' | 'done' | 'error';

export default function VideoTemplate() {
  const [resetKey, setResetKey] = useState(0);
  const [recState, setRecState] = useState<RecState>('idle');
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startExport = useCallback(async () => {
    setRecState('waiting');
    try {
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({
        video: { frameRate: 30, width: 1280, height: 720 },
        audio: false,
        preferCurrentTab: true,
        selfBrowserSurface: 'include',
      });

      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';
      const recorder = new MediaRecorder(stream, { mimeType });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
        if (timerRef.current) clearInterval(timerRef.current);
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hoang-de-noi-kinh.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setRecState('done');
        setElapsed(0);
        (window as any).startRecording = undefined;
        (window as any).stopRecording = undefined;
      };

      // Wire up hooks that useVideoPlayer already calls
      (window as any).startRecording = () => {
        recorder.start(200); // collect every 200 ms
        setRecState('recording');
        setElapsed(0);
        timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
        // Auto-stop after the full one-pass duration + 300 ms buffer
        setTimeout(() => { if (recorder.state === 'recording') recorder.stop(); }, TOTAL_MS + 300);
      };
      (window as any).stopRecording = () => {
        if (recorder.state === 'recording') recorder.stop();
      };

      // Re-mount the player so useEffect in hooks.ts fires again from scene 0
      setResetKey(k => k + 1);
    } catch {
      setRecState('error');
      setTimeout(() => setRecState('idle'), 3000);
    }
  }, []);

  const remaining = Math.max(0, Math.round(TOTAL_MS / 1000) - elapsed);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1A1A1A] font-serif text-[#F5E6C8]">

      {/* ── Recording control overlay ──────────────────────────────── */}
      <div className="absolute top-4 right-4 z-50 flex flex-col items-end gap-2">
        {recState === 'idle' && (
          <button
            onClick={startExport}
            className="flex items-center gap-2 bg-[#8B0000]/90 hover:bg-[#8B0000] text-white text-sm font-sans px-4 py-2 rounded-full shadow-lg transition-colors"
          >
            <span className="text-base">⬇</span> Xuất video
          </button>
        )}
        {recState === 'waiting' && (
          <div className="bg-black/80 text-[#F5E6C8] text-xs font-sans px-4 py-2 rounded-full">
            Chọn tab trình duyệt để chia sẻ…
          </div>
        )}
        {recState === 'recording' && (
          <div className="flex items-center gap-2 bg-black/80 text-[#F5E6C8] text-xs font-sans px-4 py-2 rounded-full">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Đang ghi — còn {remaining}s
          </div>
        )}
        {recState === 'done' && (
          <div className="bg-green-900/80 text-green-300 text-xs font-sans px-4 py-2 rounded-full">
            ✓ Đã tải xuống file .webm
          </div>
        )}
        {recState === 'error' && (
          <div className="bg-red-900/80 text-red-300 text-xs font-sans px-4 py-2 rounded-full">
            Không thể ghi — hãy thử lại
          </div>
        )}
      </div>

      {/* ── Conversion hint (shown after download) ────────────────── */}
      {recState === 'done' && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-[#F5E6C8]/20 rounded-xl px-6 py-4 text-xs font-mono text-[#F5E6C8]/80 max-w-sm text-center shadow-2xl">
          <p className="mb-2 font-sans text-sm text-[#F5E6C8]">Chuyển sang MP4:</p>
          <code className="text-green-400 break-all select-all">
            ffmpeg -i hoang-de-noi-kinh.webm -c:v libx264 -preset fast -crf 18 output.mp4
          </code>
          <p className="mt-2 font-sans text-[10px] text-[#F5E6C8]/50">
            Hoặc dùng <a href="https://cloudconvert.com/webm-to-mp4" target="_blank" rel="noopener" className="underline">cloudconvert.com</a>
          </p>
        </div>
      )}

      {/* ── Background video ──────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          src={`${import.meta.env.BASE_URL}videos/ink-wash-bg.mp4`}
          autoPlay muted loop playsInline
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#1A1A1A]/80" />
      </div>

      {/* ── Persistent midground ──────────────────────────────────── */}
      <PlayerContent key={resetKey} />
    </div>
  );
}

function PlayerContent() {
  const { currentScene } = useVideoPlayer({ durations: SCENE_DURATIONS });

  return (
    <>
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
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="popLayout">
          {currentScene === 0 && <Scene1 key="open" />}
          {currentScene === 1 && <Scene2 key="book1" />}
          {currentScene === 2 && <Scene3 key="book2" />}
          {currentScene === 3 && <Scene4 key="book3" />}
          {currentScene === 4 && <Scene5 key="cta" />}
        </AnimatePresence>
      </div>
    </>
  );
}
