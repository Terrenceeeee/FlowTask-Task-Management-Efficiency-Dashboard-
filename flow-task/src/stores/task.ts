import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type {
  Task,
  TaskFormData
} from '../types/task'

import { isTaskOverdue } from '../utils/date'
import {
  loadTasks,
  saveTasks
} from '../utils/storage'

function createId(): string {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>(loadTasks())

  const totalCount = computed(() => {
    return tasks.value.length
  })

  const completedCount = computed(() => {
    return tasks.value.filter(task => task.completed).length
  })

  const pendingCount = computed(() => {
    return tasks.value.filter(task => !task.completed).length
  })

  const overdueCount = computed(() => {
    return tasks.value.filter(task => {
      return isTaskOverdue(
        task.dueDate,
        task.completed
      )
    }).length
  })

  const completionRate = computed(() => {
    if (totalCount.value === 0) {
      return 0
    }

    return Math.round(
      (completedCount.value / totalCount.value) * 100
    )
  })

  function persist(): void {
    saveTasks(tasks.value)
  }

  function addTask(formData: TaskFormData): void {
    const now = new Date().toISOString()

    const task: Task = {
      id: createId(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate,
      completed: false,
      createdAt: now,
      updatedAt: now
    }

    tasks.value.unshift(task)

    persist()
  }

  function updateTask(
    id: string,
    formData: TaskFormData
  ): void {
    const task = tasks.value.find(item => item.id === id)

    if (!task) {
      return
    }

    task.title = formData.title.trim()
    task.description = formData.description.trim()
    task.priority = formData.priority
    task.dueDate = formData.dueDate
    task.updatedAt = new Date().toISOString()

    persist()
  }

  function toggleTask(id: string): void {
    const task = tasks.value.find(item => item.id === id)

    if (!task) {
      return
    }

    task.completed = !task.completed
    task.updatedAt = new Date().toISOString()

    persist()
  }

  function removeTask(id: string): void {
    tasks.value = tasks.value.filter(task => task.id !== id)

    persist()
  }

  function clearCompleted(): void {
    tasks.value = tasks.value.filter(task => !task.completed)

    persist()
  }

  return {
    tasks,

    totalCount,
    completedCount,
    pendingCount,
    overdueCount,
    completionRate,

    addTask,
    updateTask,
    toggleTask,
    removeTask,
    clearCompleted
  }
})