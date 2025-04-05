
import * as React from "react"
import { cn } from "../../lib/utils"

const TooltipContext = React.createContext({
  open: false,
  setOpen: () => {},
  triggerRef: { current: null },
  contentRef: { current: null },
})

function TooltipProvider({ children }) {
  return <>{children}</>
}

function Tooltip({ children }) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef(null)
  const contentRef = React.useRef(null)

  return <TooltipContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>{children}</TooltipContext.Provider>
}

const TooltipTrigger = React.forwardRef(({ asChild, ...props }, ref) => {
  const { setOpen, triggerRef } = React.useContext(TooltipContext)
  const Comp = asChild ? React.Fragment : "button"

  return (
    <Comp
      ref={(node) => {
        if (ref) {
          if (typeof ref === "function") ref(node)
          else ref.current = node
        }
        triggerRef.current = node
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      {...props}
    />
  )
})
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef(({ className, ...props }, ref) => {
  const { open, contentRef } = React.useContext(TooltipContext)

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
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

