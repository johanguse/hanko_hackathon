'use client'

import { useParams } from 'next/navigation'
import { useScopedI18n } from '@/locale/client'
import { useEventRunStatuses } from '@trigger.dev/react'
import { CheckCheck, ClockIcon, ReplaceIcon, XCircle } from 'lucide-react'

import { Text } from '@/components/common'
import { Button } from '@/components/common/Button'

export default function Result() {
  const t = useScopedI18n('commons.dashboard.resultPage')
  const params = useParams()
  let uid: string | undefined = ''
  if (Array.isArray(params?.id)) {
    uid = params.id.length > 0 ? params.id[0] : undefined
  } else {
    uid = params?.id
  }

  const { fetchStatus, error, statuses, run } = useEventRunStatuses(uid)

  return (
    <div className="container mx-auto flex flex-col justify-center text-center">
      <h1 className="mb-10 text-3xl font-bold">{t('thanks')}</h1>

      <div className="flex flex-col gap-1">
        {fetchStatus === 'loading' ? (
          <p>Loading...</p>
        ) : fetchStatus === 'error' ? (
          <p>{error.message}</p>
        ) : (
          statuses.map((status) => (
            <div key={status.key} className="flex flex-col items-center gap-1">
              <div className="mb-4 flex flex-col items-center gap-2">
                {status.state === 'failure' ? (
                  <XCircle className="h-8 w-8 text-red-500" />
                ) : status.state === 'success' ? (
                  <CheckCheck className="h-8 w-8 text-green-500" />
                ) : status.state === 'loading' ? (
                  <ReplaceIcon className="h-8 w-8 text-blue-500" />
                ) : (
                  <ClockIcon className="h-8 w-8 text-slate-500" />
                )}
                <div className="flex items-center gap-1.5">
                  <h4 className="text-base">{status.label}</h4>
                </div>
              </div>
              {status.data && typeof status.data.url === 'string' && (
                <img className="mb-10 w-full lg:w-1/2" src={status.data.url} />
              )}
            </div>
          ))
        )}
        {run?.status === 'FAILURE' &&
          run.output &&
          typeof run.output.message === 'string' && (
            <>
              <div className="flex w-1/2 flex-col items-center justify-center rounded border border-red-300 p-2 py-4 text-black">
                <XCircle className="mb-4 h-8 w-8 text-red-500" />
                <Text
                  className="text-red"
                  labelToken={t('generationFail')}
                  as="p"
                  medium
                />
                <Text
                  className="text-red"
                  labelToken={run.output.message}
                  as="p"
                />
              </div>
            </>
          )}
      </div>

      <Text className="my-8" labelToken={t('whenImageIsReady')} as="p" medium />
      <Button
        href="/dashboard/generate"
        className="mx-auto px-8 py-4 font-bold"
        variant="secondary"
      >
        {t('buttonAnother')}
      </Button>
    </div>
  )
}
