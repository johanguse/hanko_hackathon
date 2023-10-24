import { Writable } from 'stream'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import formidable, { Fields, Files } from 'formidable'

import { client } from '@/lib/trigger'

type FormFields = {
  email: string[]
  gender: string[]
  userPrompt: string[]
}

const fileConsumer = (acc: Buffer[]) => {
  const writable = new Writable({
    write: (chunk, _enc, next) => {
      acc.push(chunk)
      next()
    },
  })

  return writable
}

const readFile = (request: NextApiRequest) => {
  const chunks: Buffer[] = []

  const form = formidable({
    keepExtensions: true,
    fileWriteStreamHandler: () => fileConsumer(chunks),
  })

  return new Promise<{
    image: string
    email: string
    gender: string
    userPrompt: string
  }>((resolve, reject) => {
    form.parse(
      request,
      (err: Error | null, fields: Fields<keyof FormFields>, files: Files) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          const { email = [], gender = [], userPrompt = [] } = fields

          const image = Buffer.concat(chunks).toString('base64')
          resolve({
            image,
            email: email[0],
            gender: gender[0],
            userPrompt: userPrompt[0],
          })
        }
      }
    )
  })
}

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  try {
    // Read file and get form fields
    const result = await readFile(request)

    // Send event with payload
    const event = await client.sendEvent({
      name: 'generate.avatar',
      payload: result,
    })
    console.log({ event })

    // Return status 200 with message and id
    return NextResponse.json({ message: 'Processing!', eventId: event.id })
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      // If known error, return status 500 with message
      console.log('[GENERATE_ERROR]', e)
      return new NextResponse('Internal Error', { status: 500 })
    } else {
      // If unknown error, return status 500 with generic 'Unknown error' message
      console.log('[GENERATE_ERROR]', e)
      return new NextResponse('Unknown error', { status: 500 })
    }
  }
}
