import VueRouter from "vue-router";

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    meta: {
      title: '登录'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router