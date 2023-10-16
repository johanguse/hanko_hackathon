import { forwardRef, type ReactElement } from 'react'
import {
  Content,
  Group,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  Separator,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select'

import { cn } from '@/lib/utils'

import { IconClose } from '../icons'

const Select = Root

const SelectGroup = Group

const SelectValue = Value

const SelectTrigger = forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger> & { iconSelect?: ReactElement }
>(({ className, children, iconSelect, ...props }, ref) => {
  return (
    <Trigger
      ref={ref}
      aria-controls="radix-:Rp9mj9:"
      className={cn(
        'flex h-9 w-full items-center justify-between gap-1 rounded-sm bg-transparent px-3 py-2 placeholder:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
      {iconSelect}
    </Trigger>
  )
})
SelectTrigger.displayName = 'SelectTrigger'

const SelectContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, children, position = 'popper', ...props }, ref) => {
  return (
    <Portal>
      <Content
        ref={ref}
        className="relative z-50 overflow-hidden rounded-sm border text-paragraph shadow-md"
        position={position}
        {...props}
      >
        <Viewport
          className={cn(
            'flex flex-col p-2',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full',
            className
          )}
        >
          {children}
        </Viewport>
      </Content>
    </Portal>
  )
})
SelectContent.displayName = Content.displayName

const SelectLabel = forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = Label.displayName

const SelectItem = forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-secondary focus:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <IconClose className="h-4 w-4" />
      </ItemIndicator>
    </span>

    <ItemText>{children}</ItemText>
  </Item>
))
SelectItem.displayName = Item.displayName

const SelectSeparator = forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px', className)}
    {...props}
  />
))
SelectSeparator.displayName = Separator.displayName

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
