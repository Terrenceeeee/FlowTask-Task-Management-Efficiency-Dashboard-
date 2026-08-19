<template>
  <div
    class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-slate-700">
    <div class="text-5xl">📭</div>

    <h3 class="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
      {{ title }}
    </h3>

    <p class="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
      {{ description }}
    </p>

    <button v-if="buttonText" type="button" class="btn-primary mt-5" @click="$emit('action')">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    buttonText?: string
  }>(),
  {
    title: '暂无任务',
    description: '当前还没有可展示的任务。',
    buttonText: ''
  }
)

defineEmits<{
  action: []
}>()
</script>