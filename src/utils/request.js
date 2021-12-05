import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 5000
})

export function post (url, params) {
  return service.request({
    method: 'post',
    url,
    params
  })
}

export default service