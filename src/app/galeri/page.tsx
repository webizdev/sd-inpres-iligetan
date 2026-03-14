import Image from 'next/image';

export const metadata = {
  title: 'Galeri Foto | SD Inpres Iligetan',
  description: 'Galeri Foto Kegiatan dan Prestasi SD Inpres Iligetan',
};

const photos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop', title: 'Belajar di Kelas' },
  { id: 2, src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop', title: 'Kegiatan Pramuka' },
  { id: 3, src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop', title: 'Perpustakaan' },
  { id: 4, src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop', title: 'Olahraga Bersama' },
  { id: 5, src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop', title: 'Upacara Bendera' },
  { id: 6, src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', title: 'Lomba Cerdas Cermat' },
];

export default function GaleriPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-navy mb-4">Galeri Dokumentasi</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kumpulan momen manis, kegiatan belajar mengajar, ekstrakurikuler, dan dokumentasi prestasi siswa siswi SD Inpres Iligetan.
          </p>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded mt-6"></div>
        </div>

        {/* Galeri Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="relative h-64 md:h-80 w-full group rounded-xl overflow-hidden shadow-md cursor-pointer">
              <Image 
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay (Muncul saat Hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
