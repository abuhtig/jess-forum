import axios from '../src/util/request'
import qs from 'qs'
import store from '../src/store'

const getComments = (params) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  }
  return axios.get('/public/comments?' + qs.stringify(params), headers)
}

const addComment = (data) => {
  return axios.post('/comments/reply', { ...data })
}

const setCommentBest = (params) => {
  return axios.get('/comments/accept?' + qs.stringify(params))
}

const setHands = (params) => {
  return axios.get('/comments/sethands?' + qs.stringify(params))
}
export {
  getComments,
  addComment,
  setCommentBest,
  setHands
}
