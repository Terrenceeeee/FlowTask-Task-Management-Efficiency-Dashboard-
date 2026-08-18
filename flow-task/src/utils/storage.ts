import type { Task } from '../types/task'
import { getFutureDate } from './date'

const STORAGE_KEY = 'flow-task-list'

function createId(): string {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function createInitialTasks(): Task[] {
  const now = new Date().toISOString()

  return [
    {
      id: createId(),
      title: '完成 Vue3 项目首页',
      description: '完成页面布局、响应式适配和基础组件拆分。',
      priority: 'high',
      completed: false,
      dueDate: getFutureDate(1),
      createdAt: now,
      updatedAt: now
    },
    {
      id: createId(),
      title: '复习 JavaScript 事件循环',
      description: '掌握宏任务、微任务以及 Promise 的执行顺序。',
      priority: 'medium',
      completed: false,
      dueDate: getFutureDate(3),
      createdAt: now,
      updatedAt: now
    },
    {
      id: createId(),
      title: '整理 TypeScript 笔记',
      description: '整理泛型、联合类型和类型收窄知识点。',
      priority: 'low',
      completed: true,
      dueDate: getFutureDate(5),
      createdAt: now,
      updatedAt: now
    }
  ]
}

export function loadTasks(): Task[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY)

    if (value === null) {
      return createInitialTasks()
    }

    const parsedValue: unknown = JSON.parse(value)

    if (!Array.isArray(parsedValue)) {
      return []
    }

    return parsedValue as Task[]
  } catch (error) {
    console.error('读取任务数据失败：', error)

    return []
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    )
  } catch (error) {
    console.error('保存任务数据失败：', error)
  }
}