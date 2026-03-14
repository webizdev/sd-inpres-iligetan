import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

// Inisialisasi aman: Jika variabel env hilang di Vercel (saat build), jangan biarkan crash
const safeCreateClient = (url: string, key: string) => {
  if (!url || !key || url === 'your_supabase_url') {
    return null;
  }
  return createClient(url, key);
};

// Client untuk penggunaan publik (frontend JS)
export const supabase = safeCreateClient(supabaseUrl, supabaseAnonKey) as ReturnType<typeof createClient>;

// Client khusus untuk backend (API Routes) memotong RLS
export const supabaseAdmin = safeCreateClient(supabaseUrl, supabaseServiceKey) as ReturnType<typeof createClient>;
