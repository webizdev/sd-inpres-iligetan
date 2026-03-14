import { supabase } from '@/lib/supabase';
import PPDBClient from './PPDBClient';

export const revalidate = 0;

type Registration = {
  nomor_pendaftaran: string;
  nama_lengkap: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  nama_ayah: string;
  nama_ibu: string;
  no_hp_ortu: string;
  pas_foto_url: string | null;
  fc_kk_url: string | null;
  fc_akta_url: string | null;
  status_seleksi: string | null;
  created_at: string;
};

export default async function AdminPPDB() {
  let ppdbData: Registration[] = [];
  if (supabase) {
    const { data, error } = await supabase
      .from('sdii_registrations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching PPDB data:', error);
    } else {
      ppdbData = data || [];
    }
  }

  return <PPDBClient initialData={ppdbData} />;
}
