# Product Requirements Document (PRD) - Website SD Inpres Iligetan & PPDB Online (High Performance)

Dokumen ini mendefinisikan kebutuhan sistem, fitur, dan spesifikasi teknologi untuk pembuatan website **SD Inpres Iligetan** dan portal Penerimaan Peserta Didik Baru (PPDB) Online. 

Sistem ini dirancang khusus agar **mudah diakses, memiliki kecepatan muat (loading) yang sangat cepat, dan mampu menangani ribuan pengunjung (high concurrency)** secara bersamaan, terutama saat musim PPDB. Semua penyimpanan data dan file akan dikelola menggunakan **Supabase**.

---

## 1. Referensi Desain & Layout Utama (Berdasarkan Mockup)
Website akan mengadopsi struktur visual yang spesifik sesuai referensi desain:
*   **Top Bar (Bilah Atas):** Berwarna biru gelap, memuat Nomor Telepon, Email, Ikon Media Sosial (FB, Twitter, YouTube), dan Tombol CTA "DAFTAR" dengan aksen mencolok.
*   **Header Utama:** Berwarna putih bersih, memuat Logo **SD Inpres Iligetan** di sebelah kiri, dan Navigasi Menu di sebelah kanan.
*   **Struktur Menu:** Beranda, Profil, Fasilitas, Ekstrakurikuler, Informasi (Berita/Pengumuman), Galeri, Kontak.
*   **Hero Section (Slider Utama):** Gambar *full-width* dengan *overlay* gelap, teks judul besar (contoh: "INFORMASI PPDB SD INPRES ILIGETAN TAHUN 2026"), dan tombol "LIHAT SELENGKAPNYA".
*   **3 Kotak Keunggulan (Features Box):** Letaknya menimpa/menempel di bawah margin gambar hero. Tiga kolom blok warna solid (misal Hijau, Oranye, Biru) berisi poin keunggulan sekolah (contoh: "Sekolah Berbasis Komunitas", "Berprestasi", "Berdaya Saing").
*   **Prakata Kepala Sekolah:** Layout *Side-by-side*. Sisi kiri menampilkan foto Kepala Sekolah (standing/berpidato), sisi kanan berisi teks judul "PRAKATA KEPALA SEKOLAH", sambutan singkat, dan tombol "View More".
*   **Fasilitas / Nilai Jual:** Menggunakan layout 4 kolom minimalis dengan ikon bulat, judul fitur (contoh: "Gedung Milik Sendiri", "Tenaga Pendidik Berkompeten", "Bebas Biaya SPP", "Fasilitas Lengkap"), dan teks deskripsi abu-abu.

---

## 2. Sinkronisasi Arsitektur & Tech Stack Terbaik
*   **Frontend (Web & Admin): Next.js (React)** - Mendukung **SSG (Static Site Generation)**.
*   **Styling: Tailwind CSS** - Eksekusi desain dengan layout grid/flexbox yang persis sama dengan mockup.
*   **Backend as a Service & Database: Supabase** - PostgreSQL, Autentikasi, Storage.

---

## 3. Rincian Fitur Minimum Viable Product (MVP)

### A. Konten Publik (Frontend SD Inpres Iligetan)
1.  **Beranda (Home) 🏠:** Tersusun atas urutan *section* sesuai referensi desain di atas (Top Bar, Header, Hero Slider, 3 Box Info, Prakata Kepsek, Fasilitas 4 Kolom).
2.  **Profil Sekolah 📘:** Sejarah, Visi, Misi, Profil Kepala Sekolah, dan NPSN.
3.  **Data Guru & Siswa 👨‍🏫:** Daftar tenaga pengajar, jumlah siswa per kelas.
4.  **Fasilitas & Galeri 🏫:** Album foto kegiatan (menggunakan teknik *Lazy Loading* dari URL CDN Supabase Storage).
5.  **Informasi (Berita & Pengumuman) 📰:** Blog kegiatan dan liputan informasi SD Inpres Iligetan.
6.  **Download 📂:** Area unduh file (Kalender Pendidikan, Brosur PPDB).
7.  **Kontak Sekolah 📞:** Alamat, Google Maps iframe, dan Form Kirim Pesan (tersimpan di Supabase).

### B. Portal PPDB Online 📝
1.  **Informasi Pra-Pendaftaran:** Syarat dan jadwal.
2.  **Formulir Pendaftaran Online (Multi-step):** Data Diri, Data Ortu, TPA (opsional untuk SD), Upload Berkas.
3.  **Upload Berkas Aman:** Akta Kelahiran, KK, Foto/Scan diunggah ke *Supabase Storage Bucket*.
4.  **Cetak Bukti Pendaftaran (A4) 🖨️:** Fitur *print-out* A4 khusus.
5.  **Pengumuman Seleksi:** Cek kelulusan dengan memasukkan Nomor Induk.

### C. Dashboard Admin 🔐
Panel manajemen konten (Supabase Auth). Mengelola slider, artikel, data PPDB, mengubah teks Prakata Kepala Sekolah, serta mengubah ikon/teks bagian fasilitas & 3 kotak keunggulan dari panel admin tanpa menyentuh *source code*.
