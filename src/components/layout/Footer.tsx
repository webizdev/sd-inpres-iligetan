import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-12 pb-6 mt-20 no-print">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold mb-4">SD INPRES ILIGETAN</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Sekolah dasar yang berdedikasi menciptakan generasi berprestasi, berakhlak mulia, dan berdaya saing tinggi dalam era globalisasi.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Tautan Pantas</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/profil" className="hover:text-brand-orange transition-colors">Profil Sekolah</Link></li>
            <li><Link href="/fasilitas" className="hover:text-brand-orange transition-colors">Fasilitas</Link></li>
            <li><Link href="/informasi" className="hover:text-brand-orange transition-colors">Berita & Pengumuman</Link></li>
            <li><Link href="/ppdb" className="hover:text-brand-orange transition-colors">Pendaftaran Siswa Baru (PPDB)</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
          <address className="text-sm text-gray-300 not-italic space-y-2">
            <p>Jalan Pendidikan No. 123, Iligetan</p>
            <p>Telp: 0877-7292-4890</p>
            <p>Email: info@sdiiligetan.sch.id</p>
          </address>
        </div>
      </div>
      <div className="container mx-auto px-4 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} SD Inpres Iligetan. All rights reserved.</p>
      </div>
    </footer>
  );
}
