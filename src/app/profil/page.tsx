import Image from 'next/image';

export const metadata = {
  title: 'Profil Sekolah | SD Inpres Iligetan',
  description: 'Sejarah, Visi, dan Misi SD Inpres Iligetan',
};

export default function ProfilPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-navy mb-4">Profil Sekolah</h1>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded"></div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sejarah Singkat</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                SD Inpres Iligetan didirikan pada tahun 1980 dengan komitmen penuh untuk mencerdaskan anak bangsa di lingkungan sekitar. Seiring berjalannya waktu, sekolah kami terus berkembang baik dari segi fasilitas fisik maupun kualitas pendidikan tenaga pengajar.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Berlokasi strategis di pusat kota, SD Inpres Iligetan kini menjadi salah satu sekolah dasar negeri favorit yang mengedepankan pendidikan karakter dan penguasaan teknologi dasar bagi seluruh siswanya.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-md">
              <Image 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" 
                alt="Gedung Sekolah SD Inpres Iligetan" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Visi */}
          <div className="bg-brand-blue rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="text-5xl mr-4 opacity-50">👁️</span> Visi
            </h2>
            <p className="text-xl font-medium leading-relaxed">
              &quot;Terwujudnya Peserta Didik yang Cerdas, Berprestasi, Berakhlak Mulia, dan Berwawasan Lingkungan berlandaskan Iman dan Taqwa.&quot;
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-brand-orange">
            <h2 className="text-3xl font-bold text-brand-navy mb-6 flex items-center">
              <span className="text-5xl mr-4">🎯</span> Misi
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-brand-orange mr-3 font-bold">1.</span>
                Menyelenggarakan proses pembelajaran yang aktif, inovatif, kreatif, efektif, dan menyenangkan (PAIKEM).
              </li>
              <li className="flex items-start">
                <span className="text-brand-orange mr-3 font-bold">2.</span>
                Membina karakter siswa agar berbudi pekerti luhur demi terwujudnya Profil Pelajar Pancasila.
              </li>
              <li className="flex items-start">
                <span className="text-brand-orange mr-3 font-bold">3.</span>
                Meningkatkan profesionalisme pendidik dan tenaga kependidikan.
              </li>
              <li className="flex items-start">
                <span className="text-brand-orange mr-3 font-bold">4.</span>
                Menciptakan lingkungan sekolah yang bersih, asri, dan nyaman untuk belajar.
              </li>
            </ul>
          </div>
        </div>

        {/* Profil Singkat & NPSN */}
        <div className="bg-brand-navy text-white rounded-xl shadow-lg p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-brand-orange">Identitas Sekolah</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-400 text-sm">Nama Sekolah</p>
              <p className="font-semibold text-lg">SD Inpres Iligetan</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-400 text-sm">NPSN</p>
              <p className="font-semibold text-lg tracking-wider">50302145</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-400 text-sm">Status</p>
              <p className="font-semibold text-lg">Negeri</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-400 text-sm">Kurikulum</p>
              <p className="font-semibold text-lg">Kurikulum Merdeka</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
