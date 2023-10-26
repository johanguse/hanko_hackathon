import React from 'react'
import type { GetServerSideProps, Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'

import { staticMetadata } from '@/config/siteMeta'
import prisma from '@/lib/prisma'
import getTransformedImages from '@/lib/utils/getTransformedImages'
import { validateJwtAndFetchUserId } from '@/lib/utils/validateJwtAndFetchUserId'

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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
  const data_images = await getData()
  const data = await getTransformedImages(data_images)
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data.map((image) => (
          <li key={image.id}>
            <p>Model ID: {image.imageSwapped}</p>
            <img
              className="w-1/2"
              src={image.imageUrl.publicUrl}
              alt={`Swapped Image for model ${image.modelId}`}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
