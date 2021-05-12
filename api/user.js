import axios from '../src/util/request'
import qs from 'qs'

const userSign = () => axios.get('/user/fav')

const updateUserInfo = (data) => axios.post('/user/basic', data)

const updateUsername = (data) => axios.get('/public/setEmail?' + qs.stringify(data))

const setPass = (data) => axios.get('/public/setPass?' + qs.stringify(data))

const changepw = (data) => axios.post('/user/changepw', data)

export { userSign, updateUserInfo, updateUsername, setPass, changepw }
