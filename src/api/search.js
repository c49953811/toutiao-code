import request from '@/utils/request'
export const getSearchSuggestion = (q) => {
  return request({
    // 复制路径过来的时候如果不小心包含了空格，一定要把空格删了
    // url: ' /v1_0/authorizations'
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}
export const getSearchResult = (params) => {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}
