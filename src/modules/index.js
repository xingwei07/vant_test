import { post } from '@/utils/request'
// import store from '@/store/index'

// 用户登录
export async function login(data) {
  const res = await post('/login', data)
  return res
}

// 获取用户完整信息
export async function getUserInfo(id) {
  const res = await post('/userInfo', {userId: id})
  return res
}

// 获取用户频道列表数据
export async function getUserChannels() {
  const res = await post('/channels', {})
  return res
}