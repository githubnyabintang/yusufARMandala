import { useState, useEffect } from "react";
import { ArrowRight, Smartphone, CheckCircle2, AlertCircle } from "lucide-react";

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Unity?: {
      call: (message: string) => void;
    };
  }
}

export default function App() {
  const [isUnityPresent, setIsUnityPresent] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const [logs, setLogs] = useState<Array<{ id: number; time: string; text: string; type: 'success' | 'info' }>>([]);

  // Check if Unity is present in the window object
  useEffect(() => {
    const checkUnity = () => {
      const present = typeof window !== "undefined" && !!window.Unity;
      setIsUnityPresent(present);
    };

    // Run check immediately and set up an interval in case it's injected later
    checkUnity();
    const interval = setInterval(checkUnity, 1000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (text: string, type: 'success' | 'info') => {
    const now = new Date().toLocaleTimeString('id-ID', { hour12: false });
    setLogs((prev) => [{ id: Date.now(), time: now, text, type }, ...prev].slice(0, 5));
  };

  const handleUnityTrigger = () => {
    setClickCount((c) => c + 1);
    
    if (typeof window !== "undefined" && window.Unity) {
      try {
        window.Unity.call("LoadVirtualTourScene");
        addLog("Pesan 'LoadVirtualTourScene' berhasil dikirim ke Unity.", "success");
      } catch (err) {
        addLog(`Gagal memanggil Unity: ${err}`, "info");
      }
    } else {
      addLog("Unity.call('LoadVirtualTourScene') dipicu (Browser mode: Simulasi sukses).", "info");
    }
  };

  return (
    <div id="yusuf-ar-root" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Background radial gradient decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-md mx-auto text-center pt-8 z-10">
        <h1 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          yusufAR
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-mono">
          Unity WebView Interface
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center items-center py-12 z-10">
        <div id="control-card" className="w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6 relative overflow-hidden">
          {/* Top light glow border */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${isUnityPresent ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="text-slate-300">
              {isUnityPresent ? 'Unity Terdeteksi' : 'Mode Simulasi Browser'}
            </span>
          </div>

          <p className="text-sm text-slate-300 text-center leading-relaxed">
            Tekan tombol di bawah untuk memicu transisi scene native di aplikasi Unity Anda.
          </p>

          {/* Elegant Primary Button */}
          <button
            id="btn-pindah"
            onClick={handleUnityTrigger}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-blue-900/20 active:scale-98 transition-all duration-200 flex items-center justify-center gap-3 group relative overflow-hidden cursor-pointer"
          >
            <span className="text-lg tracking-wide uppercase font-bold">pindah</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Counter Badge */}
          {clickCount > 0 && (
            <div className="text-xs text-slate-400 font-mono animate-fade-in">
              Jumlah klik: <span className="text-blue-400 font-bold">{clickCount}</span>
            </div>
          )}
        </div>

        {/* Live Logs & Debugging Assistant */}
        <div className="w-full mt-6 bg-slate-900/30 border border-slate-800/40 rounded-xl p-4 font-mono text-xs text-slate-400 max-h-[180px] overflow-y-auto flex flex-col gap-2">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/50 text-[10px] uppercase tracking-wider text-slate-500">
            <span>Aktivitas Jembatan Unity</span>
            <span>Live Logs</span>
          </div>
          {logs.length === 0 ? (
            <div className="text-slate-600 text-center py-4 italic">Belum ada aktivitas. Silakan klik tombol "pindah".</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex gap-2 items-start">
                <span className="text-slate-600 shrink-0">[{log.time}]</span>
                {log.type === 'success' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                )}
                <span className={log.type === 'success' ? 'text-emerald-400' : 'text-slate-300'}>{log.text}</span>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-md mx-auto text-center py-4 z-10 text-[10px] text-slate-500 flex flex-col gap-1 items-center font-mono">
        <div className="flex items-center gap-1.5">
          <Smartphone className="w-3 h-3" />
          <span>Kompatibel dengan UniWebView / Gley WebView</span>
        </div>
        <div>yusufAR &copy; 2026. Semua Hak Dilindungi.</div>
      </footer>
    </div>
  );
}
