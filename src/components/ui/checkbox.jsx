

import * as React from "react"
import { cn } from "../../lib/utils"
import { Check } from "lucide-react"

const Checkbox = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(checked || false)

  React.useEffect(() => {
    setIsChecked(checked || false)
  }, [checked])

  const handleChange = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    if (onCheckedChange) {
      onCheckedChange(newValue)
    }
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      data-state={isChecked ? "checked" : "unchecked"}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className,
      )}
      ref={ref}
      onClick={handleChange}
      {...props}
    >
      {isChecked && <Check className="h-3 w-3" />}
    </button>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }

