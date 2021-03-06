import Api from '@/services/Api'

export default {
  index (userId) {
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
  },
  updateCategories (todo) {
    return Api().put('todo/categories', {
      todoId: todo.id,
      categories: todo.categories
    })
  },
  updateDueDate (todo) {
    return Api().put('todo/dueDate', {
      todoId: todo.id,
      dueDate: todo.dueDate
    })
  },
  updateDueTime (todo) {
    return Api().put('todo/dueTime', {
      todoId: todo.id,
      dueTime: todo.dueTime
    })
  },
  updateNote (todo) {
    return Api().put('todo/note', {
      todoId: todo.id,
      note: todo.note
    })
  },
  updateItems (todo) {
    return Api().put('todo/items', {
      todoId: todo.id,
      items: todo.items
    })
  }
}
