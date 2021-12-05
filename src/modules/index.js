import { post } from '@/utils/request'
import store from '@/store/index'

export async function login(data) {
  const res = await post('/login', data)
  return res
}

export async function getUserInfo(id) {
  const res = await post('/userInfo', {userId: id, token: store.state.userStore.user.data.token})
  return res
}