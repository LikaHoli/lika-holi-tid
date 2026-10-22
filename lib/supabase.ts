import {createClient} from '@supabase/supabase-js';
// Publishable browser key. Authorization is enforced by database RLS, never by this key.
export const supabase=createClient('https://sgvdqukglzhrujntrarx.supabase.co','sb_publishable_1cjY5Pg75NM2hOTN5Pr9Ow_-BjKV0FV',{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'}});
export const appUrl='https://likaholi.github.io/lika-holi-tid/';
