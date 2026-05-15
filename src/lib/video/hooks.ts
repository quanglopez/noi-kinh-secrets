import { useEffect, useState } from 'react';

export function useVideoPlayer({ durations }: { durations: Record<string, number> }) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const sceneKeys = Object.keys(durations);

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.startRecording) {
      // @ts-ignore
      window.startRecording();
    }

    let isMounted = true;
    let timeout: NodeJS.Timeout;

    const playScene = (index: number) => {
      if (!isMounted) return;
      setCurrentSceneIndex(index);
      
      const sceneKey = sceneKeys[index];
      const duration = durations[sceneKey];

      timeout = setTimeout(() => {
        if (index === sceneKeys.length - 1) {
          // End of first pass
          // @ts-ignore
          if (typeof window !== 'undefined' && window.stopRecording) {
            // @ts-ignore
            window.stopRecording();
          }
          // Loop
          playScene(0);
        } else {
          playScene(index + 1);
        }
      }, duration);
    };

    playScene(0);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  return { currentScene: currentSceneIndex };
}
