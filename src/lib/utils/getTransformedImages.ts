import { BUCKET_NAME, supabase } from '@/lib/supabase'

async function getImageUrl(pathToImage: string) {
  try {
    const { data: image_url } = await supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(pathToImage)
    return image_url
  } catch (error) {
    console.error('Failed to get the Image URL:', error)
    throw error
  }
}

async function transformImages(imagesArray: any) {
  const newImages = []

  for (const image of imagesArray) {
    const imageUrl = await getImageUrl(image.imageSwapped)
    if (imageUrl) {
      newImages.push({
        ...image,
        imageUrl,
      })
    }
  }

  return newImages
}

async function getTransformedImages(
  images: { imageSwapped: string; id: number; modelId: string }[]
) {
  const transformedImages = await transformImages(images)

  return transformedImages
}

export default getTransformedImages
