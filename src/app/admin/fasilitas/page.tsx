```typescript
import { supabase } from '@/lib/supabase';
import FasilitasClient from './FasilitasClient';

export const revalidate = 0; // Don't cache admin page

type Fasilitas = {
  id: number;
  nama: string;
  deskripsi: string;
  foto_url: string | null;
  created_at?: string;
};

export default async function AdminFasilitas() {
  let fasilitasData: Fasilitas[] = [];
  if (supabase) {
    const { data, error } = await supabase
      .from('sdii_fasilitas')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching fasilitas data:', error);
    } else {
      fasilitasData = data || [];
    }
  }

  return <FasilitasClient initialData={fasilitasData} />;
}
```
