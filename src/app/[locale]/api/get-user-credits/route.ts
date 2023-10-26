import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { validateJwtAndFetchUserId } from '@/lib/utils/validateJwtAndFetchUserId'

export async function GET() {
  try {
    const userId = await validateJwtAndFetchUserId()
    const credits = await prisma.user.findUnique({
      where: {
        userId: userId,
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
    console.error('[CREATEUSER_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
