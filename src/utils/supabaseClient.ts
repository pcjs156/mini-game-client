import { createClient } from "@supabase/supabase-js";

import supabaseConfig from "../config/supabaseConfig";

export const supabase = createClient(supabaseConfig.url, supabaseConfig.key);
