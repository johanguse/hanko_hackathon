'use client'

import { FC, MouseEventHandler, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCurrentLocale, useScopedI18n } from '@/locale/client'

import { Img, Text } from '@/components/common'
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

const featuresEN: Feature[] = [
  {
    titleToken: 'AI Avatar Generator',
    descriptionToken:
      'Create your own avatar with AI and share it with your friends.',
    isSlider: true,
    imgUrls: {
      before: '/images/me_before.jpg',
      after: '/images/me_after.jpg',
    },
    link: '/register',
  },
]
const featuresES: Feature[] = [
  {
    titleToken: 'Generador de Avatar IA',
    descriptionToken:
      'Crear tu propio avatar con IA y compartirlo con tus amigos.',
    isSlider: true,
    imgUrls: {
      before: '/images/me_before.jpg',
      after: '/images/me_after.jpg',
    },
    link: '/register',
  },
]

export const FeaturesSection = () => {
  const t = useScopedI18n('home')
  const currentLocale = useCurrentLocale()
  return (
    <>
      <section id="features" className="mx-auto mb-2">
        <div className="mx-auto mb-2 mt-28 hidden scroll-mt-48 grid-cols-1 gap-4 px-4 md:grid md:scroll-mt-28 md:grid-cols-1 lg:max-w-2xl lg:grid-cols-1 lg:px-0">
          <div className="flex justify-between px-2">
            <Text as="p" labelToken={t('featureAfter')} size="sm" />
            <Text as="p" labelToken={t('featureBefore')} size="sm" />
          </div>
          {currentLocale === 'es'
            ? featuresES.map((feature) => (
                <FeatureBox key={feature.titleToken} {...{ feature }} />
              ))
            : featuresEN.map((feature) => (
                <FeatureBox key={feature.titleToken} {...{ feature }} />
              ))}
        </div>
        <div className="mx-auto mb-2 mt-28 block md:hidden">
          <Image
            width={950}
            height={2000}
            src="/images/after-before.jpg"
            alt="me"
          />
        </div>
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
      className="group relative h-[520px] rounded-xl border border-gray-300 bg-white p-6 dark:border-none dark:bg-gray-900"
    >
      {isSlider && imgUrls && (
        <ImageSlider {...{ imgUrls }} altTextToken={titleToken} />
      )}
      <FakeButton labelToken={titleToken} />
      <article className="absolute top-[420px] pr-3">
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
          absolute left-0 top-0 z-20 h-[400px] w-full overflow-hidden rounded-t-xl
          duration-500 hover:rounded-b-xl group-hover:h-full
        `}
    >
      <Img
        ref={imgRef}
        src={before}
        alt={altTextToken}
        className="absolute z-20 h-full w-full object-cover object-top"
        style={{ clipPath: 'polygon(0px 0px, 50% 0px, 50% 100%, 0px 100%)' }}
      />
      <Img
        src={after}
        alt={altTextToken}
        className="transparent-image-background absolute h-full w-full bg-white object-cover object-top"
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
