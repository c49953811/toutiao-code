import request from '@/utils/request'
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
