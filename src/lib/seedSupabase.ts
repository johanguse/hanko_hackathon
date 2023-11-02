import postgres from 'postgres'

import 'dotenv/config'

const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_DIRECT_URL

if (!dbUrl) {
  throw new Error("Couldn't find db url")
}
const sql = postgres(dbUrl)

async function main() {
  await sql`
        create or replace function public.decrease_credit (id_user text) 
        returns void as
        $$
            UPDATE "users"
            SET credits = credits - 1
            WHERE user_id =  id_user;
        $$ 
        language sql volatile;
        `
  await sql`
        create or replace function public.save_images_db()
        returns void as
        $$
        INSERT INTO generations_images (user_id, model_id, prompt, image_ai, image_swapped)
          VALUES (user_id, model_id, prompt, image_ai, image_swapped);
        $$
        language sql volatile;
      `

  console.log('Finished adding triggers and functions for profile handling.')
  process.exit()
}

main()
