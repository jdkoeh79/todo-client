<template>
  <div>

    <todo-container
      :todos="todos"
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
          title: 'Go grocery shopping',
          body: [
            {
              id: 2,
              parentId: 1,
              title: 'Walmart',
              body: [
                {
                  id: 6,
                  parentId: 1,
                  title: 'Cheese',
                  body: ['American, Swiss']
                }
              ]
            },
            {
              id: 3,
              parentId: 1,
              title: 'Aldi',
              body: ['Milk, Eggs']
            }
          ]
        },
        {
          id: 4,
          parentId: null,
          title: 'Makenna\'s teacher apointment',
          body: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.']
        },
        {
          id: 5,
          parentId: null,
          title: 'Pick up rabbit feed',
          body: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.']
        },
        {
          id: 6,
          parentId: null,
          title: 'Pay electric bill',
          body: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.']
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
