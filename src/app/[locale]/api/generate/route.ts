import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

import { client } from '@/lib/trigger'
import getUserCredits from '@/lib/utils/getUserCredits'
import { validateJwtAndFetchUserId } from '@/lib/utils/validateJwtAndFetchUserId'

export async function POST(request: NextRequest) {
  const userID = await validateJwtAndFetchUserId()
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!userID) {
    return NextResponse.json({ success: false })
  }

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const totalCredits = await getUserCredits()

  if (totalCredits !== undefined && totalCredits <= 0) {
    console.log('totalCredits: ', totalCredits)
    return NextResponse.json('Out of credits. Please purchase more credits.', {
      status: 403,
    })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const image = Buffer.from(buffer).toString('base64')

  const new_data = {
    image,
    gender: data.get('gender') as string,
    email: data.get('email') as string,
    userPrompt: data.get('userPrompt') as string,
    userID: userID,
  }

  const path = `/tmp/${file.name}`
  await writeFile(path, buffer)

  const event = await client.sendEvent({
    name: 'generate.avatar',
    payload: new_data,
  })

  return NextResponse.json({ message: 'Processing!', eventId: event.id })
}
