import axios from '../src/util/request'

// 获取密码接口
const getCode = (sid) => {
  return axios.get('/getCaptcha', {
    params: {
      sid: sid
    }
  })
}
// 找回密码接口
const forget = (option) => {
  return axios.post('/forget', {
    ...option
  })
}
// 登录接口
const login = (info) => {
  return axios.post('/login', {
    ...info
  })
}
export { getCode, forget, login }
