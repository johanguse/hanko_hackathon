import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEventRunStatuses } from '@trigger.dev/react'

import { Text } from '@/components/common'

export default function Result() {
  const router = useRouter()
  const eventId = router.query.eventId as string
  const { fetchStatus, error, statuses, run } = useEventRunStatuses(eventId)

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Head>
        <title>Your avatar</title>
      </Head>
      <h2 className="mb-2 text-3xl font-bold">Thank you! 🌟</h2>

      <div className="flex flex-col gap-1">
        {fetchStatus === 'loading' ? (
          <p>Loading...</p>
        ) : fetchStatus === 'error' ? (
          <p>{error.message}</p>
        ) : (
          statuses.map((status) => (
            <div key={status.key} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {status.state === 'failure' ? (
                  <Text labelToken="Generation failed" as="p" />
                ) : status.state === 'success' ? (
                  <Text labelToken="Generation success" as="p" />
                ) : status.state === 'loading' ? (
                  <Text labelToken="Generation loading" as="p" />
                ) : (
                  <Text labelToken="Generation pending" as="p" />
                )}
                <div className="flex items-center gap-1.5">
                  <h4 className="text-base">{status.label}</h4>
                </div>
              </div>
              {status.data && typeof status.data.url === 'string' && (
                <img className="w-1/2" src={status.data.url} />
              )}
            </div>
          ))
        )}
        {run?.status === 'FAILURE' &&
          run.output &&
          typeof run.output.message === 'string' && (
            <p className="my-4 rounded border border-red-300 bg-red-200 p-2 text-red-600">
              Generation failed: {run.output.message}
            </p>
          )}
      </div>

      <p className="mb-4 text-center">
        Your image will be delivered to your email, once it is ready! 💫
      </p>
      <p>{eventId}</p>
      <Link
        href="/"
        className="rounded bg-blue-500 px-4 py-3 text-white hover:bg-blue-600"
      >
        Generate another
      </Link>
    </div>
  )
}
