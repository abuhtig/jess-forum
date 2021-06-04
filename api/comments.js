import axios from '../src/util/request'
import qs from 'qs'

const getComents = (params) => {
  return axios.get('/public/comments?' + qs.stringify(params))
}

const addComment = (data) => {
  return axios.post('/comments/reply', { ...data })
}

const setCommentBest = (params) => {
  return axios.get('/comments/accept?' + qs.stringify(params))
}
export {
  getComents,
  addComment,
  setCommentBest
}
