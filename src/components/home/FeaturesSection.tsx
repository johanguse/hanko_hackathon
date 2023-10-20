'use client'

import { FC, MouseEventHandler, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useScopedI18n } from '@/locale/client'
import { track } from '@vercel/analytics'

import { Button, Img, Text } from '@/components/common'
import { IconMoveDown } from '@/components/icons/MoveDown'

type Feature = {
  titleToken: string
  descriptionToken: string
  isAnimation?: boolean
  isSlider?: boolean
  imgUrls?: { before: string; after: string }
  animationUrl?: string
  link: string
}

const features: Feature[] = [
  {
    titleToken: 'Photo Restoration',
    descriptionToken:
      'Improve or restore images by deblurring, removing noise or scratches',
    isSlider: true,
    imgUrls: {
      before: '/images/old_before.jpg',
      after: '/images/old_after.jpg',
    },
    link: '/restore-photo-image',
  },
  {
    titleToken: 'Image upscaler',
    descriptionToken:
      'Upscaling tool that create high-quality images from low-quality images',
    isSlider: true,
    imgUrls: {
      before: '/images/upscaler_before.jpg',
      after: '/images/upscaler_after.jpg',
    },
    link: '/quality-resolution-enhancer',
  },
  {
    titleToken: 'Remove background',
    descriptionToken: 'A deep learning approach to remove background',
    isSlider: true,
    imgUrls: {
      before: '/images/rembg_before.jpg',
      after: '/images/rembg_after.png',
    },
    link: '/remove-background',
  },
  {
    titleToken: 'Colorize photo',
    descriptionToken: 'Add colours to old photos or any black and white images',
    isSlider: true,
    imgUrls: {
      before: '/images/colorize_before.jpg',
      after: '/images/colorize_after.jpg',
    },
    link: '/colorize-image',
  },
]

const scrollToFeatures = () => {
  const element = document.getElementById('features')

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', inline: 'start' })
  } else {
    console.error("Element with ID 'features' not found")
  }
}

export const FeaturesSection = () => {
  const t = useScopedI18n('home')
  return (
    <>
      <section>
        <Button
          labelToken={t('features')}
          Icon={IconMoveDown}
          iconPlacement="right"
          className="mx-auto mt-32"
          onClick={() => {
            track('Scroll Explore features', { location: 'home' })
            scrollToFeatures()
          }}
        />
      </section>
      <section
        id="features"
        className="mx-auto mb-2 mt-40 grid scroll-mt-48 grid-cols-1 gap-4 px-4 md:scroll-mt-28 md:grid-cols-2 lg:max-w-6xl lg:grid-cols-2 lg:px-0"
      >
        {features.map((feature) => (
          <FeatureBox key={feature.titleToken} {...{ feature }} />
        ))}
      </section>
    </>
  )
}

type FeatureBoxProps = {
  feature: Feature
  imgUrls?: {
    before: string
    after: string
  }
  altTextToken?: string
}
const FeatureBox: FC<FeatureBoxProps> = ({
  feature: { titleToken, descriptionToken, isSlider, imgUrls, link },
}) => {
  return (
    <Link
      href={link}
      className="group relative h-96 rounded-xl border border-gray-300 bg-white p-6 dark:border-none dark:bg-gray-900"
    >
      {isSlider && imgUrls && (
        <ImageSlider {...{ imgUrls }} altTextToken={titleToken} />
      )}
      <FakeButton labelToken={titleToken} />
      <article className="absolute top-64 pr-3">
        <Text as="h1" size="xl" labelToken={titleToken} className="mb-2" bold />
        <Text as="p" size="sm" labelToken={descriptionToken} medium />
      </article>
    </Link>
  )
}

type ImgUrls = {
  before: string
  after: string
}

type ImageSliderProps = {
  imgUrls: ImgUrls
  altTextToken: string
}

const ImageSlider: FC<ImageSliderProps> = ({
  imgUrls: { before, after },
  altTextToken,
}) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const sliderRef = useRef<HTMLInputElement>(null)

  const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    ({ clientX, currentTarget }) => {
      const { right, left } = currentTarget.getBoundingClientRect()
      const percentage = (((clientX - left) * 100) / (right - left)).toFixed(2)
      imgRef.current?.setAttribute(
        'style',
        `clip-path: polygon(0px 0px, ${percentage}% 0px, ${percentage}% 100%, 0px 100%);`
      )
      sliderRef.current?.setAttribute('style', `left: ${percentage}%;`)
    },
    []
  )

  const onMouseLeave = useCallback(() => {
    imgRef.current?.setAttribute(
      'style',
      `clip-path: polygon(0px 0px, 50% 0px, 50% 100%, 0px 100%);`
    )
    sliderRef.current?.setAttribute('style', `left: 50%;`)
  }, [])

  return (
    <div
      {...{ onMouseMove, onMouseLeave }}
      className={`
          absolute left-0 top-0 z-20 h-60 w-full overflow-hidden rounded-t-xl
          duration-500 hover:rounded-b-xl group-hover:h-full
        `}
    >
      <Img
        ref={imgRef}
        src={before}
        alt={altTextToken}
        className="absolute z-20 h-full w-full object-cover"
        style={{ clipPath: 'polygon(0px 0px, 50% 0px, 50% 100%, 0px 100%)' }}
      />
      <Img
        src={after}
        alt={altTextToken}
        className="transparent-image-background absolute h-full w-full bg-white object-cover"
      />
      <div
        ref={sliderRef}
        className="absolute left-1/2 z-30 h-full w-px bg-gray-400/25"
      />
    </div>
  )
}

interface IFakeButtonProps {
  labelToken: string
}

const FakeButton: React.FC<IFakeButtonProps> = ({ labelToken }) => {
  return (
    <div className="duration-400 absolute bottom-8 right-8 z-30 hidden group-hover:flex">
      <div className="flex flex-row items-center rounded-lg bg-indigo-700 px-5 py-3 text-white">
        <div className="font-semibold">{labelToken}</div>
        <IconMoveDown className="stroke-3 ml-2 h-4 w-4" />
      </div>
    </div>
  )
}
