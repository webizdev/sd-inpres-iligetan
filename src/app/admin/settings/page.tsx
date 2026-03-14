import { supabase } from '@/lib/supabase';
import SettingsClient from './SettingsClient';

// Setting Revalidation time untuk ISR (Update halaman statis tiap 60 detik bila ada data baru)
export const revalidate = 0;

export default async function SettingsPage() {
  const { data: settingsData, error } = await supabase
    .from('sdii_pengaturan_beranda')
    .select('*')
    .order('setting_key', { ascending: true });

  if (error) {
    console.error('Error fetching settings:', error);
  }

  return <SettingsClient initialData={settingsData || []} />;
}
