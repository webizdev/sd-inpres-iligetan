'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

type Registration = {
  nomor_pendaftaran: string;
  nama_lengkap: string;
  nama_panggilan: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  agama: string;
  alamat_tinggal: string;
  desa_kelurahan: string;
  kecamatan: string;
  nama_ayah: string;
  nama_ibu: string;
  pekerjaan_ortu: string;
  no_hp_ortu: string;
  pas_foto_url: string | null;
  kk_url: string | null;
  akta_url: string | null;
  status_seleksi: string | null;
  created_at: string;
};

export default function PPDBClient({ initialData }: { initialData: Registration[] }) {
  const [data, setData] = useState<Registration[]>(initialData || []);
  
  // Modal Detail State
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  // Modal Edit Status State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<string>('');
  const [editId, setEditId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openDetailModal = (reg: Registration) => {
    setSelectedReg(reg);
    setIsDetailOpen(true);
  };

  const openEditModal = (reg: Registration) => {
    setEditId(reg.nomor_pendaftaran);
    setEditStatus(reg.status_seleksi || 'Menunggu');
    setIsEditOpen(true);
  };

  const handleDelete = async (nomor_pendaftaran: string) => {
    if (!window.confirm('PERINGATAN! Anda yakin ingin menghapus permanen data pendaftar ini? Berkas juga akan terhapus jika ada.')) return;

    try {
      // Find the record to get URLs
      const regToDelete = data.find(r => r.nomor_pendaftaran === nomor_pendaftaran);
      
      // Hapus berkas dari storage jika ada
      if (regToDelete) {
        const filesToRemove = [];
        if (regToDelete.pas_foto_url) filesToRemove.push(`ppdb/${regToDelete.pas_foto_url.split('/').pop()}`);
        if (regToDelete.kk_url) filesToRemove.push(`ppdb/${regToDelete.kk_url.split('/').pop()}`);
        if (regToDelete.akta_url) filesToRemove.push(`ppdb/${regToDelete.akta_url.split('/').pop()}`);

        if (filesToRemove.length > 0) {
          await supabase.storage.from('sdii_ppdb_docs').remove(filesToRemove);
        }
      }

      const { error } = await supabase.from('sdii_registrations').delete().eq('nomor_pendaftaran', nomor_pendaftaran);
      if (error) throw error;

      setData(data.filter((item) => item.nomor_pendaftaran !== nomor_pendaftaran));
      alert('Data pendaftar berhasil dihapus!');
    } catch (error: unknown) {
      alert('Gagal menghapus data: ' + (error instanceof Error ? error.message : 'Terjadi kesalahan'));
    }
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: updatedData, error } = await supabase
        .from('sdii_registrations')
        .update({ status_seleksi: editStatus })
        .eq('nomor_pendaftaran', editId)
        .select()
        .single();

      if (error) throw error;

      setData(data.map((item) => (item.nomor_pendaftaran === editId ? updatedData : item)));
      setIsEditOpen(false);
      alert('Status seleksi berhasil diubah!');
    } catch (error: unknown) {
      alert('Gagal update status: ' + (error instanceof Error ? error.message : 'Terjadi kesalahan'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Pendaftar PPDB</h1>
        <div className="space-x-2">
          {/* Implement Excel Export if needed later */}
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors cursor-not-allowed opacity-50" disabled>
            Export Excel (Coming Soon)
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Urut</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Calon Siswa</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lhr</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Ortu</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Daftar</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((reg) => (
                <tr key={reg.nomor_pendaftaran} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reg.nomor_pendaftaran}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reg.nama_lengkap}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(reg.tanggal_lahir).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reg.nama_ayah || reg.nama_ibu || 'Orang Tua'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(reg.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${reg.status_seleksi === 'Diterima' ? 'bg-green-100 text-green-800' : 
                        reg.status_seleksi === 'Cadangan' ? 'bg-yellow-100 text-yellow-800' : 
                        reg.status_seleksi === 'Ditolak' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {reg.status_seleksi || 'Menunggu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => openDetailModal(reg)} 
                      className="text-brand-blue hover:text-blue-900 mx-2"
                    >
                      Detail
                    </button>
                    <button 
                      onClick={() => openEditModal(reg)} 
                      className="text-indigo-600 hover:text-indigo-900 mx-2"
                    >
                      Status
                    </button>
                    <button 
                      onClick={() => handleDelete(reg.nomor_pendaftaran)} 
                      className="text-red-600 hover:text-red-900 mx-2"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              
              {data.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    Belum ada data pendaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail & Berkas */}
      {isDetailOpen && selectedReg && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                Detail Pendaftar: {selectedReg.nomor_pendaftaran}
              </h3>
              <button onClick={() => setIsDetailOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Info Siswa */}
              <div>
                <h4 className="font-bold text-brand-navy border-b pb-2 mb-4">Informasi Calon Siswa</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500 w-32 inline-block">Nama Lengkap:</span> <span className="font-medium">{selectedReg.nama_lengkap}</span></p>
                  <p><span className="text-gray-500 w-32 inline-block">Nama Panggilan:</span> <span className="font-medium">{selectedReg.nama_panggilan}</span></p>
                  <p><span className="text-gray-500 w-32 inline-block">Jenis Kelamin:</span> <span>{selectedReg.jenis_kelamin === 'L' ? 'Laki-Laki' : 'Perempuan'}</span></p>
                  <p><span className="text-gray-500 w-32 inline-block">TTL:</span> <span>{selectedReg.tempat_lahir}, {new Date(selectedReg.tanggal_lahir).toLocaleDateString('id-ID')}</span></p>
                  <p><span className="text-gray-500 w-32 inline-block">Agama:</span> <span>{selectedReg.agama}</span></p>
                  <p><span className="text-gray-500 w-32 inline-block">Alamat:</span> <span>{selectedReg.alamat_tinggal}, {selectedReg.desa_kelurahan}, {selectedReg.kecamatan}</span></p>
                </div>

                <h4 className="font-bold text-brand-navy border-b pb-2 mb-4 mt-8">Informasi Orang Tua</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500 w-32 inline-block">Nama Ayah:</span> <span className="font-medium">{selectedReg.nama_ayah}</span></p>
                  <p><span className="text-gray-500 w-32 inline-block">Nama Ibu:</span> <span className="font-medium">{selectedReg.nama_ibu}</span></p>
                  <p><span className="text-gray-500 w-32 inline-block">Pekerjaan:</span> <span>{selectedReg.pekerjaan_ortu}</span></p>
                  <p><span className="text-gray-500 w-32 inline-block">No. HP/WA:</span> <span className="font-medium text-brand-blue">{selectedReg.no_hp_ortu}</span></p>
                </div>
              </div>

              {/* Berkas Lampiran */}
              <div>
                <h4 className="font-bold text-brand-orange border-b pb-2 mb-4">Berkas Lampiran</h4>
                <div className="space-y-6">
                  {/* Pas Foto */}
                  <div>
                    <h5 className="text-sm font-semibold mb-2 text-gray-600">Pas Foto</h5>
                    {selectedReg.pas_foto_url ? (
                      <div className="relative h-40 w-32 rounded border border-gray-200 overflow-hidden">
                        <Image src={selectedReg.pas_foto_url} alt="Pas Foto" fill className="object-cover" />
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">Berkas tidak diunggah</span>
                    )}
                  </div>

                  {/* KK & Akta */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-semibold mb-2 text-gray-600">Kartu Keluarga</h5>
                      {selectedReg.kk_url ? (
                        <a href={selectedReg.kk_url} target="_blank" rel="noreferrer" className="block relative h-32 w-full bg-gray-100 border border-gray-300 rounded hover:opacity-80 transition-opacity">
                          <Image src={selectedReg.kk_url} alt="Kartu Keluarga" fill className="object-cover" />
                          <div className="absolute flex inset-0 items-center justify-center bg-black/40 text-white opacity-0 hover:opacity-100 transition-opacity text-sm font-semibold">Lihat Penuh</div>
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400 italic">Berkas tidak diunggah</span>
                      )}
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold mb-2 text-gray-600">Akta Kelahiran</h5>
                      {selectedReg.akta_url ? (
                         <a href={selectedReg.akta_url} target="_blank" rel="noreferrer" className="block relative h-32 w-full bg-gray-100 border border-gray-300 rounded hover:opacity-80 transition-opacity">
                         <Image src={selectedReg.akta_url} alt="Akta Kelahiran" fill className="object-cover" />
                         <div className="absolute flex inset-0 items-center justify-center bg-black/40 text-white opacity-0 hover:opacity-100 transition-opacity text-sm font-semibold">Lihat Penuh</div>
                       </a>
                      ) : (
                        <span className="text-sm text-gray-400 italic">Berkas tidak diunggah</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
              <button 
                onClick={() => setIsDetailOpen(false)}
                className="px-6 py-2 bg-brand-navy text-white rounded hover:bg-blue-800"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Status */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                Update Status ({editId})
              </h3>
              <button onClick={() => setIsEditOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="p-6">
              <form id="statusForm" onSubmit={handleUpdateStatus}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Status Baru</label>
                <select 
                  value={editStatus} 
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <option value="Menunggu">Menunggu</option>
                  <option value="Diterima">Diterima</option>
                  <option value="Cadangan">Cadangan</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
                <p className="text-xs text-gray-500 mt-3">
                  Mengubah status akan otomatis memperbarui tampilan di halaman admin ini.
                </p>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
              <button 
                type="button" onClick={() => setIsEditOpen(false)} disabled={isSubmitting}
                className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button 
                type="submit" form="statusForm" disabled={isSubmitting}
                className="px-4 py-2 bg-brand-blue text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
