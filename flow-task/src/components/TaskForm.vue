<template>
  <form class="card p-5" @submit.prevent="handleSubmit">
    <div class="mb-5 flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
          {{ task ? '编辑任务' : '新增任务' }}
        </h2>

        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          填写任务信息后保存
        </p>
      </div>

      <button v-if="task" type="button"
        class="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        @click="$emit('cancel')">
        取消编辑
      </button>
    </div>

    <div class="space-y-4">
      <div>
        <label class="label">
          任务标题 <span class="text-red-500">*</span>
        </label>

        <input v-model="form.title" class="input" type="text" maxlength="80" placeholder="例如：完成项目首页设计" />

        <p v-if="errors.title" class="mt-1 text-xs text-red-500">
          {{ errors.title }}
        </p>
      </div>

      <div>
        <label class="label">任务描述</label>

        <textarea v-model="form.description" class="input min-h-24 resize-y" maxlength="500" placeholder="补充任务说明..." />
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label class="label">优先级</label>

          <select v-model="form.priority" class="input">
            <option value="high">高优先级</option>
            <option value="medium">中优先级</option>
            <option value="low">低优先级</option>
          </select>
        </div>

        <div>
          <label class="label">截止日期</label>

          <input v-model="form.dueDate" class="input" type="date" />
        </div>
      </div>

      <button type="submit" class="btn-primary w-full">
        {{ task ? '保存修改' : '创建任务' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  reactive,
  watch
} from 'vue'

import type {
  Task,
  TaskFormData
} from '../types/task'

const props = defineProps<{
  task?: Task | null
}>()

const emit = defineEmits<{
  submit: [data: TaskFormData]
  cancel: []
}>()

const form = reactive<TaskFormData>({
  title: '',
  description: '',
  priority: 'medium',
  dueDate: ''
})

const errors = reactive({
  title: ''
})

function resetForm(): void {
  form.title = props.task?.title ?? ''
  form.description =
    props.task?.description ?? ''
  form.priority =
    props.task?.priority ?? 'medium'
  form.dueDate = props.task?.dueDate ?? ''
  errors.title = ''
}

function handleSubmit(): void {
  errors.title = ''

  const title = form.title.trim()

  if (!title) {
    errors.title = '请输入任务标题'
    return
  }

  if (title.length > 80) {
    errors.title =
      '任务标题不能超过 80 个字符'
    return
  }

  emit('submit', {
    title,
    description: form.description.trim(),
    priority: form.priority,
    dueDate: form.dueDate
  })

  if (!props.task) {
    form.title = ''
    form.description = ''
    form.priority = 'medium'
    form.dueDate = ''
  }
}

watch(
  () => props.task,
  resetForm,
  {
    immediate: true
  }
)
</script>
