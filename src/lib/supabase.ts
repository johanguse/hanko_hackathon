import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_PROJECT_URL environment variable'
  )
}

if (!supabaseKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY environment variable'
  )
}

const supabase = createClient(supabaseUrl, supabaseKey)

const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_BUCKET!

export { supabase, BUCKET_NAME }
