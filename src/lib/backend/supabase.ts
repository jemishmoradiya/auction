import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables: SUPABASE_URL and/or SUPABASE_ANON_KEY');
}

// Client for public operations (respects RLS)
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

// Client for server-side admin operations (bypasses RLS)
export const supabaseAdmin = supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

/**
 * Creates a per-request Supabase client that respects RLS 
 * by using the user's JWT from the Authorization header.
 */
export function getSupabaseClient(authHeader?: string, extraHeaders?: Record<string, string>) {
    const headers: Record<string, string> = { ...extraHeaders };
    if (authHeader) headers.Authorization = authHeader;

    if (Object.keys(headers).length === 0) return supabasePublic;

    return createClient(supabaseUrl!, supabaseAnonKey!, {
        global: {
            headers: headers,
        },
    });
}
