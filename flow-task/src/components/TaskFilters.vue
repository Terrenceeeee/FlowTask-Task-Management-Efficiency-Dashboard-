<template>
  <div class="card p-4">
    <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
      <div class="lg:col-span-2">
        <label class="label">搜索任务</label>

        <input :value="keyword" class="input" type="search" placeholder="搜索标题或描述..." @input="
          update(
            'keyword',
            ($event.target as HTMLInputElement).value
          )
          " />
      </div>

      <div>
        <label class="label">状态</label>

        <select :value="status" class="input" @change="
          update(
            'status',
            ($event.target as HTMLSelectElement).value
          )
          ">
          <option value="all">全部状态</option>
          <option value="pending">待完成</option>
          <option value="completed">已完成</option>
        </select>
      </div>

      <div>
        <label class="label">优先级</label>

        <select :value="priority" class="input" @change="
          update(
            'priority',
            ($event.target as HTMLSelectElement).value
          )
          ">
          <option value="all">全部优先级</option>
          <option value="high">高优先级</option>
          <option value="medium">中优先级</option>
          <option value="low">低优先级</option>
        </select>
      </div>

      <div>
        <label class="label">排序</label>

        <select :value="sort" class="input" @change="
          update(
            'sort',
            ($event.target as HTMLSelectElement).value
          )
          ">
          <option value="newest">最新创建</option>
          <option value="oldest">最早创建</option>
          <option value="dueDate">截止日期</option>
          <option value="priority">优先级</option>
        </select>
      </div>
    </div>

    <div class="mt-4 flex justify-end">
      <button type="button" class="btn-secondary" @click="$emit('reset')">
        重置筛选
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  TaskPriority,
  TaskSort,
  TaskStatus
} from '../types/task'

defineProps<{
  keyword: string
  status: TaskStatus
  priority: TaskPriority | 'all'
  sort: TaskSort
}>()

const emit = defineEmits<{
  update: [
    key:
    | 'keyword'
    | 'status'
    | 'priority'
    | 'sort',
    value: string
  ]
  reset: []
}>()

function update(
  key:
    | 'keyword'
    | 'status'
    | 'priority'
    | 'sort',
  value: string
): void {
  emit('update', key, value)
}
</script>