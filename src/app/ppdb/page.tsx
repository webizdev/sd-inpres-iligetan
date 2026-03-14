'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import imageCompression from 'browser-image-compression';

export default function PPDBRegistration() {
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    agama: '',
    nama_ayah: '',
    nama_ibu: '',
    no_hp_ortu: '',
    alamat_lengkap: '',
  });

  const [files, setFiles] = useState<{ pas_foto: File | null; fc_kk: File | null; fc_akta: File | null }>({
    pas_foto: null,
    fc_kk: null,
    fc_akta: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [registeredId, setRegisteredId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles.length > 0) {
      let file = selectedFiles[0];

      // Client-side compression if image
      if (file.type.startsWith('image/')) {
        const options = {
          maxSizeMB: 1, // Max 1MB
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        try {
          file = await imageCompression(file, options);
        } catch (error) {
          console.error('Compression error:', error);
          setErrorMsg('Gagal mengompresi gambar.');
          return;
        }
      }

      setFiles((prev) => ({ ...prev, [name]: file }));
    }
  };

  const uploadFileAPI = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', 'sdii_ppdb_docs'); // Private bucket

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Upload gagal');
    }

    const data = await res.json();
    return data.path; // Return the storage path
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. Upload files first
      let pas_foto_url = null;
      let fc_kk_url = null;
      let fc_akta_url = null;

      if (files.pas_foto) pas_foto_url = await uploadFileAPI(files.pas_foto);
      if (files.fc_kk) fc_kk_url = await uploadFileAPI(files.fc_kk);
      if (files.fc_akta) fc_akta_url = await uploadFileAPI(files.fc_akta);

      // 2. Insert data to Supabase
      const generatedNoDaftar = `PPDB-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      const { data: newReg, error } = await supabase.from('sdii_registrations').insert([
        {
          ...formData,
          nomor_pendaftaran: generatedNoDaftar,
          pas_foto_url,
          fc_kk_url,
          fc_akta_url,
          status_seleksi: 'Menunggu',
        },
      ]).select('nomor_pendaftaran').single();

      if (error) throw error;

      setSuccessMsg('Pendaftaran berhasil dikirim! Silakan cetak bukti pendaftaran Anda.');
      if (newReg) {
        setRegisteredId(newReg.nomor_pendaftaran);
      }
      // Reset form could go here
      
    } catch (error: any) {
      setErrorMsg(error.message || 'Terjadi kesalahan saat mendaftar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-brand-navy p-6 text-white text-center">
            <h1 className="text-2xl font-bold uppercase">Formulir Pendaftaran Siswa Baru</h1>
            <p className="text-sm mt-2 text-blue-100">SD Inpres Iligetan Tahun Ajaran 2026/2027</p>
          </div>

          <div className="p-8">
            {successMsg && (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
                <p className="text-green-700 font-medium mb-4">{successMsg}</p>
                {registeredId && (
                  <a 
                    href={`/ppdb/print/${registeredId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-navy hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow"
                  >
                    🖨️ Cetak Bukti Pendaftaran
                  </a>
                )}
              </div>
            )}

            {errorMsg && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700">{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Data Pribadi */}
              <fieldset className="border border-gray-200 p-6 rounded-md">
                <legend className="text-lg font-bold text-gray-800 px-2">A. Data Calon Siswa</legend>
                <div className="grid grid-cols-1 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input type="text" name="nama_lengkap" required value={formData.nama_lengkap} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-brand-blue focus:border-brand-blue" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
                      <input type="text" name="tempat_lahir" required value={formData.tempat_lahir} onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                      <input type="date" name="tanggal_lahir" required value={formData.tanggal_lahir} onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                      <select name="jenis_kelamin" required value={formData.jenis_kelamin} onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2">
                        <option value="">Pilih...</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Agama</label>
                      <select name="agama" required value={formData.agama} onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2">
                        <option value="">Pilih...</option>
                        <option value="Islam">Islam</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Protestan">Protestan</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                    <textarea name="alamat_lengkap" rows={3} required value={formData.alamat_lengkap} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2" />
                  </div>
                </div>
              </fieldset>

              {/* Data Orang Tua */}
              <fieldset className="border border-gray-200 p-6 rounded-md">
                <legend className="text-lg font-bold text-gray-800 px-2">B. Data Orang Tua/Wali</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ayah</label>
                    <input type="text" name="nama_ayah" required value={formData.nama_ayah} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu</label>
                    <input type="text" name="nama_ibu" required value={formData.nama_ibu} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon / WhatsApp Orang Tua</label>
                    <input type="tel" name="no_hp_ortu" required value={formData.no_hp_ortu} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2" />
                  </div>
                </div>
              </fieldset>

               {/* Berkas Persyaratan */}
               <fieldset className="border border-gray-200 p-6 rounded-md">
                <legend className="text-lg font-bold text-gray-800 px-2">C. Unggah Berkas (Max 1MB)</legend>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pas Foto 3x4 (JPG/PNG)</label>
                    <input type="file" name="pas_foto" accept="image/jpeg, image/png, image/webp" onChange={handleFileChange}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fotocopy Kartu Keluarga (KK) (JPG/PNG/PDF)</label>
                    <input type="file" name="fc_kk" accept="image/jpeg, image/png, application/pdf" onChange={handleFileChange}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fotocopy Akta Kelahiran (JPG/PNG/PDF)</label>
                    <input type="file" name="fc_akta" accept="image/jpeg, image/png, application/pdf" onChange={handleFileChange}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100" />
                  </div>
                  <p className="text-xs text-orange-600 mt-2">* Gambar akan otomatis dikompress {'<'} 1MB sebelum diupload.</p>
                </div>
              </fieldset>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-md text-white font-bold text-lg transition-colors
                    ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-orange hover:bg-orange-600'}`}
                >
                  {isSubmitting ? 'MENGIRIM DATA...' : 'KIRIM PENDAFTARAN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
