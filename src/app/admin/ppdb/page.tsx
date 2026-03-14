import { supabase } from '@/lib/supabase';
import PPDBClient, { Registration } from './PPDBClient';

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
