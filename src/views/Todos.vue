<template>
  <div>

    <todo-container
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      :depth="0"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import TodoContainer from '@/components/TodoContainer.vue'

export default {
  components: {
    TodoContainer
  },
  props: [
    'depth'
  ],
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  data () {
    return {
      todos: [
        {
          id: 1,
          parentId: null,
          completed: false,
          title: 'Go grocery shopping',
          dueDate: '1/6/2019',
          body: [
            {
              id: 2,
              parentId: 1,
              completed: false,
              title: 'Walmart',
              dueDate: null,
              body: [
                {
                  id: 6,
                  parentId: 1,
                  completed: true,
                  title: 'Cheese',
                  dueDate: null,
                  body: [
                    {
                      completed: true,
                      item: 'American'
                    },
                    {
                      completed: true,
                      item: 'Swiss'
                    }
                  ]
                }
              ]
            },
            {
              id: 3,
              parentId: 1,
              completed: false,
              title: 'Aldi',
              dueDate: null,
              body: [
                {
                  completed: false,
                  item: 'Milk'
                },
                {
                  completed: true,
                  item: 'Eggs'
                }
              ]
            }
          ]
        },
        {
          id: 4,
          parentId: null,
          completed: false,
          title: 'Makenna\'s teacher apointment',
          dueDate: '2/14/2019',
          body: [
            {
              completed: false,
              item: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
          ]
        },
        {
          id: 5,
          parentId: null,
          completed: false,
          title: 'Pick up rabbit feed',
          dueDate: '1/4/2019',
          body: [
            {
              completed: false,
              item: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
          ]
        },
        {
          id: 6,
          parentId: null,
          completed: false,
          title: 'Pay electric bill',
          dueDate: '1/21/2019',
          body: [
            {
              completed: false,
              item: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
