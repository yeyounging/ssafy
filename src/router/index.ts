import { useUserStore } from '@/store/user'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  const isRequiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (isRequiresAuth && !userStore.isLoggedIn) {
    next({
      path: '/login',
    })
  }

  if (to.path === '/login' && userStore.isLoggedIn) {
    next({
      path: '/',
    })
  } else {
    next()
  }
})

export default router
