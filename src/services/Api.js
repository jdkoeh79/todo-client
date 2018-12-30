import axios from 'axios'
import config from '../../configs'

export default () => {
  return axios.create({
    baseURL: `http://${config.hostname}:${config.port}`
  })
}
