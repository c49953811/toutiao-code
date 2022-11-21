import request from '@/utils/request'
export const login = (data) => {
  return request({
    // 复制路径过来的时候如果不小心包含了空格，一定要把空格删了
    // url: ' /v1_0/authorizations'
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

/**
 * 发送验证码
 * 注意：每手机号每分钟1次
 */
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // 发送请求头数据
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
/**
 * 关注用户
 */
export const addFollow = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

/**
 * 取消关注用户
 */
export const deleteFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
/**
 * 获得个人信息
 */
export const getUserProfile = (target) => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
/**
 * 编辑用户个人资料
 */
export const setUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
/**
 * 更新用户照片资料
 */
export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
