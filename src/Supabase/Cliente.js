
import { createClient } from '@supabase/supabase-js'


export const supabase = createClient(
    process.env.REACT_APP_URL,
    process.env.REACT_APP_KEY);
    
window.supabase = supabase;


