import HttpRequest from './axios'
import config from '../../config/index'
const baseURL = config.baseUrl.dev

const axios = new HttpRequest(baseURL)

export default axios
