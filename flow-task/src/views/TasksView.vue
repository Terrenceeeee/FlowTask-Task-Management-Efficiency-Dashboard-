<template>
  <div class="page-container">
    <div class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
          任务管理
        </h1>

        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
          管理你的任务、截止日期和完成状态。
        </p>
      </div>

      <button type="button" class="btn-primary" @click="startCreate">
        + 新增任务
      </button>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <aside class="lg:col-span-1">
        <TaskForm :task="editingTask" @submit="handleFormSubmit" @cancel="cancelEdit" />
      </aside>

      <section class="space-y-4 lg:col-span-2">
        <TaskFilters :keyword="keyword" :status="status" :priority="priority" :sort="sort" @update="handleFilterUpdate"
          @reset="resetFilters" />

        <div class="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span>
            共 {{ filteredTasks.length }} 个任务
          </span>

          <span v-if="filteredTasks.length">
            第 {{ currentPage }} / {{ pageCount }} 页
          </span>
        </div>

        <div v-if="paginatedTasks.length" class="space-y-3">
          <TaskItem v-for="task in paginatedTasks" :key="task.id" :task="task" @toggle="taskStore.toggleTask"
            @edit="startEdit" @remove="handleRemove" />
        </div>

        <EmptyState v-else-if="taskStore.tasks.length" title="没有匹配任务" description="请尝试调整搜索关键词或筛选条件。" button-text="重置筛选"
          @action="resetFilters" />

        <EmptyState v-else title="暂无任务" description="创建一个任务，开始管理你的工作。" button-text="创建任务" @action="startCreate" />

        <Pagination :current-page="currentPage" :page-count="pageCount" @change="changePage" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  watch
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import TaskForm from '../components/TaskForm.vue'
import TaskFilters from '../components/TaskFilters.vue'
import TaskItem from '../components/TaskItem.vue'
import EmptyState from '../components/EmptyState.vue'
import Pagination from '../components/Pagination.vue'

import {
  useTaskStore
} from '../stores/task'

import type {
  Task,
  TaskFormData,
  TaskPriority,
  TaskSort,
  TaskStatus
} from '../types/task'

import {
  getPositiveInt,
  getStringQuery
} from '../utils/query'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const pageSize = 5

const keyword = ref('')
const status = ref<TaskStatus>('all')
const priority = ref<
  TaskPriority | 'all'
>('all')
const sort = ref<TaskSort>('newest')
const currentPage = ref(1)

const editingTask = ref<Task | null>(null)

const priorityWeight: Record<
  TaskPriority,
  number
> = {
  high: 3,
  medium: 2,
  low: 1
}

const filteredTasks = computed(() => {
  let result = [...taskStore.tasks]

  const normalizedKeyword =
    keyword.value.trim().toLowerCase()

  if (normalizedKeyword) {
    result = result.filter(task => {
      return (
        task.title
          .toLowerCase()
          .includes(normalizedKeyword) ||
        task.description
          .toLowerCase()
          .includes(normalizedKeyword)
      )
    })
  }

  if (status.value === 'completed') {
    result = result.filter(task => {
      return task.completed
    })
  }

  if (status.value === 'pending') {
    result = result.filter(task => {
      return !task.completed
    })
  }

  if (priority.value !== 'all') {
    result = result.filter(task => {
      return task.priority === priority.value
    })
  }

  result.sort((a, b) => {
    if (sort.value === 'newest') {
      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      )
    }

    if (sort.value === 'oldest') {
      return (
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
      )
    }

    if (sort.value === 'priority') {
      return (
        priorityWeight[b.priority] -
        priorityWeight[a.priority]
      )
    }

    if (!a.dueDate) {
      return 1
    }

    if (!b.dueDate) {
      return -1
    }

    return a.dueDate.localeCompare(
      b.dueDate
    )
  })

  return result
})

const pageCount = computed(() => {
  return Math.max(
    1,
    Math.ceil(
      filteredTasks.value.length / pageSize
    )
  )
})

const paginatedTasks = computed(() => {
  const start =
    (currentPage.value - 1) * pageSize

  return filteredTasks.value.slice(
    start,
    start + pageSize
  )
})

function updateUrl(): void {
  const query: Record<string, string> = {}

  if (keyword.value) {
    query.keyword = keyword.value
  }

  if (status.value !== 'all') {
    query.status = status.value
  }

  if (priority.value !== 'all') {
    query.priority = priority.value
  }

  if (sort.value !== 'newest') {
    query.sort = sort.value
  }

  if (currentPage.value > 1) {
    query.page = String(currentPage.value)
  }

  if (editingTask.value) {
    query.edit = editingTask.value.id
  }

  router.replace({
    path: '/tasks',
    query
  })
}

function readUrlState(): void {
  keyword.value = getStringQuery(
    route.query.keyword
  )

  const queryStatus = getStringQuery(
    route.query.status
  )

  status.value =
    queryStatus === 'pending' ||
      queryStatus === 'completed'
      ? queryStatus
      : 'all'

  const queryPriority = getStringQuery(
    route.query.priority
  )

  priority.value =
    queryPriority === 'low' ||
      queryPriority === 'medium' ||
      queryPriority === 'high'
      ? queryPriority
      : 'all'

  const querySort = getStringQuery(
    route.query.sort
  )

  sort.value =
    querySort === 'oldest' ||
      querySort === 'dueDate' ||
      querySort === 'priority'
      ? querySort
      : 'newest'

  currentPage.value = getPositiveInt(
    route.query.page
  )

  if (currentPage.value > pageCount.value) {
    currentPage.value = pageCount.value
  }

  const editId = getStringQuery(
    route.query.edit
  )

  editingTask.value = editId
    ? taskStore.getTaskById(editId) ?? null
    : null
}

function handleFilterUpdate(
  key:
    | 'keyword'
    | 'status'
    | 'priority'
    | 'sort',
  value: string
): void {
  if (key === 'keyword') {
    keyword.value = value
  }

  if (key === 'status') {
    status.value = value as TaskStatus
  }

  if (key === 'priority') {
    priority.value =
      value as TaskPriority | 'all'
  }

  if (key === 'sort') {
    sort.value = value as TaskSort
  }

  currentPage.value = 1
  updateUrl()
}

function resetFilters(): void {
  keyword.value = ''
  status.value = 'all'
  priority.value = 'all'
  sort.value = 'newest'
  currentPage.value = 1
  updateUrl()
}

function changePage(page: number): void {
  if (page < 1 || page > pageCount.value) {
    return
  }

  currentPage.value = page
  updateUrl()
}

function startCreate(): void {
  editingTask.value = null
  currentPage.value = 1
  updateUrl()
}

function startEdit(task: Task): void {
  editingTask.value = task
  updateUrl()
}

function cancelEdit(): void {
  editingTask.value = null
  updateUrl()
}

function handleFormSubmit(
  formData: TaskFormData
): void {
  if (editingTask.value) {
    taskStore.updateTask(
      editingTask.value.id,
      formData
    )

    editingTask.value =
      taskStore.getTaskById(
        editingTask.value.id
      ) ?? null
  } else {
    taskStore.addTask(formData)
  }

  updateUrl()
}

function handleRemove(id: string): void {
  const confirmed = window.confirm(
    '确定要删除这个任务吗？'
  )

  if (!confirmed) {
    return
  }

  if (editingTask.value?.id === id) {
    editingTask.value = null
  }

  taskStore.removeTask(id)

  if (currentPage.value > pageCount.value) {
    currentPage.value = pageCount.value
  }

  updateUrl()
}

watch(
  () => route.query,
  () => {
    readUrlState()
  }
)

watch(
  pageCount,
  value => {
    if (currentPage.value > value) {
      currentPage.value = value
      updateUrl()
    }
  }
)

onMounted(() => {
  readUrlState()
})
</script>