import axios from '../src/util/request'
import qs from 'qs'

const userSign = () => axios.get('/user/fav')

const updateUserInfo = (data) => axios.post('/user/basic', data)

const updateUsername = (data) => axios.get('/public/setEmail?' + qs.stringify(data))

const setPass = (data) => axios.get('/public/setPass?' + qs.stringify(data))

const changepw = (data) => axios.post('/user/changepw', data)

const addCollect = (data) => axios.get('/user/setCollect?' + qs.stringify(data))

const getCollect = (data) => axios.get('/user/Collect?' + qs.stringify(data))

const getPostList = (data) => axios.get('/user/post?' + qs.stringify(data))

const deletePost = (data) => axios.get('/user/deletePost?' + qs.stringify(data))

const getCollectionList = (data) => axios.get('/user/getColleList?' + qs.stringify(data))

const getMsg = (data) => axios.get('/user/getmsg?' + qs.stringify(data))

const getInfo = (id) => axios.get('/public/getInfos?' + qs.stringify(id))

export { userSign, updateUserInfo, updateUsername, setPass, changepw, addCollect, getCollect, getPostList, deletePost, getCollectionList, getMsg, getInfo }
