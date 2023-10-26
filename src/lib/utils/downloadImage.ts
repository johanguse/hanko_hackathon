function downloadBlobPNG(blob: Blob, filename: string) {
  const lnk = document.createElement('a')
  lnk.download = filename
  lnk.href = URL.createObjectURL(blob)
  lnk.dispatchEvent(new MouseEvent('click'))
}

export function downloadImage(image: HTMLImageElement, filename: string) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Failed to get canvas context')
  }

  canvas.width = image.width
  canvas.height = image.height
  ctx.drawImage(image, 0, 0)

  canvas.toBlob((blob) => {
    if (blob) {
      downloadBlobPNG(blob, filename)
    }
  }, 'image/png')
}
