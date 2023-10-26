import { Replicate } from '@trigger.dev/replicate'
import { Resend } from '@trigger.dev/resend'
import { eventTrigger } from '@trigger.dev/sdk'
import { Supabase } from '@trigger.dev/supabase'
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

    // Create a function to get the image name
    const getImageName = (userID: string, suffix: string) =>
      `${userID}/${userID}_${suffix}_${Math.floor(Date.now() / 1000)}.png`

    const uploadImageToStorage = async (image: string, imageName: string) => {
      const uploadOptions = { contentType: 'image/png', upsert: true }

      if (image.includes('base64')) {
        image = image.split(',')[1]
      }

      try {
        const result = await io.supabase.client.storage
          .from('hanko_hackathon')
          .upload(imageName, Buffer.from(image, 'base64'), uploadOptions)

        if (!result.error) {
          const publicUrlResponse = io.supabase.client.storage
            .from('hanko_hackathon')
            .getPublicUrl(imageName)

          if (publicUrlResponse.data && publicUrlResponse.data.publicUrl) {
            return publicUrlResponse.data.publicUrl
          } else {
            throw new Error('Failed to retrieve public URL from Supabase.')
          }
        } else {
          throw new Error(
            `Error while saving image to Supabase: ${result.error.message}`
          )
        }
      } catch (error) {
        console.error('Error while saving image to Supabase:', error)
        throw error
      }
    }

    const saveImageToDatabase = async (
      imageNameAI: string,
      imageNameSwapped: string
    ) => {
      try {
        return await io.supabase.client.from('generations_images').insert([
          {
            user_id: userID,
            model_id:
              'stability-ai/sdxl:c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316',
            prompt: userPrompt,
            image_ai: 'imageNameAI',
            image_swapped: 'imageNameSwapped',
          },
        ])
      } catch (error) {
        console.error('Error while saving image to Supabase:', error)
        throw error
      }
    }

    const saveImageToSupabase = async (): Promise<{
      responseSaveAiImage: any
      responseSaveSwappedImage: any
      image_ai_name: any
      image_swapped_name: any
    }> => {
      const image_ai_name = getImageName(userID, 'ai')
      const image_swapped_name = getImageName(userID, 'swapped')

      const [imageAi, imageSwapped] = await Promise.all([
        urlToBase64(imageGenerated.output),
        urlToBase64(swappedImage.output),
      ])

      const uploadPromises = [
        uploadImageToStorage(imageAi, image_ai_name),
        uploadImageToStorage(imageSwapped, image_swapped_name),
      ]

      const [responseSaveAiImage, responseSaveSwappedImage] =
        await Promise.all(uploadPromises)

      // Return responses as well as image name
      return {
        responseSaveAiImage,
        responseSaveSwappedImage,
        image_ai_name,
        image_swapped_name,
      }
    }

    // Usage example
    try {
      const {
        responseSaveAiImage,
        responseSaveSwappedImage,
        image_ai_name,
        image_swapped_name,
      } = await saveImageToSupabase()

      await io.logger.info('image ' + image_ai_name + ' saved')
      await io.logger.info('image ' + image_swapped_name + ' saved')

      await io.supabase.runTask('save-images', async () => {
        const { data, error } = await io.supabase.client.rpc('save_images_db', {
          user_id: userID,
          model_id:
            'stability-ai/sdxl:c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316',
          prompt: userPrompt,
          image_ai: image_ai_name,
          image_swapped: image_swapped_name,
        })

        if (error) console.error(error)
        else console.log(data)
      })

      // Save image paths to the database
      await io.supabase.runTask('user-credit', async (db) => {
        const { data, error } = await io.supabase.client.rpc(
          'decrease_credit',
          {
            user_id: userID,
          }
        )

        if (error) console.error(error)
        else console.log(data)
      })
    } catch (error) {
      console.error('Error:', error)
    }
    /*
    await io.supabase.runTask('user-credit', async (db) => {
      const { data, error } = await io.supabase.client.rpc('decrease_credit', {
        user_id: userID,
      })

      if (error) console.error(error)
      else console.log(data)
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
