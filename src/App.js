import TodoApp from "./components/TodoApp"
import { ThemeProvider } from "./components/ThemeProvider"
import "./App.css"

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4 flex items-center justify-center">
        <TodoApp />
      </main>
    </ThemeProvider>
  )
}

export default App

