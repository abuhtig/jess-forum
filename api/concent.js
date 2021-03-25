import axios from '../src/util/request'
import qs from 'qs'

/**
 * @description: 读取文章列表接口参数
 * @param {*} options
 * @return {*}
 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

const getTips = () => {
  return axios.get('/public/tips')
}

const getTop = () => {
  return axios.get('/public/TopWeek')
}

const getLinks = () => {
  return axios.get('/public/links')
}

export {
  getList,
  getTips,
  getTop,
  getLinks
}