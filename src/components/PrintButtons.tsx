'use client';

export default function PrintButtons() {
  return (
    <div className="fixed top-4 right-4 no-print space-x-2 z-50">
      <button 
        onClick={() => window.print()}
        className="bg-brand-blue hover:bg-blue-600 text-white font-bold py-2 px-6 rounded shadow"
      >
        🖨️ Cetak Bukti (A4)
      </button>
      <button 
        onClick={() => window.location.href = '/ppdb'}
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded shadow"
      >
        Kembali
      </button>
    </div>
  );
}
