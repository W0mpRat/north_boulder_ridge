import axios from 'axios'

export default () => {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_ROOT_API
  })

  return instance
}
