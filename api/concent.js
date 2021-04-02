/*
 * @Author: your name
 * @Date: 2021-03-23 21:31:24
 * @LastEditTime: 2021-03-26 09:09:30
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my\mkw\api\concent.js
 */
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
  return axios.get('/public/topWeek')
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