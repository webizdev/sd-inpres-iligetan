import HeroSlider from '@/components/home/HeroSlider';
import FeatureBoxes from '@/components/home/FeatureBoxes';
import PrakataKepsek from '@/components/home/PrakataKepsek';
import FasilitasGrid from '@/components/home/FasilitasGrid';

// Setting Revalidation time untuk ISR (Update halaman statis tiap 60 detik bila ada data baru)
export const revalidate = 60;

export default async function Home() {
  return (
    <>
      <HeroSlider />
      <FeatureBoxes />
      <PrakataKepsek />
      <FasilitasGrid />
    </>
  );
}
