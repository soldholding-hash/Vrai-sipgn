import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://lvstphnennbiwwubaepw.supabase.co'
const SUPABASE_KEY = 'sb_publishable_IVEjS49BS6I9F2czR_UnvQ_f_fuykvY'
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
