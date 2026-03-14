import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

export const metadata = {
  title: 'Akademik & Guru | SD Inpres Iligetan',
  description: 'Kurikulum dan Daftar Tenaga Pendidik SD Inpres Iligetan',
};

export default async function AkademikPage() {
  if (!supabase) {
    return (
      <div className="bg-gray-50 min-h-screen py-20 flex items-center justify-center">
        <p className="text-gray-500">Koneksi database belum tersedia.</p>
      </div>
    );
  }

  const { data: teachers, error } = await supabase
    .from('sdii_guru')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching teachers:', error);
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-navy mb-4">Akademik & Tenaga Pendidik</h1>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded"></div>
        </div>

        {/* Kurikulum Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-16 border-l-4 border-brand-blue">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Kurikulum Merdeka</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Mulai tahun ajaran baru, SD Inpres Iligetan secara penuh telah mengimplementasikan <strong>Kurikulum Merdeka</strong>. Kami berfokus pada materi esensial dan pengembangan karakter serta kompetensi siswa.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Melalui Pembelajaran Berbasis Proyek (Project-Based Learning), kami mewujudkan Profil Pelajar Pancasila yang tangguh, mandiri, kreatif, dan menanamkan nilai-nilai kebhinekaan dalam keseharian siswa.
          </p>
        </div>

        {/* Guru Section */}
        <h2 className="text-3xl font-bold text-center text-brand-navy mb-12">Daftar Tenaga Pendidik</h2>
        
        {teachers && teachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teachers.map((guru) => (
              <div key={guru.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                <div className="relative h-64 w-full bg-gray-200">
                  {guru.foto_url ? (
                    <Image 
                      src={guru.foto_url} 
                      alt={guru.nama} 
                      fill 
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex bg-brand-navy items-center justify-center h-full w-full text-white text-5xl font-bold">
                      {(guru.nama && guru.nama.length > 0) ? guru.nama.charAt(0) : 'G'}
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{guru.nama}</h3>
                  <p className="text-brand-orange text-sm font-semibold">{guru.jabatan}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-lg">Data tenaga pendidik belum ditambahkan.</p>
          </div>
        )}

      </div>
    </div>
  );
}
