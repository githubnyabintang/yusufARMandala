import React, { useState, useEffect } from 'react';
import { Users, Eye, History, RefreshCw, LogOut, Search, Activity, Brain, ArrowUpDown, Filter } from 'lucide-react';
import logoMandala from "../assets/logo.png";

// ============ CONFIG (HARUS SAMA DENGAN UNITY) ============
const FIREBASE_PROJECT_ID = 'ar-monumen-mandala';
const FIREBASE_API_KEY = 'AIzaSyDawSueUpF5HTB_Ak-trxjdk6Quml3_qCU';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [loading, setLoading] = useState(false);
  const [allSessions, setAllSessions] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [filterType, setFilterType] = useState('all'); // all, day, week, month, year
  const [sortType, setSortType] = useState('newest'); 
  const [stats, setStats] = useState({ total: 0, ar: 0, history: 0, quiz: 0 });

  const doLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setLoginError('');
      loadData();
    } else {
      setLoginError('Username atau password salah!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setAllSessions([]);
    setSessions([]);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const url = `${FIRESTORE_BASE}/sessions?key=${FIREBASE_API_KEY}&pageSize=200`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.documents || data.documents.length === 0) {
        setAllSessions([]);
        setSessions([]);
        setStats({ total: 0, ar: 0, history: 0, quiz: 0 });
        setLoading(false);
        return;
      }

      // Format data
      const formattedSessions = data.documents.map((doc: any) => {
        const fields = doc.fields;
        const nama = (fields.namaLengkap && fields.namaLengkap.stringValue) || 'Anonim';
        const durasi = (fields.sessionDuration && fields.sessionDuration.stringValue) || '-';
        const ts = (fields.timestamp && fields.timestamp.timestampValue) || '';
        
        let interactions: any[] = [];
        try {
          const raw = (fields.interactionData && fields.interactionData.stringValue) || '[]';
          interactions = JSON.parse(raw);
        } catch (e) { }

        let arCount = 0;
        let historyCount = 0;
        let quizCount = 0;

        interactions.forEach((i: any) => {
          const typeStr = (i.type || '').toLowerCase();
          if (typeStr.includes('ar')) arCount++;
          else if (typeStr.includes('quiz')) quizCount++;
          else historyCount++; // Default to history/info if unknown
        });

        return {
          id: doc.name.split('/').pop(),
          nama,
          durasi,
          timestamp: ts,
          interactions,
          arCount,
          historyCount,
          quizCount,
          totalCount: interactions.length
        };
      });

      setAllSessions(formattedSessions);

    } catch (error: any) {
      console.error('Fetch error:', error);
      // Jangan setSessions([]) jika error saat auto-refresh agar data lama tetap tampil
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Apply filter whenever allSessions, filterType, or sortType changes
    const now = new Date();
    let filtered = allSessions.filter(session => {
      if (filterType === 'all') return true;
      if (!session.timestamp) return false;
      const d = new Date(session.timestamp);

      if (filterType === 'day') {
        return d.toDateString() === now.toDateString();
      }
      if (filterType === 'week') {
        // last 7 days
        const diff = now.getTime() - d.getTime();
        return diff <= 7 * 24 * 60 * 60 * 1000;
      }
      if (filterType === 'month') {
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }
      if (filterType === 'year') {
        return d.getFullYear() === now.getFullYear();
      }
      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sortType === 'newest') return b.timestamp.localeCompare(a.timestamp);
      if (sortType === 'oldest') return a.timestamp.localeCompare(b.timestamp);
      if (sortType === 'most_total') return b.totalCount - a.totalCount;
      if (sortType === 'most_ar') return b.arCount - a.arCount;
      if (sortType === 'most_history') return b.historyCount - a.historyCount;
      if (sortType === 'most_quiz') return b.quizCount - a.quizCount;
      return 0;
    });

    let totalAR = 0;
    let totalHistory = 0;
    let totalQuiz = 0;

    filtered.forEach(session => {
      totalAR += session.arCount;
      totalHistory += session.historyCount;
      totalQuiz += session.quizCount;
    });

    setSessions([...filtered]); // Ensure new reference so React re-renders
    setStats({
      total: filtered.length,
      ar: totalAR,
      history: totalHistory,
      quiz: totalQuiz
    });

  }, [allSessions, filterType, sortType]);

  useEffect(() => {
    let interval: any;
    if (isLoggedIn) {
      interval = setInterval(() => {
        loadData();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0f1c] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] px-4 font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-white">
        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#121829]/80 p-8 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-500">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[1.25rem] bg-white shadow-xl">
              <img src={logoMandala} alt="Logo" className="h-full w-full object-contain p-2" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-gray-400">Silakan login untuk mengakses data pengunjung.</p>
          </div>

          <form onSubmit={doLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="rounded-xl border border-white/10 bg-[#0a0f1c] p-4 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-[#42bff5] focus:ring-1 focus:ring-[#42bff5]"
                placeholder="Masukkan username"
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="rounded-xl border border-white/10 bg-[#0a0f1c] p-4 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-[#42bff5] focus:ring-1 focus:ring-[#42bff5]"
                placeholder="Masukkan password"
              />
            </div>
            
            {loginError && <p className="text-center text-sm font-medium text-[#ff6b6b]">{loginError}</p>}
            
            <button 
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#42bff5] p-4 text-sm font-bold text-[#0a0f1c] transition-all hover:bg-[#2ca6db] active:scale-[0.98]"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] font-['Plus_Jakarta_Sans',system-ui,sans-serif] text-gray-200 selection:bg-[#42bff5]/30">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0f1c]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1">
              <img src={logoMandala} alt="Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-white">AR Monumen Mandala</h1>
              <p className="text-xs text-gray-400">Premium Admin Dashboard</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] p-6 pb-20 animate-in fade-in duration-500 slide-in-from-bottom-4">
        {/* Stats Row */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#121829] p-6 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-blue-500/10">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-blue-500/10 blur-3xl"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Total Pengunjung</p>
                <h3 className="text-3xl font-extrabold text-white">{stats.total}</h3>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#121829] p-6 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-cyan-500/10">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-cyan-500/10 blur-3xl"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/30">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Interaksi AR</p>
                <h3 className="text-3xl font-extrabold text-white">{stats.ar}</h3>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#121829] p-6 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-amber-500/10">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-amber-500/10 blur-3xl"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30">
                <History className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Interaksi Sejarah</p>
                <h3 className="text-3xl font-extrabold text-white">{stats.history}</h3>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#121829] p-6 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-fuchsia-500/10">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-fuchsia-500/10 blur-3xl"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-fuchsia-500/20 text-fuchsia-400 ring-1 ring-fuchsia-500/30">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Interaksi Quiz</p>
                <h3 className="text-3xl font-extrabold text-white">{stats.quiz}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Header & Actions */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-2xl bg-[#121829] border border-white/5 p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-[#42bff5]" />
            <h2 className="text-xl font-bold text-white">Log Aktivitas Detail</h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter */}
            <div className="flex items-center gap-2 bg-[#0a0f1c] px-3 py-1.5 rounded-xl border border-white/5">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-transparent text-sm font-medium text-white outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#121829]">Semua Waktu</option>
                <option value="day" className="bg-[#121829]">Hari Ini</option>
                <option value="week" className="bg-[#121829]">Minggu Ini (7 Hari)</option>
                <option value="month" className="bg-[#121829]">Bulan Ini</option>
                <option value="year" className="bg-[#121829]">Tahun Ini</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 bg-[#0a0f1c] px-3 py-1.5 rounded-xl border border-white/5">
              <ArrowUpDown className="h-4 w-4 text-gray-400" />
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="bg-transparent text-sm font-medium text-white outline-none cursor-pointer"
              >
                <option value="newest" className="bg-[#121829]">Terbaru</option>
                <option value="oldest" className="bg-[#121829]">Terlama</option>
                <option value="most_total" className="bg-[#121829]">Total Interaksi Terbanyak</option>
                <option value="most_ar" className="bg-[#121829]">Interaksi AR Terbanyak</option>
                <option value="most_history" className="bg-[#121829]">Interaksi Sejarah Terbanyak</option>
                <option value="most_quiz" className="bg-[#121829]">Interaksi Quiz Terbanyak</option>
              </select>
            </div>

            <button 
              onClick={loadData}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-[#42bff5]/10 px-4 py-2 text-sm font-medium text-[#42bff5] transition-colors hover:bg-[#42bff5]/20 disabled:opacity-50 border border-[#42bff5]/20"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#121829] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="border-b border-white/5 bg-white/[0.02] text-xs uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="px-6 py-5 font-medium">No</th>
                  <th className="px-6 py-5 font-medium">Nama Pengunjung</th>
                  <th className="px-6 py-5 font-medium">Waktu</th>
                  <th className="px-6 py-5 font-medium text-center">Interaksi AR</th>
                  <th className="px-6 py-5 font-medium text-center">Interaksi Sejarah</th>
                  <th className="px-6 py-5 font-medium text-center">Interaksi Quiz</th>
                  <th className="px-6 py-5 font-medium text-center">Total</th>
                  <th className="px-6 py-5 font-medium">Detail Log</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading && sessions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-24 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-4">
                        <RefreshCw className="h-10 w-10 animate-spin text-[#42bff5]" />
                        <p className="text-base">Memuat data secara realtime dari server...</p>
                      </div>
                    </td>
                  </tr>
                ) : sessions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-24 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-4 opacity-60">
                        <Activity className="h-12 w-12" />
                        <p className="text-base">Belum ada data rekaman sesi pengunjung untuk filter ini.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sessions.map((session, index) => (
                    <tr key={session.id} className="transition-colors hover:bg-white/[0.04]">
                      <td className="px-6 py-4 font-medium text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-[15px]">{session.nama}</span>
                          <span className="text-xs text-gray-500">Durasi: {session.durasi}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        <div className="flex flex-col">
                          <span>{session.timestamp ? new Date(session.timestamp).toLocaleDateString('id-ID', {day: '2-digit', month: 'short', year: 'numeric'}) : '-'}</span>
                          <span className="text-xs">{session.timestamp ? new Date(session.timestamp).toLocaleTimeString('id-ID') : '-'}</span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center min-w-[2.5rem] rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 text-cyan-400 font-bold">
                          {session.arCount}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center min-w-[2.5rem] rounded-lg bg-amber-500/10 border border-amber-500/20 px-2 py-1 text-amber-400 font-bold">
                          {session.historyCount}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center min-w-[2.5rem] rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 px-2 py-1 text-fuchsia-400 font-bold">
                          {session.quizCount}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center min-w-[2.5rem] rounded-lg bg-white/10 border border-white/20 px-2 py-1 text-white font-bold">
                          {session.totalCount}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="max-h-[120px] overflow-y-auto pr-2 custom-scrollbar">
                          {session.interactions.length > 0 ? (
                            <ul className="flex flex-col gap-2">
                              {session.interactions.map((i: any, idx: number) => {
                                const typeStr = (i.type || '').toLowerCase();
                                let label = "Sejarah";
                                let color = "bg-amber-500/20 text-amber-400";
                                
                                if (typeStr.includes('ar')) {
                                  label = "AR";
                                  color = "bg-cyan-500/20 text-cyan-400";
                                } else if (typeStr.includes('quiz')) {
                                  label = "Quiz";
                                  color = "bg-fuchsia-500/20 text-fuchsia-400";
                                }

                                return (
                                  <li key={idx} className="flex flex-wrap items-center gap-2 text-xs">
                                    <span className={`rounded px-2 py-0.5 font-semibold ${color}`}>
                                      {label}
                                    </span>
                                    <span className="text-gray-300 font-medium truncate max-w-[200px]" title={(i.targetId || '').replace(/_/g, ' ')}>
                                      {(i.targetId || '').replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-[10px] text-gray-500 ml-auto whitespace-nowrap">
                                      {i.timestamp ? new Date(i.timestamp).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) : ''}
                                    </span>
                                  </li>
                                )
                              })}
                            </ul>
                          ) : (
                            <span className="text-xs italic text-gray-500">Tidak ada interaksi detail</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
