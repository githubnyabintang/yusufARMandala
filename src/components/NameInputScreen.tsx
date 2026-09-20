import React, { useState, useEffect } from 'react';
import { User, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSfx } from '../utils/sfx';
import logoMandala from '../assets/logo.png';

interface NameInputScreenProps {
  onSubmit: (name: string) => void;
}

export default function NameInputScreen({ onSubmit }: NameInputScreenProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    playSfx('click');
    setIsSubmitting(true);
    const finalName = name.trim();
    
    // Call Unity if available
    if (typeof window !== "undefined" && window.Unity) {
      try {
        window.Unity.call(`SetUserName:${finalName}`);
      } catch (err) {
        console.error("Gagal memanggil Unity:", err);
      }
    } else {
      console.warn("Unity wrapper not found. Logging simulated calls:");
      console.log(`Unity.call("SetUserName:${finalName}")`);
      
      // MOCK DATA UNTUK TESTING DI KOMPUTER
      const mockPost = async () => {
        try {
          const FIREBASE_PROJECT_ID = 'ar-monumen-mandala';
          const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/sessions`;
          const payload = {
            fields: {
              namaLengkap: { stringValue: finalName },
              sessionDuration: { stringValue: "Mock (Dev Mode)" },
              interactionData: { stringValue: JSON.stringify([{ type: 'ar_view', targetId: 'Diorama_Test', timestamp: new Date().toISOString() }]) },
              timestamp: { timestampValue: new Date().toISOString() }
            }
          };
          await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload)
          });
          console.log("Mock session created for testing di PC.");
        } catch (e) { 
          console.error("Gagal mock post:", e); 
        }
      };
      mockPost();
    }

    // Delay sedikit untuk efek animasi keluar
    setTimeout(() => {
      onSubmit(finalName);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="relative min-h-screen bg-[#fafcff] text-[#191c1e] font-['Plus_Jakarta_Sans',system-ui,sans-serif] selection:bg-[#7ab0fd]/30 flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Background elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 -z-10 bg-gradient-to-br from-[#eaf2ff] via-white to-[#f0f5ff]" 
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#7ab0fd]/20 blur-[100px]"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-[#42bff5]/20 blur-[80px]"
        />

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1, bounce: 0.4 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="mb-10 flex flex-col items-center text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2, bounce: 0.5 }}
              className="mb-6 flex h-24 w-24 items-center justify-center rounded-[1.5rem] bg-white shadow-2xl shadow-[#001128]/10 ring-1 ring-black/5 p-3"
            >
              <img src={logoMandala} alt="Logo" className="h-full w-full object-contain" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-2 text-xs font-bold tracking-[0.2em] text-[#8ba3c6] uppercase"
            >
              Selamat Datang di
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-extrabold leading-tight tracking-tight text-[#001128]"
            >
              AR Monumen Mandala
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 max-w-[280px] text-[15px] leading-relaxed text-[#5a5d63]"
            >
              Sebelum memulai penjelajahan interaktif, beri tahu kami nama Anda.
            </motion.p>
          </div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onSubmit={handleSubmit} 
            className="flex flex-col gap-4"
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#7ab0fd] transition-colors" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda..."
                className="w-full rounded-2xl border border-white/20 bg-white/60 p-4 pl-12 text-[16px] font-medium text-[#001128] shadow-sm backdrop-blur-md outline-none transition-all focus:border-[#7ab0fd] focus:bg-white focus:ring-4 focus:ring-[#7ab0fd]/20"
                autoFocus
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#001128] p-4 text-[16px] font-bold text-white shadow-xl shadow-[#001128]/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? "Memulai Sesi..." : "Masuk ke Aplikasi"}
                {!isSubmitting && <Play className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="currentColor" />}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
