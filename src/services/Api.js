import axios from 'axios'
import config from '../../configs'
import store from '../store'

export default () => {
  return axios.create({
    baseURL: `http://${config.hostname}:${config.port}`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
