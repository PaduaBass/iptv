import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-iptv.vercel.app/',
  timeout: 10000,
})


export default api
