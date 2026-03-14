'use client';

import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import imageCompression from 'browser-image-compression';

type Guru = {
  id: number;
  nama: string;
  jabatan: string;
  pendidikan_terakhir: string;
  foto_url: string | null;
  created_at?: string;
};

export default function GuruClient({ initialData }: { initialData: Guru[] }) {
  const [data, setData] = useState<Guru[]>(initialData || []);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  
  // Form State
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [pendidikan, setPendidikan] = useState('');
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openFormModal = (guru?: Guru) => {
    setIsModalOpen(true);
    setFotoFile(null);
    if (guru) {
      setIsEditing(true);
      setCurrentId(guru.id);
      setNama(guru.nama);
      setJabatan(guru.jabatan || '');
      setPendidikan(guru.pendidikan_terakhir || '');
      setFotoPreview(guru.foto_url);
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setNama('');
      setJabatan('');
      setPendidikan('');
      setFotoPreview(null);
    }
  };

  const closeFormModal = () => {
    setIsModalOpen(false);
    setIsSubmitting(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleDelete = async (id: number, foto_url: string | null) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data guru ini?')) return;

    try {
      // Jika ada foto, hapus juga dari storage (opsional tapi disarankan)
      if (foto_url) {
        const fileName = foto_url.split('/').pop();
        if (fileName) {
          await supabase.storage.from('sdii_public_assets').remove([`guru/${fileName}`]);
        }
      }

      const { error } = await supabase.from('sdii_guru').delete().eq('id', id);
      if (error) throw error;

      setData(data.filter((item) => item.id !== id));
      alert('Data guru berhasil dihapus!');
    } catch (error) {
      alert('Gagal menghapus guru: ' + (error instanceof Error ? error.message : 'Terjadi kesalahan'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalFotoUrl = fotoPreview; // Bisa URL lama atau null

      // Jika ada file foto baru yang diupload
      if (fotoFile) {
        // Kompresi jika perlu
        let fileToUpload = fotoFile;
        if (fotoFile.size > 1 * 1024 * 1024) { // > 1MB
          const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
          fileToUpload = await imageCompression(fotoFile, options);
        }

        // Upload ke Supabase Storage via backend API atau langsung front-end
        // Karena kita sudah punya `/api/upload`, mari kita pakai (lebih aman)
        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('bucket', 'sdii_public_assets');
        formData.append('folder', 'guru');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();
        
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Gagal upload foto');
        finalFotoUrl = uploadData.url;
      }

      // Payload Database
      const payload = {
        nama,
        jabatan,
        pendidikan_terakhir: pendidikan,
        foto_url: finalFotoUrl,
      };

      if (isEditing && currentId) {
        // Update
        const { data: updatedData, error } = await supabase
          .from('sdii_guru')
          .update(payload)
          .eq('id', currentId)
          .select()
          .single();

        if (error) throw error;
        setData(data.map((item) => (item.id === currentId ? updatedData : item)));
        alert('Data guru berhasil diperbarui!');
        
      } else {
        // Insert
        const { data: newData, error } = await supabase
          .from('sdii_guru')
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        // Tambahkan di urutan paling atas
        setData([newData, ...data]);
        alert('Data guru baru berhasil ditambahkan!');
      }

      closeFormModal();
    } catch (error) {
      alert('Terjadi kesalahan: ' + (error instanceof Error ? error.message : 'Terjadi kesalahan'));
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Data Guru</h1>
        <button 
          onClick={() => openFormModal()}
          className="bg-brand-navy hover:bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          + Tambah Guru Baru
        </button>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama & Jabatan</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pendidikan</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((guru) => (
              <tr key={guru.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 relative">
                    {guru.foto_url ? (
                      <Image src={guru.foto_url} alt={guru.nama} fill className="object-cover" />
                    ) : (
                      <span className="flex items-center justify-center h-full w-full text-gray-400">👤</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{guru.nama}</div>
                  <div className="text-sm text-gray-500">{guru.jabatan}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {guru.pendidikan_terakhir || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => openFormModal(guru)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(guru.id, guru.foto_url)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  Tidak ada data guru.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                {isEditing ? 'Edit Data Guru' : 'Tambah Guru Baru'}
              </h3>
              <button onClick={closeFormModal} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="guruForm" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <input 
                    type="text" required value={nama} onChange={(e) => setNama(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-brand-blue" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan / Posisi</label>
                  <input 
                    type="text" required value={jabatan} onChange={(e) => setJabatan(e.target.value)}
                    placeholder="Contoh: Guru Kelas 1A"
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-brand-blue" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pendidikan Terakhir</label>
                  <input 
                    type="text" value={pendidikan} onChange={(e) => setPendidikan(e.target.value)}
                    placeholder="Contoh: S1 PGSD"
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-brand-blue" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foto Profil (Max 1MB)</label>
                  <input 
                    type="file" accept="image/*" onChange={handleFileChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100"
                  />
                  {fotoPreview && (
                    <div className="mt-3 relative h-20 w-20 rounded-full overflow-hidden border">
                      <Image src={fotoPreview} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
              <button 
                type="button" onClick={closeFormModal} disabled={isSubmitting}
                className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button 
                type="submit" form="guruForm" disabled={isSubmitting}
                className="px-4 py-2 bg-brand-blue text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
