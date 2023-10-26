import { TriggerClient } from '@trigger.dev/sdk'

export const client = new TriggerClient({
  id: 'hankohackathon-K0yA',
  apiKey: process.env.NEXT_PUBLIC_TRIGGER_API_KEY,
  apiUrl: process.env.NEXT_PUBLIC_TRIGGER_API_URL,
})
