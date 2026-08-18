<script setup lang="ts">
import { computed } from 'vue'

import type { Task } from '../types/task'
import {
  formatDate,
  isTaskOverdue
} from '../utils/date'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  toggle: [id: string]
  edit: [task: Task]
  remove: [id: string]
}>()

const overdue = computed(() => {
  return isTaskOverdue(
    props.task.dueDate,
    props.task.completed
  )
})

const priorityText = computed(() => {
  const textMap = {
    low: '低',
    medium: '中',
    high: '高'
  }

  return textMap[props.task.priority]
})
</script>

<template>
  <article class="rounded-xl border bg-white p-4 transition hover:shadow-sm" :class="{
    'border-slate-200': !overdue,
    'border-red-200 bg-red-50/30': overdue
  }">
    <div class="flex items-start gap-3">
      <button class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition" :class="task.completed
          ? 'border-green-500 bg-green-500 text-white'
          : 'border-slate-300 bg-white hover:border-primary-500'
        " type="button" :aria-label="task.completed
            ? '标记为未完成'
            : '标记为已完成'
          " @click="emit('toggle', task.id)">
        <span v-if="task.completed" class="text-xs">
          ✓
        </span>
      </button>

      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="break-words font-semibold text-slate-900" :class="{
            'text-slate-400 line-through': task.completed
          }">
            {{ task.title }}
          </h3>

          <span class="rounded-full px-2 py-0.5 text-xs font-medium" :class="{
            'bg-slate-100 text-slate-600':
              task.priority === 'low',
            'bg-orange-100 text-orange-700':
              task.priority === 'medium',
            'bg-red-100 text-red-700':
              task.priority === 'high'
          }">
            {{ priorityText }}优先级
          </span>

          <span v-if="overdue" class="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
            已逾期
          </span>
        </div>

        <p v-if="task.description" class="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600" :class="{
          'text-slate-400': task.completed
        }">
          {{ task.description }}
        </p>

        <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p class="text-xs text-slate-500">
            截止日期：{{ formatDate(task.dueDate) }}
          </p>

          <div class="flex items-center gap-2">
            <button class="rounded-md px-2 py-1 text-sm text-primary-600 transition hover:bg-primary-50" type="button"
              @click="emit('edit', task)">
              编辑
            </button>

            <button class="rounded-md px-2 py-1 text-sm text-red-600 transition hover:bg-red-50" type="button"
              @click="emit('remove', task.id)">
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>