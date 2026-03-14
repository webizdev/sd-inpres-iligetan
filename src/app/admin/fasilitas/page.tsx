import { supabase } from '@/lib/supabase';
import FasilitasClient from './FasilitasClient';

export const revalidate = 0; // Don't cache admin page

export default async function FasilitasPage() {
  const { data: fasilitasData, error } = await supabase
    .from('sdii_fasilitas')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching fasilitas data:', error);
  }

  return <FasilitasClient initialData={fasilitasData || []} />;
}
