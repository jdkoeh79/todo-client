<template>
  <div class="todo-container" :style="group">
    <v-avatar
      v-if="depth == 0"
      size="30px"
      class="avatar"
      slot="activator"
    >
      <img
        src="../../public/ProfilePhoto.jpg"
        alt="Avatar"
      >
    </v-avatar>

    <div class="title-bar">
      <div class="todo-title">{{ node.title }}</div>
      <slot name="action" />
    </div>

    <div class="todo-body">
      <slot>
        <div class="body" v-if="typeof node.body[0] == 'string'">
          {{ node.body[0] }}
        </div>
        <todo
          v-else
          v-for="child in node.body"
          :key="child.id"
          :node="child"
          :depth="depth + 1"
        />
      </slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'todo',
  props: [
    'node',
    'depth'
  ],
  computed: {
    group() {
      if (this.depth == 0) {
        return "margin-bottom: 20px; padding: 10px"
      }
    }
  }
}
</script>

<style scoped>
.todo-container {
  background-color: white;
}

.title-bar {
  text-align: left;
  padding: 0;
  /* border: 1px solid grey; */
}

.todo-title {
  font-size: 1.2em;
  padding-left: 0px;

}

.todo-body {
  /* padding-bottom: 10px; */
  margin-left: 25px;
  text-align: left;
}

/* .body {
  padding-left: 5px;
} */
</style>
