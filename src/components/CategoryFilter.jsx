
import { Button } from "./ui/button"
import { Filter, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  // Define category icons
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Work":
        return "🏢"
      case "Personal":
        return "👤"
      case "Shopping":
        return "🛒"
      case "Health":
        return "💪"
      case "Education":
        return "📚"
      default:
        return "📌"
    }
  }

  return (
    <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-violet-500" />
          <h3 className="text-sm font-medium">Filter by category</h3>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={() => onSelectCategory("important")}
        >
          <AlertTriangle className="h-4 w-4" />
          <span className="text-xs">Important</span>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(null)}
          className={`text-sm rounded-full px-4 ${
            selectedCategory === null
              ? "bg-violet-600 hover:bg-violet-700"
              : "hover:bg-violet-100 hover:text-violet-700 dark:hover:bg-violet-900/20"
          }`}
        >
          All Tasks
        </Button>

        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(category)}
            className={`text-sm rounded-full px-4 ${
              selectedCategory === category
                ? "bg-violet-600 hover:bg-violet-700"
                : "hover:bg-violet-100 hover:text-violet-700 dark:hover:bg-violet-900/20"
            }`}
          >
            {getCategoryIcon(category)} {category}
          </Button>
        ))}

        <Button
          variant={selectedCategory === "important" ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory("important")}
          className={`text-sm rounded-full px-4 ${
            selectedCategory === "important"
              ? "bg-red-500 hover:bg-red-600"
              : "text-red-500 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-900/20"
          }`}
        >
          ⚠️ Important
        </Button>
      </div>
    </motion.div>
  )
}

