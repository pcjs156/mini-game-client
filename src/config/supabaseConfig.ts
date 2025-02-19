interface SupabaseConfig {
  url: string;
  key: string;
}

const supabaseConfig: SupabaseConfig = {
  url: process.env.REACT_APP_SUPABASE_URL!,
  key: process.env.REACT_APP_SUPABASE_ANON_KEY!,
};

Object.freeze(supabaseConfig);

export default supabaseConfig;
