import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowLeft, 
  History, 
  Building2, 
  Sparkles, 
  MapPin, 
  ChevronRight,
  Clock,
  Ticket
} from 'lucide-react';
import { playSfx } from '../utils/sfx';
import { monumentDetail } from '../data/monumentDetail';
import heroImg from '../assets/monumen/hero.jpg';

type MonumentInfoScreenProps = {
  onBack: () => void;
};

type TabType = 'sejarah' | 'bangunan' | 'fakta' | 'pelayanan';

export default function MonumentInfoScreen({ onBack }: MonumentInfoScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>('sejarah');
  
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityBackground = useTransform(scrollY, [0, 300], [1, 0.4]);

  const handleBack = () => {
    playSfx('click');
    onBack();
  };

  const changeTab = (tab: TabType) => {
    if (tab !== activeTab) {
      playSfx('click');
      setActiveTab(tab);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderSejarah = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <section>
        <div className="w-full h-48 mb-4 rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-sm">
          <img src={monumentDetail.sejarah.identitas.image} alt="Identitas Monumen" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold text-[#001128] mb-4">{monumentDetail.sejarah.identitas.title}</h2>
        <p className="text-[15px] leading-relaxed text-[#44474e] mb-4">
          {monumentDetail.sejarah.identitas.description}
        </p>
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-black/[0.04] space-y-3">
          {monumentDetail.sejarah.identitas.details.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-start border-b border-gray-100 last:border-0 pb-3 last:pb-0">
              <span className="text-sm font-semibold text-[#8ba3c6] sm:w-1/3">{item.label}</span>
              <span className="text-[15px] font-medium text-[#001128] sm:w-2/3">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="w-full h-48 mb-4 rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-sm">
          <img src={monumentDetail.sejarah.jejakTapak.image} alt="Jejak Sejarah" className="w-full h-full object-cover object-top" />
        </div>
        <h2 className="text-xl font-bold text-[#001128] mb-4">{monumentDetail.sejarah.jejakTapak.title}</h2>
        <p className="text-[15px] leading-relaxed text-[#44474e] mb-6">
          {monumentDetail.sejarah.jejakTapak.description}
        </p>
        
        <div className="relative pl-6 border-l-2 border-[#d3e4fd] space-y-8">
          {monumentDetail.sejarah.jejakTapak.timeline.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-[#1f5fa7] ring-4 ring-[#fafcff]" />
              <h3 className="text-[16px] font-bold text-[#001128] mb-2">{item.period}</h3>
              <p className="text-[14px] text-[#5a5d63] leading-relaxed mb-3">
                {item.desc}
              </p>
              {item.trikora && (
                <ul className="list-disc pl-5 space-y-2 text-[14px] text-[#5a5d63]">
                  {item.trikora.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              )}
              {item.events && (
                <ul className="list-disc pl-5 space-y-2 text-[14px] text-[#5a5d63]">
                  {item.events.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );

  const renderBangunan = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <section>
        <div className="w-full h-48 mb-4 rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-sm">
          <img src={monumentDetail.bangunan.arsitektur.image} alt="Arsitektur Monumen" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold text-[#001128] mb-6">{monumentDetail.bangunan.arsitektur.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {monumentDetail.bangunan.arsitektur.items.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-white p-5 rounded-2xl shadow-sm ring-1 ring-black/[0.04]"
            >
              <h3 className="font-bold text-[#1f5fa7] mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#7ab0fd]" />
                {item.name}
              </h3>
              <p className="text-[14px] leading-relaxed text-[#5a5d63]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className="w-full h-48 mb-4 rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-sm">
          <img src={monumentDetail.bangunan.katalog.image} alt="Katalog Koleksi" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold text-[#001128] mb-4">{monumentDetail.bangunan.katalog.title}</h2>
        <div className="space-y-3">
          {monumentDetail.bangunan.katalog.items.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm ring-1 ring-black/[0.04]">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#f0f5ff] text-[#1f5fa7]">
                <ChevronRight className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#001128] text-[15px]">{item.name}</h4>
                <p className="text-[13px] text-[#5a5d63] mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );

  const renderFakta = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-bold text-[#001128]">{monumentDetail.fakta.interior.title}</h2>
      <div className="space-y-6">
        {monumentDetail.fakta.interior.floors.map((floor, idx) => (
          <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/[0.04]">
            <div className="h-40 w-full overflow-hidden">
                <img src={floor.image} alt={floor.title} className="w-full h-full object-cover" />
            </div>
            <div className="bg-gradient-to-r from-[#001128] to-[#1f5fa7] px-5 py-3">
              <span className="font-bold text-white tracking-wider">{floor.name}</span>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-[#1f5fa7] mb-2">{floor.title}</h4>
              <p className="text-[14px] leading-relaxed text-[#5a5d63]">
                {floor.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#fff8e6] border border-[#ffe082] rounded-xl p-4 mt-6">
        <p className="text-[13px] text-[#b28900] leading-relaxed font-medium">
          {monumentDetail.fakta.interior.note}
        </p>
      </div>
    </motion.div>
  );

  const renderPelayanan = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <section>
        <div className="w-full h-48 mb-4 rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-sm">
          <img src={monumentDetail.pelayanan.image} alt="Pelayanan" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold text-[#001128] mb-4">{monumentDetail.pelayanan.title}</h2>
        <div className="grid gap-4 mb-6">
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm ring-1 ring-black/[0.04]">
            <div className="p-3 bg-[#f0f5ff] rounded-full text-[#1f5fa7]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-[#8ba3c6] uppercase">Jam Operasional</span>
              <span className="text-[15px] font-bold text-[#001128]">{monumentDetail.pelayanan.info[0].value}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm ring-1 ring-black/[0.04]">
            <div className="p-3 bg-[#f0f5ff] rounded-full text-[#1f5fa7]">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-[#8ba3c6] uppercase">Harga Tiket</span>
              <span className="text-[14px] font-medium text-[#001128]">{monumentDetail.pelayanan.info[1].value}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-black/[0.04]">
          <h4 className="font-bold text-[#001128] mb-2">Prosedur Rombongan</h4>
          <p className="text-[14px] leading-relaxed text-[#5a5d63]">
            {monumentDetail.pelayanan.prosedur}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-[#001128] mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#1f5fa7]" />
          Lokasi Peta
        </h2>
        <div className="w-full h-64 bg-gray-200 rounded-2xl overflow-hidden ring-1 ring-black/5">
          <iframe 
            src={monumentDetail.pelayanan.mapUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen bg-[#fafcff] font-['Plus_Jakarta_Sans',system-ui,sans-serif] selection:bg-[#7ab0fd]/30 pb-20">
      
      {/* Floating Back Button */}
      <div className="fixed top-0 left-0 w-full z-50 p-4">
        <button
          onClick={handleBack}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white shadow-lg transition-all active:scale-90 hover:bg-black/50"
          aria-label="Kembali"
        >
          <ArrowLeft className="h-6 w-6" strokeWidth={2.5} />
        </button>
      </div>

      {/* Hero Section with Parallax */}
      <div className="relative h-[45vh] min-h-[350px] w-full overflow-hidden bg-[#001128]">
        <motion.div 
          style={{ y: yBackground, opacity: opacityBackground }}
          className="absolute inset-0 w-full h-[120%]"
        >
          <img 
            src={heroImg} 
            alt="Monumen Mandala"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafcff] via-[#fafcff]/10 to-black/30" />

        <div className="absolute bottom-0 left-0 w-full px-6 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-[#1f5fa7] shadow-sm">
              <History className="h-4 w-4" strokeWidth={2.5} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Edukasi Sejarah</span>
            </div>
            <h1 className="text-3xl font-extrabold leading-tight text-[#001128] drop-shadow-sm">
              Monumen Mandala
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-40 bg-[#fafcff]/90 backdrop-blur-xl border-b border-gray-200/60 px-4 pt-2 pb-2">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 snap-x snap-mandatory">
          {[
            { id: 'sejarah', label: 'Sejarah', icon: History },
            { id: 'bangunan', label: 'Bangunan', icon: Building2 },
            { id: 'fakta', label: 'Fakta', icon: Sparkles },
            { id: 'pelayanan', label: 'Pelayanan', icon: MapPin }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => changeTab(tab.id as TabType)}
              className={`snap-center flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-semibold text-sm ${
                activeTab === tab.id 
                  ? 'bg-[#001128] text-white shadow-md' 
                  : 'bg-white text-[#5a5d63] hover:bg-gray-100 ring-1 ring-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" strokeWidth={2.5} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <main className="px-5 pt-8 mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          {activeTab === 'sejarah' && <motion.div key="sejarah">{renderSejarah()}</motion.div>}
          {activeTab === 'bangunan' && <motion.div key="bangunan">{renderBangunan()}</motion.div>}
          {activeTab === 'fakta' && <motion.div key="fakta">{renderFakta()}</motion.div>}
          {activeTab === 'pelayanan' && <motion.div key="pelayanan">{renderPelayanan()}</motion.div>}
        </AnimatePresence>
      </main>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
