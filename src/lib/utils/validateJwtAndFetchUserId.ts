import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import * as jose from 'jose'

const hankoApiUrl = process.env.NEXT_PUBLIC_HANKO_API_URL

export async function validateJwtAndFetchUserId() {
  const token = cookies().get('hanko')?.value

  if (!token) {
    return redirect('/login')
  }

  const JWKS = jose.createRemoteJWKSet(
    new URL(`${hankoApiUrl}/.well-known/jwks.json`)
  )

  let payload

  try {
    const verifiedJWT = await jose.jwtVerify(token, JWKS)
    payload = verifiedJWT.payload
  } catch {
    return redirect('/login')
  }

  const userID = payload.sub

  if (!userID) {
    return redirect('/login')
  }

  return userID
}
