# SD Inpres Iligetan - Web Portal & PPDB Online

Situs web resmi **SD Inpres Iligetan** yang mencakup profil sekolah, informasi akademik, fasilitas, dan sistem pendaftaran siswa baru (PPDB) online.

## Fitur Utama

- **Halaman Publik**: Beranda dinamis, Profil Sekolah, Fasilitas, Akademik, dan Informasi.
- **PPDB Online**: Formulir pendaftaran digital dengan fitur upload berkas dan cetak bukti pendaftaran otomatis.
- **CMS Admin**: Dashboard manajemen konten untuk mengelola data Guru, Fasilitas, Pendaftar PPDB, dan Pengaturan Beranda.

## Teknologi Terapan

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Lucide Icons.
- **Backend/Database**: Supabase (Database & Storage), Next.js API Routes.
- **Deployment**: Vercel.

## Konfigurasi Environment (.env.local)

Untuk menjalankan proyek ini, Anda memerlukan variabel lingkungan Supabase berikut:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (optional for local)
```

## Pengembangan Lokal

```bash
npm install
npm run dev
```

---
Dikembangkan oleh [webizdev](https://github.com/webizdev).
