import { setupLayouts } from '@/layouts'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes) as RouteRecordRaw[],
})

router.beforeEach((to) => {
  window.scrollTo(0, 0)
})

export default router