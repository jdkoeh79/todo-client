<template>
  <v-layout> <!-- Template root element -->
    <v-flex xs7 mr-4> <!-- Left side of page -->
      <div class="todos-container">

        <v-toolbar class="toolbar" flat dense dark>
          <v-toolbar-title class="panel-title">My Todos</v-toolbar-title>
          <v-btn class="main-button" fab small color="#5b79ff">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="todos">
          <div
            class="todo-wrapper"
            v-for="todo in todos"
            :key="todo.id"
          >
            <div
              class="todo"
              v-bind:class="[todo.priority, (todo.id == selectedTodo.id) ? 'selected' : '']"
            >

              <todo
                :todo="todo"
                @select-todo="selectTodo($event)"
                @archive-todo="removeTodoFromDOM($event)"
                @todo-status="todoStatus($event)"
              />

            </div> <!-- todo -->
          </div> <!-- todo-wrapper -->
          <div
            v-if="enterNewTodo == false"
            class="add-todo"
            @click="newTodo"
          >
            <v-icon class="add-button">add</v-icon>
            Create New To-Do
          </div>
          <div v-else class="enter-new-todo">
            <v-text-field
              placeholder="Title..."
              color="rgb(0, 137, 123)"
              autofocus
              v-model="newTodoTitle"
              @blur="createTodo"
              @keyup.enter="createTodo"
            />
          </div>
          <!-- <div
            v-for="(n, i) in blankLines"
            :key="`n-${i}`"
            class="blank-line"
          /> -->
        </div> <!-- todos -->
      </div> <!-- todos-container -->
    </v-flex>
    <v-flex xs5>

      <todo-details
        :todo="selectedTodo"
        :categoryList="categories"
        @priority-update="updatePriority($event)"
        @date-update="updateDueDate($event)"
        @time-update="updateDueTime($event)"
      />

    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import TodoService from '@/services/TodoService'
import CategoryService from '@/services/CategoryService'
import Todo from '../components/Todo.vue'
import TodoDetails from '../components/TodoDetails/TodoDetails.vue'

export default {
  name: 'Todos',
  components: {
    Todo,
    TodoDetails
  },
  props: [
    'todo'
  ],
  data () {
    return {
      todos: [],
      categories: [],
      selectedTodo: {},
      enterNewTodo: false,
      newTodoTitle: ''
    }
  },
  async mounted () {
    this.todos = (await TodoService.index()).data
    this.categories = (await CategoryService.index()).data
    this.selectedTodo = this.todos[0]
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ]),
    blankLines: function () {
      return 10 - this.todos.length
    }
  },
  methods: {
    selectTodo: function (todo) {
      this.selectedTodo = todo
    },
    newTodo: function () {
      this.enterNewTodo = true
    },
    removeTodoFromDOM: function (todo) {
      const id = todo.id
      const index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
      if (id === this.selectedTodo.id) {
        this.selectedTodo = this.todos[index - 1]
      }
    },
    updatePriority: function (todo) {
      const index = this.todos.indexOf(todo)
      this.todos[index].priority = todo.priority
    },
    updateDueDate: function (todo) {
      const dueDate = todo.dueDate
      const index = this.todos.indexOf(todo)
      this.todos[index].dueDate = dueDate
    },
    updateDueTime: function (todo) {
      const dueTime = todo.dueTime
      const index = this.todos.indexOf(todo)
      this.todos[index].dueTime = dueTime
    },
    async createTodo () {
      if (this.enterNewTodo && this.newTodoTitle !== '') {
        const title = this.newTodoTitle
        try {
          const todo = (await TodoService.post({
            title: title
          })).data
          this.todos.push(todo)
        } catch (err) {
          console.log('An error occurred creating the new todo:', err.message)
        }
        this.selectedTodo = this.todos[this.todos.length - 1]
      }
      this.enterNewTodo = false
      this.newTodoTitle = ''
    }
  }
}
</script>

<style scoped>
.toolbar {
  background-color: #555;
  display: flex;
}

.panel-title {
  flex-grow: 100;
  text-align: left;
}

.main-button {
  flex-grow: 1;
  position: relative;
  bottom: 10px;
  left: -10px;
  background-color: red;
  color: white;
}

.todos-container {
  background-color: white;
  border: 1px solid rgb(168, 168, 168);
  min-height: 88vh;
}

.todos {
  padding: 0 10px;
  max-height: 80vh;
  overflow: auto;
}

.todo-wrapper {
  /* padding: 5px 0; */
  border-bottom: 1px solid rgb(168, 168, 168);
}

.todo {
  text-align: left;
  display: flex;
  border-radius: 10px;
  padding: 0 5px;
  margin: 3px 0;
}

.selected {
  box-shadow: 0px 0px 0px 2px #5b79ff;
}

.add-todo {
  color: #111;
  font-size: 16px;
  text-align: left;
  padding: 16px 5px 18px;
  cursor: pointer;
  border-bottom: 1px solid rgb(168, 168, 168);
}

.enter-new-todo {
  font-size: 16px;
  text-align: left;
  padding: 15px 15px 7px 14px;
  border-bottom: 1px solid rgb(168, 168, 168);
}

.blank-line {
  height: 66px;
  border-bottom: 1px solid rgb(168, 168, 168);
}

.add-button {
  position: relative;
  top: 3px;
  padding-right: 5px;
  color: #111;
}

>>>.v-text-field {
  margin-top: 0;
  padding-top: 0;
  padding-left: 23px;
  padding-right: 27px;
}

>>>.v-messages {
  min-height: 0;
}

>>>.v-text-field--box input {
  margin-top: 0;
}

>>>.v-text-field--box .v-input__slot {
  min-height: 0;
  padding-left: 5px;
}

>>>.v-toolbar__content {
  width: 100%;
}

>>>.theme--dark.v-btn:not {
  background-color: rgb(56, 134, 170);
}
</style>
