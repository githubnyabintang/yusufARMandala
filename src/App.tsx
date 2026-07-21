import { useEffect, useState } from "react";
import {
  Accessibility,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Compass,
  Info,
  Landmark,
  QrCode,
  Smartphone,
  Volume2,
} from "lucide-react";

declare global {
  interface Window {
    Unity?: {
      call: (message: string) => void;
    };
  }
}

type BridgeLog = {
  id: number;
  time: string;
  text: string;
  type: "success" | "info";
};

const collectionImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCF_rUoUFD-5ov5y2r9YokcGAYjGPj3o9rVer2xJ0Eoa1kArDdjrdUJFQDttK4qyINX10hwScX7meIV0sDv0cbVt-Obk7uEMQ9w7HHB6TWnnzOEpKf_10rZwyVzjdmnytjCiTHJzuCPcJ8bQznic40CRfpX2NpbQAVb2IdE_CpZ3ChK9tbPp-zvV6Lgfc-DhD2pMzXcdyBLxxQcwWlFn-43R4P8JaTrhou_jeRisTLOksQ-FHBYmk6aHOwhcWWPEwSvcA8eZAxwUA8x";

export default function App() {
  const [isUnityPresent, setIsUnityPresent] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [logs, setLogs] = useState<BridgeLog[]>([]);

  useEffect(() => {
    const checkUnity = () => {
      setIsUnityPresent(typeof window !== "undefined" && !!window.Unity);
    };

    checkUnity();
    const interval = window.setInterval(checkUnity, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const addLog = (text: string, type: BridgeLog["type"]) => {
    const now = new Date().toLocaleTimeString("id-ID", { hour12: false });
    setLogs((prev) => [{ id: Date.now(), time: now, text, type }, ...prev].slice(0, 5));
  };

  const handleUnityTrigger = () => {
    setClickCount((count) => count + 1);

    if (typeof window !== "undefined" && window.Unity) {
      try {
        window.Unity.call("LoadVirtualTourScene");
        addLog("Pesan 'LoadVirtualTourScene' berhasil dikirim ke Unity.", "success");
      } catch (err) {
        addLog(`Gagal memanggil Unity: ${err}`, "info");
      }
      return;
    }

    addLog("Unity.call('LoadVirtualTourScene') dipicu dalam mode simulasi browser.", "info");
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-['Plus_Jakarta_Sans',system-ui,sans-serif] antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#c4c6cf]/30 bg-[#001128]/75 px-5 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label="Kembali"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white transition hover:bg-[#0b2646]/70 active:scale-95"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="truncate text-xl font-bold leading-8 text-white sm:text-2xl">Monumen Mandala</h1>
          </div>

          <button
            type="button"
            aria-label="Bantuan"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white transition hover:bg-[#0b2646]/70 active:scale-95"
          >
            <CircleHelp className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-5 pb-[calc(92px+env(safe-area-inset-bottom))] pt-[calc(72px+env(safe-area-inset-top))] md:pb-8">
        <section className="mt-4 flex flex-col gap-3 text-center md:text-left">
          <div className="inline-flex self-center rounded-full border border-[#c4c6cf]/70 bg-white px-3 py-1 text-xs font-semibold text-[#304869] shadow-sm md:self-start">
            {isUnityPresent ? "Unity Terdeteksi" : "Mode Simulasi Browser"}
          </div>
          <h2 className="text-3xl font-bold leading-10 tracking-normal text-[#001128] sm:text-4xl sm:leading-[48px]">
            Jelajahi Sejarah<br />dalam Pengalaman AR
          </h2>
          <p className="mx-auto max-w-md text-base leading-6 text-[#44474e] md:mx-0">
            Pindai koleksi museum dan lihat kisah sejarah hadir dalam bentuk tiga dimensi.
          </p>
        </section>

        <button
          id="btn-pindah"
          type="button"
          onClick={handleUnityTrigger}
          aria-label="Pindai Koleksi"
          className="group relative flex aspect-[4/3] w-full flex-col justify-end overflow-hidden rounded-xl border border-[#c4c6cf]/20 bg-[#0b2646] p-6 text-white shadow-lg transition-all hover:border-[#7ab0fd] active:scale-[0.98] md:aspect-[21/9]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity transition-all duration-700 group-hover:scale-105 group-hover:opacity-50"
            style={{ backgroundImage: `url(${collectionImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001128]/40 via-[#001128]/80 to-[#001128]" />
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 p-4 text-center">
            <div className="mb-1 grid h-16 w-16 place-items-center rounded-full bg-[#7ab0fd] text-[#0b2646] shadow-[0_0_20px_rgba(122,176,253,0.6)]">
              <QrCode className="h-10 w-10" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-3xl font-bold leading-10 text-[#7ab0fd]">Pindai Koleksi</h3>
              <p className="mx-auto max-w-xs text-base leading-6 text-white/80">
                Arahkan kamera ke kode pada koleksi museum untuk melihat sejarah hidup
              </p>
            </div>
          </div>
        </button>

        <section className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex aspect-square flex-col items-center justify-center gap-4 rounded-xl border border-[#c4c6cf]/30 bg-white p-6 shadow-sm transition-all hover:border-[#7ab0fd] hover:shadow-md active:scale-[0.98]"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f2f4f6] text-[#001128]">
              <Compass className="h-7 w-7" strokeWidth={1.7} />
            </span>
            <span className="text-xl font-semibold leading-7 text-[#001128]">Jelajahi</span>
          </button>

          <button
            type="button"
            className="flex aspect-square flex-col items-center justify-center gap-4 rounded-xl border border-[#c4c6cf]/30 bg-white p-6 shadow-sm transition-all hover:border-[#7ab0fd] hover:shadow-md active:scale-[0.98]"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f2f4f6] text-[#001128]">
              <CircleHelp className="h-7 w-7" strokeWidth={1.7} />
            </span>
            <span className="text-xl font-semibold leading-7 text-[#001128]">Kuis</span>
          </button>
        </section>

        <section>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl border border-[#c4c6cf]/30 bg-white p-4 shadow-sm transition-all hover:border-[#7ab0fd] hover:shadow-md active:scale-[0.98]"
          >
            <span className="flex min-w-0 items-center gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f2f4f6] text-[#001128]">
                <Landmark className="h-5 w-5" />
              </span>
              <span className="truncate text-base font-semibold leading-6 text-[#001128]">Tentang Monumen</span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-[#74777f]" />
          </button>
        </section>

        <section className="rounded-xl border border-[#c4c6cf]/50 bg-white/80 p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#c4c6cf]/40 pb-2 text-[10px] font-semibold uppercase tracking-wide text-[#74777f]">
            <span>Aktivitas Jembatan Unity</span>
            <span>{clickCount} klik</span>
          </div>
          <div className="mt-3 flex max-h-32 flex-col gap-2 overflow-y-auto text-xs text-[#44474e]">
            {logs.length === 0 ? (
              <div className="py-3 text-center italic text-[#74777f]">
                Belum ada aktivitas. Silakan klik tombol "Pindai Koleksi".
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2">
                  <span className="shrink-0 text-[#74777f]">[{log.time}]</span>
                  {log.type === "success" ? (
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1f5fa7]" />
                  )}
                  <span className={log.type === "success" ? "text-emerald-700" : "text-[#44474e]"}>{log.text}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 rounded-t-xl bg-[#001128]/85 px-3 pb-[calc(20px+env(safe-area-inset-bottom))] pt-2 shadow-lg backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-2xl items-center justify-around">
          <a className="flex w-16 flex-col items-center justify-center rounded-xl bg-[#0b2646]/70 px-3 py-1 text-[#7ab0fd]" href="#">
            <Info className="mb-1 h-5 w-5" fill="currentColor" />
            <span className="w-full truncate text-center text-[10px] leading-tight">Info</span>
          </a>
          <a className="flex w-16 flex-col items-center justify-center px-3 py-1 text-white/70 transition-colors hover:text-white" href="#">
            <Volume2 className="mb-1 h-5 w-5" />
            <span className="w-full truncate text-center text-[10px] leading-tight">Audio</span>
          </a>
          <a className="flex w-16 flex-col items-center justify-center px-3 py-1 text-white/70 transition-colors hover:text-white" href="#">
            <Accessibility className="mb-1 h-5 w-5" />
            <span className="w-full truncate text-center text-[10px] leading-tight">Atur</span>
          </a>
          <a className="flex w-16 flex-col items-center justify-center px-3 py-1 text-white/70 transition-colors hover:text-white" href="#">
            <CircleHelp className="mb-1 h-5 w-5" />
            <span className="w-full truncate text-center text-[10px] leading-tight">Kuis</span>
          </a>
        </div>
      </nav>

      <footer className="hidden w-full justify-center py-4 text-center text-[10px] text-[#74777f] md:flex">
        <div className="flex items-center gap-1.5">
          <Smartphone className="h-3 w-3" />
          <span>Kompatibel dengan UniWebView / Gley WebView</span>
        </div>
      </footer>
    </div>
  );
}
