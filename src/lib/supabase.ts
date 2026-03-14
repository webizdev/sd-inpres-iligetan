import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('WARNING: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing!');
}

// Client untuk penggunaan publik (frontend JS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client khusus untuk backend (API Routes) memotong RLS
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
