import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 3000
})

export function post (url, params) {
  return service.request({
    method: 'post',
    url,
    params
  })
}

export default service