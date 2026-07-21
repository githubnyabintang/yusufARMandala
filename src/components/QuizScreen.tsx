import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { quizData } from '../data/quizData';
import { playSfx } from '../utils/sfx';

type QuizScreenProps = {
  onFinish: (score: number, correctCount: number) => void;
  onBack: () => void;
};

// Confetti particle component for correct answers
function ConfettiParticles() {
  const particles = Array.from({ length: 40 }).map((_, i) => {
    const colors = ['#22C55E', '#7ab0fd', '#facc15', '#f97316', '#a78bfa', '#f472b6'];
    const color = colors[i % colors.length];
    const left = Math.random() * 100;
    const delay = Math.random() * 0.6;
    const duration = 1.5 + Math.random() * 1;
    const size = 4 + Math.random() * 6;
    const rotation = Math.random() * 360;
    const xDrift = -30 + Math.random() * 60;

    return (
      <div
        key={i}
        className="absolute rounded-sm"
        style={{
          width: `${size}px`,
          height: `${size * 0.6}px`,
          backgroundColor: color,
          left: `${left}%`,
          top: '-5%',
          transform: `rotate(${rotation}deg)`,
          animation: `confetti-fall ${duration}s ease-in ${delay}s forwards`,
          ['--x-drift' as string]: `${xDrift}px`,
        }}
      />
    );
  });
  return <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">{particles}</div>;
}

// Shake burst particles for wrong answers
function WrongBurstParticles() {
  const particles = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i / 16) * 360;
    const distance = 60 + Math.random() * 40;
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;
    const size = 4 + Math.random() * 4;

    return (
      <div
        key={i}
        className="absolute left-1/2 top-1/2 rounded-full bg-red-400"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          animation: `burst-out 0.6s ease-out forwards`,
          ['--burst-x' as string]: `${x}px`,
          ['--burst-y' as string]: `${y}px`,
        }}
      />
    );
  });
  return <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">{particles}</div>;
}

export default function QuizScreen({ onFinish, onBack }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [modalEnter, setModalEnter] = useState(false);
  const [questionAnim, setQuestionAnim] = useState<'enter' | 'exit' | 'idle'>('enter');

  const question = quizData[currentIndex];
  const progressPercent = ((currentIndex + 1) / quizData.length) * 100;
  const isCorrect = selectedOption === question.correctAnswer;

  // Trigger modal entrance animation
  useEffect(() => {
    if (showFeedback) {
      requestAnimationFrame(() => setModalEnter(true));
    } else {
      setModalEnter(false);
    }
  }, [showFeedback]);

  // Trigger question entrance animation on index change
  useEffect(() => {
    setQuestionAnim('enter');
    const t = setTimeout(() => setQuestionAnim('idle'), 500);
    return () => clearTimeout(t);
  }, [currentIndex]);

  const handleConfirm = useCallback(() => {
    if (selectedOption) {
      if (selectedOption === question.correctAnswer) {
        setScore(s => s + 10);
        setCorrectCount(c => c + 1);
        playSfx('correct');
      } else {
        playSfx('wrong');
      }
      setShowFeedback(true);
    }
  }, [selectedOption, question.correctAnswer]);

  const handleContinue = useCallback(() => {
    playSfx('click');
    // Animate question exit, then switch
    setQuestionAnim('exit');
    setTimeout(() => {
      if (currentIndex < quizData.length - 1) {
        setCurrentIndex(i => i + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        onFinish(score, correctCount);
      }
    }, 300);
  }, [currentIndex, onFinish, score, correctCount]);

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#f8f9ff] text-[#0b1c2f] antialiased flex flex-col font-['Plus_Jakarta_Sans',system-ui,sans-serif] selection:bg-[#7ab0fd]/30">
      {/* Header */}
      <header className="fixed top-0 z-50 flex h-14 w-full items-center justify-between bg-[#f8f9ff]/70 px-5 backdrop-blur-md">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali"
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#d3e4fd]"
        >
          <ArrowLeft className="h-6 w-6 text-[#0b1c2f]" />
        </button>
        <h1 className="text-[20px] font-bold">Kuis Sejarah</h1>
        <div className="h-10 w-10" />
      </header>

      <main className="flex flex-1 flex-col px-5 pb-8 pt-14 mx-auto w-full max-w-md">
        {/* Progress */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[14px] text-[#44474e]">Pertanyaan {currentIndex + 1} dari {quizData.length}</span>
            <span className="text-[14px] font-semibold text-[#001128]">{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#d3e4fd]">
            <div
              className="h-full rounded-full bg-[#1f5fa7] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question - animated */}
        <div
          className={`mt-8 flex flex-1 flex-col transition-all duration-400 ${
            questionAnim === 'enter'
              ? 'animate-[slide-in-up_0.5s_ease-out_forwards]'
              : questionAnim === 'exit'
              ? 'animate-[slide-out-left_0.3s_ease-in_forwards]'
              : ''
          }`}
        >
          <h2 className="mb-8 text-[20px] font-semibold leading-7 text-[#0b1c2f]">
            {question.question}
          </h2>

          <div className="flex flex-col gap-3">
            {(Object.keys(question.options) as Array<keyof typeof question.options>).map((key, idx) => {
              const isSelected = selectedOption === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    if (!showFeedback) {
                      setSelectedOption(key);
                      playSfx('select');
                    }
                  }}
                  disabled={showFeedback}
                  className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-[#1f5fa7] bg-[#7ab0fd]/10 scale-[1.02]'
                      : 'border-[#c4c6cf] bg-[#EEF3F8] hover:border-[#1f5fa7] hover:scale-[1.01]'
                  }`}
                  style={{
                    animationDelay: `${idx * 80}ms`,
                  }}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-semibold shadow-sm transition-all duration-200 ${
                      isSelected ? 'bg-[#1f5fa7] text-white scale-110' : 'bg-white text-[#0b1c2f]'
                    }`}
                  >
                    {key}
                  </div>
                  <span className={`text-[16px] transition-all duration-200 ${isSelected ? 'font-semibold text-[#0b1c2f]' : 'text-[#0b1c2f]'}`}>
                    {question.options[key]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        {!showFeedback && (
          <div className="mt-8 pb-6 pt-4">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedOption}
              className={`flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#1f5fa7] text-[16px] font-semibold text-white transition-all duration-300 ${
                !selectedOption ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90 active:scale-95 shadow-md'
              }`}
            >
              Lanjut
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </main>

      {/* ========== Feedback Modal Overlay ========== */}
      {showFeedback && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center px-6 transition-all duration-500 ${
            modalEnter ? 'bg-[#001128]/85' : 'bg-[#001128]/0'
          }`}
        >
          {/* Confetti or Burst particles */}
          {isCorrect ? <ConfettiParticles /> : <WrongBurstParticles />}

          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center opacity-20 mix-blend-overlay"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAEJwyHvCNggsnlVOP8ZhD0-yEE9xta6KkRjQSKHGk4DtKSFoZpRxxpJ0ZR7QCYrDCtGrmf3UFyiX60YWVNYl75AG8xGw-JJnzRGm_sbncJZiVVBmk5UCJW2pqNCQTj2p3QZBF9_60-WO3kbLlAHWCv8Y4f9yceKkhlglmvVu1ORhQacqSIDf-XRpoxUDWt0BRJbynld_cILwuZN0MvqYoEWeTlPyXWDWaUKPPGwIK7_VF_LhN7LHeWud-WIWNIGdH4TrZS2VOwpu0')`,
              }}
            />
          </div>

          {/* Modal Card */}
          <div
            className={`relative z-10 flex w-full max-w-sm flex-col items-center rounded-2xl bg-white/90 p-6 text-center shadow-2xl backdrop-blur-xl transition-all duration-500 ${
              modalEnter
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-12 scale-90 opacity-0'
            } ${
              isCorrect
                ? 'shadow-[0_0_50px_rgba(34,197,94,0.25)]'
                : 'shadow-[0_0_50px_rgba(239,68,68,0.25)]'
            } ${!isCorrect && modalEnter ? 'animate-[head-shake_0.6s_ease-in-out]' : ''}`}
          >
            {/* Animated Icon */}
            <div
              className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full transition-all duration-500 ${
                isCorrect ? 'bg-green-500/15' : 'bg-red-500/15'
              } ${modalEnter ? 'scale-100' : 'scale-0'}`}
            >
              {isCorrect ? (
                <CheckCircle
                  className={`h-16 w-16 text-green-500 transition-all duration-700 ${
                    modalEnter ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
                  }`}
                  strokeWidth={1.5}
                />
              ) : (
                <XCircle
                  className={`h-16 w-16 text-red-500 transition-all duration-700 ${
                    modalEnter ? 'scale-100 rotate-0' : 'scale-0 rotate-90'
                  }`}
                  strokeWidth={1.5}
                />
              )}
            </div>

            {/* Emoji Reaction */}
            <div
              className={`mb-2 text-4xl transition-all duration-500 delay-200 ${
                modalEnter ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {isCorrect ? '🎉' : '😅'}
            </div>

            {/* Title */}
            <h1
              className={`mb-2 text-[24px] font-extrabold transition-all duration-500 delay-150 ${
                modalEnter ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              } ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
            >
              {isCorrect ? 'Jawaban Benar!' : 'Jawaban Salah!'}
            </h1>

            {/* Subtitle */}
            <p
              className={`mb-1 text-[13px] font-semibold transition-all duration-500 delay-200 ${
                modalEnter ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              } ${isCorrect ? 'text-green-500' : 'text-red-400'}`}
            >
              {isCorrect ? 'Keren banget! 🔥' : `Jawaban yang benar: ${question.correctAnswer}`}
            </p>

            {/* Explanation */}
            <p
              className={`mb-6 mt-3 text-[15px] leading-relaxed text-[#44474e] transition-all duration-500 delay-300 ${
                modalEnter ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {question.explanation}
            </p>

            {/* Continue Button */}
            <button
              type="button"
              onClick={handleContinue}
              className={`flex h-14 w-full items-center justify-center gap-2 rounded-xl text-[16px] font-semibold text-white shadow-lg transition-all duration-500 delay-300 active:scale-95 ${
                modalEnter ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              } ${
                isCorrect
                  ? 'bg-green-500 hover:bg-green-600 shadow-green-500/25'
                  : 'bg-[#185BA3] hover:bg-[#154a85] shadow-[#185BA3]/25'
              }`}
            >
              {currentIndex < quizData.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil'}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Keyframe Animations */}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(var(--x-drift)) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes burst-out {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--burst-x), var(--burst-y)) scale(0);
            opacity: 0;
          }
        }
        @keyframes head-shake {
          0% { transform: translateX(0); }
          6.5% { transform: translateX(-6px) rotateY(-9deg); }
          18.5% { transform: translateX(5px) rotateY(7deg); }
          31.5% { transform: translateX(-3px) rotateY(-5deg); }
          43.5% { transform: translateX(2px) rotateY(3deg); }
          50% { transform: translateX(0); }
        }
        @keyframes slide-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-out-left {
          0% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-40px); }
        }
      `}</style>
    </div>
  );
}
