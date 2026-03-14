# Product Requirements Document (PRD) - Web Frontend SD Inpres Iligetan

Dokumen ini menjabarkan pedoman Frontend menggunakan **Next.js**, **Tailwind CSS**, dan **Supabase SDK** untuk menghasilkan antarmuka **SD Inpres Iligetan** yang sama persis secara visual dengan referensi desain yang disetujui, serta menjamin kecepatan loading instan.

---

## 1. Teknologi Frontend & Integrasi
*   **Web Framework:** Next.js (App Router / Pages Router via SSG).
*   **BaaS SDK:** `@supabase/supabase-js`.
*   **Styling:** Tailwind CSS (dengan utilitas custom color untuk *matching* warna biru, hijau, oranye pada mockup desain).
*   **Ikonografi:** Lucide React / FontAwesome (untuk ikon telepon, email, socmed, dan fasilitas bulat).

---

## 2. Guideline UI Berdasarkan Referensi Desain
Sisi frontend wajib mereplikasi struktur beranda berikut dengan kesetiaan desain (Pixel-perfect approach):

1.  **Top Bar:**
    *   Warna latar belakang (Background): Biru Tua / Navy (`bg-blue-950`).
    *   Teks & Ikon: Putih (`text-white`).
    *   Kiri: Ikon Telepon + Teks Nomor, Ikon Amplop + Teks Email.
    *   Kanan: Ikon FB, Twitter, YouTube, dan CTA Button "DAFTAR" bercorak garis batas / *outline* putih berlatar biru cerah.
2.  **Navigation Header:**
    *   *Sticky header* putih (`bg-white shadow-sm`).
    *   Logo SD Inpres Iligetan sejajar kiri.
    *   Menu Navigation horisontal sejajar kanan (`Beranda | Profil | Fasilitas | Ekstrakurikuler | Informasi | Galeri | Kontak`) disertai efek *hover* teks berubah warna oranye atau kebiruan.
3.  **Hero Slider & Banner:**
    *   Menampilkan foto sampul sekolah berdesain *edge-to-edge*.
    *   Tipografi tebal putih *drop-shadow* di tengah kiri gambar, dengan CTA Button biru ("LIHAT SELENGKAPNYA").
    *   Terdapat navigasi panah putih bulat (Arrow Kiri/Kanan) di ujung foto.
4.  **3 Boxes (Callouts):**
    *   Tata letak Grid 3 kolom memeluk erat bagian bawah *Hero Slider* (gunakan CSS margin negatif top agar menimpa foto).
    *   Setiap kotak memiliki *padding* seragam, judul huruf tebal, dan teks paragraf.
    *   Palet Kotak 1: Hijau Lime.
    *   Palet Kotak 2: Oranye kemerahan.
    *   Palet Kotak 3: Biru Langit cerah.
5.  **Section Prakata Kepala Sekolah:**
    *   Latar belakang: Abu-abu sangat muda / *Off-white* (`bg-gray-50`).
    *   Grid 2 Kolom (1/3 Foto, 2/3 Teks).
    *   Judul bergaris bawah (*underline*) atau ber-ikon toga wisuda (seperti referensi).
    *   Foto Kepala Sekolah menggunakan bingkai natural / persegi panjang biasa.
6.  **Section Fasilitas (4 Kolom):**
    *   Ikon berbentuk sirkular dengan border garis warna (Outline Oranye).
    *   Teks Judul rata tengah (*center-aligned*).
    *   Teks deskripsi *muted* (`text-gray-500`) berukuran lebih kecil.

---

## 3. Fitur Pencetakan Khusus Form (A4 Print-Out) 🖨️
Fasilitas cetak Dokumen PPDB SD Inpres Iligetan:
1.  **Standarisasi Ukuran A4 (@page CSS):** 
    Menyisipkan rule CSS untuk layout print monokromatik (hanya tabel, foto pass, barcode, dan header KOP Surat SD).
2.  **Supabase Storage Handling:** Menarik pas foto siswa dari Private Bucket menggunakan token temporal dari Supabase untuk dilekatkan ke halaman cetak laporan A4.

---

## 4. Dashboard Admin CMS (Tampilan Client)
*   **Kostumisasi Landing Page Dinamis:** Admin melalui CMS (Admin Dashboard) bisa mengganti isi teks 3 *Callout Box*, mengganti foto dan kata sambutan Kepala sekolah, serta mengatur teks Fitur (4 ikon) tanpa pengkodean ulang (Data diambil dari tabel `homepage_settings` Supabase).
*   **Manajemen PPDB:** UI tabel pengelola antrean PPDB dengan filter cetak massal berdasarkan Status Seleksi.
