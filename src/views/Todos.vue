<template>
  <v-layout>
    <v-flex xs7 mr-4>
      <div class="todos-container">

        <v-toolbar flat dense class="toolbar" dark>
          <v-toolbar-title>My To-Do's</v-toolbar-title>
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
          <div
            v-else
            class="enter-new-todo"
          >
            <v-text-field
              placeholder="Title..."
              color="rgb(0, 137, 123)"
              autofocus
              v-model="newTodoTitle"
              @blur="createTodo"
              @keyup.enter="createTodo"
            />
          </div>

          <div
            v-for="(todo, i) in todos"
            v-if="i < 9 - todos.length"
            :key="todo.title"
            class="blank-line"
          />

        </div> <!-- todos -->
      </div> <!-- todos-container -->
    </v-flex>
    <v-flex xs5>

      <todo-items
        :todo="selectedTodo"
      />

    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import TodoService from '@/services/TodoService'
import Todo from '../components/Todo.vue'
import TodoItems from '../components/TodoItems.vue'

export default {
  name: 'Todos',
  components: {
    Todo,
    TodoItems
  },
  props: [
    'todo'
  ],
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  data () {
    return {
      todos: null,
      selectedTodo: {},
      enterNewTodo: false,
      newTodoTitle: ''
    }
  },
  methods: {
    selectTodo: function (todo) {
      this.selectedTodo = todo
    },
    newTodo: function () {
      this.enterNewTodo = true
    },
    async createTodo () {
      if (this.enterNewTodo && this.newTodoTitle !== '') {
        try {
          const title = this.newTodoTitle
          const todo = (await TodoService.post({
            title: title
          })).data
          this.todos.push(todo)
        } catch (err) {
          console.log('An error ocurred creating the new todo:', err.message)
        }
        this.selectedTodo = this.todos[this.todos.length - 1]
      }
      this.enterNewTodo = false
      this.newTodoTitle = ''
    },
    async deleteTodo () {
      try {
        await TodoService.delete()
      } catch (err) {
        console.log('An error ocurred deleting the todo:', err.message)
      }
    }
  },
  async mounted () {
    this.todos = (await TodoService.fetchTodos()).data
    this.selectedTodo = this.todos[0]
  }
}
</script>

<style scoped>
.toolbar {
  background-color: #00897b;
}

.todos-container {
  background-color: white;
  border: 1px solid rgb(176, 212, 200);
  min-height: 88vh;
}

.todos {
  padding: 0 10px;
}

.todo-wrapper {
  padding: 5px 0;
  border-bottom: 1px solid rgb(176, 212, 200);
}

.todo {
  text-align: left;
  display: flex;
  border-radius: 10px;
  padding: 4px 5px;
}

.High {
  /* background-color: #f7d8d5; */
  background-color: #e7c7c7;
  /* color: white; */

}

.Normal {
  /* background-color: #d6f1e9; */
  background-color: #d4e7e2;
}

.selected {
  box-shadow: 0px 0px 0px 2px rgba(0, 137, 123, .7);
}

.add-todo {
  color: rgb(0, 137, 123);
  font-size: 16px;
  text-align: left;
  padding: 16px 5px 18px;
  cursor: pointer;
  border-bottom: 1px solid rgb(176, 212, 200);
}

.enter-new-todo {
  font-size: 16px;
  text-align: left;
  padding: 15px 15px 7px 14px;
  border-bottom: 1px solid rgb(176, 212, 200);
}

.blank-line {
  height: 66px;
  border-bottom: 1px solid rgb(176, 212, 200);
}

.add-button {
  position: relative;
  top: 3px;
  padding-right: 5px;
  color: rgb(0, 137, 123);
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

</style>
