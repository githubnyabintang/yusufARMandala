import { useState, useEffect } from 'react';
import {
  ChevronRight,
  Gamepad2,
  Landmark,
  QrCode,
} from "lucide-react";
import logoMandala from "./assets/logo.png";
import QuizSplashScreen from "./components/QuizSplashScreen";
import QuizScreen from "./components/QuizScreen";
import QuizResultScreen from "./components/QuizResultScreen";
import HomeSplashScreen from "./components/HomeSplashScreen";
import RestartSplashScreen from "./components/RestartSplashScreen";
import { quizData } from "./data/quizData";
import { preloadSfx, playSfx } from "./utils/sfx";

declare global {
  interface Window {
    Unity?: {
      call: (message: string) => void;
    };
  }
}

const collectionImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCF_rUoUFD-5ov5y2r9YokcGAYjGPj3o9rVer2xJ0Eoa1kArDdjrdUJFQDttK4qyINX10hwScX7meIV0sDv0cbVt-Obk7uEMQ9w7HHB6TWnnzOEpKf_10rZwyVzjdmnytjCiTHJzuCPcJ8bQznic40CRfpX2NpbQAVb2IdE_CpZ3ChK9tbPp-zvV6Lgfc-DhD2pMzXcdyBLxxQcwWlFn-43R4P8JaTrhou_jeRisTLOksQ-FHBYmk6aHOwhcWWPEwSvcA8eZAxwUA8x";

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'splash' | 'quiz' | 'result' | 'home-splash' | 'restart-splash'>('home');
  const [quizScore, setQuizScore] = useState(0);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);

  useEffect(() => {
    preloadSfx();
  }, []);

  const handleUnityTrigger = () => {
    playSfx('click');
    if (typeof window !== "undefined" && window.Unity) {
      try {
        window.Unity.call("LoadVirtualTourScene");
      } catch (err) {
        console.error("Gagal memanggil Unity:", err);
      }
    }
  };

  const startQuiz = () => {
    playSfx('click');
    setCurrentView('splash');
  };

  const handleQuizFinish = (score: number, correctCount: number) => {
    setQuizScore(score);
    setQuizCorrectCount(correctCount);
    setCurrentView('result');
  };

  const handleHome = () => {
    playSfx('click');
    setCurrentView('home-splash');
  };

  const handleRestart = () => {
    playSfx('click');
    setCurrentView('restart-splash');
  };

  if (currentView === 'home-splash') {
    return <HomeSplashScreen onComplete={() => setCurrentView('home')} />;
  }

  if (currentView === 'restart-splash') {
    return <RestartSplashScreen onComplete={() => setCurrentView('quiz')} />;
  }

  if (currentView === 'splash') {
    return <QuizSplashScreen onComplete={() => setCurrentView('quiz')} />;
  }

  if (currentView === 'quiz') {
    return <QuizScreen onFinish={handleQuizFinish} onBack={handleHome} />;
  }

  if (currentView === 'result') {
    return (
      <QuizResultScreen 
        score={quizScore} 
        correctCount={quizCorrectCount} 
        totalQuestions={quizData.length} 
        onHome={handleHome}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#fafcff] text-[#191c1e] font-['Plus_Jakarta_Sans',system-ui,sans-serif] antialiased selection:bg-[#7ab0fd]/30">
      {/* Decorative background blur */}
      <div className="absolute left-0 top-0 -z-10 h-96 w-full bg-gradient-to-b from-[#eaf2ff] to-transparent" />
      
      <main className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col justify-center px-6 py-12">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col items-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-[1.25rem] bg-white shadow-xl shadow-[#001128]/5 ring-1 ring-black/5">
             <img src={logoMandala} alt="Logo Monumen Mandala" className="h-full w-full object-contain p-2" />
          </div>
          <h1 className="mb-3 text-xs font-bold tracking-[0.15em] text-[#8ba3c6] uppercase">
            Monumen Mandala
          </h1>
          <h2 className="text-[32px] font-extrabold leading-[1.15] tracking-tight text-[#001128] sm:text-4xl">
            Kenali Koleksi Objek<br />dengan <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#001128] to-[#7ab0fd]">Kamera AR</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[280px] text-[15px] leading-relaxed text-[#5a5d63]">
            Pengalaman interaktif menghidupkan cerita di balik setiap koleksi museum.
          </p>
        </header>

        {/* Primary Action - AR Scanner */}
        <button
          id="btn-pindah"
          type="button"
          onClick={handleUnityTrigger}
          className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] bg-[#001128] p-8 text-white shadow-2xl shadow-[#001128]/25 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[#001128]/40 focus:outline-none focus:ring-4 focus:ring-[#7ab0fd]/50 active:scale-[0.98] sm:p-10"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${collectionImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001128] via-[#001128]/80 to-transparent" />
          
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="relative grid h-20 w-20 place-items-center rounded-[2rem] bg-white/10 backdrop-blur-md ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/20">
              <div className="absolute inset-0 rounded-[2rem] bg-[#7ab0fd]/20 animate-ping opacity-50 duration-1000" />
              <QrCode className="h-9 w-9 text-[#7ab0fd] transition-transform group-hover:scale-110" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <h3 className="mb-1.5 text-2xl font-bold tracking-tight text-white">Mulai Pindai AR</h3>
              <p className="text-sm font-medium text-white/60">Ketuk untuk membuka kamera</p>
            </div>
          </div>
        </button>

        {/* Menu Actions Card */}
        <div className="mt-6 flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-black/5 ring-1 ring-black/[0.04]">
          <button
            type="button"
            onClick={startQuiz}
            className="group flex w-full items-center justify-between p-5 text-[#001128] transition-colors duration-300 hover:bg-[#f8faff] active:scale-[0.99]"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#f0f5ff] text-[#001128] transition-colors duration-300 group-hover:bg-[#001128] group-hover:text-white">
                <Gamepad2 className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold">Quiz</span>
                <span className="text-xs text-[#5a5d63]">Uji wawasan sejarahmu dengan cara yang seru!</span>
              </div>
            </div>
            <ChevronRight className="mr-1 h-5 w-5 shrink-0 text-[#8ba3c6] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#001128]" />
          </button>
          
          <div className="h-[1px] w-[calc(100%-2.5rem)] self-end bg-black/[0.04]" />

          <button
            type="button"
            className="group flex w-full items-center justify-between p-5 text-[#001128] transition-colors duration-300 hover:bg-[#f8faff] active:scale-[0.99]"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#f0f5ff] text-[#001128] transition-colors duration-300 group-hover:bg-[#001128] group-hover:text-white">
                <Landmark className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold">Informasi Monumen</span>
                <span className="text-xs text-[#5a5d63]">Pelajari lebih dalam sejarah di balik bangunan ini.</span>
              </div>
            </div>
            <ChevronRight className="mr-1 h-5 w-5 shrink-0 text-[#8ba3c6] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#001128]" />
          </button>
        </div>

      </main>
    </div>
  );
}
