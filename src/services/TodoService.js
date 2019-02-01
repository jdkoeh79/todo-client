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
  },
  updateCompletedStatus (todo) {
    return Api().put('todo/completed', {
      todoId: todo.id,
      completed: todo.completed
    })
  },
  updateArchivedStatus (todo) {
    return Api().put('todo/archived', {
      todoId: todo.id,
      archived: todo.archived
    })
  },
  updatePriority (todo) {
    return Api().put('todo/priority', {
      todoId: todo.id,
      priority: todo.priority
    })
  }
}
