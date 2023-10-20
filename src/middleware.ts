import { NextRequest, NextResponse } from 'next/server'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import { createI18nMiddleware } from 'next-international/middleware'

const hankoApiUrl = process.env.NEXT_PUBLIC_HANKO_API_URL

const JWKS = createRemoteJWKSet(new URL(`${hankoApiUrl}/.well-known/jwks.json`))

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',
})

async function jwtMiddleware(req: NextRequest) {
  const hanko = req.cookies.get('hanko')?.value
  try {
    const verifiedJWT = await jwtVerify(hanko ?? '', JWKS)
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export function middleware(req: NextRequest) {
  const jwtResponse = jwtMiddleware(req)
  if (jwtResponse instanceof NextResponse) {
    return jwtResponse
  }
  return I18nMiddleware(req)
}

export const config = {
  matcher: ['/dashboard', '/((?!.*\\..*|_next).*)'],
}
