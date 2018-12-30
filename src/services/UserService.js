import Api from '@/services/Api'

export default {
  fetchProfilePic (params) {
    return Api().get('profilepic', {
      params: params
    })
  }
}
