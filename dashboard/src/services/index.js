import axios from 'axios'
import router from '../router'
import AuthService from './auth'
import UserService from './users'
import FeedbacksService from './feedbacks'
import { setGlobalLoading } from '../store/global'

const API_ENVS = {
  production: 'https://feedbacker-backend-theta.vercel.app',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] ?? API_ENVS.local
})

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
  const canThrowError = error.request.status === 0 ||
  error.request.status === 500

  if (canThrowError) {
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  if (error.response.status === '401') {
    router.push({ name: 'Home' })
  }

  setGlobalLoading(false)
  return error
})

export default {
  auth: AuthService(httpClient),
  users: UserService(httpClient),
  feedbacks: FeedbacksService(httpClient)
}
