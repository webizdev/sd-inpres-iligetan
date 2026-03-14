'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Beranda', href: '/' },
  { name: 'Profil', href: '/profil' },
  { name: 'Fasilitas', href: '/fasilitas' },
  { name: 'Akademik', href: '/akademik' },
  { name: 'PPDB', href: '/ppdb' },
  { name: 'Informasi', href: '/informasi' },
  { name: 'Kontak', href: '/kontak' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-brand-navy">
              SD II
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'bg-brand-navy text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-brand-navy'
                  } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button would go here */}
            <span className="text-gray-500">Menu</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
