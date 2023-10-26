export function getHankoApiUrl(): string {
  if (!process.env.NEXT_PUBLIC_HANKO_API_URL) {
    throw new Error('Missing NEXT_PUBLIC_HANKO_API_URL environment variable')
  }

  return process.env.NEXT_PUBLIC_HANKO_API_URL
}
