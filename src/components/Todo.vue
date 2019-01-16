<template>
  <div class="todo">
    <div class="title-bar">
      <v-checkbox
        height="0"
        color="#00897b"
        v-model="todo.completed">
      </v-checkbox>

      <div class="todo-title">
        {{ todo.title }}
      </div>

      <div class="due-date">
        {{ todo.dueDate }} {{todo.dueTime }}
      </div>

      <v-icon class="remove-button">close</v-icon>
     </div> <!-- title-bar -->
     <div class="todo-body">
       {{ todo.priority }}
     </div>
  </div> <!-- todo -->
</template>

<script>
export default {
  props: [
    'todo'
  ]
}
</script>

<style scoped>
.todo {

  text-align: left;
  padding: 10px;
  border-bottom: 1px solid rgb(176, 212, 200);
}

.title-bar {
  display: flex;
}

.title-bar div {
  flex-grow: 0;
}

.todo .todo-title {
  flex-grow: 3;
}

.todo-title {
  font-size: 18px;
  padding-left: 5px;
}

.due-date {
  flex-grow: 0;
  font-size: 1.2em;
}

.remove-button {
  flex-grow: 0;
  padding-left: 10px;
}

.todo-body {
  margin-left: 38px;
  font-size: 12px;
}

>>>.v-input {
  flex: none;
}

>>>.v-messages {
  min-height: 0;
}

>>>.v-input--selection-controls {
  padding-top: 0;
  margin-top: 13px;
}
</style>
