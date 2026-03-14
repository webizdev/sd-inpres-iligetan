import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] bg-gray-900 group">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg uppercase">
            INFORMASI PPDB SD INPRES ILIGETAN TAHUN 2026/2027
          </h2>
          <Link 
            href="/ppdb" 
            className="inline-block bg-brand-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded shadow-lg transition-transform hover:-translate-y-1"
          >
            LIHAT SELENGKAPNYA
          </Link>
        </div>
      </div>

      {/* Navigation Arrows (Mockup) */}
      <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronLeft size={24} />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
