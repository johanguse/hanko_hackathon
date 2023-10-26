import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
)

const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_BUCKET!

export { supabase, BUCKET_NAME }
