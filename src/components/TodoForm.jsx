import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CATEGORIES } from "./TodoApp"
import { PlusCircle, Sparkles, Calendar, Bell, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar as CalendarComponent } from "./ui/calendar"
import { format } from "date-fns"
import { cn } from "../lib/utils"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { TimePicker } from "./TimePicker"

export default function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("")
  const [category, setCategory] = useState(CATEGORIES[0])
  const [dueDate, setDueDate] = useState(null)
  const [dueTime, setDueTime] = useState(null)
  const [reminderDate, setReminderDate] = useState(null)
  const [reminderTime, setReminderTime] = useState(null)
  const [isImportant, setIsImportant] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [errors, setErrors] = useState([])

  const validateForm = () => {
    const errors = []
    if (text.trim() === "") errors.push("Task description cannot be empty.")
    if (isExpanded) {
      if (!dueDate) errors.push("Please select a due date.")
      if (dueDate && !dueTime) errors.push("Please select a due time.")
      if (!reminderDate) errors.push("Please select a reminder date.")
      if (reminderDate && !reminderTime) errors.push("Please select a reminder time.")
    }
    setErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      let finalDueDate = dueDate
      if (dueDate && dueTime) {
        const [hours, minutes] = dueTime.split(":").map(Number)
        finalDueDate = new Date(dueDate)
        finalDueDate.setHours(hours, minutes)
      }

      let finalReminderDate = reminderDate
      if (reminderDate && reminderTime) {
        const [hours, minutes] = reminderTime.split(":").map(Number)
        finalReminderDate = new Date(reminderDate)
        finalReminderDate.setHours(hours, minutes)
      }

      onAddTodo(text.trim(), category, finalDueDate, finalReminderDate, isImportant)
      setText("")
      if (!isExpanded) {
        setDueDate(null)
        setDueTime(null)
        setReminderDate(null)
        setReminderTime(null)
        setIsImportant(false)
      }
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col space-y-3">
        {/* Task Description Input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`flex-1 pl-10 py-6 text-lg transition-all duration-300 ${
              isFocused ? "ring-2 ring-violet-500 border-violet-500" : ""
            }`}
          />
          <Sparkles
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
              isFocused ? "text-violet-500" : "text-muted-foreground"
            }`}
          />
        </div>

        {/* Category and Importance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Switch
              id="important-mode"
              checked={isImportant}
              onCheckedChange={setIsImportant}
              className="data-[state=checked]:bg-red-500"
            />
            <Label htmlFor="important-mode" className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Mark as important
            </Label>
          </div>
        </div>

        {/* Date and Reminder Toggle */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide" : "Show"} date & reminder options
        </Button>

        {/* Date and Reminder Inputs */}
        {isExpanded && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {/* Due Date */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-violet-500" />
                Due Date & Time
              </Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={dueDate || undefined}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <TimePicker setTime={setDueTime} time={dueTime} disabled={!dueDate} />
              </div>
            </div>

            {/* Reminder Date */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Bell className="h-4 w-4 text-amber-500" />
                Reminder Date & Time
              </Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !reminderDate && "text-muted-foreground")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {reminderDate ? format(reminderDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={reminderDate || undefined}
                      onSelect={setReminderDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <TimePicker setTime={setReminderTime} time={reminderTime} disabled={!reminderDate} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Submit Button with Error Handling */}
      {errors.length > 0 && (
        <div className="text-red-500 text-sm">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className={`w-full py-6 text-lg font-medium ${
            isImportant
              ? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
              : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
          }`}
          disabled={!text.trim() || errors.length > 0}
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Add Task
        </Button>
      </motion.div>
    </motion.form>
  )
}
