import { useEffect, useState } from 'react';
import { RefreshCcw } from 'lucide-react';

type RestartSplashScreenProps = {
  onComplete: () => void;
};

export default function RestartSplashScreen({ onComplete }: RestartSplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showContent) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return Math.min(prev + 5, 100);
      });
    }, 35);
    return () => clearInterval(interval);
  }, [showContent]);

  useEffect(() => {
    if (progress >= 100) {
      const t1 = setTimeout(() => setFadeOut(true), 300);
      const t2 = setTimeout(() => onComplete(), 800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#001128] transition-opacity duration-500 font-['Plus_Jakarta_Sans',system-ui,sans-serif] ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Glow */}
      <div className="absolute h-60 w-60 rounded-full bg-[#7ab0fd]/10 blur-[60px]" />

      <div
        className={`relative z-10 flex flex-col items-center gap-6 px-8 transition-all duration-500 ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {/* Spinning refresh icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#1f5fa7] to-[#7ab0fd] shadow-2xl shadow-[#7ab0fd]/30">
          <RefreshCcw className="h-10 w-10 text-white animate-spin" strokeWidth={1.5} style={{ animationDuration: '1.5s' }} />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Menyiapkan Ulang</h1>
          <p className="mt-2 text-[14px] text-[#8ba3c6]">Soal akan diacak ulang untukmu...</p>
        </div>

        {/* Loading bar */}
        <div className="w-48">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-[#8ba3c6]">Memuat...</span>
            <span className="text-xs font-bold text-[#7ab0fd]">{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#1f5fa7] via-[#7ab0fd] to-[#1f5fa7] bg-[length:200%_100%] transition-all duration-100 animate-[restart-shimmer_1.5s_linear_infinite]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes restart-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
