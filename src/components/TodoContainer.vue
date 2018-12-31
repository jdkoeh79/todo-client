<template>
  <div class="todo-container">

    <div class="container-left" width="80px">
      <v-avatar
        size="30px"
        class="avatar"
        slot="activator"
      >
        <img
          src="../../public/ProfilePhoto.jpg"
          alt="Avatar"
        >
      </v-avatar>
    </div>

    <div class="container-right">
      <todo
      :todo="todo"
      :depth="depth"
    />
    </div>

  </div>
</template>

<script>
import Todo from '@/components/Todo.vue'

export default {
  name: 'todo-container',
  props: [
    'todo',
    'depth'
  ],
  components: {
    Todo
  }
}
</script>

<style scoped>
.todo-container {
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 0 0 10px;
  margin-bottom: 20px;
}

.container-left {
  width: 40px;
  background-color: #ffffff;
}

.container-right {
  width: 100%;
}

.avatar {
  margin: 0 10px;
  padding-right: 10px;
  margin-top: 5px
}
</style>
