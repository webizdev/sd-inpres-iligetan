'use client';

export default function KontakPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah terkirim.');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-navy mb-4">Hubungi Kami</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jika Anda memiliki pertanyaan seputar PPDB, akademik, atau hal lainnya, jangan ragu untuk menghubungi kami melalui kontak di bawah ini.
          </p>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Kolom Kiri: Informasi Kontak & Peta */}
          <div className="bg-brand-navy text-white p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-8 text-brand-orange border-b border-brand-blue/30 pb-4">
              Informasi Kontak
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 mr-4 shrink-0 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Alamat Sekolah</h3>
                  <p className="text-gray-300">Jalan Pendidikan No. 123, Kelurahan Iligetan, Kecamatan Maumere, Kabupaten Sikka, Nusa Tenggara Timur 86111.</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 mr-4 shrink-0 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Telepon</h3>
                  <p className="text-gray-300">0877-7292-4890</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 mr-4 shrink-0 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-gray-300">info@sdiiligetan.sch.id</p>
                </div>
              </div>
            </div>

            {/* Peta Google Maps (Contoh iframe) */}
            <div className="mt-10 rounded-lg overflow-hidden border-2 border-brand-orange/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.0645672202613!2d122.21376831478147!3d-8.623456093800624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2da71618a800eabf%3A0xe5a3c8fe0e7b7f1e!2sMaumere%2C%20Kabupaten%20Sikka%2C%20Nusa%20Tenggara%20Tim.!5e0!3m2!1sid!2sid!4v1680000000000!5m2!1sid!2sid"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* Kolom Kanan: Form Kontak */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">
              Kirim Pesan
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-blue" 
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-blue" 
                  placeholder="Masukkan email aktif"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjek / Keperluan</label>
                <input 
                  type="text" 
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-blue" 
                  placeholder="Contoh: Info Pendaftaran Siswa Pindahan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pesan Anda</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-blue" 
                  placeholder="Ketik pesan Anda di sini..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md shadow-md transition-colors"
              >
                📥 Kirim Pesan Sekarang
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
