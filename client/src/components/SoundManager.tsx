import { useEffect } from 'react';
import { useAudio } from '@/lib/stores/useAudio';
import { Volume2, VolumeX } from 'lucide-react';

export function SoundManager() {
  const { 
    setBackgroundMusic, 
    setHitSound, 
    setSuccessSound, 
    toggleMute, 
    isMuted 
  } = useAudio();

  useEffect(() => {
    const bgMusic = new Audio('/sounds/background.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);

    const hit = new Audio('/sounds/hit.mp3');
    setHitSound(hit);

    const success = new Audio('/sounds/success.mp3');
    setSuccessSound(success);

    return () => {
      bgMusic.pause();
      bgMusic.src = '';
    };
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <button
      onClick={toggleMute}
      className="fixed top-4 right-4 z-50 bg-cyan-900/80 hover:bg-cyan-800/80 backdrop-blur-sm border-2 border-cyan-400 text-cyan-100 p-3 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/50 pointer-events-auto"
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6" />
      ) : (
        <Volume2 className="w-6 h-6" />
      )}
    </button>
  );
}
