<template>
  <header
    class="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <RouterLink to="/dashboard" class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
          F
        </div>

        <div>
          <div class="font-bold text-slate-900 dark:text-white">
            FlowTask
          </div>

          <div class="hidden text-xs text-slate-500 sm:block">
            任务管理与效率看板
          </div>
        </div>
      </RouterLink>

      <nav class="hidden items-center gap-2 md:flex">
        <RouterLink to="/dashboard" class="nav-link" active-class="nav-link-active">
          数据看板
        </RouterLink>

        <RouterLink to="/tasks" class="nav-link" active-class="nav-link-active">
          任务管理
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <button type="button"
          class="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          :aria-label="isDark
              ? '切换为浅色模式'
              : '切换为深色模式'
            " @click="toggleTheme">
          {{ isDark ? '☀️' : '🌙' }}
        </button>

        <button type="button" class="rounded-xl p-2 text-slate-600 md:hidden dark:text-slate-300"
          @click="mobileOpen = !mobileOpen">
          {{ mobileOpen ? '✕' : '☰' }}
        </button>
      </div>
    </div>

    <div v-if="mobileOpen" class="border-t border-slate-200 px-4 py-3 md:hidden dark:border-slate-800">
      <nav class="flex flex-col gap-1">
        <RouterLink to="/dashboard" class="mobile-link" active-class="mobile-link-active" @click="mobileOpen = false">
          数据看板
        </RouterLink>

        <RouterLink to="/tasks" class="mobile-link" active-class="mobile-link-active" @click="mobileOpen = false">
          任务管理
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  watch
} from 'vue'

import {
  THEME_STORAGE_KEY
} from '../utils/storage'

const mobileOpen = ref(false)

const isDark = ref(
  localStorage.getItem(
    THEME_STORAGE_KEY
  ) === 'dark'
)

function applyTheme(): void {
  document.documentElement.classList.toggle(
    'dark',
    isDark.value
  )

  localStorage.setItem(
    THEME_STORAGE_KEY,
    isDark.value ? 'dark' : 'light'
  )
}

function toggleTheme(): void {
  isDark.value = !isDark.value
}

watch(isDark, applyTheme)

onMounted(applyTheme)
</script>

<style scoped>
.nav-link {
  @apply rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white;
}

.nav-link-active {
  @apply bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300;
}

.mobile-link {
  @apply rounded-xl px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300;
}

.mobile-link-active {
  @apply bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300;
}
</style>