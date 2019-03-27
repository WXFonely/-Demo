import axios from 'axios'
import { serverUrl } from './config'

const instance = axios.create({
  baseURL: serverUrl,
  timeout: 5000,
})

export default instance