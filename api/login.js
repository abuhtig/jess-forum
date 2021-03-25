import axios from '../src/util/request'

// 获取密码接口
const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
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
  return axios.post('/login/login', {
    ...info
  })
}
const reg = (reginfo) => {
  return axios.post('/login/reg', {
    ...reginfo
  })
}
export { getCode, forget, login, reg }
