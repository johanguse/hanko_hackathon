'use client'

import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
} from '@/locale/client'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/Button'
import { Select, SelectContent, SelectTrigger } from '@/components/ui/Select'

export function ChangeLanguage() {
  const locale = useCurrentLocale()
  const scopedT = useScopedI18n('commons')

  const changeLocale = useChangeLocale()

  return (
    <Select>
      <SelectTrigger
        aria-label={scopedT('openLanguageMenu')}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'w-fit font-semibold'
        )}
      >
        {locale === 'es' ? scopedT('Spanish') : scopedT('English')}
      </SelectTrigger>
      <SelectContent side="top" className="z-200 bg-background p-0">
        <Button
          variant="ghost"
          aria-label={scopedT('changeToEnglish')}
          onClick={() => changeLocale('en')}
          disabled={locale === 'en'}
          className="cursor-pointer"
        >
          {scopedT('English')}
        </Button>
        <Button
          variant="ghost"
          aria-label={scopedT('changeToSpanish')}
          onClick={() => changeLocale('es')}
          disabled={locale === 'es'}
          className="cursor-pointer"
        >
          {scopedT('Spanish')}
        </Button>
      </SelectContent>
    </Select>
  )
}
