import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { validateJwtAndFetchUserId } from '@/lib/utils/validateJwtAndFetchUserId'

export async function GET() {
  const userID = await validateJwtAndFetchUserId()

  if (!userID) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    let supauserimages

    try {
      supauserimages = await prisma.generationImage.findMany({
        where: {
          userId: userID,
        },
        select: {
          id: true,
          modelId: true,
          imageSwapped: true,
        },
        orderBy: {
          id: 'desc',
        },
      })
    } catch (error) {
      console.error(error)
    }

    return new NextResponse(JSON.stringify(supauserimages), { status: 200 })
  } catch (error) {
    console.error('[CREATEUSER_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
