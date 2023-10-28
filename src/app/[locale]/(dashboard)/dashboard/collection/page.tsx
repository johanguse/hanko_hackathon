'use client'

import React, { useEffect, useState } from 'react'
import { useScopedI18n } from '@/locale/client'

import getTransformedImages from '@/lib/utils/getTransformedImages'
import { Text } from '@/components/common'

interface ImageData {
  id: number
  modelId: string
  imageSwapped: string
  imageUrl: { publicUrl: string }
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
        console.log('transformedData', transformedData)
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

  return (
    <div className="container mx-auto flex flex-col justify-center text-center">
      <Text labelToken={t('overviewTitle')} as="h1" medium />
      <Text labelToken={t('overviewSubtitle')} as="p" />
      {loading ? (
        <div className="mt-10">
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-3 gap-2">
          {data.map((image) => (
            <li key={image.id}>
              <img className="w-full" src={image.imageUrl.publicUrl} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DashboardPage
