import { supabase } from '@/lib/supabase';
import GuruClient from './GuruClient';

export const revalidate = 0; // Don't cache admin page

export default async function GuruPage() {
  let guruData: any[] = [];
  if (supabase) {
    const { data, error } = await supabase
      .from('sdii_guru')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching guru data:', error);
    }
    guruData = data || [];
  }

  return <GuruClient initialData={guruData} />;
}
