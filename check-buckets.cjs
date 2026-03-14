import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBuckets() {
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error("List Error:", error.message);
    return;
  }
  
  const bucketNames = data.map(b => b.name);
  console.log("Existing Buckets:", bucketNames);
  
  const requiredBuckets = ['sdii_public_assets', 'sdii_ppdb_docs'];
  
  for (const rb of requiredBuckets) {
    if (!bucketNames.includes(rb)) {
      console.log(`Creating bucket: ${rb}`);
      const { data: createData, error: createError } = await supabase.storage.createBucket(rb, {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
        fileSizeLimit: 2 * 1024 * 1024 // 2MB
      });
      if (createError) console.error(`Error creating ${rb}:`, createError);
      else console.log(`Bucket ${rb} created:`, createData);
    } else {
      console.log(`Bucket ${rb} already exists.`);
      
      // Update its public status just in case
      await supabase.storage.updateBucket(rb, {
        public: true
      });
    }
  }
}

checkBuckets();
