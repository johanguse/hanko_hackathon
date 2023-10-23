import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import * as jose from 'jose'

if (!process.env.NEXT_PUBLIC_HANKO_API_URL) {
  throw new Error('Missing NEXT_PUBLIC_HANKO_API_URL environment variable')
}

const hankoApiUrl: string = process.env.NEXT_PUBLIC_HANKO_API_URL!

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
  } catch (err) {
    if (err instanceof jose.JWTInvalid) {
      return redirect('/invalid-token')
    }
    return redirect('/login')
  }

  const userID = payload.sub

  if (!userID) {
    return redirect('/login')
  }

  return userID
}
