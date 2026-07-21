import { useEffect, useState } from 'react';
import { Home, QrCode, Gamepad2, Landmark } from 'lucide-react';

type HomeSplashScreenProps = {
  onComplete: () => void;
};

export default function HomeSplashScreen({ onComplete }: HomeSplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showIcon, setShowIcon] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowIcon(true), 150);
    const t2 = setTimeout(() => setShowTitle(true), 400);
    const t3 = setTimeout(() => setShowSubtitle(true), 700);
    const t4 = setTimeout(() => setShowFeatures(true), 950);
    const t5 = setTimeout(() => setShowProgress(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, []);

  useEffect(() => {
    if (!showProgress) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        const remaining = 100 - prev;
        const step = remaining > 60 ? 5 : remaining > 20 ? 3 : 6;
        return Math.min(prev + step, 100);
      });
    }, 40);
    return () => clearInterval(interval);
  }, [showProgress]);

  useEffect(() => {
    if (progress >= 100) {
      const t1 = setTimeout(() => setFadeOut(true), 300);
      const t2 = setTimeout(() => onComplete(), 800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [progress, onComplete]);

  const features = [
    { icon: QrCode, label: 'AR Scanner' },
    { icon: Gamepad2, label: 'Quiz' },
    { icon: Landmark, label: 'Info' },
  ];

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#001128] via-[#0b2646] to-[#001128] transition-opacity duration-500 font-['Plus_Jakarta_Sans',system-ui,sans-serif] ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#7ab0fd]/15"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `home-float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <div className="absolute h-72 w-72 rounded-full bg-[#7ab0fd]/8 blur-[80px]" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-8">
        {/* Animated home icon */}
        <div
          className={`relative transition-all duration-600 ${
            showIcon ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          <div className="absolute -inset-3 rounded-full border-2 border-[#7ab0fd]/20 animate-[ping_2s_ease-in-out_infinite]" />
          <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-[#1f5fa7] to-[#7ab0fd] shadow-2xl shadow-[#7ab0fd]/30">
            <Home className="h-12 w-12 text-white drop-shadow-lg" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <div
          className={`text-center transition-all duration-600 ${
            showTitle ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Kembali ke Beranda
          </h1>
          <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[#7ab0fd] to-transparent" />
        </div>

        {/* Subtitle */}
        <p
          className={`max-w-[280px] text-center text-[15px] leading-relaxed text-[#8ba3c6] transition-all duration-600 ${
            showSubtitle ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          Nikmati fitur-fitur aplikasi ini seperti AR, Quiz, dan masih banyak lagi!
        </p>

        {/* Feature icons */}
        <div
          className={`flex items-center gap-5 transition-all duration-500 ${
            showFeatures ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          {features.map((feat, idx) => (
            <div
              key={feat.label}
              className="flex flex-col items-center gap-1.5"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10 backdrop-blur-sm">
                <feat.icon className="h-5 w-5 text-[#7ab0fd]" strokeWidth={1.75} />
              </div>
              <span className="text-[11px] font-medium text-[#8ba3c6]">{feat.label}</span>
            </div>
          ))}
        </div>

        {/* Loading bar */}
        <div
          className={`mt-2 w-56 transition-all duration-500 ${
            showProgress ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-[#8ba3c6]">Mempersiapkan...</span>
            <span className="text-xs font-bold text-[#7ab0fd]">{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#1f5fa7] via-[#7ab0fd] to-[#1f5fa7] bg-[length:200%_100%] transition-all duration-100 animate-[home-shimmer_1.5s_linear_infinite]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes home-float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-15px) translateX(8px); opacity: 0.7; }
          50% { transform: translateY(-30px) translateX(-4px); opacity: 0.5; }
          75% { transform: translateY(-15px) translateX(12px); opacity: 0.8; }
        }
        @keyframes home-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
