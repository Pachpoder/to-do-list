const STORAGE_KEY = 'todo_tasks_v1'

const isBrowser = typeof window !== 'undefined'

const normalizeTask = (task) => {
  if (!task || typeof task !== 'object') return null
  const { id, title, description, type, completed, createdAt } = task

  const hasRequiredStrings =
    typeof id === 'string' &&
    id.trim() &&
    typeof title === 'string' &&
    title.trim() &&
    typeof description === 'string' &&
    description.trim() &&
    typeof type === 'string' &&
    type.trim()

  if (!hasRequiredStrings) return null

  const timestamp = Number(createdAt)

  return {
    id: id.trim(),
    title: title.trim(),
    description: description.trim(),
    type: type.trim(),
    completed: Boolean(completed),
    createdAt: Number.isFinite(timestamp) ? timestamp : Date.now(),
  }
}

export const loadTasks = () => {
  if (!isBrowser) return []
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    return parsed.map(normalizeTask).filter(Boolean)
  } catch (error) {
    console.error('Error loading tasks from storage', error)
    return []
  }
}

export const saveTasks = (tasks) => {
  if (!isBrowser) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error('Error saving tasks to storage', error)
  }
}

export const storageKey = STORAGE_KEY
