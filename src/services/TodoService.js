import Api from '@/services/Api'

export default {
  fetchTodos (userId) {
    return Api().get('todos', {
      userId: userId
    })
  }
}
