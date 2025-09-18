/**
 * Server-side Supabase client for API routes and server components.
 * Uses service role key when available to bypass RLS for trusted operations.
 * Falls back to anon key for public operations.
 * 
 * Purpose: Server-side Supabase client for API routes and server components
 * Usage: Import in API routes and server components
 * Security: Uses service role when available, anon key as fallback
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabaseServer = createClient(supabaseUrl, serviceKey)

