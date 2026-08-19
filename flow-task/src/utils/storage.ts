import type {
  Task,
  TaskPriority
} from '../types/task'

export const TASK_STORAGE_KEY =
  'flow-task-tasks'

export const THEME_STORAGE_KEY =
  'flow-task-theme'

function isPriority(
  value: unknown
): value is TaskPriority {
  return (
    value === 'low' ||
    value === 'medium' ||
    value === 'high'
  )
}

export function isValidTask(
  value: unknown
): value is Task {
  if (
    typeof value !== 'object' ||
    value === null
  ) {
    return false
  }

  const task =
    value as Record<string, unknown>

  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    isPriority(task.priority) &&
    typeof task.completed === 'boolean' &&
    typeof task.dueDate === 'string' &&
    typeof task.createdAt === 'string' &&
    typeof task.updatedAt === 'string'
  )
}

function createInitialTasks(): Task[] {
  const now = new Date().toISOString()

  return [
    {
      id: 'task-demo-1',
      title: '完善 FlowTask 项目',
      description:
        '完成任务管理、筛选、分页和统计功能。',
      priority: 'high',
      completed: false,
      dueDate: '2026-12-20',
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'task-demo-2',
      title: '学习 Vue 3 Composition API',
      description:
        '了解 ref、computed、watch 和组合式函数。',
      priority: 'medium',
      completed: true,
      dueDate: '2026-11-10',
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'task-demo-3',
      title: '整理前端简历',
      description:
        '补充项目亮点、技术栈和项目成果。',
      priority: 'low',
      completed: false,
      dueDate: '',
      createdAt: now,
      updatedAt: now
    }
  ]
}

export function saveTasks(
  tasks: Task[]
): void {
  localStorage.setItem(
    TASK_STORAGE_KEY,
    JSON.stringify(tasks)
  )
}

export function loadTasks(): Task[] {
  try {
    const value = localStorage.getItem(
      TASK_STORAGE_KEY
    )

    if (value === null) {
      const initialTasks =
        createInitialTasks()

      saveTasks(initialTasks)
      return initialTasks
    }

    const parsed: unknown =
      JSON.parse(value)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isValidTask)
  } catch (error) {
    console.error(
      '读取任务数据失败：',
      error
    )

    return []
  }
}