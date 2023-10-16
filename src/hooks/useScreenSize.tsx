import { useEffect, useState } from 'react'

interface ScreenSize {
  SM: boolean
  MD: boolean
  LG: boolean
}
const breakpoints = {
  SM: 640, // Valor del breakpoint "sm" en Tailwind (640px)
  MD: 768, // Valor del breakpoint "md" en Tailwind (768px)
  LG: 1024, // Valor del breakpoint "lg" en Tailwind (1024px)
}
const breakpointsTaller = {
  SM: 464,
  MD: 564,
  LG: 664,
}
const initialScreenSize: ScreenSize = {
  SM: false,
  MD: false,
  LG: false,
}
export default function useScreenSize() {
  const [isScreenLargerThan, setIsScreenLargerThan] =
    useState<ScreenSize>(initialScreenSize)
  const [isScreenTallerThan, setIsScreenTallerThan] =
    useState<ScreenSize>(initialScreenSize)

  useEffect(() => {
    const checkScreenSize = () => {
      const isLargerThanSM = window.innerWidth >= breakpoints.SM
      const isLargerThanMD = window.innerWidth >= breakpoints.MD
      const isLargerThanLG = window.innerWidth >= breakpoints.LG
      const isLargerTallerSM = window.innerHeight >= breakpointsTaller.SM
      const isLargerTallerMD = window.innerHeight >= breakpointsTaller.MD
      const isLargerTallerLG = window.innerHeight >= breakpointsTaller.LG
      setIsScreenLargerThan({
        SM: isLargerThanSM,
        MD: isLargerThanMD,
        LG: isLargerThanLG,
      })
      setIsScreenTallerThan({
        SM: isLargerTallerSM,
        MD: isLargerTallerMD,
        LG: isLargerTallerLG,
      })
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return { isScreenLargerThan, isScreenTallerThan }
}
