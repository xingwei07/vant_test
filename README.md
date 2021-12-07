# 项目搭建步骤

## 1. 封装请求模块

   1. `npm install axios`
   2. 新建`utils/request.js`
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
## 2. 创建登录路由

   1. `npm install vue-router`
   2. 新建`router/index.js`
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
  3. `main.js`中引入
     
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
        <van-tabbar v-model="active" route>
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

## 12. 展示当前用户信息

  1. 封装请求方法
      ```js
      export async function getUserInfo(id) {
        const res = await post('/userInfo', {userId: id, token: store.state.userStore.user.data.token})
        return res
      }
      ```
  2. 获取用户详细信息
      ```js
      async getUserInfo() {
        if(this.user) {
          const userId = this.user.data.userId
          const { data } = await getUserInfo(userId)
          this.userInfo = data.data[0]
        }
      }
      ```
## 13. 用户头像处理

  1. `:src="userInfo.photo"`
  2. 配置环境变量
      1. 新建文件`.env.development`
      2. ```
          NODE_DEV=development
          VUE_APP_URL='http://localhost:5000'
          ```
          `development`：开发环境 
          `production`：生产环境 
          必须以`VUE_APP_`开头 
      3. 使用方式：`process.env.VUE_APP_URL`

## 14. 优化设置Token

  1. 设置请求拦截器
      ```js
      //请求拦截器
      service.interceptors.request.use(
        function(config) {
          const user = store.state.userStore.user
          if(user && user.data) {
            config.headers.accessToken = user.data.token
          }
          return config
        },
        function(err) {
          return Promise.reject(err)
        }
      )
      ```

## 15. 头部布局实现

  1. `NavBar`使用插槽实现

      ```html
      <van-nav-bar class="page-nav-bar">
        <template #right>
          <van-button 
            type="info"
            size="small"
            round
            icon="search"
            class="search-button"
          >搜索</van-button>
        </template>
      </van-nav-bar>
      ```
      `type`；类型，可选值为 primary info warning danger 
      `size`：尺寸，可选值为 large small mini 
      `round`：是否为圆形按钮 
      `icon`：左侧图标名称或图片链接 

## 16. 文章频道列表构建

  1. `van-tabs`组件
      ```html
      <van-tabs v-model="active">
        <van-tab title="标签 1">内容 1</van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
      </van-tabs>
      ```
      `active`：默认标签

## 17. 样式调整
  1. 调整`Tabs`样式
      ```html
      <van-tabs 
        class="channels-tabs"
        v-model="active"
        title-active-color="red"
        line-width="20px"
        line-height="6px"
      >
        <van-tab title="标签 1">内容 1</van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
        <van-tab title="标签 5">内容 5</van-tab>
        <van-tab title="标签 6">内容 6</van-tab>
      </van-tabs>
      ```
      `v-model`：默认标签 
      `title-active-color`：标题选中态颜色 
      `line-width`：底部条宽度 
      `line-height`：底部条高度 

## 18. 频道列表按钮处理

  1. `Tabs`使用插槽实现
      ```html
      <template #nav-right>
        <i class="placeholder"></i> <!-- 占位符 -->
        <van-icon name="wap-nav" class="hamburger-btn"></van-icon>
      </template>
      ```
  
  2. 样式
      ```css
      .channels-tabs .hamburger-btn {
        /* 固定定位 */
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 66px;
        height: 32px;
        background-color: #fff;
        /* 设置透明度 */
        opacity: 0.902;
        /* 设置图标大小 */
        font-size: 23px;
      }
      .channels-tabs .placeholder { <!-- 加入占位符，防止最后一个标签被遮盖 -->
        flex-shrink: 0; <!-- 占位符不参与flex布局计算 -->
        width: 66px;
        height: 32px;
      }
      ```

## 19. 获取频道列表数据

  1. 封装请求方法
      ```js
      // 获取用户频道列表数据
      export async function getUserChannels() {
        const res = await post('/channels', {})
        return res
      }
      ```

  2. 获取用户频道列表信息
      ```js
      async getUserChannels() {
        const { data } = await getUserChannels()
        this.channels = data.data
      }
      ```

## 20. 创建文章列表组件

  1. 创建`components/article-list.vue`

  2. 传递参数
      `<ArticleList :channel="channel" />`

  3. 接收参数
      ```
      props: {
        channel: {
          type: Object,
          required: true
        }
      }
      ```

## 21. List组件基本使用

  1. `List`组件
      ```html
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
      ```
      `v-model`：是否处于加载状态 
      `finished`：是否已加载完成 
      `finished-text`：加载完成后的提示文案 
      `load`：滚动条与底部距离小于 offset 时触发 

  2. `data`默认数据
      ```js
      data() {
        return {
          list: [],
          loading: false,
          finished: false
        }
      }
      ```
      `loading`：是否处于加载状态 
      `finished`：是否已加载完成 
  
  3. `methods`示例
      ```js
      onLoad() {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        // 1. 发送异步请求获取数据
        setTimeout(() => {
          // 2. 获取到服务端返回的数据，将其填充到list数据
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
      
          // 3. 本次数据加载完成后，要把加载状态设置为结束，loading设置为false以后，才能够触发下一次的加载更多的操作
          // 加载状态结束
          this.loading = false;
      
          // 数据全部加载完成
          // 4. 当数据全部加载完成后，把finished设置为true
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 1000);
      }
      ```
      `onLoad`：滚动条与底部距离小于 offset 时触发
      `loading`：是否处于加载状态 
      `finished`：是否已加载完成 

## 22. 获取频道列表数据

  1. 封装请求方法
      ```js
      // 获取文章列表
      export async function getArticles(data) {
        const res = await post('/articles', data)
        return res
      }
      ```

  2. `methods`
      ```js
      //请求参数
      const params = {
        channel_id: id,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      // 1. 发送异步请求获取数据
      const { data } = await getArticles(params)
      if(data.status) {
        // 2. 获取到服务端返回的数据，将其填充到channels
        this.channels.push(...data.data)
        // 3. 本次数据加载完成后，要把加载状态设置为结束，loading设置为false以后，才能够触发下一次的加载更多的操作
        this.loading = false
        this.pageNum++
      } else {
        // 4. 当数据全部加载完成后，把finished设置为true
        this.finished = true
      }
      ```

## 23. 请求失败的处理

  1. `List`组件
      ```js
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      
      data：
        error: false
      
      methods:
        } catch (error) {
          this.error = true // 展示错误信息
          this.loading = false // 结束本次加载
        }
      ```