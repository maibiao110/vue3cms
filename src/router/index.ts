import { TOKEN } from '@/globle/constant'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/main/main.vue'),
      name: 'main'
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})
router.beforeEach((to, from) => {
  if (to.path.startsWith('/main')) {
    const token = localCache.getCache(TOKEN)
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
