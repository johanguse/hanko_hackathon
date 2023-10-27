import { getScopedI18n } from '@/locale/server'

import { Text } from '@/components/common'
import { GradientText } from '@/components/common/GradientText'

export const GradientHero = async () => {
  const t = await getScopedI18n('home')

  return (
    <section className="mt-10 px-6 text-center lg:mt-20">
      <GradientText
        charRange={[27]}
        as="h1"
        className="mx-auto max-w-xs text-4xl md:max-w-xl md:text-5xl lg:md:max-w-3xl lg:text-6xl"
        labelToken={t('title')}
        bold
      />
      <Text
        as="p"
        className="mx-auto mt-12 max-w-2xl"
        labelToken={t('subtitle')}
        size="xl"
        semibold
        gray
      />
    </section>
  )
}
