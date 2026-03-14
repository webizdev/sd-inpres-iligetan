import HeroSlider from '@/components/home/HeroSlider';
import FeatureBoxes from '@/components/home/FeatureBoxes';
import PrakataKepsek from '@/components/home/PrakataKepsek';
import FasilitasGrid from '@/components/home/FasilitasGrid';
import { supabase } from '@/lib/supabase';

// Setting Revalidation time untuk ISR (Update halaman statis tiap 60 detik bila ada data baru)
export const revalidate = 60;

export default async function Home() {
  // 1. Fetch data pengaturan beranda dari database secara server-side
  const { data: settingsData } = await supabase
    .from('sdii_pengaturan_beranda')
    .select('*');

  // Mengubah format array menjadi object { key: value } untuk mempermudah akses
  const settings = settingsData?.reduce((acc: any, row) => {
    acc[row.setting_key] = row.setting_value;
    return acc;
  }, {}) || {};

  // 2. Fetch data fasilitas
  const { data: fasilitasData } = await supabase
    .from('sdii_fasilitas')
    .select('*')
    .order('id', { ascending: true });

  return (
    <>
      {/* Jika settings kosong, jangan error, tapi render komponen default yang sudah dibuat */}
      <HeroSlider />
      <FeatureBoxes />
      <PrakataKepsek />
      <FasilitasGrid />
    </>
  );
}
