"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Check, ChevronDown } from "lucide-react"

const SelectContext = React.createContext({
  value: "",
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
})

function Select({ children, value, onValueChange }) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value || "")

  React.useEffect(() => {
    setSelectedValue(value || "") // Sync with the parent-provided value
  }, [value])

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue)
    if (onValueChange) {
      onValueChange(newValue)
    }
    setOpen(false)
  }

  return (
    <SelectContext.Provider value={{ value: selectedValue, onValueChange: handleValueChange, open, setOpen }}>
      {children}
    </SelectContext.Provider>
  )
}

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { open, setOpen, value } = React.useContext(SelectContext)

  return (
    <button
      ref={ref}
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef(({ className, placeholder, ...props }, ref) => {
  const { value } = React.useContext(SelectContext)

  return (
    <span className={cn("flex-1 text-left", className)} ref={ref} {...props}>
      {value || placeholder}
    </span>
  )
})
SelectValue.displayName = "SelectValue"

const SelectContent = React.forwardRef(({ className, ...props }, ref) => {
  const { open } = React.useContext(SelectContext)

  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        className,
      )}
      {...props}
    />
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = React.useContext(SelectContext)
  const isSelected = selectedValue === value

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        isSelected ? "bg-accent text-accent-foreground" : "",
        className,
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  )
})
SelectItem.displayName = "SelectItem"

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
