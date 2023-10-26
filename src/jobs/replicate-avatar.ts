import { Replicate } from '@trigger.dev/replicate'
import { Resend } from '@trigger.dev/resend'
import { eventTrigger } from '@trigger.dev/sdk'
import { Supabase } from '@trigger.dev/supabase'
import { decode } from 'base64-arraybuffer'
import { z } from 'zod'

import prisma from '@/lib/prisma'
import { client } from '@/lib/trigger'

const replicate = new Replicate({
  id: 'replicate',
  apiKey: process.env.REPLICATE_API_TOKEN!,
})

const resend = new Resend({
  id: 'resend',
  apiKey: process.env.RESEND_API_KEY!,
})

const supabase = new Supabase({
  id: 'supabase',
  supabaseUrl: process.env.SUPABASE_PROJECT_URL!,
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
})

const urlToBase64 = async (image: string) => {
  const response = await fetch(image)
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const base64String = buffer.toString('base64')
  const mimeType = 'image/png'
  const dataURI = `data:${mimeType};base64,${base64String}`
  return dataURI
}

client.defineJob({
  id: 'generate-avatar',
  name: 'Generate Avatar',
  integrations: { resend, replicate, supabase },
  version: '0.0.2',
  trigger: eventTrigger({
    name: 'generate.avatar',
    schema: z.object({
      image: z.string(),
      email: z.string(),
      gender: z.string(),
      userPrompt: z.string().nullable(),
      userID: z.string(),
    }),
  }),
  run: async (payload, io, ctx) => {
    const { email, image, gender, userPrompt, userID } = payload

    //a status allows you to easily show the Job's progress in your UI
    const generatingCharacterStatus = await io.createStatus(
      'generating-character',
      {
        label: 'Generating placeholder to swap your face into',
        state: 'loading',
      }
    )
    const swappingFaceStatus = await io.createStatus('swapping-face', {
      label: 'Swapping face',
    })
    const supabaseSaveImageStatus = await io.createStatus('save-image', {
      label: 'Saving image',
    })
    const sendingEmailStatus = await io.createStatus('sending-email', {
      label: 'Sending email',
    })

    const imageGenerated = await io.replicate.run('create-model', {
      identifier:
        'stability-ai/sdxl:c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316',
      input: {
        prompt: `${
          userPrompt
            ? userPrompt
            : `A professional ${gender} portrait suitable for a social media avatar. Please ensure the image is appropriate for all audiences.`
        }`,
      },
    })

    if (imageGenerated.output === undefined || imageGenerated.error !== null) {
      await generatingCharacterStatus.update('generating-character-error', {
        label: 'Placeholder generation failed',
        state: 'failure',
      })

      if (imageGenerated.error !== null) {
        throw new Error(JSON.stringify(imageGenerated.error))
      }

      throw new Error('Character generation failed')
    }

    await generatingCharacterStatus.update('generating-character-success', {
      label: 'Placeholder character generated',
      state: 'success',
      data: {
        url: Array.isArray(imageGenerated.output)
          ? imageGenerated.output[0]
          : undefined,
      },
    })

    await swappingFaceStatus.update('swapping-face-loading', {
      state: 'loading',
    })
    const swappedImage = await io.replicate.run('create-image', {
      identifier:
        'lucataco/faceswap:9a4298548422074c3f57258c5d544497314ae4112df80d116f0d2109e843d20d',
      input: {
        target_image: await urlToBase64(imageGenerated.output),
        swap_image: 'data:image/png;base64,' + image,
      },
    })

    if (swappedImage.output === undefined || swappedImage.error !== null) {
      await generatingCharacterStatus.update('faceswap-error', {
        label: 'Face swap failed',
        state: 'failure',
      })

      if (swappedImage.error !== null) {
        throw new Error(JSON.stringify(swappedImage.error))
      }

      throw new Error('Character generation failed')
    }

    await swappingFaceStatus.update('swapping-face-success', {
      label: 'Face swapped',
      state: 'success',
      data: {
        url: swappedImage.output,
      },
    })

    await supabaseSaveImageStatus.update('save-image-loading', {
      state: 'loading',
    })

    async function saveImageToSupabase() {
      const seconds = Math.floor(Date.now() / 1000)

      const image_ai_name = `${userID}/${userID}_ai_${seconds}.png`
      const image_swapped_name = `${userID}/${userID}_swapped_${seconds}.png`

      // Use Promise.all to convert images to base64 concurrently
      const [imageAi, imageSwapped] = await Promise.all([
        urlToBase64(imageGenerated.output),
        urlToBase64(swappedImage.output),
      ])

      try {
        // Create an array of Promises
        const uploadPromises = [
          uploadImageToStorage(image_ai_name, imageAi),
          uploadImageToStorage(image_swapped_name, imageSwapped),
        ]

        // Wait for all Promises to complete
        const [responseSaveAiImage, responseSaveSwapeedImage] =
          await Promise.all(uploadPromises)

        return { responseSaveAiImage, responseSaveSwapeedImage }
      } catch (error) {
        console.error('Error while saving image to Supabase', error)
        throw error
      }
    }

    const uploadImageToStorage = async (imageName: string, image: string) => {
      const uploadOptions = {
        contentType: 'image/png',
        upsert: true,
      }

      // Check if image string contains 'base64'
      if (image.indexOf('base64') > -1) {
        image = image.split(',')[1]
      }

      return io.supabase.client.storage
        .from('hanko_hackathon')
        .upload(imageName, Buffer.from(image, 'base64'), uploadOptions)
    }

    // Usage example
    try {
      const imageSaved = await saveImageToSupabase()

      if (imageSaved.responseSaveAiImage.error !== null) {
        throw new Error(JSON.stringify(imageSaved.responseSaveAiImage.error))
      }
    } catch (error) {
      console.error('Error:', error)
    }

    await io.supabase.runTask('user-credit', async (db) => {
      const { data, error } = await io.supabase.client.rpc('decrease_credit', {
        userid: userID,
      })

      if (error) console.error(error)
      else console.log(data)
    })
    /*
    await io.supabase.runTask('user-credit', async () => {

      await prisma.user.update({
        where: {
          userId: userID,
        },
        data: {
          credits: {
            increment: 1,
          },
        },
      })
    })
*/
    await supabaseSaveImageStatus.update('save-image-success', {
      label: 'Image Saved!',
      state: 'success',
      data: {
        url: swappedImage.output,
      },
    })

    await sendingEmailStatus.update('sending-email-loading', {
      state: 'loading',
    })
    await io.resend.sendEmail('send-email', {
      from: 'Next SaaS <welcome@nextsaas.app>',
      to: [email],
      subject: 'Your avatar is ready! 🌟🤩',
      text: `Hi! \n View and download your avatar here - ${swappedImage.output}`,
    })
    await sendingEmailStatus.update('sending-email-success', {
      label: 'Email sent',
      state: 'success',
    })

    await io.logger.info('✨ Congratulations, the image has been delivered! ✨')

    return {
      image: swappedImage.output,
    }
  },
})
