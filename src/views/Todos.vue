<template>
  <v-layout>
    <v-flex xs8 mr-4>
      <div class="todo-container">
        <todo
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
        />
        <div class="add-todo">
          <v-icon class="add-button">add</v-icon>
            New To-Do
        </div>
      </div>
    </v-flex>
    <v-flex xs4>
      <div class="white">
        <ul>
          <li
            v-for="(item, i) in todos[0].items"
            :index="i"
            :key="i"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import Todo from '../components/Todo.vue'
// import TodoItems from '../components/TodoItems.vue'

export default {
  name: 'Todos',
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  components: {
    Todo
    // TodoItems
  },
  data () {
    return {
      todos: [
        {
          id: 1,
          title: 'Go Grocery Shopping',
          completed: false,
          priority: 'Normal',
          dueDate: null,
          dueTime: null,
          items: [
            'Milk',
            'Eggs',
            'Bread',
            'Peanut Butter',
            'Cereal',
            'Oranges',
            'Bananas',
            'Steak',
            'Beer'
          ]
        },
        {
          id: 2,
          title: 'Edit Christmas Footage',
          completed: false,
          priority: 'Low',
          dueDate: null,
          dueTime: null,
          items: []
        },
        {
          id: 3,
          title: 'Management Meeting',
          completed: false,
          priority: 'High',
          dueDate: '1/21/219',
          dueTime: '3:30 PM',
          items: []
        },
        {
          id: 4,
          title: 'Pick up dry-cleaning',
          completed: false,
          priority: 'Low',
          dueDate: null,
          dueTime: null,
          items: []
        },
        {
          id: 5,
          title: 'Pay Electric Bill',
          completed: false,
          priority: 'Normal',
          dueDate: null,
          dueTime: null,
          items: []
        }
      ]
    }
  }
}
</script>

<style scoped>
.todo-container {
  background-color: white;
  padding: 0 10px 10px;
}

.add-todo {
  color: grey;
  font-size: 16px;
  text-align: left;
  padding: 10px;
}

.add-button {
  position: relative;
  top: 3px;
  padding-right: 5px;
}

</style>
