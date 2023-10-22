import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import * as jose from 'jose'

export function validateJwtAndFetchUserId() {
  const token = cookies().get('hanko')?.value

  if (!token) {
    return redirect('/login')
  }

  let payload

  try {
    payload = jose.decodeJwt(token)
  } catch (err) {
    console.error(err)
    return redirect('/login')
  }

  const userID = payload.sub

  if (!userID) {
    return redirect('/login')
  }

  return userID
}
