import Link from 'next/link';
import { Home, Settings, Users, Building, Bell, LogOut } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard - SD Inpres Iligetan',
  description: 'Sistem Manajemen Konten SD Inpres Iligetan',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-navy text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-400">SD Inpres Iligetan</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            <li>
              <Link href="/admin" className="flex items-center px-4 py-3 hover:bg-white/10 transition-colors">
                <Home size={20} className="mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="flex items-center px-4 py-3 hover:bg-white/10 transition-colors">
                <Settings size={20} className="mr-3" />
                <span>Pengaturan Beranda</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/guru" className="flex items-center px-4 py-3 hover:bg-white/10 transition-colors">
                <Users size={20} className="mr-3" />
                <span>Data Guru</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/fasilitas" className="flex items-center px-4 py-3 hover:bg-white/10 transition-colors">
                <Building size={20} className="mr-3" />
                <span>Fasilitas</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/ppdb" className="flex items-center px-4 py-3 hover:bg-white/10 transition-colors">
                <Bell size={20} className="mr-3" />
                <span>Pendaftar PPDB</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors">
            <LogOut size={20} className="mr-3" />
            <span>Kembali ke Web</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
