<template>
  <div class="page-container">
    <div class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-sm font-medium text-blue-600 dark:text-blue-400">
          Welcome back
        </p>

        <h1 class="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
          工作效率看板
        </h1>

        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
          快速了解你的任务进度和完成情况。
        </p>
      </div>

      <RouterLink to="/tasks" class="btn-primary">
        + 新增任务
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="全部任务" :value="taskStore.totalCount" icon="📋" />

      <StatCard title="已完成" :value="taskStore.completedCount" icon="✅"
        icon-class="bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-300" />

      <StatCard title="待完成" :value="taskStore.pendingCount" icon="⏳"
        icon-class="bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300" />

      <StatCard title="已逾期" :value="taskStore.overdueCount" icon="⚠️"
        icon-class="bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-300" />
    </div>

    <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <TaskChart :completed="taskStore.completedCount" :pending="taskStore.pendingCount"
          :overdue="taskStore.overdueCount" />
      </div>

      <div class="card p-5">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
              完成率
            </h2>

            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
              当前所有任务的完成比例
            </p>
          </div>

          <span class="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {{ taskStore.completionRate }}%
          </span>
        </div>

        <div class="mt-6 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div class="h-full rounded-full bg-blue-600 transition-all" :style="{
            width: `${taskStore.completionRate}%`
          }" />
        </div>

        <div class="mt-4 flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            {{ taskStore.completedCount }} 个已完成
          </span>

          <span>
            {{ taskStore.pendingCount }} 个待完成
          </span>
        </div>
      </div>
    </div>

    <section class="card mt-6 p-5">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
            最近任务
          </h2>

          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            最近创建的任务
          </p>
        </div>

        <RouterLink to="/tasks" class="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
          查看全部
        </RouterLink>
      </div>

      <div v-if="recentTasks.length" class="space-y-3">
        <TaskItem v-for="task in recentTasks" :key="task.id" :task="task" @toggle="taskStore.toggleTask"
          @edit="handleEdit" @remove="handleRemove" />
      </div>

      <EmptyState v-else title="还没有任务" description="创建第一个任务，开始规划你的工作。" button-text="创建任务" @action="goTasks" />
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  computed
} from 'vue'

import {
  useRouter
} from 'vue-router'

import StatCard from '../components/StatCard.vue'
import TaskChart from '../components/TaskChart.vue'
import TaskItem from '../components/TaskItem.vue'
import EmptyState from '../components/EmptyState.vue'

import {
  useTaskStore
} from '../stores/task'

import type {
  Task
} from '../types/task'

const router = useRouter()
const taskStore = useTaskStore()

const recentTasks = computed(() => {
  return [...taskStore.tasks]
    .sort((a, b) => {
      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      )
    })
    .slice(0, 5)
})

function goTasks(): void {
  router.push('/tasks')
}

function handleEdit(task: Task): void {
  router.push({
    path: '/tasks',
    query: {
      edit: task.id
    }
  })
}

function handleRemove(id: string): void {
  const confirmed = window.confirm(
    '确定要删除这个任务吗？'
  )

  if (confirmed) {
    taskStore.removeTask(id)
  }
}
</script>