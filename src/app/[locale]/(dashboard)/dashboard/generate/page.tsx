'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { staticMetadata } from '@/config/siteMeta'
import { validateJwtAndFetchUserId } from '@/lib/validateJwtAndFetchUserId'
import { Text } from '@/components/common'

export default function GeneratePage() {
  //const userID = validateJwtAndFetchUserId()

  const [selectedFile, setSelectedFile] = useState<File>()
  const [userPrompt, setUserPrompt] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const router = useRouter()
  const handleFileUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log({ selectedFile, userPrompt, email, gender })
      if (!selectedFile) return
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('gender', gender)
      formData.append('email', email)
      formData.append('userPrompt', userPrompt)
      const result = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      })

      const json = await result.json()
      router.push(`/dashboard/result/${json.eventId}`)
    } catch (err) {
      console.error({ err })
    }
  }

  return (
    <>
      <div className="container mx-auto flex flex-col justify-center text-center">
        <Text labelToken="Generate your Avatar" as="h1" medium />
        <Text
          labelToken="Receive in your email the avatar you just generated."
          as="p"
        />
        <form
          method="POST"
          className="mt-10 flex flex-col space-y-4"
          onSubmit={(e) => handleFileUpload(e)}
        >
          <label htmlFor="email" className="text-left">
            Email Address
          </label>
          <input
            type="email"
            required
            className="mb-3 border-[1px] px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="gender" className="text-left">
            Gender
          </label>
          <select
            className="mb-4 rounded border-[1px] px-4 py-3"
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label htmlFor="image" className="text-left">
            Upload your picture
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
            Add custom prompt for your avatar
            <span className="opacity-60">(optional)</span>
          </label>
          <div className="font-xs mx-0 w-full text-left text-primary">
            <Text
              labelToken="Copy image prompts from "
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
            placeholder="Copy image prompts from https://lexica.art"
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          <button
            type="submit"
            className="mt-5 rounded bg-blue-500 px-6 py-4 text-lg text-white hover:bg-blue-700"
          >
            Generate Avatar
          </button>
        </form>
      </div>
    </>
  )
}
