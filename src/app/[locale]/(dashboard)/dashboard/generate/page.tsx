'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useScopedI18n } from '@/locale/client'

import { Button, Text } from '@/components/common'

export default function GeneratePage() {
  const t = useScopedI18n('commons.dashboard.generatePage')
  const [selectedFile, setSelectedFile] = useState<File>()
  const [loading, setLoading] = useState<boolean>(false)

  const [userPrompt, setUserPrompt] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedFile) return

    setLoading(true)

    const data = new FormData()
    data.set('file', selectedFile)
    data.set('gender', gender)
    data.set('email', email)
    data.set('userPrompt', userPrompt)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: data,
      })

      if (!res.ok) throw res

      const json = await res.json()
      const eventId = json.eventId

      router.push(`/dashboard/result/${eventId}`)
    } catch (error: any) {
      console.error(error)

      if (error?.status === 403) {
        router.push('/dashboard/out-of-credits')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="container mx-auto flex flex-col justify-center text-center">
        <Text labelToken={t('title')} as="h1" medium />
        <Text labelToken={t('subtitle')} as="p" />
        <form
          method="POST"
          className="mx-auto mt-10 flex w-1/2 flex-col space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(e).catch((err) => console.error({ err }))
          }}
        >
          <label htmlFor="email" className="text-left">
            {t('email')}
          </label>
          <input
            type="email"
            required
            className="mb-3 border-[1px] px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="gender" className="text-left">
            {t('gender')}
          </label>
          <select
            className="mb-4 rounded border-[1px] px-4 py-3"
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">{t('genderPlaceholder')}</option>
            <option value="male">{t('male')}</option>
            <option value="female">{t('female')}</option>
          </select>

          <label htmlFor="image" className="text-left">
            {t('file')}
          </label>
          <input
            name="image"
            type="file"
            className="mb-3 rounded-md border-[1px] px-4 py-2"
            accept=".png, .jpg, .jpeg"
            required
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0]
                setSelectedFile(file)
              }
            }}
          />
          <label htmlFor="prompt" className="text-left">
            {t('userPrompt')}
            <span className="opacity-60"> {t('userPromptOptional')}</span>
          </label>
          <div className="font-xs mx-0 w-full text-left text-primary">
            <Text
              labelToken={t('userPromptHelper')}
              as="small"
              className="text-left"
            />
            <Link
              className="underline"
              href="https://lexica.art"
              target="_blank"
            >
              <Text
                labelToken="https://lexica.art"
                as="small"
                className="text-left"
              />
            </Link>
          </div>
          <textarea
            rows={4}
            className="w-full border-[1px] p-3"
            name="prompt"
            id="prompt"
            value={userPrompt}
            placeholder={t('userPromptPlaceholder')}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          <Button
            loading={loading}
            type="submit"
            className="w-full justify-center"
            variant="primary"
          >
            {t('button')}
          </Button>
        </form>
      </div>
    </>
  )
}
