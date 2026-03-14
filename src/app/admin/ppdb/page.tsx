import { supabase } from '@/lib/supabase';
import PPDBClient from './PPDBClient';

export const revalidate = 0;

export default async function PPDBPage() {
  const { data: ppdbData, error } = await supabase
    .from('sdii_registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching PPDB registrations:', error);
  }

  return <PPDBClient initialData={ppdbData || []} />;
}
