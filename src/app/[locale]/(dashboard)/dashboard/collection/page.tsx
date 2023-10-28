'use client'

import React from 'react'
import { useScopedI18n } from '@/locale/client'

import getTransformedImages from '@/lib/utils/getTransformedImages'
import { Text } from '@/components/common'

async function getDataImages() {
  const response = await fetch('/api/get-user-images', {
    method: 'GET',
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user images')
  }

  return await response.json()
}

export default async function DashboardPage() {
  const t = useScopedI18n('commons.dashboard')

  const data_images = await getDataImages()
  const data = await getTransformedImages(data_images)
  return (
    <div className="container mx-auto flex flex-col justify-center text-center">
      <Text labelToken={t('overviewTitle')} as="h1" medium />
      <Text labelToken={t('overviewSubtitle')} as="p" />
      <ul className="mt-10 grid grid-cols-3 gap-2">
        {data.map((image) => (
          <li key={image.id}>
            <img className="w-full" src={image.imageUrl.publicUrl} />
          </li>
        ))}
      </ul>
    </div>
  )
}
