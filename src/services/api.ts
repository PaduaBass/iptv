import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.0.0.131:3333',
  timeout: 10000,
})

export default api