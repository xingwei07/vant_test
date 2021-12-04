import { post } from '@/utils/request'

export async function login(data) {
  const res = await post('/login', data)
  return res
}