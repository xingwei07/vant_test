import { post } from '@/utils/request'

export const login = (data) => {
  return post('/login', data)
}