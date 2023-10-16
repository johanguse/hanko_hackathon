import { cn } from "@/lib/utils"
import { Popover, Transition } from "@headlessui/react"
import { FC, Fragment, ReactElement, useRef } from "react"

type PopoverMenuProps = {
  trigger: (open: boolean) => ReactElement
  triggerClassName?: string
  content: (handlers: {
    closeContent: () => void
    onMouseEnter: () => void
    onMouseLeave: () => void
  }) => ReactElement
  contentClassName?: string
  openOnHover?: boolean
  fixedContent?: boolean
}

const timeoutDuration = 120
export const PopoverMenu: FC<PopoverMenuProps> = ({
  trigger,
  triggerClassName,
  content,
  contentClassName,
  openOnHover = false,
  fixedContent = false,
}) => {
  const triggerRef = useRef<HTMLButtonElement>()
  const timeOutRef = useRef(null)

  const handleEnter = (open: boolean) => {
    clearTimeout(timeOutRef.current)
    !open && triggerRef.current?.click()
  }

  const handleLeave = (open: boolean) => {
    timeOutRef.current = setTimeout(() => {
      open && triggerRef.current?.click()
    }, timeoutDuration)
  }

  return (
    <Popover className="relative">
      {({ open }) => {
        const onMouseEnter = () => handleEnter(open)
        const onMouseLeave = () => handleLeave(open)
        const closeContent = () => triggerRef.current?.click()
        return (
          <div {...(openOnHover && { onMouseEnter, onMouseLeave })}>
            <Popover.Button
              className={cn("outline-none", triggerClassName)}
              ref={triggerRef}
            >
              {trigger(open)}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className={cn(
                  "z-max mt-3",
                  fixedContent ? "fixed" : "absolute",
                  contentClassName,
                )}
              >
                {content({ onMouseEnter, onMouseLeave, closeContent })}
              </Popover.Panel>
            </Transition>
          </div>
        )
      }}
    </Popover>
  )
}
