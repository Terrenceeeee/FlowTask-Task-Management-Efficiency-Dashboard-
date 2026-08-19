import {
  computed,
  ref
} from 'vue'
import {
  defineStore
} from 'pinia'

import type {
  Task,
  TaskFormData
} from '../types/task'

import {
  createId,
  isOverdue
} from '../utils/date'

import {
  loadTasks,
  saveTasks
} from '../utils/storage'

export const useTaskStore =
  defineStore('task', () => {
    const tasks = ref<Task[]>(
      loadTasks()
    )

    const totalCount = computed(() => {
      return tasks.value.length
    })

    const completedCount = computed(() => {
      return tasks.value.filter(task => {
        return task.completed
      }).length
    })

    const pendingCount = computed(() => {
      return tasks.value.filter(task => {
        return !task.completed
      }).length
    })

    const overdueCount = computed(() => {
      return tasks.value.filter(task => {
        return isOverdue(
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
        (completedCount.value /
          totalCount.value) *
          100
      )
    })

    function persist(): void {
      saveTasks(tasks.value)
    }

    function addTask(
      formData: TaskFormData
    ): void {
      const now =
        new Date().toISOString()

      const task: Task = {
        id: createId(),
        title: formData.title.trim(),
        description:
          formData.description.trim(),
        priority: formData.priority,
        completed: false,
        dueDate: formData.dueDate,
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
      const task = tasks.value.find(item => {
        return item.id === id
      })

      if (!task) {
        return
      }

      task.title = formData.title.trim()
      task.description =
        formData.description.trim()
      task.priority = formData.priority
      task.dueDate = formData.dueDate
      task.updatedAt =
        new Date().toISOString()

      persist()
    }

    function removeTask(
      id: string
    ): void {
      tasks.value = tasks.value.filter(
        task => task.id !== id
      )

      persist()
    }

    function toggleTask(
      id: string
    ): void {
      const task = tasks.value.find(item => {
        return item.id === id
      })

      if (!task) {
        return
      }

      task.completed = !task.completed
      task.updatedAt =
        new Date().toISOString()

      persist()
    }

    function getTaskById(
      id: string
    ): Task | undefined {
      return tasks.value.find(task => {
        return task.id === id
      })
    }

    function clearTasks(): void {
      tasks.value = []
      persist()
    }

    function resetDemoTasks(): void {
      localStorage.removeItem(
        'flow-task-tasks'
      )

      tasks.value = loadTasks()
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
      removeTask,
      toggleTask,
      getTaskById,
      clearTasks,
      resetDemoTasks
    }
  })