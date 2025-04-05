
import { useState, useEffect } from "react"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import CategoryFilter from "./CategoryFilter"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { motion } from "framer-motion"
import { CheckCircle2, Bell } from "lucide-react"

export const CATEGORIES = ["Work", "Personal", "Shopping", "Health", "Education"]

export default function TodoApp() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState(null)
  const [completedCount, setCompletedCount] = useState(0)
  const [upcomingReminders, setUpcomingReminders] = useState([])

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos)
        // Convert string dates back to Date objects
        const todosWithDates = parsedTodos.map((todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
          reminderDate: todo.reminderDate ? new Date(todo.reminderDate) : null,
        }))
        setTodos(todosWithDates)
      } catch (e) {
        console.error("Failed to parse todos from localStorage", e)
      }
    }
  }, [])

  // Save todos to localStorage when they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    setCompletedCount(todos.filter((todo) => todo.completed).length)

    // Find upcoming reminders (within the next 24 hours)
    const now = new Date()
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    const upcoming = todos.filter(
      (todo) => todo.reminderDate && todo.reminderDate > now && todo.reminderDate < in24Hours && !todo.completed,
    )

    setUpcomingReminders(upcoming)
  }, [todos])

  const addTodo = (text, category, dueDate, reminderDate, isImportant) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      category,
      completed: false,
      createdAt: new Date(),
      dueDate,
      reminderDate,
      isImportant,
    }
    setTodos([newTodo, ...todos])
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const filteredTodos = filter
    ? filter === "important"
      ? todos.filter((todo) => todo.isImportant)
      : todos.filter((todo) => todo.category === filter)
    : todos

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl"
    >
      <Card className="shadow-xl border-none overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white pb-12 relative">
          <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm z-0"></div>
          <div className="relative z-10">
            <CardTitle className="text-3xl font-bold text-center mb-2">Task Master</CardTitle>
            <CardDescription className="text-white/80 text-center">
              Organize your life, one task at a time
            </CardDescription>
          </div>
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-3">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="font-medium">
                {completedCount} of {todos.length} tasks completed
              </span>
            </motion.div>

            {upcomingReminders.length > 0 && (
              <motion.div
                className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Bell className="h-5 w-5" />
                <span className="font-medium">
                  {upcomingReminders.length} upcoming {upcomingReminders.length === 1 ? "reminder" : "reminders"}
                </span>
              </motion.div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-10 space-y-6">
          <TodoForm onAddTodo={addTodo} />
          <CategoryFilter categories={CATEGORIES} selectedCategory={filter} onSelectCategory={setFilter} />
          <TodoList todos={filteredTodos} onDeleteTodo={deleteTodo} onToggleTodo={toggleTodo} />
        </CardContent>
      </Card>
    </motion.div>
  )
}

