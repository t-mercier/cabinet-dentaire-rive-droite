/**
 * Client-side Supabase client for browser usage.
 * Uses anon key for public operations like testimonials submission.
 * 
 * Purpose: Browser-safe Supabase client for client-side operations
 * Usage: Import in client components for public data access
 * Security: Only uses anon key - no service role access
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

