<template>
  <div class="card p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ title }}
        </p>

        <p class="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
          {{ value }}
        </p>

        <p v-if="description" class="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {{ description }}
        </p>
      </div>

      <div class="flex h-11 w-11 items-center justify-center rounded-xl text-xl" :class="iconClass">
        {{ icon }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    value: string | number
    icon: string
    description?: string
    iconClass?: string
  }>(),
  {
    description: '',
    iconClass:
      'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300'
  }
)
</script>