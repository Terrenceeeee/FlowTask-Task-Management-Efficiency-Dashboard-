<template>
  <div class="page-container">
    <div class="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div class="text-7xl font-bold text-blue-600">
        404
      </div>

      <h1 class="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
        页面不存在
      </h1>

      <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
        你访问的页面可能已经被删除或移动。
      </p>

      <RouterLink to="/dashboard" class="btn-primary mt-6">
        返回看板
      </RouterLink>
    </div>
  </div>
</template>
