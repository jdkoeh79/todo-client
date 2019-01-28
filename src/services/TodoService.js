import Api from '@/services/Api'

export default {
  fetchTodos (userId) {
    return Api().get('todos', {
      userId: userId
    })
  },
  post (newTodoTitle) {
    return Api().post('todos', newTodoTitle)
  },
  delete (todoId) {
    return Api().delete('todos', {
      data: {
        todoId: todoId
      }
    })
  }
}
