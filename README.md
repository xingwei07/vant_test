# 项目搭建步骤

## 1. 封装请求模块

   1. ```npm install axios```
   2. 新建```utils/request.js```
      1. ```js
            //导入axios 
            import axios from 'axios'
          ```
      2. ```js
          //创建axios实例对象
          const service = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: 3000
          })
          ```
      3. ```js
          //封装并暴露post方法
          export function post (url, params) {
            return service.request({
              method: 'post',
              url,
              params
            })
          }
          ```
      4. ```js
          export default service
          ```
## 2. 创建登陆路由

   1. ```npm install vue-router```
   2. 新建```router/index.js```
      1. ```js
          //创建路由集合
          const routes = [
            {
              path: '/login',
              name: 'Login',
              component: () => import('../views/login/index')
            }
          ]
          ```
      2. ```js
            //创建路由器
            const router = new VueRouter({
              routes
            })
          ```
      3. ```js
          //暴露路由器
          export default router
          ```
  3. ```main.js```中引入
     1. ```js
          import VueRouter from 'vue-router'
          import router from './router/index'
        ```

     2. ```Vue.use(VueRouter)```

     3. ```js
         new Vue({
           render: h => h(App),
           router
         }).$mount('#app')
        ```

## 3. 处理用户Token

  1. 创建`store/modules/user.js`
      ```js
      const TOKEN_KEY = "TOUTIAO_USER"
      
      const state = {
        user: JSON.parse(localStorage.getItem(TOKEN_KEY)) //初始化时取值，防止刷新浏览器时清空数据
      }
      
      //在操作数据之前处理一些逻辑
      const actions = {
      
      }
      
      //直接操作数据
      const mutations = {
        setUser(state, data) {
          state.user = data
          localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
        }
      }
      
      export default {
        namespaced: true, //开启命名空间，模块化引入
        state,
        actions,
        mutations
      }
      ```
  2. 创建`store/index.js`
      ```js
      import Vue from 'vue'
      import Vuex from 'vuex'
      import userStore from './modules/user'
      
      /**
       * 不能在main.js中注册vuex
       * 因为import userStore 在use之前，而userStore中使用了vuex
       * 相当于在注册之前使用vuex
       */
      Vue.use(Vuex) 
      
      export default new Vuex.Store({
        modules:{
          userStore
        }
      })
      ```
      
  3. `main.js`中引入
      ```js
        import store from '@/store/index'
      
        new Vue({
          render: h => h(App),
          router,
          store
        }).$mount('#app')
      ```
  4. 保存数据
      ```js
      //模块化引入：userStore/setUser
      this.$store.commit('userStore/setUser', data)
      ```
  5. 读取数据
      ```js
      //模块化引入：state.userStore
      this.$store.state.userStore.user
      ```

## 4. 封装本地存储操作
  1. 创建`utils/storage.js`
      ```js
      //存储数据
      export const setItem = (key, value) => {
        if(typeof value === "object") {
          value = JSON.stringify(value)
        }
        localStorage.setItem(key, value)
      }
      
      //读取数据
      export const getItem = (key) => {
        const data = localStorage.getItem(key)
        try {
          return JSON.parse(data)
        } catch(e) {
          return data
        }
      }
      
      //删除数据
      export const removeItem = (key) => {
        localStorage.removeItem(key)
      }
      ```

  2. 使用
      ```js
      import { setItem, getItem } from '@/utils/storage'
      
      setItem(TOKEN_KEY, state.user)
      getItem(TOKEN_KEY)
      ```

## 5. TabBar处理

  1. 新建`layout/index.js`
      ```html
      <div>
        <router-view></router-view>
        <van-tabbar v-model="active" router>
          <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
          <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
          <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
          <van-tabbar-item icon="user-o" to="/me">我的</van-tabbar-item>
        </van-tabbar>
      </div>
      ```
  2. 新建`home/index.vue、qa/index.vue、video./index.vue、me/index.vue`

  3. `router/index.js`中注册路由
      ```js
      {
        path: '/',
        name: 'Layout',
        component: () => import('@/views/layout/index'),
        children: [
          {
            path: '', //默认路由
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
      ```

## 6. 未登录布局实现

  1. 添加方法`@click="$router.push('/login')"`跳转登录

  2. `NavBar`使用插槽添加左侧返回图标
      ```html
      <template #left>
        <van-icon name="cross" size="18" @click="$router.back()" />
      </template>
      ```
      `left`：左侧
      `name`：图标名称
      `size`：图标大小
  3. 添加方法`@click="$router.back()"`退回未登录页面

## 7. 已登录布局实现

  1. `image`标签
      ```html
      <van-image
        src="http://img.yzcdn.cn/vant/cat.jpeg"
        class="avatar"
        round
        fit="cover"
      ></van-image>
      ```
      `src`：路径
      `round`：是否显示为圆形
      `fit`：图片填充模式
          `cover`：保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边

## 8. 宫格导航布局

  1. 宫格组件
      ```html
      <van-grid :column-num="2" clickable>
        <van-grid-item icon="star-o" text="收藏" />
        <van-grid-item icon="clock-o" text="历史" />
      </van-grid>
      ```
      `column-num`：列数
      `clickable`：点击反馈

## 9. 消息通知与退出登录布局

  1. Cell单元格
      ```html
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell title="退出登录" class="layout-cell" />
      ```
      `is-link`：右侧箭头图标

## 10. 处理页面显示状态

  1. 获取vuex中的用户信息
      ```js
      computed: {
        user() {
          return this.$store.state.userStore.user
        }
      }
      ```

  2. 登录成功跳转
      ```js
      this.$router.push('/my')
      ```

## 11. 退出登录

  1. 清空用户信息
      `this.$store.commit('userStore/setUser', null)`

  2. `Dialog`组件
      ```js
      Dialog.confirm({
        title: '是否确认退出'
      }).then(() => {
        this.$store.commit('userStore/setUser', null)
      }).catch(()=> {
        console.log('取消操作')
      });
      ```
      `confirm`：选择框
          `then`：确认
          `catch`：取消