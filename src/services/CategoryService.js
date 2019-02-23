import Api from '@/services/Api'

export default {
  index (userId) {
    return Api().get('categories', {
      userId: userId
    })
  }
}
