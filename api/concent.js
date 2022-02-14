import axios from '../src/util/request'
import qs from 'qs'
import store from '../src/store'

const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

const getLabels = () => {
  return axios.get('/public/getLabels')
}

const getTopList = () => {
  return axios.get('/public/topList')
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

const uploadImg = (formData) => {
  return axios.post('/content/upload', formData)
}

const addPost = (Data) => {
  return axios.post('/content/add', Data)
}
const uploadWangImg = (formData) => {
  return axios.post('/content/uploadWang', formData)
}
const editpost = (data) => {
  return axios.post('/content/editpostbyid', data)
}
const deletePost = (tid) => {
  return axios.get('/content/deletepost?tid=' + tid)
}
const getDetail = (tid) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  }
  return axios.get('/public/content/detail?tid=' + tid, headers)
}
const editPost = (Data) => {
  return axios.post('/content/editpostbyid', Data)
}
export {
  getList,
  getLabels,
  getTopList,
  getTips,
  getTop,
  getLinks,
  uploadImg,
  addPost,
  uploadWangImg,
  getDetail,
  editPost,
  editpost,
  deletePost
}
