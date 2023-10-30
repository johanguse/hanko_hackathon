'use client'

import React, { useEffect, useState } from 'react'
import { useScopedI18n } from '@/locale/client'
import { Download, FilePlus2 } from 'lucide-react'

import { supabase } from '@/lib/supabase'
import getTransformedImages from '@/lib/utils/getTransformedImages'
import { Button } from '@/components/ui/Button'
import { Button as ButtonUI, Text } from '@/components/common'

interface ImageData {
  id: number
  modelId: string
  imageSwapped: string
  imageUrl: { publicUrl: string }
  userID: string
}

if (!process.env.NEXT_PUBLIC_SUPABASE_BUCKET) {
  throw new Error('NEXT_PUBLIC_SUPABASE_BUCKET is not defined')
}

const SupabaseBucket: string = process.env.NEXT_PUBLIC_SUPABASE_BUCKET

function downloadBlob(blob: Blob, name = 'file') {
  const blobUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = blobUrl
  link.download = name

  document.body.appendChild(link)
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  )

  // Remove link from body
  document.body.removeChild(link)
}

async function downloadFile(file: string) {
  try {
    const { data, error } = await supabase.storage
      .from(SupabaseBucket)
      .download(file)

    if (error) {
      throw error
    }

    if (data) {
      downloadBlob(data, file)
    } else {
      console.error('No data available to download')
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error downloading image: ', error.message)
    } else {
      console.error('Error downloading image: ', error)
    }
  }
}

async function getDataImages(
  abortController: AbortController
): Promise<ImageData[]> {
  const response = await fetch('/api/get-user-images', {
    method: 'GET',
    cache: 'no-cache',
    signal: abortController.signal,
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user images')
  }

  return await response.json()
}

const DashboardPage: React.FC = () => {
  const t = useScopedI18n('commons.dashboard')

  const [data, setData] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    let isCancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data_images = await getDataImages(abortController)
        if (isCancelled) return

        const transformedData = await getTransformedImages(data_images)
        setData(transformedData)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('Fetch aborted')
        } else {
          if (err instanceof Error) {
            setError(err.message)
          }
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    void fetchData()

    return () => {
      isCancelled = true
      abortController.abort()
    }
  }, [])

  if (error) return <div>Error: {error}</div>

  function renderSkeletonLoader() {
    return (
      <div className="mt-10">
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white/5 p-4">
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="skeleton-loader h-[400px] w-full animate-pulse bg-gray-200"
              ></div>
            ))}
        </div>
      </div>
    )
  }

  function renderContent() {
    return data.length === 0 ? (
      <div className="mt-10">
        <Text
          className="my-8"
          labelToken={t('createFirstAvatar')}
          as="h3"
          medium
        />
        <FilePlus2 className="mx-auto my-4 h-24 w-24 text-black" />
        <ButtonUI
          href="/dashboard/generate"
          className="mt-4 inline-flex px-8 py-4 font-bold"
          variant="primary"
        >
          {t('buttonGenerate')}
        </ButtonUI>
      </div>
    ) : (
      <ul className="mt-10 grid grid-cols-3 gap-2">
        {data.map((image) => (
          <li key={image.id}>
            <div className="relative">
              <div className="absolute right-4 top-4">
                <Button
                  variant={'outline'}
                  className="px-2 py-2"
                  size={'icon'}
                  onClick={() => {
                    downloadFile(image.imageSwapped).catch((err) =>
                      console.error('Error handling the click event:', err)
                    )
                  }}
                >
                  <Download className="h-5 w-5 bg-opacity-75" />
                </Button>
              </div>
              <img className="w-full" src={image.imageUrl.publicUrl} />
            </div>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="container mx-auto flex flex-col justify-center text-center">
      <Text labelToken={t('overviewTitle')} as="h1" medium />
      <Text labelToken={t('overviewSubtitle')} as="p" />

      {loading ? renderSkeletonLoader() : renderContent()}
    </div>
  )
}

export default DashboardPage
