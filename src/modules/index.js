import { post } from '@/utils/request'
// import store from '@/store/index'

// 用户登录
export async function login (data) {
  const res = await post('/login', data)
  return res
}

// 获取用户完整信息
export async function getUserInfo (id) {
  const res = await post('/userInfo', { userId: id })
  return res
}

// 获取用户频道列表数据
export async function getUserChannels (params) {
  const res = await post('/channels', params)
  return res
}

// 获取文章列表
export async function getArticles (data) {
  const res = await post('/articles', data)
  return res
}

// 添加用户频道
export async function addUserChannel (data) {
  const res = await post('/addUserChannel', data)
  return res
}

// 删除用户频道
export async function delUserChannel (data) {
  const res = await post('/delUserChannel', data)
  return res
}

// 获取联想建议
export async function getSuggestion (data) {
  const res = await post('/getSuggestion', data)
  return res
}

// 获取搜索结果
export async function getSearchResult (data) {
  const res = await post('/getSearchResult', data)
  return res
}

// 获取文章详情
export async function getArticleById (data) {
  const res = await post('/getArticleById', data)
  return res
}
