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
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/index')
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    component: () => import('@/views/article/index'),
    props: true,
    meta: {
      title: '博学谷头条'
    }
  },
  {
    path: '/',
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
        path: '/my',
        name: 'My',
        component: () => import('@/views/my/index')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router