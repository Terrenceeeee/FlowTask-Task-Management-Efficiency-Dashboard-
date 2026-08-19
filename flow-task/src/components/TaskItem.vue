<template>
  <article
    class="rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    :class="{
      'opacity-70': task.completed
    }">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="flex min-w-0 gap-3">
        <button type="button"
          class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition" :class="task.completed
              ? 'border-green-500 bg-green-500 text-white'
              : 'border-slate-300 hover:border-blue-500 dark:border-slate-600'
            " :aria-label="task.completed
              ? '标记为未完成'
              : '标记为已完成'
            " @click="$emit('toggle', task.id)">
          {{ task.completed ? '✓' : '' }}
        </button>

        <div class="min-w-0">
          <h3 class="break-words text-base font-semibold text-slate-900 dark:text-white" :class="{
            'line-through': task.completed
          }">
            {{ task.title }}
          </h3>

          <p v-if="task.description" class="mt-1 break-words text-sm text-slate-500 dark:text-slate-400">
            {{ task.description }}
          </p>

          <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span class="rounded-full px-2.5 py-1 font-medium" :class="priorityClass">
              {{ priorityText }}
            </span>

            <span v-if="task.dueDate" class="rounded-full px-2.5 py-1" :class="overdue
                ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              ">
              {{ overdue ? '已逾期 · ' : '截止 · '
              }}{{ formatDate(task.dueDate) }}
            </span>

            <span v-else
              class="rounded-full bg-slate-100 px-2.5 py-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              未设置截止日期
            </span>
          </div>
        </div>
      </div>

      <div class="flex shrink-0 gap-2 sm:justify-end">
        <button type="button" class="btn-secondary px-3" @click="$emit('edit', task)">
          编辑
        </button>

        <button type="button"
          class="rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40"
          @click="$emit('remove', task.id)">
          删除
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  computed
} from 'vue'

import type {
  Task
} from '../types/task'

import {
  formatDate,
  isOverdue
} from '../utils/date'

const props = defineProps<{
  task: Task
}>()

defineEmits<{
  toggle: [id: string]
  edit: [task: Task]
  remove: [id: string]
}>()

const priorityText = computed(() => {
  const map = {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级'
  }

  return map[props.task.priority]
})

const priorityClass = computed(() => {
  const map = {
    high:
      'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300',
    medium:
      'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300',
    low:
      'bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-300'
  }

  return map[props.task.priority]
})

const overdue = computed(() => {
  return isOverdue(
    props.task.dueDate,
    props.task.completed
  )
})
</script>