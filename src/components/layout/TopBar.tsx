import { Phone, Mail, Facebook, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function TopBar() {
  return (
    <div className="bg-brand-navy text-white text-sm py-2 px-4 no-print">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-6 mb-2 sm:mb-0">
          <div className="flex items-center space-x-2">
            <Phone size={14} />
            <span>0877-7292-4890</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={14} />
            <span>info@sdiiligetan.sch.id</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="#" className="hover:text-gray-300 transition-colors">
            <Facebook size={16} />
          </Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">
            <Twitter size={16} />
          </Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">
            <Youtube size={16} />
          </Link>
          <Link
            href="/ppdb"
            className="ml-4 px-4 py-1 border border-white text-white font-semibold hover:bg-white hover:text-brand-navy transition-colors text-xs"
          >
            DAFTAR
          </Link>
        </div>
      </div>
    </div>
  );
}
