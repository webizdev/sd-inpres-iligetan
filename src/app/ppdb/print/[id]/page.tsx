import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import PrintButtons from '@/components/PrintButtons';
import { Registration } from '@/app/admin/ppdb/PPDBClient';

// Disable caching for this route so it always fetches the latest data for the specific ID
export const revalidate = 0;

export default async function PrintBuktiPendaftaran({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!supabase) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Database tidak terhubung. Tidak dapat mencetak bukti.</p>
      </div>
    );
  }

  const { data: reg, error } = await supabase
    .from('sdii_registrations')
    .select('*')
    .eq('nomor_pendaftaran', id)
    .single() as { data: Registration | null; error: Error | null };

  if (error || !reg) {
    console.error('Registration not found:', error);
    notFound();
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans flex items-center justify-center p-4 print:p-0 print:bg-white no-print-bg">
      
      {/* Tombol Cetak (Client Component) */}
      <PrintButtons />

      {/* Area Kertas A4 */}
      <div className="bg-white mx-auto shadow-2xl relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
        
        {/* Kop Surat */}
        <div className="border-b-4 border-brand-navy pb-4 mb-8 flex items-center">
          <div className="w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0 mr-6">
            SDII
          </div>
          <div className="flex-1 text-center pr-20">
            <h1 className="text-2xl font-bold uppercase tracking-widest text-gray-800">SD INPRES ILIGETAN</h1>
            <p className="text-sm font-semibold text-gray-600">PANITIA PENERIMAAN PESERTA DIDIK BARU (PPDB)</p>
            <p className="text-xs text-gray-500 mt-1">Jalan Pendidikan No. 123, Iligetan | Telp: 0877-7292-4890 | Email: info@sdiiligetan.sch.id</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-center underline mb-8 uppercase">Tanda Bukti Pendaftaran Online</h2>

        <div className="flex justify-between items-start gap-8">
          
          {/* Kolom Kiri: Data */}
          <div className="flex-1">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 w-1/3 font-semibold text-gray-700">No. Pendaftaran</td>
                  <td className="py-2 w-4 text-center">:</td>
                  <td className="py-2 font-bold text-lg">{reg.nomor_pendaftaran}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-semibold text-gray-700">Tanggal Daftar</td>
                  <td className="py-2 text-center">:</td>
                  <td className="py-2">{new Date(reg.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-semibold text-gray-700">Nama Calon Siswa</td>
                  <td className="py-2 text-center">:</td>
                  <td className="py-2 font-bold">{reg.nama_lengkap.toUpperCase()}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-semibold text-gray-700">Tempat, Tgl Lahir</td>
                  <td className="py-2 text-center">:</td>
                  <td className="py-2">{reg.tempat_lahir}, {new Date(reg.tanggal_lahir).toLocaleDateString('id-ID')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-semibold text-gray-700">Jenis Kelamin</td>
                  <td className="py-2 text-center">:</td>
                  <td className="py-2">{reg.jenis_kelamin}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-semibold text-gray-700">Agama</td>
                  <td className="py-2 text-center">:</td>
                  <td className="py-2">{reg.agama}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-semibold text-gray-700">Nama Orang Tua/Wali</td>
                  <td className="py-2 text-center">:</td>
                  <td className="py-2">{reg.nama_ayah || reg.nama_ibu || 'Orang Tua'}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-semibold text-gray-700">No. Telp/WhatsApp</td>
                  <td className="py-2 text-center">:</td>
                  <td className="py-2">{reg.no_hp_ortu}</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-gray-700 align-top">Alamat Lengkap</td>
                  <td className="py-2 text-center align-top">:</td>
                  <td className="py-2">{reg.alamat_lengkap}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Kolom Kanan: Pas Foto */}
          <div className="w-[3cm] h-[4cm] border-2 border-dashed border-gray-400 flex items-center justify-center shrink-0 bg-gray-50 relative">
             {reg.pas_foto_url ? (
               <Image src={reg.pas_foto_url} alt="Pas Foto" fill className="object-cover" />
             ) : (
               <span className="text-xs text-gray-400 text-center px-2">Pas Foto 3x4 (Tidak ada)</span>
             )}
          </div>
        </div>

        {/* Catatan Penting */}
        <div className="mt-12 border border-brand-orange bg-orange-50 p-4 text-sm text-gray-800 rounded">
          <h3 className="font-bold underline mb-2">PENTING:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Bukti Pendaftaran ini WAJIB dicetak dan dibawa saat daftar ulang.</li>
            <li>Harap membawa berkas fisik (Fotocopy KK dan Akta Kelahiran).</li>
            <li>Hasil seleksi akan diumumkan sesuai jadwal yang tertera di website.</li>
          </ol>
        </div>

        {/* Kolom Tanda Tangan */}
        <div className="mt-16 flex justify-between px-10">
          <div className="text-center">
            <p className="mb-20 text-sm">Panitia PPDB</p>
            <p className="font-bold border-b border-gray-800 inline-block px-4">(.......................................)</p>
          </div>
          <div className="text-center">
            <p className="text-sm">Iligetan, .................................... 2026</p>
            <p className="mb-20 text-sm">Orang Tua / Wali Calon Siswa</p>
            <p className="font-bold border-b border-gray-800 inline-block px-4">{(reg.nama_ayah || reg.nama_ibu || 'Orang Tua').toUpperCase()}</p>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print-bg { background-color: white !important; }
        }
      `}} />
    </div>
  );
}
