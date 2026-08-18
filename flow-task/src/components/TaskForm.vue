<script setup lang="ts">
import {
  reactive,
  ref,
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
  submit: [formData: TaskFormData]
  cancel: []
}>()

const titleError = ref('')

const form = reactive<TaskFormData>({
  title: '',
  description: '',
  priority: 'medium',
  dueDate: ''
})

function resetForm(): void {
  form.title = props.task?.title ?? ''
  form.description = props.task?.description ?? ''
  form.priority = props.task?.priority ?? 'medium'
  form.dueDate = props.task?.dueDate ?? ''

  titleError.value = ''
}

function handleSubmit(): void {
  const title = form.title.trim()

  if (!title) {
    titleError.value = '请输入任务标题'
    return
  }

  if (title.length > 50) {
    titleError.value = '任务标题不能超过 50 个字符'
    return
  }

  titleError.value = ''

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
  () => {
    resetForm()
  },
  {
    immediate: true
  }
)
</script>

<template>
  <section class="card p-5">
    <div class="mb-5">
      <h2 class="text-lg font-semibold text-slate-900">
        {{ task ? '编辑任务' : '创建任务' }}
      </h2>

      <p class="mt-1 text-sm text-slate-500">
        {{
          task
            ? '修改任务内容后保存'
            : '填写信息并创建一个新任务'
        }}
      </p>
    </div>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div>
        <label for="task-title" class="mb-1.5 block text-sm font-medium text-slate-700">
          任务标题
        </label>

        <input id="task-title" v-model="form.title" class="form-input" :class="{
          'border-red-500 focus:border-red-500 focus:ring-red-100':
            titleError
        }" type="text" maxlength="50" placeholder="例如：完成项目登录页面" @input="titleError = ''" />

        <div class="mt-1 flex justify-between gap-4">
          <p class="text-xs text-red-500">
            {{ titleError }}
          </p>

          <p class="text-xs text-slate-400">
            {{ form.title.length }}/50
          </p>
        </div>
      </div>

      <div>
        <label for="task-description" class="mb-1.5 block text-sm font-medium text-slate-700">
          任务描述
        </label>

        <textarea id="task-description" v-model="form.description" class="form-input min-h-24 resize-y" maxlength="300"
          placeholder="简单描述一下任务内容" />

        <p class="mt-1 text-right text-xs text-slate-400">
          {{ form.description.length }}/300
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label for="task-priority" class="mb-1.5 block text-sm font-medium text-slate-700">
            优先级
          </label>

          <select id="task-priority" v-model="form.priority" class="form-input">
            <option value="low">
              低优先级
            </option>

            <option value="medium">
              中优先级
            </option>

            <option value="high">
              高优先级
            </option>
          </select>
        </div>

        <div>
          <label for="task-date" class="mb-1.5 block text-sm font-medium text-slate-700">
            截止日期
          </label>

          <input id="task-date" v-model="form.dueDate" class="form-input" type="date" />
        </div>
      </div>

      <div class="flex flex-wrap justify-end gap-3 pt-2">
        <button v-if="task" class="btn-secondary" type="button" @click="emit('cancel')">
          取消编辑
        </button>

        <button class="btn-primary" type="submit">
          {{ task ? '保存修改' : '创建任务' }}
        </button>
      </div>
    </form>
  </section>
</template>
