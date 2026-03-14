'use client';

import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import imageCompression from 'browser-image-compression';

type Fasilitas = {
  id: number;
  nama: string;
  deskripsi: string;
  foto_url: string | null;
  created_at?: string;
};

export default function FasilitasClient({ initialData }: { initialData: Fasilitas[] }) {
  const [data, setData] = useState<Fasilitas[]>(initialData || []);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  
  // Form State
  const [namaFasilitas, setNamaFasilitas] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openFormModal = (fasilitas?: Fasilitas) => {
    setIsModalOpen(true);
    setFotoFile(null);
    if (fasilitas) {
      setIsEditing(true);
      setCurrentId(fasilitas.id);
      setNamaFasilitas(fasilitas.nama);
      setDeskripsi(fasilitas.deskripsi || '');
      setFotoPreview(fasilitas.foto_url);
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setNamaFasilitas('');
      setDeskripsi('');
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
    if (!window.confirm('Apakah Anda yakin ingin menghapus data fasilitas ini?')) return;

    try {
      // Jika ada foto, hapus juga dari storage
      if (foto_url) {
        const fileName = foto_url.split('/').pop();
        if (fileName) {
          await supabase.storage.from('sdii_public_assets').remove([`fasilitas/${fileName}`]);
        }
      }

      const { error } = await supabase.from('sdii_fasilitas').delete().eq('id', id);
      if (error) throw error;

      setData(data.filter((item) => item.id !== id));
      alert('Fasilitas berhasil dihapus!');
    } catch (error) {
      alert('Gagal menghapus fasilitas: ' + (error instanceof Error ? error.message : 'Terjadi kesalahan'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalFotoUrl = fotoPreview; 

      if (fotoFile) {
        let fileToUpload = fotoFile;
        // Kompres agar < 1MB
        if (fotoFile.size > 1 * 1024 * 1024) {
          const options = { maxSizeMB: 1, maxWidthOrHeight: 1200, useWebWorker: true };
          fileToUpload = await imageCompression(fotoFile, options);
        }

        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('bucket', 'sdii_public_assets');
        formData.append('folder', 'fasilitas');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();
        
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Gagal upload foto fasilitas');
        finalFotoUrl = uploadData.url;
      }

      const payload = {
        nama: namaFasilitas,
        deskripsi: deskripsi,
        foto_url: finalFotoUrl,
      };

      if (isEditing && currentId) {
        const { data: updatedData, error } = await supabase
          .from('sdii_fasilitas')
          .update(payload)
          .eq('id', currentId)
          .select()
          .single();

        if (error) throw error;
        setData(data.map((item) => (item.id === currentId ? updatedData : item)));
        alert('Data fasilitas berhasil diperbarui!');
        
      } else {
        const { data: newData, error } = await supabase
          .from('sdii_fasilitas')
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        setData([newData, ...data]);
        alert('Fasilitas baru berhasil ditambahkan!');
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
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Fasilitas</h1>
        <button 
          onClick={() => openFormModal()}
          className="bg-brand-navy hover:bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          + Tambah Fasilitas Baru
        </button>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Foto</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Fasilitas</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-16 w-24 rounded overflow-hidden bg-gray-100 relative">
                    {item.foto_url ? (
                      <Image src={item.foto_url} alt={item.nama} fill className="object-cover" />
                    ) : (
                      <span className="flex items-center justify-center h-full w-full text-gray-400 text-xs">No Image</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.nama}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <p className="line-clamp-2">{item.deskripsi}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => openFormModal(item)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id, item.foto_url)}
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
                  Tidak ada data fasilitas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                {isEditing ? 'Edit Fasilitas' : 'Tambah Fasilitas Baru'}
              </h3>
              <button onClick={closeFormModal} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="fasilitasForm" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Fasilitas</label>
                  <input 
                    type="text" required value={namaFasilitas} onChange={(e) => setNamaFasilitas(e.target.value)}
                    placeholder="Contoh: Perpustakaan Digital"
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-brand-blue" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Fasilitas</label>
                  <textarea 
                    required rows={3} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Deskripsikan keunggulan atau detail fasilitas ini..."
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-brand-blue" 
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foto Fasilitas (Max 1MB)</label>
                  <input 
                    type="file" accept="image/*" onChange={handleFileChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100"
                  />
                  {fotoPreview && (
                    <div className="mt-3 relative h-32 w-48 rounded overflow-hidden border">
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
                type="submit" form="fasilitasForm" disabled={isSubmitting}
                className="px-4 py-2 bg-brand-blue text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Fasilitas'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
