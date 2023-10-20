import { FC } from 'react'

type BurguerMenuButtonProps = {
  isOpen: boolean
  onClick: () => void
}

export const BurguerMenuButton: FC<BurguerMenuButtonProps> = ({
  isOpen,
  onClick,
}) => {
  const genericHamburgerLine = `h-0.5 w-7 mb-1.5 rounded-full bg-gray-900 dark:bg-white transition ease transform duration-300`

  return (
    <div
      onClick={onClick}
      className="group z-200 flex h-12 w-12 cursor-pointer flex-col items-center justify-center"
    >
      <div
        className={`${genericHamburgerLine} opacity-75 ${
          isOpen
            ? 'translate-y-2 rotate-45  group-hover:opacity-100'
            : 'group-hover:opacity-100'
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? 'opacity-0' : 'opacity-75 group-hover:opacity-100'
        }`}
      />
      <div
        className={`${genericHamburgerLine} opacity-75 ${
          isOpen
            ? '-translate-y-2 -rotate-45 group-hover:opacity-100'
            : ' group-hover:opacity-100'
        }`}
      />
    </div>
  )
}
