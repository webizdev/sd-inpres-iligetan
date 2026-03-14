# Product Requirements Document (PRD) - Backend & Database

Dokumen ini memuat arsitektur Backend dan Database **SD Inpres Iligetan** yang dirancang menggunakan **Supabase**. Selain menangani data PPDB yang sensitif, backend juga mengatur data dinamis khusus untuk tata letak halaman beranda yang baru.

---

## 1. Teknologi Backend Terpilih
*   **Database (Primary):** PostgreSQL (Disediakan oleh **Supabase**).
*   **BaaS:** Supabase Auth & Storage.
*   **Backend API Framework:** Next.js Route Handlers (`/app/api/...`) sebagai *BFF (Backend for Frontend)* untuk memproses keamanan ekstra sebelum ke Supabase.
*   **Proyek Spesifik:** Data terhubung ke Supabase ID `webiz_dev`. Prefix tabel `sdii_`.

---

## 2. Struktur Database (Prefix: `sdii_`)

### A. Pengaturan Beranda (`sdii_pengaturan_beranda`)
*   `id` (PK)
*   `setting_key` (Unik, misal: `topbar_phone`, `prakata_img_url`)
*   `setting_value` (Teks / URL gambar)

### B. Guru, Fasilitas & Pengumuman
*   `sdii_guru`: `id`, `nama`, `jabatan`, `foto_url`
*   `sdii_fasilitas`: `id`, `nama`, `deskripsi`, `foto_url`
*   `sdii_pengumuman`: `id`, `title`, `content`

### C. Pendaftaran PPDB SD Inpres Iligetan (`sdii_registrations`)
*   `nomor_pendaftaran` (PK)
*   Biodata lengkap (Nama, TTL, Ortu, Nilai).
*   `file_akta`, `file_kk`, `file_foto` (URL Storage).
*   `status_seleksi`

---

## 3. Fitur Backend Khusus: Upload Gambar & Berkas 📂
Seluruh proses unggah media (Foto Guru, Gambar Fasilitas, Banner Beranda, dan Dokumen PPDB) dialirkan melalui **Backend / API Route** untuk keamanan ekstra:
1.  **Validasi & Kompresi Backend:** API backend akan menerima *form-data*, memvalidasi ekstensi file (hanya gambar/PDF), membatasi ukuran maksimal **1 MB**, dan *opsional* melakukan optimasi gambar di sisi Edge/Server sebelum diteruskan ke Supabase Storage.
2.  **Manajemen Storage (Supabase):**
    *   `sdii_public_assets`: Bucket untuk menyimpan foto yang tampil di website umum (Foto Guru, Fasilitas, Banner). Admin Dashboard bertugas melakukan *Upload, Ganti, Hapus* file dari bucket ini.
    *   `sdii_ppdb_docs`: Bucket *Private* untuk menyimpan berkas pendaftar.

## 4. Strategi Keamanan & Supabase RLS
1.  **Row Level Security (RLS) Tabel `sdii_`:** Hanya Admin (Auth Supabase) yang dapat memanipulasi master data KECUALI tabel registrasi yang terbuka untuk *Insert* publik.
2.  **API Key Protection:** Interaksi langsung dari browser user dibatasi; operasi *Upload* yang sensitif dilewatkan melalui API Next.js yang memegang `SERVICE_ROLE_KEY` secara rahasia.
