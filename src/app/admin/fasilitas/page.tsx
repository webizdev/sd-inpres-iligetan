import { supabase } from '@/lib/supabase';
import FasilitasClient from './FasilitasClient';

export const revalidate = 0; // Don't cache admin page

export default async function FasilitasPage() {
  let fasilitasData = [];
  if (supabase) {
    const { data, error } = await supabase
      .from('sdii_fasilitas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching fasilitas data:', error);
    }
    fasilitasData = data || [];
  }

  return <FasilitasClient initialData={fasilitasData || []} />;
}
