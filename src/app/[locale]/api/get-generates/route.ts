import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { validateJwtAndFetchUserId } from '@/lib/utils/validateJwtAndFetchUserId'

export async function POST() {
  const userID = await validateJwtAndFetchUserId()

  if (!userID) {
    return NextResponse.json({ success: false })
  }

  try {
    let supauser

    try {
      supauser = await prisma.generationImage.findMany({
        select: {
          id: true,
          modelId: true,
          userId: true,
          imageSwapped: true,
        },
        where: {
          userId: userID,
        },
      })
    } catch (error) {
      console.error(error)
    }

    return new NextResponse(JSON.stringify(supauser), { status: 200 })
  } catch (error) {
    console.error('[CREATEUSER_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
