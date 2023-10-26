import { createClient } from '@supabase/supabase-js'

const { SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env

if (!process.env.SUPABASE_PROJECT_URL) {
  throw new Error('Missing required environment variable: SUPABASE_PROJECT_URL')
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    'Missing required environment variable: SUPABASE_SERVICE_ROLE_KEY'
  )
}

const supabase = createClient(
  SUPABASE_PROJECT_URL as string,
  SUPABASE_SERVICE_ROLE_KEY as string
)

export default supabase
