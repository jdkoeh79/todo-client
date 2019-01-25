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

          <div class="add-todo">
            <v-icon class="add-button">add</v-icon>
              Create New To-Do
          </div>

          <div class="blank-line"></div>
          <div class="blank-line"></div>
          <div class="blank-line"></div>
          <div class="blank-line"></div>

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
  methods: {
    selectTodo: function (todo) {
      this.selectedTodo = todo
    }
  },
  data () {
    return {
      selectedTodo: {},
      todos: null
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
  background-color: #ffd2d2;
}

.Normal {
  background-color: #fff7b4;
}

.selected {
  box-shadow: 0px 0px 0px 2px rgba(0, 137, 123, .7);
}

.add-todo {
  color: rgb(0, 137, 123);
  font-size: 16px;
  text-align: left;
  padding: 17px 10px;
  cursor: pointer;
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

</style>
