import axios from 'axios'
import store from '@/store/index'

const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 20000
})

//请求拦截器
service.interceptors.request.use(
  function(config) {
    if(!config.params) {
      config.params = {}
    }
    const user = store.state.userStore.user
    if(user && user.data) {
      config.params.token = user.data.token
    }
    return config
  },
  function(err) {
    return Promise.reject(err)
  }
)

export function post (url, params) {
  return service.request({
    method: 'post',
    url,
    params
  })
}

export default service