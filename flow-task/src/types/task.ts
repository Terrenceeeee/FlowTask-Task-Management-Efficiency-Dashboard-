export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskStatus =
  | 'all'
  | 'pending'
  | 'completed'

export type TaskSort =
  | 'newest'
  | 'oldest'
  | 'dueDate'
  | 'priority'

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  completed: boolean
  dueDate: string
  createdAt: string
  updatedAt: string
}

export interface TaskFormData {
  title: string
  description: string
  priority: TaskPriority
  dueDate: string
}