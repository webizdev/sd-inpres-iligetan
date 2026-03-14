export const metadata = {
  title: 'Informasi Kelulusan & Berita | SD Inpres Iligetan',
  description: 'Pengumuman dan Berita Seputar SD Inpres Iligetan',
};

const announcements = [
  {
    title: 'Pengumuman Libur Hari Raya',
    date: '10 Ramadhan 1445 H',
    category: 'Akademik',
    content: 'Diberitahukan kepada seluruh siswa dan orang tua murid bahwa kegiatan belajar mengajar diliburkan selama liburan Hari Raya, dan akan masuk kembali pada tanggal yang telah ditentukan pada kalender pendidikan.'
  },
  {
    title: 'Jadwal Pendaftaran PPDB Tahun Ajaran Baru',
    date: '15 Maret 2026',
    category: 'PPDB',
    content: 'Pendaftaran Peserta Didik Baru (PPDB) akan segera dibuka secara online. Silakan persiapkan berkas fisik (KK, Akta Kelahiran) serta melakukan pendaftaran melalui portal PPDB kami.'
  },
  {
    title: 'Pelaksanaan Ujian Akhir Sekolah (UAS)',
    date: 'Awal Bulan Mei 2026',
    category: 'Akademik',
    content: 'Ujian Akhir Sekolah untuk kelas 6 akan dimulai pada awal bulan depan. Diharapkan partisipasi orang tua untuk terus membimbing anak belajar di rumah.'
  }
];

export default function InformasiPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-navy mb-4">Informasi & Pengumuman</h1>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded"></div>
        </div>

        {/* Informasi List */}
        <div className="max-w-4xl mx-auto space-y-8">
          {announcements.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow">
              
              {/* Box Tanggal */}
              <div className="md:w-1/4 shrink-0 flex flex-col justify-center border-l-4 border-brand-orange pl-4">
                <span className="text-sm text-brand-blue font-bold uppercase tracking-wider mb-1">{item.category}</span>
                <span className="text-gray-500 font-medium">{item.date}</span>
              </div>
              
              {/* Konten */}
              <div className="md:w-3/4">
                <h3 className="text-2xl font-bold text-gray-800 mb-3 hover:text-brand-orange cursor-pointer transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.content}
                </p>
                <div className="mt-4">
                  <button className="text-brand-blue font-bold text-sm uppercase hover:underline">Baca Selengkapnya →</button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
