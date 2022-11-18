import request from '@/utils/request'

export const login = (data) => {
  return request({
    // 复制路径过来的时候如果不小心包含了空格，一定要把空格删了
    // url: ' /v1_0/authorizations'
    url: '/v1_0/authorizations',
    method: 'post',
    data
  })
}
