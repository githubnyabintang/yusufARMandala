import heroImg from '../assets/monumen/hero.jpg';
import altImg from '../assets/monumen/alt.jpg';
import dioramaImg from '../assets/monumen/diorama.jpg';
import diorama2Img from '../assets/monumen/diorama2.jpg';

export const monumentDetail = {
  sejarah: {
    identitas: {
      title: "Identitas dan Lokasi Monumen",
      description: "Meresapi jejak patriotisme bangsa dimulai dengan memahami identitas resmi Monumen Mandala sebagai pusat edukasi sejarah di timur Indonesia.",
      image: altImg,
      details: [
        { label: "Nama Resmi", value: "Museum Monumen Mandala Pembebasan Irian Barat" },
        { label: "Nomor Pendaftaran", value: "73.71.K.03.0161" },
        { label: "Kategori", value: "Museum Khusus – Tipe C (Fokus pada narasi sejarah perjuangan)" },
        { label: "Alamat Lengkap", value: "Jl. Jenderal Sudirman No. 2, Makassar, Sulawesi Selatan." },
      ],
      navigasi: [
        "Dari Pelabuhan Soekarno Hatta: ± 3,3 km",
        "Dari Terminal Mallengkeri: ± 7,8 km",
        "Dari Terminal Cappa Buda: ± 12,1 km",
        "Dari Bandara Internasional Sultan Hasanuddin: ± 20,7 km"
      ]
    },
    jejakTapak: {
      title: "Jejak Sejarah Tapak dan Pendirian",
      description: "Transformasi lahan monumen ini adalah saksi bisu peralihan kekuasaan dan pusat komando strategi nasional yang sangat krusial.",
      image: heroImg,
      timeline: [
        {
          period: "Era Kolonial (1876-1946)",
          desc: "Lahan ini memiliki akar sejarah sejak 1876 sebagai kweekschool atau sekolah guru Belanda. Pada tahun 1946, fungsinya beralih menjadi Markas Angkatan Laut Kerajaan Belanda (Hoofdkwartier van de Koninklijke)."
        },
        {
          period: "Pusat Komando (1962)",
          desc: "Pada 2 Januari 1962, tempat ini bertransformasi menjadi Markas Komando Mandala di bawah kepemimpinan Mayor Jenderal Soeharto. Di sinilah seruan patriotik bergema: \"Rebut Irian Barat sebelum ayam berkokok!\"",
          trikora: [
            "Gagalkan pembentukan negara boneka Papua buatan Belanda.",
            "Kibarkan Sang Merah Putih di Irian Barat, tanah air Indonesia.",
            "Bersiaplah untuk mobilisasi umum guna mempertahankan kemerdekaan dan kesatuan tanah air dan bangsa."
          ]
        },
        {
          period: "Pembangunan Monumen (1994-1995)",
          desc: "Diprakarsai oleh Gubernur Sulawesi Selatan, H.A. Zaenal Basri Palaguna, pada tahun 1994.",
          events: [
            "11 Januari 1994: Peletakan batu pertama oleh Soesilo Soedarman (Menko Polkam).",
            "19 Desember 1995: Peresmian agung oleh Presiden Soeharto, bertepatan dengan hari peringatan Trikora."
          ]
        }
      ]
    }
  },
  bangunan: {
    arsitektur: {
      title: "Arsitektur Eksterior dan Simbolisme",
      image: heroImg,
      items: [
        {
          name: "Bentuk Segitiga Sama Sisi",
          desc: "Representasi visual dari Tiga Komando Rakyat (Trikora)."
        },
        {
          name: "Ketinggian Menara",
          desc: "Tinggi total 75m melambangkan tahun integrasi Irian Barat (1975); Menara pengawas 62m menyimbolkan tahun kemenangan 1962."
        },
        {
          name: "Relief Lidah Api",
          desc: "Simbol semangat perjuangan Trikora yang terus menyala dan tidak kunjung padam."
        },
        {
          name: "27 Patung Bambu Runcing",
          desc: "Pengingat akan instrumen perjuangan fisik rakyat Indonesia yang gigih."
        },
        {
          name: "Kolam di Sekeliling Menara",
          desc: "Melambangkan kejernihan berpikir dalam merancang strategi bangsa."
        },
        {
          name: "Harde (Puncak Menara)",
          desc: "Selain sebagai penangkal petir, ia adalah simbol cita-cita luhur bangsa."
        }
      ]
    },
    katalog: {
      title: "Katalog Koleksi Unggulan",
      image: diorama2Img,
      items: [
        { name: "Patung Replika Panglima Mandala", desc: "Centerpiece installation figur kepemimpinan operasi." },
        { name: "Peta Operasi Djayawidjaya", desc: "Dokumen visual jalur gerak taktis pasukan menuju Irian Barat." },
        { name: "Foto Kapal Armada Laut", desc: "Dokumentasi armada tempur laut Indonesia (Kapal Cepat Torpedo & Kapal Selam) yang legendaris." },
        { name: "Diorama Pepera", desc: "Visualisasi momen krusial saat rakyat Irian Barat memilih untuk bersatu dengan NKRI." }
      ]
    }
  },
  fakta: {
    interior: {
      title: "Jelajah Interior: Tour Digital Per Lantai",
      floors: [
        {
          name: "Lantai 1",
          title: "Penghormatan Mendalam Patriotisme Lokal",
          desc: "Saksikan kemegahan patung Sultan Hasanuddin dengan relief emas. Terdapat 12 diorama sejarah perjuangan di Sulawesi, 3 relief adegan masa lalu, serta 9 replika pakaian pejuang dari abad ke-XVII hingga XVIII.",
          image: dioramaImg
        },
        {
          name: "Lantai 2",
          title: "Palagan Pembebasan Irian Barat",
          desc: "Meresapi 12 diorama spesifik perebutan Irian Barat. Narasi keterlibatan internasional melalui UNTEA/PBB serta ruang pertemuan yang merepresentasikan perjuangan diplomasi.",
          image: diorama2Img
        },
        {
          name: "Lantai 3",
          title: "Reconstructed Historical Environment",
          desc: "Menyajikan replika ruang kerja Mayor Jenderal Soeharto sebagai Panglima Mandala. Dilengkapi peta strategis, tanda jabatan asli, foto pasukan, dan replika pakaian tentara Operasi Mandala.",
          image: dioramaImg
        },
        {
          name: "Lantai 4",
          title: "Ruang Pandang Observasi",
          desc: "Naik ke lantai tertinggi untuk menyaksikan panorama Kota Makassar 360 derajat. Memberikan perspektif modern atas kota yang dulu menjadi markas pergerakan bangsa.",
          image: altImg
        }
      ],
      note: "Catatan Teknis Tata Ruang: Museum ini memiliki karakter tata ruang yang unik namun terbatas. Lebar ruangan berkisar antara 60 cm hingga 4 meter (maksimal 4 orang tiap titik diorama). Pengunjung rombongan diharapkan tertib dalam sirkulasi melingkar."
    }
  },
  pelayanan: {
    title: "Panduan dan Informasi Kunjungan",
    image: altImg,
    info: [
      { label: "Jam Operasional", value: "Setiap hari pukul 08.00 - 16.30 WITA." },
      { label: "Harga Tiket", value: "Rp 10.000 per orang. (Catatan: Biaya tambahan mungkin berlaku untuk penggunaan lift menuju menara pandang)." }
    ],
    prosedur: "Untuk rombongan besar atau kunjungan edukasi sekolah, sangat disarankan menghubungi pihak pengelola terlebih dahulu melalui surat resmi, pesan pribadi di Instagram, atau perwakilan staf di lokasi agar dapat didampingi oleh pemandu (tour guide) yang akan mengomunikasikan narasi sejarah secara menyeluruh.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.805820493014!2d119.41097221476686!3d-5.138804896269929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbf02ae55c917bf%3A0x6739d73d6eb37ec2!2sMonumen%20Mandala!5e0!3m2!1sen!2sid!4v1689000000000!5m2!1sen!2sid"
  }
};
