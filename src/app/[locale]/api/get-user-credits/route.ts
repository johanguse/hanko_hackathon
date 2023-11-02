import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { validateJwtAndFetchUserId } from '@/lib/utils/validateJwtAndFetchUserId'

export async function GET() {
  try {
    const userID = await validateJwtAndFetchUserId()

    if (!userID) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const credits = await prisma.user.findUnique({
      where: {
        userId: userID,
      },
      select: {
        credits: true,
      },
    })

    if (!credits) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    return new NextResponse(JSON.stringify(credits), { status: 200 })
  } catch (error) {
    console.error('[GETUSERCREDITS_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
