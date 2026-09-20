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
  },
  {
    id: 11,
    question: "Apa latar belakang utama dibentuknya Komando Mandala?",
    options: {
      A: "Menghadapi konflik dengan Malaysia",
      B: "Mempersiapkan operasi pembebasan Irian Barat dari kekuasaan Belanda",
      C: "Mengamankan wilayah perbatasan Indonesia bagian barat",
      D: "Membentuk pasukan perdamaian Indonesia",
    },
    correctAnswer: "B",
    explanation: "Mempersiapkan operasi pembebasan Irian Barat dari kekuasaan Belanda."
  },
  {
    id: 12,
    question: "Kapan Presiden Soekarno secara resmi mengeluarkan keputusan untuk membentuk Komando Mandala?",
    options: {
      A: "19 Desember 1961",
      B: "2 Januari 1962",
      C: "11 Januari 1962",
      D: "15 Agustus 1962",
    },
    correctAnswer: "C",
    explanation: "11 Januari 1962."
  },
  {
    id: 13,
    question: "Siapakah tokoh yang diangkat oleh Presiden Soekarno untuk menjadi Panglima Komando Mandala?",
    options: {
      A: "Jenderal A.H. Nasution",
      B: "Mayjen Soeharto",
      C: "Jenderal Gatot Subroto",
      D: "Laksamana R.E. Martadinata",
    },
    correctAnswer: "B",
    explanation: "Mayjen Soeharto."
  },
  {
    id: 14,
    question: "Kota manakah yang ditetapkan sebagai pusat markas Komando Mandala untuk mengendalikan operasi pembebasan Irian Barat?",
    options: {
      A: "Jakarta",
      B: "Surabaya",
      C: "Biak",
      D: "Makassar",
    },
    correctAnswer: "D",
    explanation: "Makassar."
  },
  {
    id: 15,
    question: "Apa kepanjangan dari UNTEA, badan administratif sementara bentukan PBB untuk Irian Barat?",
    options: {
      A: "United Nations Temporary Executive Authority",
      B: "United Nations Territorial Executive Administration",
      C: "United Nations Temporary Emergency Authority",
      D: "United Nations Territory Executive Agency",
    },
    correctAnswer: "A",
    explanation: "United Nations Temporary Executive Authority."
  },
  {
    id: 16,
    question: "Bagaimana alur penyerahan kekuasaan Irian Barat yang disepakati melalui jalur diplomasi PBB?",
    options: {
      A: "Belanda langsung menyerahkan Irian Barat kepada Indonesia",
      B: "Belanda menyerahkan administrasi kepada UNTEA, kemudian UNTEA menyerahkannya kepada Indonesia",
      C: "Indonesia menyerahkan Irian Barat kepada PBB untuk selamanya",
      D: "PBB menyerahkan Irian Barat kepada Belanda sebelum Indonesia mengambil alih",
    },
    correctAnswer: "B",
    explanation: "Belanda menyerahkan administrasi kepada UNTEA, kemudian UNTEA menyerahkannya kepada Indonesia."
  },
  {
    id: 17,
    question: "Dalam diorama upaya diplomasi, suasana apa yang divisualisasikan untuk merekam momen sejarah tersebut?",
    options: {
      A: "Suasana perundingan diplomatik Indonesia dan Belanda",
      B: "Suasana latihan pasukan Komando Mandala",
      C: "Suasana pertempuran di Irian Barat",
      D: "Suasana pembacaan Proklamasi Kemerdekaan",
    },
    correctAnswer: "A",
    explanation: "Suasana perundingan diplomatik Indonesia dan Belanda."
  },
  {
    id: 18,
    question: "Apa nama peta taktis yang digunakan untuk merancang dan memandu pergerakan operasi pembebasan Irian Barat?",
    options: {
      A: "Peta Operasi Trikora",
      B: "Peta Strategi Nusantara",
      C: "Peta Operasi Jayawijaya",
      D: "Peta Komando Indonesia Timur",
    },
    correctAnswer: "C",
    explanation: "Peta Operasi Jayawijaya."
  },
  {
    id: 19,
    question: "Apa tujuan utama diadakannya Penentuan Pendapat Rakyat (Pepera)?",
    options: {
      A: "Menentukan batas wilayah Indonesia dan Belanda",
      B: "Menentukan status Irian Barat melalui perwakilan rakyatnya",
      C: "Menentukan panglima baru Komando Mandala",
      D: "Menentukan lokasi markas PBB di Irian Barat",
    },
    correctAnswer: "B",
    explanation: "Menentukan status Irian Barat melalui perwakilan rakyatnya."
  },
  {
    id: 20,
    question: "Apa nama operasi yang menjadi bagian dari strategi militer Indonesia dalam upaya pembebasan Irian Barat?",
    options: {
      A: "Operasi Trikora",
      B: "Operasi Dwikora",
      C: "Operasi Seroja",
      D: "Operasi Jayakarta",
    },
    correctAnswer: "A",
    explanation: "Operasi Trikora."
  },
  {
    id: 21,
    question: "Siapakah yang mencetuskan Tri Komando Rakyat (Trikora) dalam perjuangan pembebasan Irian Barat?",
    options: {
      A: "Jenderal Soedirman",
      B: "Presiden Soekarno",
      C: "Jenderal A.H. Nasution",
      D: "Mayjen Soeharto",
    },
    correctAnswer: "B",
    explanation: "Presiden Soekarno."
  },
  {
    id: 22,
    question: "Di kota manakah Tri Komando Rakyat (Trikora) dikumandangkan oleh Presiden Soekarno?",
    options: {
      A: "Jakarta",
      B: "Surabaya",
      C: "Yogyakarta",
      D: "Makassar",
    },
    correctAnswer: "A",
    explanation: "Jakarta."
  },
  {
    id: 23,
    question: "Kapan Tri Komando Rakyat (Trikora) dikumandangkan?",
    options: {
      A: "17 Agustus 1960",
      B: "19 Desember 1961",
      C: "11 Januari 1962",
      D: "1 Mei 1963",
    },
    correctAnswer: "B",
    explanation: "19 Desember 1961."
  },
  {
    id: 24,
    question: "Apa salah satu isi utama Tri Komando Rakyat (Trikora)?",
    options: {
      A: "Membentuk negara baru di Irian Barat",
      B: "Menggagalkan pembentukan negara Papua buatan Belanda",
      C: "Membentuk pemerintahan sementara PBB",
      D: "Mengakhiri hubungan diplomatik dengan seluruh negara Barat",
    },
    correctAnswer: "B",
    explanation: "Menggagalkan pembentukan negara Papua buatan Belanda."
  },
  {
    id: 25,
    question: "Apa nama perjanjian yang menjadi dasar diplomatik penyelesaian sengketa Irian Barat antara Indonesia dan Belanda pada tahun 1962?",
    options: {
      A: "Perjanjian Linggarjati",
      B: "Perjanjian Renville",
      C: "Perjanjian New York",
      D: "Perjanjian Roem-Royen",
    },
    correctAnswer: "C",
    explanation: "Perjanjian New York."
  },
  {
    id: 26,
    question: "Kapan Perjanjian New York antara Indonesia dan Belanda ditandatangani?",
    options: {
      A: "19 Desember 1961",
      B: "11 Januari 1962",
      C: "15 Agustus 1962",
      D: "1 Mei 1963",
    },
    correctAnswer: "C",
    explanation: "15 Agustus 1962."
  },
  {
    id: 27,
    question: "Siapakah diplomat Amerika Serikat yang berperan sebagai mediator dalam perundingan Indonesia dan Belanda mengenai Irian Barat?",
    options: {
      A: "Dean Rusk",
      B: "Ellsworth Bunker",
      C: "John F. Kennedy",
      D: "Henry Kissinger",
    },
    correctAnswer: "B",
    explanation: "Ellsworth Bunker."
  },
  {
    id: 28,
    question: "Pada tanggal berapakah administrasi Irian Barat secara resmi diserahkan dari Belanda kepada UNTEA?",
    options: {
      A: "15 Agustus 1962",
      B: "1 Oktober 1962",
      C: "31 Desember 1962",
      D: "1 Mei 1963",
    },
    correctAnswer: "B",
    explanation: "1 Oktober 1962."
  },
  {
    id: 29,
    question: "Pada tanggal berapakah UNTEA menyerahkan administrasi Irian Barat kepada Indonesia?",
    options: {
      A: "1 Januari 1963",
      B: "15 April 1963",
      C: "1 Mei 1963",
      D: "17 Agustus 1963",
    },
    correctAnswer: "C",
    explanation: "1 Mei 1963."
  },
  {
    id: 30,
    question: "Apa fungsi utama UNTEA selama masa peralihan di Irian Barat?",
    options: {
      A: "Menggantikan pemerintahan Indonesia secara permanen",
      B: "Mengelola administrasi Irian Barat selama masa peralihan",
      C: "Membentuk negara merdeka di Irian Barat",
      D: "Menjadi pasukan tempur Indonesia",
    },
    correctAnswer: "B",
    explanation: "Mengelola administrasi Irian Barat selama masa peralihan."
  },
  {
    id: 31,
    question: "Apa nama pasukan keamanan PBB yang ditempatkan di Irian Barat untuk membantu UNTEA?",
    options: {
      A: "UNSF",
      B: "UNIFIL",
      C: "UNPROFOR",
      D: "UNEF",
    },
    correctAnswer: "A",
    explanation: "UNSF."
  },
  {
    id: 32,
    question: "Apa kepanjangan dari UNSF yang bertugas membantu menjaga keamanan selama masa peralihan di Irian Barat?",
    options: {
      A: "United Nations Security Force",
      B: "United Nations Special Federation",
      C: "United Nations Strategic Force",
      D: "United Nations Security Federation",
    },
    correctAnswer: "A",
    explanation: "United Nations Security Force."
  },
  {
    id: 33,
    question: "Strategi utama Komando Mandala dalam pelaksanaan operasi pembebasan Irian Barat terdiri atas tiga tahap. Apa urutan tahap tersebut?",
    options: {
      A: "Diplomasi, infiltrasi, dan konsolidasi",
      B: "Infiltrasi, eksploitasi, dan konsolidasi",
      C: "Eksploitasi, diplomasi, dan infiltrasi",
      D: "Konsolidasi, diplomasi, dan eksploitasi",
    },
    correctAnswer: "B",
    explanation: "Infiltrasi, eksploitasi, dan konsolidasi."
  },
  {
    id: 34,
    question: "Apa tujuan utama dibangunnya Monumen Mandala di Kota Makassar?",
    options: {
      A: "Memperingati perjuangan dan keberhasilan pembebasan Irian Barat",
      B: "Memperingati pembentukan Provinsi Sulawesi Selatan",
      C: "Mengenang perjuangan kemerdekaan Indonesia tahun 1945",
      D: "Memperingati berdirinya Kota Makassar",
    },
    correctAnswer: "A",
    explanation: "Memperingati perjuangan dan keberhasilan pembebasan Irian Barat."
  },
  {
    id: 35,
    question: "Mengapa Kota Makassar memiliki kaitan penting dengan sejarah pembebasan Irian Barat?",
    options: {
      A: "Makassar menjadi tempat berdirinya pemerintahan Belanda di Irian Barat",
      B: "Makassar menjadi pusat Markas Komando Mandala dalam mempersiapkan dan mengendalikan operasi pembebasan Irian Barat",
      C: "Makassar menjadi tempat pelaksanaan Pepera",
      D: "Makassar menjadi markas utama UNTEA",
    },
    correctAnswer: "B",
    explanation: "Makassar menjadi pusat Markas Komando Mandala dalam mempersiapkan dan mengendalikan operasi pembebasan Irian Barat."
  }
];
