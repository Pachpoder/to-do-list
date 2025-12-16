import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { loadTasks, saveTasks } from '../utils/storage'

const TasksContext = createContext(undefined)

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => loadTasks())

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = useCallback(({ title, description, type }) => {
    setTasks((prev) => [
      ...prev,
      {
        id: generateId(),
        title,
        description,
        type,
        completed: false,
        createdAt: Date.now(),
      },
    ])
  }, [])

  const toggleCompleted = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  const getTaskById = useCallback(
    (id) => tasks.find((task) => task.id === id),
    [tasks],
  )

  const counts = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length
    const pending = tasks.length - completed
    return {
      total: tasks.length,
      pending,
      completed,
    }
  }, [tasks])

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      toggleCompleted,
      deleteTask,
      getTaskById,
      counts,
    }),
    [tasks, addTask, toggleCompleted, deleteTask, getTaskById, counts],
  )

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export const useTasks = () => {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error('useTasks must be used inside a TasksProvider')
  }
  return context
}
