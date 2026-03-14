import Image from 'next/image';
import Link from 'next/link';

export default function PrakataKepsek() {
  return (
    <div className="bg-gray-50 py-16 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Bagian Kiri: Foto */}
          <div className="w-full md:w-5/12 lg:w-4/12 flex justify-center md:justify-end shrink-0">
            <div className="relative w-full max-w-sm h-[400px] overflow-hidden rounded shadow-lg border-4 border-white">
              <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                alt="Foto Kepala Sekolah"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Bagian Kanan: Teks */}
          <div className="w-full md:w-7/12 lg:w-8/12">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 uppercase mb-2">PRAKATA KEPALA SEKOLAH</h2>
              {/* Garis Aksen / Ikon Toga */}
              <div className="flex items-center">
                <div className="w-12 h-1 bg-brand-navy"></div>
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              Bismillahirahmannirrahim Assalamualaikum Warahmatullah Wabarakatuh. Kami mengucapkan selamat datang di Website SD INPRES ILIGETAN. Kami tujukan untuk seluruh unsur pimpinan, guru, karyawan, dan siswa, masyarakat guna dapat mengakses seluruh informasi tentang profil, aktifitas/kegiatan serta fasilitas sekolah kami. Kami selaku pimpinan sekolah mengucapkan terima kasih kepada tim pembuat Website ini yang telah berusaha untuk dapat lebih memperkenalkan sekolah kami ke masyarakat luas.
            </p>
            
            <Link 
              href="/profil"
              className="inline-block bg-brand-navy hover:bg-blue-800 text-white font-medium py-2 px-6 rounded transition-colors text-sm"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
