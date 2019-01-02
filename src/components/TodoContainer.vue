<template>
  <div class="todo-container">

    <div class="container-left" width="80px"
      :class="todo.priority"
    >
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
        :active="false"
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
  margin-bottom: 10px;
  /* box-shadow: 0 5px 15px #002b2623; */
}

.container-left {
  width: 44px;
  background-color: #ffffff;
}

.low {
  border-left: 4px solid #0094859d;
}

.normal {
  /* background-color: rgb(245, 239, 159); */
  border-left: 4px solid rgb(255, 230, 0);
}

.high {
  /* background-color: rgb(255, 197, 197); */
  border-left: 4px solid rgb(255, 141, 141);
}

.container-right {
  width: 100%;
}

.avatar {
  margin: 0 10px;
  padding-right: 10px;
  margin-top: 4px
}
</style>
