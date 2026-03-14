'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type Setting = {
  id: number;
  setting_key: string;
  setting_value: string;
  created_at?: string;
  updated_at?: string;
};

export default function SettingsClient({ initialData }: { initialData: Setting[] }) {
  const [data, setData] = useState<Setting[]>(initialData || []);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  
  // Form State
  const [settingKey, setSettingKey] = useState('');
  const [settingValue, setSettingValue] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openFormModal = (setting?: Setting) => {
    setIsModalOpen(true);
    if (setting) {
      setIsEditing(true);
      setCurrentId(setting.id);
      setSettingKey(setting.setting_key);
      setSettingValue(setting.setting_value);
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setSettingKey('');
      setSettingValue('');
    }
  };

  const closeFormModal = () => {
    setIsModalOpen(false);
    setIsSubmitting(false);
  };

  const handleDelete = async (id: number, key: string) => {
    if (!window.confirm(`PERINGATAN! Anda yakin ingin menghapus pengaturan "${key}"? Ini dapat merusak tampilan website jika key ini dibutuhkan oleh sistem.`)) return;

    try {
      const { error } = await supabase.from('sdii_pengaturan_beranda').delete().eq('id', id);
      if (error) throw error;

      setData(data.filter((item) => item.id !== id));
      alert('Pengaturan berhasil dihapus!');
    } catch (error) {
      alert('Gagal menghapus pengaturan: ' + (error instanceof Error ? error.message : 'Terjadi kesalahan'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        setting_key: settingKey,
        setting_value: settingValue,
        updated_at: new Date().toISOString(),
      };

      if (isEditing && currentId) {
        // Update
        const { data: updatedData, error } = await supabase
          .from('sdii_pengaturan_beranda')
          .update(payload)
          .eq('id', currentId)
          .select()
          .single();

        if (error) throw error;
        setData(data.map((item) => (item.id === currentId ? updatedData : item)));
        alert('Pengaturan berhasil diperbarui!');
        
      } else {
        // Insert
        const { data: newData, error } = await supabase
          .from('sdii_pengaturan_beranda')
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        setData([...data, newData].sort((a, b) => a.setting_key.localeCompare(b.setting_key)));
        alert('Pengaturan baru berhasil ditambahkan!');
      }

      closeFormModal();
    } catch (error) {
      alert('Terjadi kesalahan: ' + (error instanceof Error ? error.message : 'Terjadi kesalahan'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pengaturan Beranda</h1>
        <button 
          onClick={() => openFormModal()}
          className="bg-brand-navy hover:bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          + Tambah Pengaturan Baru
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md mb-6 text-sm flex">
        <span className="mr-2">⚠️</span>
        <p>
          <strong>Hati-hati:</strong> Mengubah <code>setting_key</code> atau menghapus pengaturan di sini dapat menyebabkan eror pada tampilan Beranda. 
          Pastikan Anda hanya mengubah isi (Value) kecuali Anda adalah developer.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Key (Penanda)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Isi Format / Value</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((setting) => (
              <tr key={setting.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 break-words">
                  {setting.setting_key}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="max-h-24 overflow-y-auto whitespace-pre-wrap bg-gray-50 border rounded p-2 font-mono text-xs">
                    {setting.setting_value}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => openFormModal(setting)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(setting.id, setting.setting_key)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            
            {data.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                  Tidak ada data pengaturan ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                {isEditing ? 'Edit Pengaturan' : 'Tambah Pengaturan Baru'}
              </h3>
              <button onClick={closeFormModal} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="settingForm" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Setting Key</label>
                  <input 
                    type="text" required value={settingKey} onChange={(e) => setSettingKey(e.target.value)}
                    placeholder="Contoh: hero_title"
                    readOnly={isEditing}
                    className={`w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-brand-blue ${isEditing ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`} 
                  />
                  {isEditing && <p className="text-xs text-gray-500 mt-1">Anda tidak dapat mengubah label KEY setelah dibuat untuk menghindari kerusakan sistem.</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Isi Konten (Value)</label>
                  <textarea 
                    required rows={10} value={settingValue} onChange={(e) => setSettingValue(e.target.value)}
                    placeholder="Masukkan teks biasa atau format JSON khusus..."
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-brand-blue font-mono text-sm leading-relaxed" 
                  ></textarea>
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
                type="submit" form="settingForm" disabled={isSubmitting}
                className="px-4 py-2 bg-brand-blue text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
