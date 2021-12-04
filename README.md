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