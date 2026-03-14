import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { name: 'Beranda', href: '/' },
  { name: 'Profil', href: '/profil' },
  { name: 'Fasilitas', href: '/fasilitas' },
  { name: 'Jurusan / Akademik', href: '/akademik' },
  { name: 'Ekstrakurikuler', href: '/ekskul' },
  { name: 'Informasi', href: '/informasi' },
  { name: 'Galeri', href: '/galeri' },
  { name: 'Kontak', href: '/kontak' },
];

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 no-print">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          {/* Menggunakan placeholder, nanti admin ganti via CMS */}
          <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
            SDII
          </div>
          <div>
            <h1 className="font-bold text-xl text-brand-navy leading-tight">SD INPRES ILIGETAN</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest leading-none">Cerdas, Berprestasi, Berakhlak Mulia</p>
          </div>
        </Link>
        <div className="hidden lg:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-brand-orange transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* Mobile menu button (hamburger) can be added here */}
      </div>
    </nav>
  );
}
