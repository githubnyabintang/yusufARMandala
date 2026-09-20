import React, { useState } from 'react';
import { User, Play, X } from 'lucide-react';
import { playSfx } from '../utils/sfx';

interface NameInputModalProps {
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function NameInputModal({ onClose, onSubmit }: NameInputModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSfx('click');
    const finalName = name.trim() || 'Anonim';
    
    // Call Unity if available
    if (typeof window !== "undefined" && window.Unity) {
      try {
        window.Unity.call(`SetUserName:${finalName}`);
        setTimeout(() => {
          if (window.Unity) window.Unity.call("LoadVirtualTourScene");
        }, 100);
      } catch (err) {
        console.error("Gagal memanggil Unity:", err);
      }
    } else {
      console.warn("Unity wrapper not found. Logging simulated calls:");
      console.log(`Unity.call("SetUserName:${finalName}")`);
      console.log(`Unity.call("LoadVirtualTourScene")`);
    }

    onSubmit(finalName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001128]/80 p-6 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm rounded-[2rem] bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          type="button"
          onClick={() => { playSfx('click'); onClose(); }}
          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-[#f0f5ff] text-[#001128]">
            <User className="h-8 w-8" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold text-[#001128]">Siapa Namamu?</h2>
          <p className="mt-2 text-sm text-[#5a5d63]">
            Masukkan nama Anda untuk memulai penjelajahan AR di Monumen Mandala.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi Santoso"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 pl-4 text-[15px] font-medium text-[#001128] outline-none transition-all focus:border-[#7ab0fd] focus:bg-white focus:ring-4 focus:ring-[#7ab0fd]/10"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#001128] p-4 text-[15px] font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#001b40] active:scale-[0.98]"
          >
            Mulai Jelajah
            <Play className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="currentColor" />
          </button>
        </form>
      </div>
    </div>
  );
}
