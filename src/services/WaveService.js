import Api from './Api'

export default {
  wave (data) {
    return Api().post('wave', data)
  }
}
