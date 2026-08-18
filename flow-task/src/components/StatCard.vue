<script setup lang="ts">
defineProps<{
  title: string
  value: number | string
  description: string
  color?: 'blue' | 'green' | 'orange' | 'red'
}>()
</script>

<template>
  <article class="card p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-slate-500">
          {{ title }}
        </p>

        <p class="mt-2 text-3xl font-bold text-slate-900">
          {{ value }}
        </p>

        <p class="mt-2 text-sm text-slate-500">
          {{ description }}
        </p>
      </div>

      <div class="h-3 w-3 rounded-full" :class="{
        'bg-blue-500': color === 'blue',
        'bg-green-500': color === 'green',
        'bg-orange-500': color === 'orange',
        'bg-red-500': color === 'red'
      }" />
    </div>
  </article>
</template>