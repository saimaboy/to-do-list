
import TodoItem from "./TodoItem"
import { ScrollArea } from "./ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { ClipboardList } from "lucide-react"

export default function TodoList({ todos, onDeleteTodo, onToggleTodo }) {
  if (todos.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-4">
            <ClipboardList className="h-10 w-10 text-violet-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No tasks yet</h3>
          <p className="text-muted-foreground max-w-xs">Add a new task to get started on your productivity journey!</p>
        </div>
      </motion.div>
    )
  }

  return (
    <ScrollArea className="h-[350px] rounded-md border p-4">
      <AnimatePresence initial={false}>
        <ul className="space-y-3">
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TodoItem todo={todo} onDelete={onDeleteTodo} onToggle={onToggleTodo} />
            </motion.div>
          ))}
        </ul>
      </AnimatePresence>
    </ScrollArea>
  )
}

