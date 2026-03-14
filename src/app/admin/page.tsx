export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stat Card 1 */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-blue">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Pendaftar PPDB</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">124</h2>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <span className="text-brand-blue font-bold text-xl">👥</span>
            </div>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-green">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Data Guru</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">32</h2>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <span className="text-brand-green font-bold text-xl">👩‍🏫</span>
            </div>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-orange">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Fasilitas</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">15</h2>
            </div>
            <div className="p-3 bg-orange-50 rounded-full">
              <span className="text-brand-orange font-bold text-xl">🏢</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Pendaftar Terbaru</h3>
        <p className="text-gray-500 text-sm">Menampilkan 5 pendaftar PPDB terakhir yang masuk ke sistem.</p>
        
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Pendaftaran</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Calon Siswa</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Daftar</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Dummy Row 1 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-blue">PPDB-2026-001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Ahmad Budi Santoso</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 Mar 2026</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Diverifikasi</span>
                </td>
              </tr>
              {/* Dummy Row 2 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-blue">PPDB-2026-002</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Siti Aminah</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 Mar 2026</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Menunggu</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
