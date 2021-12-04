import VueRouter from "vue-router";

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/layout/index'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/index')
      },
      {
        path: '/qa',
        name: 'Qa',
        component: () => import('@/views/qa/index')
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('@/views/video/index')
      },
      {
        path: '/me',
        name: 'Me',
        component: () => import('@/views/me/index')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router