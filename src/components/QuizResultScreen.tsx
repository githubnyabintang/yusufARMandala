import { useState, useEffect } from 'react';
import { Star, Home, RefreshCcw, Search, Trophy, Zap } from 'lucide-react';
import { playSfx } from '../utils/sfx';

type QuizResultScreenProps = {
  score: number;
  correctCount: number;
  totalQuestions: number;
  onHome: () => void;
  onRestart: () => void;
};

// Confetti rain for the result screen
function ResultConfetti() {
  const particles = Array.from({ length: 50 }).map((_, i) => {
    const colors = ['#22C55E', '#7ab0fd', '#facc15', '#f97316', '#a78bfa', '#f472b6', '#38bdf8'];
    const color = colors[i % colors.length];
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = 2.5 + Math.random() * 2;
    const size = 5 + Math.random() * 8;
    const rotation = Math.random() * 360;
    const xDrift = -40 + Math.random() * 80;
    const isCircle = Math.random() > 0.5;

    return (
      <div
        key={i}
        className={isCircle ? 'absolute rounded-full' : 'absolute rounded-sm'}
        style={{
          width: `${size}px`,
          height: isCircle ? `${size}px` : `${size * 0.5}px`,
          backgroundColor: color,
          left: `${left}%`,
          top: '-8%',
          transform: `rotate(${rotation}deg)`,
          animation: `result-confetti ${duration}s ease-in ${delay}s forwards`,
          ['--x-drift' as string]: `${xDrift}px`,
        }}
      />
    );
  });
  return <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">{particles}</div>;
}

export default function QuizResultScreen({
  score,
  correctCount,
  totalQuestions,
  onHome,
  onRestart,
}: QuizResultScreenProps) {
  const isHighscore = score >= 70;
  const [displayScore, setDisplayScore] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [iconBounce, setIconBounce] = useState(false);

  // Staggered entrance
  useEffect(() => {
    // Play entry sound
    if (score >= 90) playSfx('win');
    else if (score >= 60) playSfx('good');
    else playSfx('fail');

    const t1 = setTimeout(() => setShowCard(true), 300);
    const t2 = setTimeout(() => setIconBounce(true), 600);
    const t3 = setTimeout(() => setShowEmoji(true), 900);
    const t4 = setTimeout(() => setShowStats(true), 1200);
    const t5 = setTimeout(() => setShowButtons(true), 1600);
    const t6 = setTimeout(() => setShowConfetti(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); };
  }, []);

  // Animated score counter
  useEffect(() => {
    if (!showEmoji) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(score / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= score) {
        current = score;
        clearInterval(interval);
      }
      setDisplayScore(current);
    }, 40);
    return () => clearInterval(interval);
  }, [score, showEmoji]);

  const gradeEmoji = score >= 90 ? '🏆' : score >= 70 ? '🌟' : score >= 50 ? '💪' : '📚';
  const gradeText = score >= 90 ? 'SEMPURNA!' : score >= 70 ? 'HEBAT!' : score >= 50 ? 'BAGUS!' : 'SEMANGAT!';

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-[#ffffff] text-[#0b1c2f] antialiased overflow-hidden selection:bg-[#7ab0fd]/30 font-['Plus_Jakarta_Sans',system-ui,sans-serif]">
      {/* Confetti */}
      {showConfetti && <ResultConfetti />}

      {/* Background Graphic */}
      <div className="absolute left-0 top-0 z-0 h-[55%] w-full">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjsNp0DkZM5w-D7yJebLHJbMYG9J2FJY1pVcq6cc6y5h2YnlddsFE4nlF6wuPvGUBL_awwE3e2hupZrGY31AjkItPs6knk4u_B9jc2jpPMpRd0VyKs57cnRwpbzfkvbxom6V-IG2b8LUYVr13yaRcrcEipwCmEJbrGmc8IglU6DBmwt8yz7QeI1UeRm9ko6bqwdLy7yHe80jtonn4yJOPIGjfi5aCFWSOPsWVHJjYBayXoopopHeiMKejoansAXTyIn5LtJi6ohmE"
          alt="Celebratory graphic"
          className="h-full w-full object-cover opacity-90 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8f9ff]/50 to-[#f8f9ff]" />
      </div>

      <main className="relative z-10 flex flex-1 flex-col px-5 pb-8 pt-[180px] mx-auto w-full max-w-md">
        {/* Result Card */}
        <div
          className={`mb-8 flex flex-col items-center rounded-3xl border border-white/50 bg-white/70 p-6 text-center shadow-xl backdrop-blur-md transition-all duration-700 ${
            showCard ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90'
          }`}
        >
          {/* Animated Trophy / Star Icon */}
          <div
            className={`mb-4 flex h-24 w-24 items-center justify-center rounded-full transition-all duration-700 ${
              iconBounce ? 'scale-100' : 'scale-0'
            } ${isHighscore
              ? 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20 shadow-[0_0_30px_rgba(250,204,21,0.3)]'
              : 'bg-[#1f5fa7]/10 shadow-[0_0_15px_rgba(31,95,167,0.15)]'
            }`}
          >
            {isHighscore ? (
              <Trophy
                className={`h-12 w-12 text-yellow-500 transition-all duration-500 ${iconBounce ? 'animate-[trophy-bounce_0.6s_ease-out]' : ''}`}
                fill="currentColor"
                strokeWidth={1}
              />
            ) : (
              <Star
                className={`h-12 w-12 text-[#1f5fa7] transition-all duration-500 ${iconBounce ? 'animate-[trophy-bounce_0.6s_ease-out]' : ''}`}
                fill="currentColor"
              />
            )}
          </div>

          {/* Grade Badge */}
          <div
            className={`mb-3 flex items-center gap-2 transition-all duration-500 ${
              showEmoji ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-75'
            }`}
          >
            <span className="text-3xl">{gradeEmoji}</span>
            <span className={`text-sm font-extrabold tracking-widest ${isHighscore ? 'text-yellow-600' : 'text-[#1f5fa7]'}`}>
              {gradeText}
            </span>
          </div>

          {/* Animated Score */}
          <div
            className={`mb-3 transition-all duration-500 delay-100 ${
              showEmoji ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <h1 className="text-[48px] font-black tracking-tight text-[#001128] tabular-nums">
              {displayScore}
              <span className="text-[24px] font-bold text-[#8ba3c6]">/100</span>
            </h1>
          </div>

          {/* XP-like bar */}
          <div
            className={`mb-4 h-3 w-48 overflow-hidden rounded-full bg-gray-200 transition-all duration-500 delay-200 ${
              showEmoji ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out delay-500 ${
                isHighscore
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                  : 'bg-gradient-to-r from-[#1f5fa7] to-[#7ab0fd]'
              }`}
              style={{ width: showEmoji ? `${score}%` : '0%' }}
            />
          </div>

          {/* Stats */}
          <div
            className={`mb-2 flex items-center gap-2 transition-all duration-500 ${
              showStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <Zap className="h-4 w-4 text-[#1f5fa7]" />
            <h2 className="text-[16px] font-semibold text-[#0b1c2f]">
              {correctCount} dari {totalQuestions} benar
            </h2>
          </div>

          <p
            className={`max-w-[280px] text-[15px] text-[#44474e] transition-all duration-500 delay-100 ${
              showStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {isHighscore
              ? 'Luar biasa! Anda telah memahami sejarah Monumen Mandala dengan sangat baik.'
              : 'Tetap semangat! Anda selalu bisa mencoba lagi untuk hasil yang lebih baik.'}
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions Stack */}
        <div
          className={`flex w-full flex-col gap-3 transition-all duration-700 ${
            showButtons ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={onHome}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1f5fa7] text-[16px] font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
          >
            <Home className="h-6 w-6" />
            Kembali ke Beranda
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#7ab0fd] text-[16px] font-semibold text-[#00427d] transition-all duration-200 hover:shadow-lg active:scale-95"
          >
            <RefreshCcw className="h-6 w-6" />
            Ulangi Kuis
          </button>

          <button
            type="button"
            className="mt-1 flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[#74777f] text-[16px] font-semibold text-[#001128] transition-colors hover:bg-[#d3e4fd]/50 active:bg-[#d3e4fd]/80"
          >
            <Search className="h-6 w-6" />
            Jelajahi Koleksi Lain
          </button>
        </div>
      </main>

      {/* Keyframes */}
      <style>{`
        @keyframes result-confetti {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) translateX(var(--x-drift)) rotate(1080deg); opacity: 0; }
        }
        @keyframes trophy-bounce {
          0% { transform: scale(0) rotate(-20deg); }
          50% { transform: scale(1.3) rotate(10deg); }
          70% { transform: scale(0.9) rotate(-5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
