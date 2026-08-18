import {
  createRouter,
  createWebHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        title: '数据看板'
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/TasksView.vue'),
      meta: {
        title: '任务管理'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],

  scrollBehavior() {
    return {
      top: 0
    }
  }
})

router.afterEach(to => {
  const title = String(to.meta.title ?? 'FlowTask')

  document.title = `${title} - FlowTask`
})

export default router