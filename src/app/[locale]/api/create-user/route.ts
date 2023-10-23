import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

interface User {
  name: string
  userId: string
}

export async function POST(req: Request, res: Response) {
  try {
    const user = await req.json()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    let supauser

    try {
      supauser = await prisma.user.findUnique({
        where: {
          userId: user.id,
        },
      })
      if (!supauser) {
        supauser = await prisma.user.create({
          data: {
            userId: user.id,
          },
        })
      }
    } catch (error) {
      console.error(error)
    }

    const user_data = {
      ...user,
      id: supauser?.id,
    }

    return new NextResponse(JSON.stringify(user_data), { status: 200 })
  } catch (error) {
    console.log('[CREATEUSER_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
