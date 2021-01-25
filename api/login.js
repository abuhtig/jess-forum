import axios from '../src/util/request'

const getCode = (sid) => {
  return axios.get('/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

const forget = (option) => {
  return axios.post('/forget', {
    ...option
  })
}

const login = (info) => {
  return axios.post('/login', {
    ...info
  })
}
export { getCode, forget, login }
