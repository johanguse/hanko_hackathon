import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { validateJwtAndFetchUserId } from '@/lib/utils/validateJwtAndFetchUserId'

export async function GET() {
  const userID = await validateJwtAndFetchUserId()

  if (!userID) {
    return NextResponse.json({ success: false })
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