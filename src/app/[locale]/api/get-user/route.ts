import type { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import * as jose from 'jose'

export function GET(request: NextApiRequest, response: NextApiResponse) {
  const token = cookies().get('hanko')?.value

  if (!token) {
    return NextResponse.json({ user_id: null }, { status: 200 })
  }

  const payload = jose.decodeJwt(token ?? '')

  return NextResponse.json({ user_id: payload.sub }, { status: 200 })
}
