import { Hanko } from '@teamhanko/hanko-elements'

if (!process.env.NEXT_PUBLIC_HANKO_API_URL) {
  throw new Error('Missing NEXT_PUBLIC_HANKO_API_URL environment variable')
}

const hankoApi: string = process.env.NEXT_PUBLIC_HANKO_API_URL!
const hanko: Hanko = new Hanko(hankoApi)

export default hanko
