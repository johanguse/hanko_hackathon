import React from 'react'
import type { Metadata } from 'next'
import { getI18n } from '@/locale/server'

import { staticMetadata } from '@/config/siteMeta'
import prisma from '@/lib/prisma'
import getTransformedImages from '@/lib/utils/getTransformedImages'
import { validateJwtAndFetchUserId } from '@/lib/utils/validateJwtAndFetchUserId'
import { Text } from '@/components/common'

export const metadata: Metadata = {
  ...staticMetadata.dashboard,
}

async function getData() {
  const userId = await validateJwtAndFetchUserId()

  const images = await prisma.generationImage.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      modelId: true,
      imageSwapped: true,
    },
  })
  return images
}

export default async function DashboardPage() {
  const t = await getI18n()

  const data_images = await getData()
  const data = await getTransformedImages(data_images)
  return (
    <div className="container mx-auto flex flex-col justify-center text-center">
      <Text labelToken={t('commons.dashboard.overviewTitle')} as="h1" medium />
      <Text labelToken={t('commons.dashboard.overviewSubtitle')} as="p" />
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
