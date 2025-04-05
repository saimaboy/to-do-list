
import { Trash2, Clock, Calendar, Bell, AlertTriangle } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Checkbox } from "./ui/checkbox"
import { motion } from "framer-motion"
import { format, isToday, isTomorrow, isPast } from "date-fns"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

export default function TodoItem({ todo, onDelete, onToggle }) {
  // Define badge colors based on category
  const getCategoryStyles = (category) => {
    switch (category) {
      case "Work":
        return {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-600 dark:text-blue-400",
          icon: "🏢",
        }
      case "Personal":
        return {
          bg: "bg-green-100 dark:bg-green-900/30",
          text: "text-green-600 dark:text-green-400",
          icon: "👤",
        }
      case "Shopping":
        return {
          bg: "bg-amber-100 dark:bg-amber-900/30",
          text: "text-amber-600 dark:text-amber-400",
          icon: "🛒",
        }
      case "Health":
        return {
          bg: "bg-red-100 dark:bg-red-900/30",
          text: "text-red-600 dark:text-red-400",
          icon: "💪",
        }
      case "Education":
        return {
          bg: "bg-purple-100 dark:bg-purple-900/30",
          text: "text-purple-600 dark:text-purple-400",
          icon: "📚",
        }
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-800",
          text: "text-gray-600 dark:text-gray-400",
          icon: "📌",
        }
    }
  }

  const categoryStyle = getCategoryStyles(todo.category)
  const timeAgo = format(todo.createdAt, "MMM d, h:mm a")

  // Format due date
  const formatDueDate = (date) => {
    if (isToday(date)) {
      return `Today at ${format(date, "h:mm a")}`
    } else if (isTomorrow(date)) {
      return `Tomorrow at ${format(date, "h:mm a")}`
    } else {
      return format(date, "MMM d, h:mm a")
    }
  }

  // Check if due date is past
  const isDueDatePast = todo.dueDate && isPast(todo.dueDate) && !todo.completed

  // Determine if reminder is upcoming (within 1 hour)
  const isReminderSoon =
    todo.reminderDate &&
    new Date().getTime() - todo.reminderDate.getTime() < 60 * 60 * 1000 &&
    !isPast(todo.reminderDate)

  return (
    <motion.li
      className={`p-4 rounded-xl border shadow-sm hover:shadow-md transition-all ${
        todo.isImportant && !todo.completed
          ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
          : todo.completed
            ? "bg-gray-50 dark:bg-gray-800/50 border-dashed"
            : "bg-white dark:bg-gray-800"
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      layout
    >
      <div className="flex items-start gap-3">
        <div className="pt-0.5">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            id={`todo-${todo.id}`}
            className={`${
              todo.completed
                ? "bg-green-500 text-white border-green-500"
                : todo.isImportant
                  ? "border-red-500 text-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:text-white"
                  : ""
            }`}
          />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <label
                htmlFor={`todo-${todo.id}`}
                className={`cursor-pointer font-medium transition-all ${
                  todo.completed
                    ? "line-through text-muted-foreground"
                    : todo.isImportant
                      ? "text-red-700 dark:text-red-400 font-semibold"
                      : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {todo.text}
              </label>

              {todo.isImportant && !todo.completed && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Important task</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(todo.id)}
              className="ml-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 -mt-1"
              aria-label={`Delete ${todo.text}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge className={`${categoryStyle.bg} ${categoryStyle.text} font-medium`}>
              {categoryStyle.icon} {todo.category}
            </Badge>

            {todo.dueDate && (
              <Badge
                variant="outline"
                className={`flex items-center gap-1 ${
                  isDueDatePast
                    ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"
                    : ""
                }`}
              >
                <Calendar className="h-3 w-3" />
                {formatDueDate(todo.dueDate)}
                {isDueDatePast && " (Overdue)"}
              </Badge>
            )}

            {todo.reminderDate && (
              <Badge
                variant="outline"
                className={`flex items-center gap-1 ${
                  isReminderSoon
                    ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                    : ""
                }`}
              >
                <Bell className="h-3 w-3" />
                {formatDueDate(todo.reminderDate)}
              </Badge>
            )}

            <span className="flex items-center text-gray-400 ml-auto">
              <Clock className="h-3 w-3 mr-1" />
              {timeAgo}
            </span>
          </div>
        </div>
      </div>
    </motion.li>
  )
}

