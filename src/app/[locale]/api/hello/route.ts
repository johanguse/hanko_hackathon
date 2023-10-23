import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

import { validateJwtAndFetchUserId } from '@/lib/validateJwtAndFetchUserId'

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  const userID = validateJwtAndFetchUserId()

  return NextResponse.json({ message: 'Hello World get' }, { status: 200 })
}