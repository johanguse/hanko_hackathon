import { createClient } from '@supabase/supabase-js'

const {
  NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
  NEXT_PUBLIC_SUPABASE_BUCKET,
} = process.env

function validateEnvVariable(variable: string | undefined, name: string) {
  if (!variable) {
    throw new Error(`Missing ${name} environment variable file`)
  }
}

validateEnvVariable(
  NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  'NEXT_PUBLIC_SUPABASE_PROJECT_URL'
)
validateEnvVariable(
  NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
  'NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY'
)

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
  NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
)

let BUCKET_NAME: string

if (NEXT_PUBLIC_SUPABASE_BUCKET) {
  BUCKET_NAME = NEXT_PUBLIC_SUPABASE_BUCKET
} else {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_BUCKET environment variable')
}

export { supabase, BUCKET_NAME }
