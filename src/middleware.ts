import { type NextRequest } from 'next/server'
import { createI18nMiddleware } from 'next-international/middleware'

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',
})

export function middleware(request: NextRequest) {
  return I18nMiddleware(request)
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)'],
}
