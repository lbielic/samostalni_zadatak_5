import { createRouter, createWebHistory } from 'vue-router'
import SignUpView from '../views/SignUpView.vue'
import LogInView from '../views/LogInView.vue'
import UserView from '../views/UserView.vue'
import { useUserStore } from '../stores/userStore'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/signup', component: SignUpView },
  { path: '/login', component: LogInView },
  {
    path: '/user',
    component: UserView,
    beforeEnter: () => {
      const store = useUserStore()
      return store.currentUser ? true : '/login'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
