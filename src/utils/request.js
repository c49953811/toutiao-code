import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/',
  transformResponse: [
    function (data) {
      try {
        return JSONBig.parse(data)
      } catch (err) {
        return data
      }
      // axios 默认会在内部这样来处理后端返回的数据
      // return JSON.parse(data)
    }
  ]
})
// 请求拦截器
request.interceptors.request.use(
  // (response) => {
  //   return response.data
  // },
  (config) => {
    // 请求发起会经过这里
    // config：本次请求的请求配置对象
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器

export default request
