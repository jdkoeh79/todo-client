<template>
  <div>
    <div class="title-bar">
      <v-icon small class="expand">add</v-icon>
      <v-checkbox
        height="0"
        color="#00897b"
        v-model="todo.completed">
      </v-checkbox>

      <div class="todo-title">
        {{ todo.title }}
      </div>

      <div class="due-date">
        {{ todo.dueDate }}
      </div>

      <v-icon class="edit-button">edit</v-icon>
      <v-icon class="remove-button">close</v-icon>
    </div>

    <div class="todo-body">
      <div class="todo-items" v-if="typeof todo.body[0].parentId == 'undefined'">
        <div
          class="item-row"
          v-if="todo.body.length > 1"
          v-for="(item, i) in todo.body"
          :index="i"
          :key="item[0]"
        >
          <v-checkbox
            height="0"
            color="#00897b"
            v-model="todo.body[i].completed">
          </v-checkbox>
          <div class="item-label">
            {{ todo.body[i].item }}
          </div>
        </div>

        <div class="todo-item" v-else>
          {{ todo.body[0].item }}
        </div>
      </div>

      <todo
        v-else
        v-for="child in todo.body"
        :key="child.id"
        :todo="child"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'todo',
  props: [
    'todo',
    'depth'
  ]
}
</script>

<style scoped>
.todo-container {
  background-color: white;
}

.title-bar {
  display: flex;
  text-align: left;
  padding-bottom: 5px;
  border-bottom: 1px dotted grey;
}

.title-bar div {
  flex-grow: 0;
}

.todo-title {
  padding-top: 10px;
  font-weight: bold;
}

.title-bar .todo-title {
  flex-grow: 3;
}

.due-date {
  flex-grow: 0;
  padding-top: 10px;
  font-size: 1.2em;
}

.edit-button {
  flex-grow: 0;
  padding-left: 10px;
  padding-top: 8px;
}

.remove-button {
  flex-grow: 0;
  padding: 0 5px;
  padding-top: 8px;
}

.expand, .collapse {
  flex-grow: 0;
  padding-top: 12px;
}

.todo-body {
  margin-left: 35px;
  text-align: left;
}

.item-row {
  display: flex;
}

.todo-item {
  flex-grow: 3;
  padding-top: 5px;
}

.item-label {
  padding-top: 11px;
}

.top-level {
  padding-top: 5px;
}

>>>.theme--light.v-label {
  color: rgb(15, 15, 15);
  font-size: 1.1em;
}

>>>.item-label {
  font-size: .9em;
}

>>>.v-messages {
  min-height: 0;
}

>>>.v-input {
  flex: none;
}

</style>
