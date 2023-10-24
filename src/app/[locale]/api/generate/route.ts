import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

import { client } from '@/lib/trigger'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  console.log(data)

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // create new arrary from data and const image = Buffer.concat(chunks).toString("base64");
  const image = Buffer.from(buffer).toString('base64')

  const new_data = {
    image,
    gender: data.get('gender') as string,
    email: data.get('email') as string,
    userPrompt: data.get('userPrompt') as string,
  }

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `/tmp/${file.name}`
  await writeFile(path, buffer)
  console.log(`open ${path} to see the uploaded file`)

  const event = await client.sendEvent({
    name: 'generate.avatar',
    payload: new_data,
  })

  return NextResponse.json({ message: 'Processing!', eventId: event.id })
}
