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
// 请求所有频道列表
export const getAllChanne = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/channels',
    params
  })
}
export const addUserChannel = (channels) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channels]
    }
  })
}
export const deleteUserChannel = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${target}`
  })
}
