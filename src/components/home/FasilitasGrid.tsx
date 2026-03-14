import { Building2, Users, Receipt, Laptop } from 'lucide-react';

export default function FasilitasGrid() {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Fasilitas */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 uppercase mb-4">FASILITAS</h2>
          <div className="flex justify-center items-center">
            <div className="w-12 h-0.5 bg-brand-orange"></div>
          </div>
        </div>

        {/* Grid 4 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* F1 */}
          <div className="flex flex-col items-center text-center px-4 group">
            <div className="w-24 h-24 rounded-full border border-brand-orange text-brand-orange flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
              <Building2 size={40} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-gray-800 mb-3 uppercase">GEDUNG MILIK SENDIRI</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Kami memiliki gedung sendiri dengan lahan yang luas, sehingga membuat kegiatan belajar dan mengajar nyaman.
            </p>
          </div>

          {/* F2 */}
          <div className="flex flex-col items-center text-center px-4 group">
            <div className="w-24 h-24 rounded-full border border-brand-orange text-brand-orange flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
              <Users size={40} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-gray-800 mb-3 uppercase">TENAGA PENDIDIK BERKOMPETEN</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Setiap tenaga pendidik mengajar sesuai dengan bidang keahliannya. Sehingga berkompeten dan mampu mentransfer ilmu dengan baik.
            </p>
          </div>

          {/* F3 */}
          <div className="flex flex-col items-center text-center px-4 group">
            <div className="w-24 h-24 rounded-full border border-brand-orange text-brand-orange flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
              <Receipt size={40} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-gray-800 mb-3 uppercase">BEBAS BIAYA SPP</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Tidak ada lagi alasan biaya untuk melanjutkan sekolah ke jenjang SD. Kami membebaskan biaya SPP bulanan.
            </p>
          </div>

          {/* F4 */}
          <div className="flex flex-col items-center text-center px-4 group">
            <div className="w-24 h-24 rounded-full border border-brand-orange text-brand-orange flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
              <Laptop size={40} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-gray-800 mb-3 uppercase">FASILITAS LENGKAP</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Tersedia sarana olahraga dan perpustakaan yang cukup lengkap untuk menunjang pembelajaran siswa secara maksimal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
