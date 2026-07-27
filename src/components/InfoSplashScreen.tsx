import { useEffect, useState } from 'react';
import { Landmark, Compass, BookOpen } from 'lucide-react';

type InfoSplashScreenProps = {
  onComplete: () => void;
};

export default function InfoSplashScreen({ onComplete }: InfoSplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Staggered entrance animations
    const t1 = setTimeout(() => setShowTitle(true), 200);
    const t2 = setTimeout(() => setShowSubtitle(true), 600);
    const t3 = setTimeout(() => setShowProgress(true), 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (!showProgress) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Simulate loading: smooth curve
        const remaining = 100 - prev;
        const step = remaining > 60 ? 3 : remaining > 20 ? 1.5 : 4;
        return Math.min(prev + step, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [showProgress]);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setFadeOut(true), 400);
      const t2 = setTimeout(() => onComplete(), 900);
      return () => {
        clearTimeout(t);
        clearTimeout(t2);
      };
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#001128] transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#7ab0fd]/15"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${4 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Radial glow behind icon */}
      <div className="absolute h-80 w-80 rounded-full bg-[#1f5fa7]/15 blur-[80px]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8">
        {/* Animated Icon */}
        <div
          className={`relative transition-all duration-700 ${
            showTitle ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          {/* Pulsing ring */}
          <div className="absolute -inset-4 rounded-full border-2 border-[#7ab0fd]/30 animate-[ping_2s_ease-in-out_infinite]" />
          <div className="absolute -inset-8 rounded-full border border-[#7ab0fd]/15 animate-[ping_2.5s_ease-in-out_infinite_0.5s]" />

          <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#0b2646] to-[#1f5fa7] shadow-2xl shadow-[#1f5fa7]/30 border border-white/10">
            <Landmark className="h-12 w-12 text-white drop-shadow-lg" strokeWidth={1.5} />

            {/* Decorations */}
            <Compass
              className="absolute -right-3 -top-2 h-7 w-7 text-[#7ab0fd] animate-[spin_8s_linear_infinite]"
              strokeWidth={1.5}
            />
            <BookOpen
              className="absolute -bottom-2 -left-3 h-6 w-6 text-yellow-400/80 animate-[bounce_3s_ease-in-out_infinite]"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Title */}
        <div
          className={`text-center transition-all duration-700 delay-100 ${
            showTitle ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Sejarah
          </h1>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[#7ab0fd] to-transparent" />
        </div>

        {/* Subtitle */}
        <p
          className={`max-w-[280px] text-center text-[15px] leading-relaxed text-[#8ba3c6] transition-all duration-700 ${
            showSubtitle ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          Menelusuri rekam jejak perjuangan pembebasan Irian Barat.
        </p>

        {/* Loading bar */}
        <div
          className={`w-64 transition-all duration-500 ${
            showProgress ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-[#8ba3c6]">Menyiapkan arsip...</span>
            <span className="text-xs font-bold text-[#7ab0fd]">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#1f5fa7] via-[#7ab0fd] to-[#1f5fa7] bg-[length:200%_100%] transition-all duration-100 animate-[shimmer_2s_linear_infinite]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          25% { transform: translateY(-15px) translateX(15px); opacity: 0.6; }
          50% { transform: translateY(-30px) translateX(-5px); opacity: 0.3; }
          75% { transform: translateY(-15px) translateX(20px); opacity: 0.7; }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
