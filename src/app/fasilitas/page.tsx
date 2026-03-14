import Image from 'next/image';
import { supabase } from '@/lib/supabase';

// Revalidate the page every 60 seconds so it's mostly static but updates when admin changes data
export const revalidate = 60;

export const metadata = {
  title: 'Fasilitas | SD Inpres Iligetan',
  description: 'Fasilitas pendidikan dan sarana prasarana SD Inpres Iligetan',
};

interface FasilitasItem {
  id: string;
  nama: string;
  deskripsi: string;
  foto_url: string;
  created_at: string;
}

export default async function FasilitasPage() {
  // Fetch fasilitas data from Supabase with safety check
  let fasilitas: FasilitasItem[] = [];
  let error = null;

  if (supabase) {
    const { data, error: fetchError } = await supabase
      .from('sdii_fasilitas')
      .select('*')
      .order('created_at', { ascending: true });
    
    fasilitas = (data as FasilitasItem[]) || [];
    error = fetchError;
  }

  if (error) {
    console.error('Error fetching fasilitas:', error);
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-navy mb-4">Fasilitas Sekolah</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SD Inpres Iligetan menyediakan berbagai fasilitas memadai untuk mendukung kegiatan belajar mengajar dan pengembangan potensi siswa secara optimal.
          </p>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded mt-6"></div>
        </div>

        {/* Fasilitas Grid */}
        {fasilitas && fasilitas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fasilitas.map((item: FasilitasItem) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 w-full bg-gray-200">
                  {item.foto_url ? (
                    <Image 
                      src={item.foto_url} 
                      alt={item.nama} 
                      fill 
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-gray-400">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-navy mb-2">{item.nama}</h3>
                  <p className="text-gray-600">{item.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-lg">Belum ada data fasilitas yang ditambahkan.</p>
          </div>
        )}

      </div>
    </div>
  );
}
