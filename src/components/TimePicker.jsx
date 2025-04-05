
import { Clock } from "lucide-react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

export function TimePicker({ setTime, time, disabled = false }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[120px] justify-start text-left font-normal",
            !time && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time ? time : "Set time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="hours" className="text-xs">
              Hours
            </Label>
            <Input
              id="hours"
              className="w-16 h-8"
              type="number"
              min={0}
              max={23}
              onChange={(e) => {
                const hours = e.target.value.padStart(2, "0")
                const minutes = time?.split(":")[1] || "00"
                setTime(`${hours}:${minutes}`)
              }}
              value={time?.split(":")[0] || ""}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="minutes" className="text-xs">
              Minutes
            </Label>
            <Input
              id="minutes"
              className="w-16 h-8"
              type="number"
              min={0}
              max={59}
              onChange={(e) => {
                const minutes = e.target.value.padStart(2, "0")
                const hours = time?.split(":")[0] || "00"
                setTime(`${hours}:${minutes}`)
              }}
              value={time?.split(":")[1] || ""}
            />
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" onClick={() => setTime(null)}>
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => {
                const now = new Date()
                const hours = now.getHours().toString().padStart(2, "0")
                const minutes = now.getMinutes().toString().padStart(2, "0")
                setTime(`${hours}:${minutes}`)
              }}
            >
              Now
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

