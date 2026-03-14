import { supabase } from '@/lib/supabase';
import GuruClient from './GuruClient';

export const revalidate = 0; // Don't cache admin page

type Guru = {
  id: number;
  nama: string;
  jabatan: string;
  pendidikan_terakhir: string;
  foto_url: string | null;
  created_at?: string;
};

export default async function AdminGuru() {
  let guruData: Guru[] = [];
  if (supabase) {
    const { data, error } = await supabase
      .from('sdii_guru')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching guru data:', error);
    } else {
      guruData = data || [];
    }
  }

  return <GuruClient initialData={guruData} />;
}
