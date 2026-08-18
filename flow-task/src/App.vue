<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuVisible = ref(false)

const navigation = [
  {
    name: '数据看板',
    path: '/'
  },
  {
    name: '任务管理',
    path: '/tasks'
  }
]

function isCurrentRoute(path: string): boolean {
  return route.path === path
}

function closeMobileMenu(): void {
  mobileMenuVisible.value = false
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <RouterLink to="/" class="flex items-center gap-3" @click="closeMobileMenu">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 font-bold text-white">
            F
          </div>

          <div>
            <p class="font-bold leading-5 text-slate-900">
              FlowTask
            </p>

            <p class="text-xs text-slate-500">
              任务效率管理
            </p>
          </div>
        </RouterLink>

        <nav class="hidden items-center gap-2 sm:flex">
          <RouterLink v-for="item in navigation" :key="item.path" :to="item.path"
            class="rounded-lg px-4 py-2 text-sm font-medium transition" :class="isCurrentRoute(item.path)
                ? 'bg-primary-50 text-primary-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              ">
            {{ item.name }}
          </RouterLink>
        </nav>

        <button class="rounded-lg border border-slate-200 p-2 text-slate-600 sm:hidden" type="button"
          aria-label="打开导航菜单" @click="mobileMenuVisible = !mobileMenuVisible">
          <span v-if="!mobileMenuVisible">
            ☰
          </span>

          <span v-else>
            ✕
          </span>
        </button>
      </div>

      <nav v-if="mobileMenuVisible" class="border-t border-slate-100 bg-white px-4 py-3 sm:hidden">
        <RouterLink v-for="item in navigation" :key="item.path" :to="item.path"
          class="mb-1 block rounded-lg px-4 py-3 text-sm font-medium transition last:mb-0" :class="isCurrentRoute(item.path)
              ? 'bg-primary-50 text-primary-700'
              : 'text-slate-600 hover:bg-slate-100'
            " @click="closeMobileMenu">
          {{ item.name }}
        </RouterLink>
      </nav>
    </header>

    <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <footer class="mt-10 border-t border-slate-200 bg-white">
      <div class="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        FlowTask · Vue3 + TypeScript + Pinia + Tailwind CSS
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>