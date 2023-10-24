import { createAppRoute } from '@trigger.dev/nextjs'

import { client } from '@/lib/trigger'

import '@/jobs/replicate-avatar'

export const { POST, dynamic } = createAppRoute(client)
