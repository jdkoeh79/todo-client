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
          title: 'Go grocery shopping',
          parentId: null,
          completed: false,
          priority: 'low',
          dueDate: '',
          userId: 1,
          body: [
            {
              id: 2,
              title: 'Walmart',
              parentId: 1,
              completed: false,
              priority: 'low',
              dueDate: null,
              userId: 1,
              body: [
                {
                  id: 8,
                  title: 'Household Goods',
                  parentId: 2,
                  completed: true,
                  priority: 'low',
                  dueDate: null,
                  userId: 1,
                  body: [
                    {
                      completed: true,
                      item: 'Toilet Paper'
                    },
                    {
                      completed: true,
                      item: 'Paper Plates'
                    },
                    {
                      completed: true,
                      item: 'Trash Bags'
                    }
                  ]
                },
                {
                  id: 6,
                  title: 'Dairy',
                  parentId: 2,
                  completed: false,
                  priority: 'low',
                  dueDate: null,
                  userId: 1,
                  body: [
                    {
                      completed: false,
                      item: 'Milk'
                    },
                    {
                      id: 7,
                      title: 'Cheese',
                      parentId: 6,
                      completed: true,
                      priority: 'low',
                      dueDate: null,
                      userId: 1,
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
                  completed: false,
                  item: 'Ham'
                },
                {
                  completed: false,
                  item: 'Bologna'
                }
              ]
            },
            {
              id: 3,
              title: 'Superfresh',
              parentId: 1,
              completed: true,
              priority: 'low',
              dueDate: null,
              userId: 1,
              body: [
                {
                  completed: true,
                  item: 'Stuff'
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
          title: 'Management Meeting',
          parentId: null,
          completed: false,
          priority: 'high',
          dueDate: '1/9/2019',
          dueTime: '2:30pm',
          userId: 1,
          body: [
            {
              completed: false,
              item: 'Conference call: (555) 123-4567'
            }
          ]
        },
        {
          id: 5,
          title: 'Pick up dry cleaning',
          parentId: null,
          completed: false,
          priority: 'normal',
          dueDate: '1/4/2019',
          userId: 1,
          body: [
            {
              completed: false,
              item: 'Ticket #: 568416'
            }
          ]
        },
        {
          id: 6,
          title: 'Pay electric bill',
          parentId: null,
          completed: false,
          priority: 'high',
          dueDate: '1/21/2019',
          userId: 1,
          body: [
            {
              completed: false,
              item: 'www.electriccompany.com/login'
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
