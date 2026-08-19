<template>
  <div v-if="pageCount > 1" class="flex flex-wrap items-center justify-center gap-2">
    <button type="button" class="btn-secondary" :disabled="currentPage <= 1" @click="$emit('change', currentPage - 1)">
      上一页
    </button>

    <button v-for="page in pageCount" :key="page" type="button"
      class="h-9 min-w-9 rounded-xl px-3 text-sm font-medium transition" :class="page === currentPage
          ? 'bg-blue-600 text-white'
          : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
        " @click="$emit('change', page)">
      {{ page }}
    </button>

    <button type="button" class="btn-secondary" :disabled="currentPage >= pageCount"
      @click="$emit('change', currentPage + 1)">
      下一页
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number
  pageCount: number
}>()

defineEmits<{
  change: [page: number]
}>()
</script>