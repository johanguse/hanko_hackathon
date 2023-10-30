import { Replicate } from '@trigger.dev/replicate'
import { Resend } from '@trigger.dev/resend'
import { eventTrigger } from '@trigger.dev/sdk'
import { Supabase } from '@trigger.dev/supabase'
import { z } from 'zod'

import { BUCKET_NAME } from '@/lib/supabase'
import { client } from '@/lib/trigger'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined')
}

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error('REPLICATE_API_TOKEN is not defined')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_PROJECT_URL is not defined')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY is not defined')
}

// set env variables
const resendApiKey = process.env.RESEND_API_KEY
const replicateApiKey = process.env.REPLICATE_API_TOKEN
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY

const resend = new Resend({
  id: 'resend',
  apiKey: resendApiKey,
})

const replicate = new Replicate({
  id: 'replicate',
  apiKey: replicateApiKey,
})

const supabase = new Supabase({
  id: 'supabase',
  supabaseUrl: supabaseUrl,
  supabaseKey: supabaseApiKey,
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

type Language = 'en' | 'es'
type StringsMap = {
  [key in Language]: {
    'generating-character': string
    'swapping-face': string
    'save-image': string
    'sending-email': string
    'email-sent': string
    'email-failed': string
    'out-of-credits': string
    'generating-character-error': string
    'swapping-face-error': string
    'save-image-error': string
    'sending-email-error': string
    'generating-character-success': string
    'swapping-face-success': string
    'save-image-success': string
    'sending-email-success': string
    'email-subject': string
    'email-body-hi': string
    'email-body': string
  }
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
      currentLanguage: z.string().length(2),
    }),
  }),
  run: async (payload, io, ctx) => {
    const { email, image, gender, userPrompt, userID, currentLanguage } =
      payload

    function isLanguage(lang: string): lang is Language {
      return lang === 'en' || lang === 'es'
    }

    if (!isLanguage(currentLanguage)) {
      throw new Error(`Invalid language: ${currentLanguage}`)
    }

    const strings: StringsMap = {
      en: {
        'generating-character': 'Generating placeholder to swap your face into',
        'swapping-face': 'Swapping face',
        'save-image': 'Saving image',
        'sending-email': 'Sending email',
        'email-sent': 'Email sent',
        'email-failed': 'Email failed',
        'out-of-credits': 'Out of credits. Please purchase more credits',
        'generating-character-error': 'Placeholder generation failed',
        'swapping-face-error': 'Face swapping failed',
        'save-image-error': 'Image saving failed',
        'sending-email-error': 'Email sending failed',
        'generating-character-success': 'Placeholder character generated',
        'swapping-face-success': 'Face swapped',
        'save-image-success': 'Image saved',
        'sending-email-success': 'Email sent',
        'email-subject': 'Your avatar is ready!',
        'email-body-hi': 'Hi!',
        'email-body': 'View and download your avatar here',
      },

      es: {
        'generating-character': 'Generando placeholder para cambiar tu cara',
        'swapping-face': 'Cambiando cara',
        'save-image': 'Guardando imagen',
        'sending-email': 'Enviando correo',
        'email-sent': 'Correo enviado',
        'email-failed': 'Correo fallido',
        'out-of-credits':
          'Sin créditos. Por favor, compre créditos adicionales',
        'generating-character-error': 'Fallo al generar placeholder',
        'swapping-face-error': 'Fallo al cambiar cara',
        'save-image-error': 'Fallo al guardar imagen',
        'sending-email-error': 'Fallo al enviar correo',
        'generating-character-success': 'Personaje placeholder generado',
        'swapping-face-success': 'Cara cambiada',
        'save-image-success': 'Imagen guardada',
        'sending-email-success': 'Correo enviado',
        'email-subject': 'Tu avatar está listo!',
        'email-body-hi': 'Hola!',
        'email-body': 'Ver y descargar tu avatar aquí',
      },
    }

    const textCurrentLanguage = strings[currentLanguage]

    //a status allows you to easily show the Job's progress in your UI
    const generatingCharacterStatus = await io.createStatus(
      'generating-character',
      {
        label: textCurrentLanguage['generating-character'],
        state: 'loading',
      }
    )
    const swappingFaceStatus = await io.createStatus('swapping-face', {
      label: textCurrentLanguage['swapping-face'],
    })
    const supabaseSaveImageStatus = await io.createStatus('save-image', {
      label: textCurrentLanguage['save-image'],
    })
    const sendingEmailStatus = await io.createStatus('sending-email', {
      label: textCurrentLanguage['sending-email'],
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
        label: textCurrentLanguage['generating-character-error'],
        state: 'failure',
      })

      if (imageGenerated.error !== null) {
        throw new Error(JSON.stringify(imageGenerated.error))
      }

      throw new Error('Character generation failed')
    }

    await generatingCharacterStatus.update('generating-character-success', {
      label: textCurrentLanguage['generating-character-success'],
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
        label: textCurrentLanguage['swapping-face-error'],
        state: 'failure',
      })

      if (swappedImage.error !== null) {
        throw new Error(JSON.stringify(swappedImage.error))
      }

      throw new Error('Character generation failed')
    }

    await swappingFaceStatus.update('swapping-face-success', {
      label: textCurrentLanguage['swapping-face-success'],
      state: 'success',
      data: {
        url: swappedImage.output,
      },
    })

    await supabaseSaveImageStatus.update('save-image-loading', {
      state: 'loading',
    })

    interface ImageSaveResponse {
      responseSaveAiImage: string
      responseSaveSwappedImage: string
      image_ai_name: string
      image_swapped_name: string
    }

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
          .from(BUCKET_NAME)
          .upload(imageName, Buffer.from(image, 'base64'), uploadOptions)

        if (!result.error) {
          const publicUrlResponse = io.supabase.client.storage
            .from(BUCKET_NAME)
            .getPublicUrl(imageName)

          if (publicUrlResponse.data && publicUrlResponse.data.publicUrl) {
            return publicUrlResponse.data.publicUrl
          } else {
            await io.logger.info('Failed to retrieve public URL from Supabase.')
            throw new Error('Failed to retrieve public URL from Supabase.')
          }
        } else {
          await io.logger.info(
            `Failed to retrieve public URL from Supabase: ${result.error.message}`
          )
          throw new Error(
            `Error while saving image to Supabase: ${result.error.message}`
          )
        }
      } catch (error) {
        console.error('Error while saving image to Supabase:', error)
        throw error
      }
    }

    const saveImageToSupabase = async (): Promise<ImageSaveResponse> => {
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

    // Usage
    try {
      const { image_ai_name, image_swapped_name } = await saveImageToSupabase()

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
        else console.error(data)
      })

      await io.supabase.runTask('user-credit', async (db) => {
        const { data, error } = await io.supabase.client.rpc(
          'decrease_credit',
          {
            id_user: userID,
          }
        )

        if (error) console.error(error)
        else console.error(data)
      })
    } catch (error) {
      console.error('Error:', error)
    }

    await supabaseSaveImageStatus.update('save-image-success', {
      label: textCurrentLanguage['save-image-success'],
      state: 'success',
    })

    await sendingEmailStatus.update('sending-email-loading', {
      state: 'loading',
    })
    await io.resend.sendEmail('send-email', {
      from: 'AI Magic <welcome@nextsaas.app>',
      to: [email],
      subject: textCurrentLanguage['email-subject'],
      text: `${textCurrentLanguage['email-body-hi']}\n\n${textCurrentLanguage['email-body']}\n\n${swappedImage.output}`,
    })
    await sendingEmailStatus.update('sending-email-success', {
      label: textCurrentLanguage['sending-email-success'],
      state: 'success',
    })

    await io.logger.info('✨ Congratulations, the image has been delivered! ✨')

    return {
      image: swappedImage.output,
    }
  },
})
