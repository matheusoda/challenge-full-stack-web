//src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import StudentsView from '@/views/StudentsView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import StudentsFormView from '@/views/StudentsFormView.vue'

export const routes = [
  { path: '/login', component: LoginView, meta: { noSidebar: true } },
  {
    path: '/',
    component: StudentsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/studentList',
    name: 'Student',
    component: StudentsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/studentForm',
    name: 'StudentForm',
    component: StudentsFormView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.token) {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      authStore.setToken(storedToken)
    }
  }

  if (to.meta.requiresAuth && !authStore.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
