import axios from 'axios'
const request = axios.create({
  baseUlr: 'http://toutiao.itheima.net/'
})
// 请求拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器

export default request
