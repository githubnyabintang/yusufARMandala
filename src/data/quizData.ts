export type QuizQuestion = {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
};

export const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Apa latar belakang utama di balik pembentukan Komando Mandala?",
    options: {
      A: "Kegagalan Perjanjian Bongaya pada abad ke-17",
      B: "Deklarasi Trikora 1961 dan penolakan berulang pihak Belanda atas perundingan damai",
      C: "Pemberontakan militer lokal di Sulawesi Selatan",
      D: "Keterlibatan PBB secara sepihak di Irian Barat",
    },
    correctAnswer: "B",
    explanation: "Pembentukan Komando Mandala merupakan tindak lanjut dari Deklarasi Trikora, yang dipicu oleh penolakan keras Belanda terhadap segala upaya perundingan damai dari Indonesia."
  },
  {
    id: 2,
    question: "Kapan Presiden Soekarno secara resmi mengeluarkan keputusan untuk membentuk Komando Mandala?",
    options: {
      A: "19 Desember 1961",
      B: "1 Mei 1963",
      C: "2 Januari 1962",
      D: "1 Oktober 1962",
    },
    correctAnswer: "C",
    explanation: "Tepat pada tanggal 2 Januari 1962, Presiden Soekarno secara resmi mengeluarkan keputusan pembentukan Komando Mandala."
  },
  {
    id: 3,
    question: "Siapakah tokoh yang diangkat oleh Presiden Soekarno untuk menjadi Panglima Komando Mandala?",
    options: {
      A: "Presiden Soekarno",
      B: "Jenderal Soedirman",
      C: "Mayor Jenderal Soeharto",
      D: "Kapten Andi Aziz",
    },
    correctAnswer: "C",
    explanation: "Sepuluh hari setelah keputusan pembentukan, Presiden Soekarno mengangkat Mayor Jenderal Soeharto sebagai Panglima Komando Mandala."
  },
  {
    id: 4,
    question: "Kota manakah yang ditetapkan sebagai pusat Markas Komando Mandala untuk mengendalikan operasi militer?",
    options: {
      A: "Hollandia",
      B: "Yogyakarta",
      C: "Jakarta",
      D: "Makassar",
    },
    correctAnswer: "D",
    explanation: "Kota Makassar ditetapkan sebagai pusat Markas Komando Mandala, tepatnya berlokasi di Hospitaalweg (Jalan Jenderal Sudirman) yang kini menjadi lahan Monumen Mandala."
  },
  {
    id: 5,
    question: "Apa kepanjangan dari UNTEA, badan administratif sementara bentukan PBB untuk Irian Barat?",
    options: {
      A: "United Nations Temporary Executive Authority",
      B: "United Nations Territorial Executive Alliance",
      C: "United Nations Transition of Eastern Administration",
      D: "United Nations Temporary Expedition Army",
    },
    correctAnswer: "A",
    explanation: "PBB turun tangan sebagai perantara dan membentuk UNTEA (United Nations Temporary Executive Authority) khusus untuk menangani masa transisi."
  },
  {
    id: 6,
    question: "Bagaimana alur penyerahan kekuasaan Irian Barat yang disepakati melalui jalur diplomasi PBB?",
    options: {
      A: "Belanda menyerahkan langsung ke Indonesia",
      B: "Belanda menyerahkan ke UNTEA, lalu UNTEA menyerahkan ke Indonesia",
      C: "PBB menyerahkan ke Belanda, lalu Belanda ke Indonesia",
      D: "Indonesia menyerahkan ke UNTEA untuk diputuskan PBB",
    },
    correctAnswer: "B",
    explanation: "Alur kesepakatannya adalah Belanda harus menyerahkan Irian Barat kepada UNTEA terlebih dahulu, setelah masa perantara selesai, barulah UNTEA menyerahkannya ke Indonesia."
  },
  {
    id: 7,
    question: "Dalam Diorama Upaya Diplomasi, suasana apa yang divisualisasikan untuk merekam momen sejarah tersebut?",
    options: {
      A: "Pengibaran bendera Merah Putih di lapangan Hollandia",
      B: "Rapat warga di sebuah ruangan berseng merah",
      C: "Penandatanganan dokumen oleh dua delegasi di atas meja berlapis kain hijau",
      D: "Pidato Presiden Soekarno di hadapan ribuan rakyat",
    },
    correctAnswer: "C",
    explanation: "Diorama diplomasi merekam suasana formal penandatanganan dokumen di meja berlapis kain hijau oleh para delegasi yang disaksikan dari balik pembatas."
  },
  {
    id: 8,
    question: "Perubahan taktik apa yang ditunjukkan oleh pasukan Indonesia pada masa Operasi Mandala?",
    options: {
      A: "Dari operasi militer modern ke perang gerilya tradisional",
      B: "Berfokus sepenuhnya pada jalur diplomasi tanpa militer",
      C: "Dari perang gerilya tradisional regional menjadi operasi militer modern terintegrasi nasional",
      D: "Bertahan di markas Makassar tanpa penyerangan langsung",
    },
    correctAnswer: "C",
    explanation: "Sejarah mencatat evolusi pertahanan dari perang gerilya tradisional berskala regional menjadi operasi militer modern terintegrasi nasional di bawah satu komando utama."
  },
  {
    id: 9,
    question: "Apa nama peta taktis yang digunakan untuk merancang dan memandu pergerakan operasi pembebasan Irian Barat?",
    options: {
      A: "Peta Operasi Trikora",
      B: "Peta Operasi Djayawidjaya",
      C: "Peta Operasi Mandala",
      D: "Peta Operasi Hollandia",
    },
    correctAnswer: "B",
    explanation: "Strategi pergerakan taktis pasukan dipandu secara khusus menggunakan Peta Operasi Djayawidjaya."
  },
  {
    id: 10,
    question: "Apa tujuan utama diadakannya pertemuan Penentuan Pendapat Rakyat (Pepera)?",
    options: {
      A: "Mendeklarasikan Trikora di hadapan rakyat",
      B: "Secara langsung mendengarkan suara dan pendapat rakyat Irian Barat",
      C: "Menyepakati gencatan senjata dengan Belanda",
      D: "Membentuk badan perantara PBB di Papua",
    },
    correctAnswer: "B",
    explanation: "Pepera diadakan dengan tujuan untuk secara langsung mendengarkan suara dan pendapat rakyat Irian Barat mengenai kesediaan mereka bergabung ke Republik Indonesia tanpa paksaan."
  }
];
