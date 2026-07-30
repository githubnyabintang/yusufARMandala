# Pengenalan Objek Museum Monumen Mandala

Web ini adalah antarmuka edukasi interaktif untuk aplikasi Pengenalan Objek Museum Monumen Mandala. Proyek ini dibuat sebagai UI WebView yang nantinya dimuat di dalam Unity, sehingga pengalaman pengguna dapat menggabungkan tampilan web yang ringan dengan fitur Scan AR yang dikerjakan di sisi Unity.

Repositori ini berfokus pada bagian web: halaman beranda, navigasi fitur, kuis sejarah, hasil kuis, informasi monumen, animasi transisi, dan bridge pemanggilan fitur AR dari WebView ke Unity.

## Status Proyek

Bagian web telah tersedia dan siap digunakan sebagai WebView Unity.

- Beranda aplikasi: selesai
- Tombol Scan AR: siap dan aman untuk integrasi WebView Unity
- Kuis sejarah interaktif: selesai
- Halaman hasil kuis: selesai, termasuk kategori skor dan tampilan skor premium
- Informasi Monumen Mandala: selesai
- Splash screen dan transisi antar fitur: selesai
- Sound effect interaksi dan kuis: selesai

Catatan penting: rangkaian Scan AR telah diselesaikan oleh pengembang di sisi Unity. Di dalam web ini, tombol Scan AR bertugas sebagai trigger/bridge untuk memanggil scene atau fitur AR di Unity. Karena target akhirnya adalah WebView di Unity, perilaku tersebut memang tidak berdiri sendiri seperti kamera AR browser biasa.

## Fitur Web

### 1. Beranda

Halaman awal menampilkan identitas Monumen Mandala dan pilihan fitur utama:

- Mulai Pindai AR
- Quiz
- Informasi Monumen

Tombol "Mulai Pindai AR" memanggil:

```ts
window.Unity.call("LoadVirtualTourScene")
```

Pemanggilan ini hanya berjalan ketika web berada di dalam environment Unity yang menyediakan objek `window.Unity`. Jika dibuka melalui browser biasa, aplikasi tetap aman karena pemanggilan Unity dibungkus pengecekan dan error handling.

### 2. Scan AR

Scan AR dikerjakan di sisi Unity. Web ini menyediakan pintu masuk dari UI WebView menuju rangkaian AR tersebut.

Alur yang disiapkan:

1. Pengguna membuka aplikasi Unity.
2. Unity menampilkan UI web ini melalui WebView.
3. Pengguna menekan tombol "Mulai Pindai AR".
4. Web memanggil bridge Unity.
5. Unity memuat fitur/scene Scan AR.

Dengan pendekatan ini, web tidak mengambil alih kamera atau marker AR. Kamera, sensor, tracking, dan rendering AR tetap berada di Unity.

### 3. Kuis Sejarah

Kuis berisi 10 pertanyaan pilihan ganda tentang sejarah Monumen Mandala dan Pembebasan Irian Barat.

Fitur kuis:

- Pertanyaan pilihan ganda A-D
- Progress pertanyaan
- Feedback benar/salah
- Penjelasan setelah menjawab
- Animasi transisi antar pertanyaan
- Efek confetti untuk jawaban benar
- Efek visual untuk jawaban salah
- Sound effect untuk klik, pilihan jawaban, benar, salah, dan hasil akhir

Data pertanyaan berada di:

```text
src/data/quizData.ts
```

### 4. Hasil Kuis

Halaman hasil kuis menampilkan skor akhir dengan tampilan yang lebih premium dan tidak mengulang informasi skor.

Struktur tampilan hasil:

- Label kecil "Skor Akhir"
- Skor utama, contoh `90/100`
- Badge kategori hasil
- Progress bar
- Jumlah jawaban benar
- Pesan apresiasi atau motivasi
- Tombol kembali ke beranda
- Tombol ulangi kuis
- Tombol jelajahi koleksi lain

Kategori skor:

| Skor | Judul | Pesan |
| --- | --- | --- |
| 100/100 | SELAMAT! | Kamu menjawab semua pertanyaan dengan benar. |
| 90/100 | HAMPIR SEMPURNA! | Pemahamanmu sangat kuat, tinggal sedikit lagi. |
| 70-80/100 | HEBAT! | Kamu sudah memahami sebagian besar materi. |
| 50-60/100 | CUKUP BAIK! | Dasarmu sudah ada, ayo perkuat lagi. |
| 0-40/100 | SEMANGAT! | Coba ulangi kuis untuk mengenal materinya lebih dalam. |

### 5. Informasi Monumen

Halaman Informasi Monumen berisi konten edukasi tentang Museum Monumen Mandala Pembebasan Irian Barat.

Tab informasi:

- Sejarah
- Bangunan
- Fakta
- Pelayanan

Konten yang ditampilkan:

- Identitas dan lokasi monumen
- Jejak sejarah tapak dan pendirian
- Timeline era kolonial, pusat komando, dan pembangunan monumen
- Arsitektur eksterior dan simbolisme bangunan
- Katalog koleksi unggulan
- Jelajah interior per lantai
- Jam operasional
- Harga tiket
- Prosedur kunjungan rombongan
- Embed peta lokasi

Data konten berada di:

```text
src/data/monumentDetail.ts
```

### 6. Splash Screen dan Transisi

Aplikasi memiliki beberapa layar transisi untuk membuat pengalaman terasa lebih halus:

- Splash menuju kuis
- Splash kembali ke beranda
- Splash ulangi kuis
- Splash menuju informasi monumen

Komponen terkait:

```text
src/components/QuizSplashScreen.tsx
src/components/HomeSplashScreen.tsx
src/components/RestartSplashScreen.tsx
src/components/InfoSplashScreen.tsx
```

### 7. Sound Effect

Sound effect digunakan untuk memperkuat pengalaman interaktif.

Jenis suara:

- click
- select
- correct
- wrong
- win
- good
- fail

Utilitas audio berada di:

```text
src/utils/sfx.ts
```

## Struktur Folder Penting

```text
src/
  App.tsx
  main.tsx
  index.css
  assets/
    logo.png
    monumen/
      hero.jpg
      alt.jpg
      diorama.jpg
      diorama2.jpg
  components/
    HomeSplashScreen.tsx
    InfoSplashScreen.tsx
    MonumentInfoScreen.tsx
    QuizResultScreen.tsx
    QuizScreen.tsx
    QuizSplashScreen.tsx
    RestartSplashScreen.tsx
  data/
    monumentDetail.ts
    quizData.ts
  utils/
    sfx.ts
```

Folder referensi desain:

```text
hasil_kuis/
jawaban_benar/
kuis_sejarah/
tentang_monumen/
```

## Teknologi

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Motion
- Unity WebView integration

## Integrasi Unity WebView

Web ini dirancang untuk dimuat di Unity menggunakan WebView. Integrasi yang relevan ada pada fungsi tombol Scan AR di `src/App.tsx`.

Deklarasi global:

```ts
declare global {
  interface Window {
    Unity?: {
      call: (message: string) => void;
    };
  }
}
```

Trigger AR:

```ts
if (typeof window !== "undefined" && window.Unity) {
  window.Unity.call("LoadVirtualTourScene");
}
```

Dengan desain ini, web tetap dapat dibuka untuk pengembangan UI di browser, sementara fitur AR berjalan ketika web berada di dalam WebView Unity.

## Cara Menjalankan Lokal

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Secara default aplikasi berjalan di:

```text
http://localhost:3000
```

Build production:

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview
```

Typecheck:

```bash
npm run lint
```

## Catatan Pengembangan

- UI web ini siap dipakai sebagai lapisan antarmuka di Unity WebView.
- Scan AR tidak dijalankan oleh browser web ini secara langsung.
- Bridge `window.Unity.call("LoadVirtualTourScene")` adalah titik perpindahan dari web menuju fitur AR Unity.
- Saat dibuka di browser biasa, tombol AR tidak merusak aplikasi karena sudah memiliki pengecekan environment Unity.
- Seluruh konten kuis dan informasi monumen dapat diperbarui melalui file data TypeScript di folder `src/data`.

