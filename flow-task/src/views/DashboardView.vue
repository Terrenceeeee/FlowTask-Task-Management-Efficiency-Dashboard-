<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import StatCard from '../components/StatCard.vue'
import TaskItem from '../components/TaskItem.vue'

import { useTaskStore } from '../stores/task'
import type { Task } from '../types/task'

const taskStore = useTaskStore()

const {
  tasks,
  totalCount,
  completedCount,
  pendingCount,
  overdueCount,
  completionRate
} = storeToRefs(taskStore)

const recentTasks = computed(() => {
  return [...tasks.value]
    .sort((first, second) => {
      return (
        new Date(second.updatedAt).getTime() -
        new Date(first.updatedAt).getTime()
      )
    })
    .slice(0, 5)
})

const priorityStatistics = computed(() => {
  const pendingTasks = tasks.value.filter(task => !task.completed)

  return {
    high: pendingTasks.filter(task => task.priority === 'high')
      .length,

    medium: pendingTasks.filter(
      task => task.priority === 'medium'
    ).length,

    low: pendingTasks.filter(task => task.priority === 'low')
      .length
  }
})

function handleEdit(): void {
  window.location.href = '/tasks'
}

function handleRemove(id: string): void {
  const confirmed = window.confirm(
    '确定要删除这个任务吗？删除后无法恢复。'
  )

  if (confirmed) {
    taskStore.removeTask(id)
  }
}

function handleToggle(id: string): void {
  taskStore.toggleTask(id)
}
</script>

<template>
  <div class="space-y-6">
    <section>
      <h1 class="text-2xl font-bold text-slate-900">
        数据看板
      </h1>

      <p class="mt-1 text-sm text-slate-500">
        查看任务进度和最近更新情况
      </p>
    </section>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard title="全部任务" :value="totalCount" description="当前创建的任务总数" color="blue" />

      <StatCard title="待完成" :value="pendingCount" description="仍需处理的任务" color="orange" />

      <StatCard title="已完成" :value="completedCount" description="已经完成的任务" color="green" />

      <StatCard title="已逾期" :value="overdueCount" description="超过截止日期的任务" color="red" />
    </section>

    <section class="grid gap-6 lg:grid-cols-3">
      <article class="card p-5 lg:col-span-2">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-semibold text-slate-900">
              总体完成进度
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              已完成 {{ completedCount }} 个，共
              {{ totalCount }} 个
            </p>
          </div>

          <strong class="text-2xl text-primary-600">
            {{ completionRate }}%
          </strong>
        </div>

        <div class="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
          <div class="h-full rounded-full bg-primary-600 transition-all duration-500" :style="{
            width: `${completionRate}%`
          }" />
        </div>
      </article>

      <article class="card p-5">
        <h2 class="font-semibold text-slate-900">
          待办优先级
        </h2>

        <div class="mt-4 space-y-3">
          <div class="flex items-center justify-between">
            <span class="flex items-center gap-2 text-sm text-slate-600">
              <span class="h-2.5 w-2.5 rounded-full bg-red-500" />
              高优先级
            </span>

            <strong>{{ priorityStatistics.high }}</strong>
          </div>

          <div class="flex items-center justify-between">
            <span class="flex items-center gap-2 text-sm text-slate-600">
              <span class="h-2.5 w-2.5 rounded-full bg-orange-500" />
              中优先级
            </span>

            <strong>{{ priorityStatistics.medium }}</strong>
          </div>

          <div class="flex items-center justify-between">
            <span class="flex items-center gap-2 text-sm text-slate-600">
              <span class="h-2.5 w-2.5 rounded-full bg-slate-400" />
              低优先级
            </span>

            <strong>{{ priorityStatistics.low }}</strong>
          </div>
        </div>
      </article>
    </section>

    <section class="card p-5">
      <div class="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 class="font-semibold text-slate-900">
            最近更新
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            展示最近修改的 5 个任务
          </p>
        </div>

        <RouterLink to="/tasks" class="text-sm font-medium text-primary-600 hover:text-primary-700">
          管理全部任务
        </RouterLink>
      </div>

      <div v-if="recentTasks.length" class="space-y-3">
        <TaskItem v-for="task in recentTasks" :key="task.id" :task="task" @toggle="handleToggle" @edit="handleEdit"
          @remove="handleRemove" />
      </div>

      <div v-else class="rounded-xl border border-dashed border-slate-300 py-12 text-center">
        <p class="text-slate-500">
          暂无任务
        </p>

        <RouterLink to="/tasks" class="mt-3 inline-block text-sm font-medium text-primary-600">
          创建第一个任务
        </RouterLink>
      </div>
    </section>
  </div>
</template>