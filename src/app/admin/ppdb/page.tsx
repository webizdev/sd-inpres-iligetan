import { supabase } from '@/lib/supabase';
import PPDBClient from './PPDBClient';

export const revalidate = 0;

export default async function PPDBPage() {
  let ppdbData = [];
  if (supabase) {
    const { data, error } = await supabase
      .from('sdii_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching PPDB registrations:', error);
    }
    ppdbData = data || [];
  }

  return <PPDBClient initialData={ppdbData} />;
}
