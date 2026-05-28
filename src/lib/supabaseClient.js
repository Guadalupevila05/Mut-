import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ejemplo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'llave-publica-de-ejemplo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);