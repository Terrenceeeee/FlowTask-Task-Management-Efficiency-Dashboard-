import {
  createRouter,
  createWebHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () =>
        import('../views/DashboardView.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () =>
        import('../views/TasksView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () =>
        import('../views/NotFoundView.vue')
    }
  ]
})

export default router
