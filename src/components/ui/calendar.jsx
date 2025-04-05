import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"

function Calendar({ className, mode = "single", selected, onSelect, initialFocus = true, ...props }) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const days = React.useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }, [currentMonth])

  const handleDayClick = (day) => {
    if (onSelect) {
      onSelect(day)
    }
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  return (
    <div className={cn("p-3", className)} {...props}>
    <div className="flex justify-between items-center">
      <Button variant="outline" size="sm" onClick={prevMonth}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <h2 className="text-sm font-medium">{format(currentMonth, "MMMM yyyy")}</h2>
      <Button variant="outline" size="sm" onClick={nextMonth}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
    <div className="grid grid-cols-7 mt-4">
      {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
        <div key={i} className="text-center text-xs text-muted-foreground">
          {day}
        </div>
      ))}
    </div>
    <div className="grid grid-cols-7 gap-1 mt-2">
      {days.map((day, i) => {
        const isSelected = selected && isSameDay(day, selected)
        const isCurrent = isToday(day)
        const isOutside = !isSameMonth(day, currentMonth)

        return (
          <Button
            key={i}
            variant="ghost"
            size="sm"
            className={cn(
              "h-9 w-9 p-0 font-normal",
              isOutside && "text-muted-foreground opacity-50",
              isCurrent && "bg-accent text-accent-foreground",
              isSelected &&
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            )}
            onClick={() => handleDayClick(day)}
          >
            {format(day, "d")}
          </Button>
        )
      })}
    </div>
  </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
