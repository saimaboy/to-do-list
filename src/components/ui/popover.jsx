"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

const PopoverContext = React.createContext({
  open: false,
  setOpen: () => {},
  contentRef: { current: null },
})

function Popover({ children }) {
  const [open, setOpen] = React.useState(false)
  const contentRef = React.useRef(null)

  return <PopoverContext.Provider value={{ open, setOpen, contentRef }}>{children}</PopoverContext.Provider>
}

const PopoverTrigger = React.forwardRef(({ asChild, children, ...props }, ref) => {
  const { setOpen, open } = React.useContext(PopoverContext)
  const Comp = asChild ? 'span' : 'button' // Use a span or button for wrapping the children

  return (
    <Comp
      ref={ref}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </Comp>
  )
})
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef(({ className, ...props }, ref) => {
  const { open, contentRef } = React.useContext(PopoverContext)

  if (!open) return null

  return (
    <div
      ref={(node) => {
        if (ref) {
          if (typeof ref === "function") ref(node)
          else ref.current = node
        }
        contentRef.current = node
      }}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  )
})
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
