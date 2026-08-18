export type TaskPriority = 'low' | 'medium' | 'high'

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

export type TaskStatusFilter = 'all' | 'pending' | 'completed'

export type TaskPriorityFilter = 'all' | TaskPriority

export type TaskSort =
  | 'newest'
  | 'oldest'
  | 'dueDate'
  | 'priority'