<script setup lang="ts">
import {
  computed,
  ref,
  watch
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import TaskForm from '../components/TaskForm.vue'
import TaskItem from '../components/TaskItem.vue'

import { useTaskStore } from '../stores/task'

import type {
  Task,
  TaskFormData,
  TaskPriorityFilter,
  TaskSort,
  TaskStatusFilter
} from '../types/task'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

function getStringQuery(
  value: unknown,
  fallback = ''
): string {
  return typeof value === 'string' ? value : fallback
}

function isStatusFilter(
  value: string
): value is TaskStatusFilter {
  return ['all', 'pending', 'completed'].includes(value)
}

function isPriorityFilter(
  value: string
): value is TaskPriorityFilter {
  return ['all', 'low', 'medium', 'high'].includes(value)
}

function isTaskSort(value: string): value is TaskSort {
  return [
    'newest',
    'oldest',
    'dueDate',
    'priority'
  ].includes(value)
}

const initialStatus = getStringQuery(
  route.query.status,
  'all'
)

const initialPriority = getStringQuery(
  route.query.priority,
  'all'
)

const initialSort = getStringQuery(
  route.query.sort,
  'newest'
)

const searchKeyword = ref(
  getStringQuery(route.query.keyword)
)

const statusFilter = ref<TaskStatusFilter>(
  isStatusFilter(initialStatus)
    ? initialStatus
    : 'all'
)

const priorityFilter = ref<TaskPriorityFilter>(
  isPriorityFilter(initialPriority)
    ? initialPriority
    : 'all'
)

const sortType = ref<TaskSort>(
  isTaskSort(initialSort)
    ? initialSort
    : 'newest'
)

const editingTask = ref<Task | null>(null)

const priorityWeight = {
  high: 3,
  medium: 2,
  low: 1
} as const

const filteredTasks = computed(() => {
  const keyword = searchKeyword.value
    .trim()
    .toLocaleLowerCase()

  const result = taskStore.tasks.filter(task => {
    const matchesKeyword =
      !keyword ||
      task.title.toLocaleLowerCase().includes(keyword) ||
      task.description.toLocaleLowerCase().includes(keyword)

    const matchesStatus =
      statusFilter.value === 'all' ||
      (statusFilter.value === 'completed' && task.completed) ||
      (statusFilter.value === 'pending' && !task.completed)

    const matchesPriority =
      priorityFilter.value === 'all' ||
      task.priority === priorityFilter.value

    return (
      matchesKeyword &&
      matchesStatus &&
      matchesPriority
    )
  })

  return [...result].sort((first, second) => {
    switch (sortType.value) {
      case 'oldest':
        return (
          new Date(first.createdAt).getTime() -
          new Date(second.createdAt).getTime()
        )

      case 'dueDate': {
        if (!first.dueDate && !second.dueDate) {
          return 0
        }

        if (!first.dueDate) {
          return 1
        }

        if (!second.dueDate) {
          return -1
        }

        return first.dueDate.localeCompare(second.dueDate)
      }

      case 'priority':
        return (
          priorityWeight[second.priority] -
          priorityWeight[first.priority]
        )

      case 'newest':
      default:
        return (
          new Date(second.createdAt).getTime() -
          new Date(first.createdAt).getTime()
        )
    }
  })
})

function handleSubmit(formData: TaskFormData): void {
  if (editingTask.value) {
    taskStore.updateTask(
      editingTask.value.id,
      formData
    )

    editingTask.value = null
    return
  }

  taskStore.addTask(formData)
}

function handleEdit(task: Task): void {
  editingTask.value = task

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function cancelEdit(): void {
  editingTask.value = null
}

function handleRemove(id: string): void {
  const confirmed = window.confirm(
    '确定要删除这个任务吗？删除后无法恢复。'
  )

  if (!confirmed) {
    return
  }

  taskStore.removeTask(id)

  if (editingTask.value?.id === id) {
    editingTask.value = null
  }
}

function handleClearCompleted(): void {
  if (taskStore.completedCount === 0) {
    return
  }

  const confirmed = window.confirm(
    `确定清除 ${taskStore.completedCount} 个已完成任务吗？`
  )

  if (confirmed) {
    taskStore.clearCompleted()
  }
}

function resetFilters(): void {
  searchKeyword.value = ''
  statusFilter.value = 'all'
  priorityFilter.value = 'all'
  sortType.value = 'newest'
}

watch(
  [
    searchKeyword,
    statusFilter,
    priorityFilter,
    sortType
  ],
  () => {
    const query: Record<string, string> = {}

    if (searchKeyword.value.trim()) {
      query.keyword = searchKeyword.value.trim()
    }

    if (statusFilter.value !== 'all') {
      query.status = statusFilter.value
    }

    if (priorityFilter.value !== 'all') {
      query.priority = priorityFilter.value
    }

    if (sortType.value !== 'newest') {
      query.sort = sortType.value
    }

    router.replace({
      query
    })
  }
)
</script>

<template>
  <div class="space-y-6">
    <section>
      <h1 class="text-2xl font-bold text-slate-900">
        任务管理
      </h1>

      <p class="mt-1 text-sm text-slate-500">
        创建、编辑、搜索和筛选你的任务
      </p>
    </section>

    <TaskForm :task="editingTask" @submit="handleSubmit" @cancel="cancelEdit" />

    <section class="card p-5">
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label for="task-search" class="mb-1.5 block text-sm font-medium text-slate-700">
            搜索任务
          </label>

          <input id="task-search" v-model="searchKeyword" class="form-input" type="search" placeholder="搜索标题或描述" />
        </div>

        <div>
          <label for="status-filter" class="mb-1.5 block text-sm font-medium text-slate-700">
            任务状态
          </label>

          <select id="status-filter" v-model="statusFilter" class="form-input">
            <option value="all">
              全部状态
            </option>

            <option value="pending">
              待完成
            </option>

            <option value="completed">
              已完成
            </option>
          </select>
        </div>

        <div>
          <label for="priority-filter" class="mb-1.5 block text-sm font-medium text-slate-700">
            优先级
          </label>

          <select id="priority-filter" v-model="priorityFilter" class="form-input">
            <option value="all">
              全部优先级
            </option>

            <option value="high">
              高优先级
            </option>

            <option value="medium">
              中优先级
            </option>

            <option value="low">
              低优先级
            </option>
          </select>
        </div>

        <div>
          <label for="task-sort" class="mb-1.5 block text-sm font-medium text-slate-700">
            排序方式
          </label>

          <select id="task-sort" v-model="sortType" class="form-input">
            <option value="newest">
              最新创建
            </option>

            <option value="oldest">
              最早创建
            </option>

            <option value="dueDate">
              截止日期
            </option>

            <option value="priority">
              优先级
            </option>
          </select>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <p class="text-sm text-slate-500">
          找到
          <strong class="text-slate-900">
            {{ filteredTasks.length }}
          </strong>
          个任务
        </p>

        <div class="flex flex-wrap gap-2">
          <button class="btn-secondary" type="button" @click="resetFilters">
            重置筛选
          </button>

          <button
            class="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
            type="button" :disabled="taskStore.completedCount === 0" @click="handleClearCompleted">
            清除已完成
          </button>
        </div>
      </div>
    </section>

    <section>
      <div v-if="filteredTasks.length" class="space-y-3">
        <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" @toggle="taskStore.toggleTask"
          @edit="handleEdit" @remove="handleRemove" />
      </div>

      <div v-else class="card py-16 text-center">
        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
          ✓
        </div>

        <h2 class="mt-4 font-semibold text-slate-900">
          没有找到任务
        </h2>

        <p class="mt-1 text-sm text-slate-500">
          可以调整筛选条件或者创建新任务
        </p>

        <button class="btn-secondary mt-4" type="button" @click="resetFilters">
          重置筛选
        </button>
      </div>
    </section>
  </div>
</template>