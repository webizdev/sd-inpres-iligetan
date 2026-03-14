import { supabase } from '@/lib/supabase';
import SettingsClient from './SettingsClient';

// Setting Revalidation time untuk ISR (Update halaman statis tiap 60 detik bila ada data baru)
export const revalidate = 0;

type Setting = {
  id: number;
  setting_key: string;
  setting_value: string;
  created_at?: string;
  updated_at?: string;
};

export default async function AdminSettings() {
  let settingsData: Setting[] = [];
  if (supabase) {
    const { data, error } = await supabase
      .from('sdii_pengaturan_beranda')
      .select('*')
      .order('setting_key', { ascending: true });
    
    if (error) {
      console.error('Error fetching settings data:', error);
    } else {
      settingsData = data || [];
    }
  }

  return <SettingsClient initialData={settingsData} />;
}
