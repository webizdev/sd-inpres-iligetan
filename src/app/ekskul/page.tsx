export const metadata = {
  title: 'Ekstrakurikuler | SD Inpres Iligetan',
  description: 'Kegiatan Ekstrakurikuler di SD Inpres Iligetan',
};

const ekskuls = [
  { name: 'Pramuka', icon: '🏕️', desc: 'Kegiatan wajib untuk melatih kemandirian dan kedisiplinan siswa.' },
  { name: 'Seni Tari Tradisional', icon: '💃', desc: 'Melestarikan budaya lokal melalui tarian daerah.' },
  { name: 'Paduan Suara', icon: '🎵', desc: 'Mengembangkan bakat olah vokal dan paduan harmoni suara.' },
  { name: 'Olahraga (Futsal/Voli)', icon: '⚽', desc: 'Membina fisik yang sehat dan jiwa sportivitas lewat olahraga.' },
  { name: 'PMR (Palang Merah Remaja)', icon: '⛑️', desc: 'Melatih kepedulian sosial dan pertolongan pertama.' },
  { name: 'Marching Band', icon: '🥁', desc: 'Melatih konsentrasi, kekompakan tim, dan seni musik.' },
];

export default function EkskulPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-navy mb-4">Ekstrakurikuler</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Wadah pengembangan minat dan bakat siswa SD Inpres Iligetan di luar jam akademik resmi.
          </p>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded mt-6"></div>
        </div>

        {/* Grid Ekskul */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ekskuls.map((ekskul, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:border-brand-orange border-b-4 border-transparent transition-colors">
              <div className="text-6xl mb-6">{ekskul.icon}</div>
              <h3 className="text-2xl font-bold text-brand-navy mb-3">{ekskul.name}</h3>
              <p className="text-gray-600 leading-relaxed">{ekskul.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
