<template>
  <div>

    <todo
      v-for="todo in todos"
      :key="todo.id"
      :node="todo"
      :depth="0"
    />

  </div>
</template>

<script>
import Todo from '@/components/Todo.vue'

export default {
  name: 'todo-container',
  props: [
    'todos',
    'depth'
    ],
  components: {
    Todo
  }
}
</script>

<style scoped>

</style>
