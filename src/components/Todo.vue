<template>
  <div class="todo">
    <div class="title-bar"
      :style="[todo.body.length == 0 ? {'padding-left': '24px'} : {}]"
    >
      <v-icon
        v-if="active == false && todo.body.length > 0"
        small
        class="expand"
        @click="toggle"
      >
        add
      </v-icon>
      <v-icon
        v-else-if="todo.body.length > 0"
        small
        class="collapse"
        @click="toggle"
      >
        remove
      </v-icon>
      <v-checkbox
        height="0"
        color="#00897b"
        v-model="todo.completed">
      </v-checkbox>

      <div
        class="todo-title"
        @click="toggle"
      >
        {{ todo.title }}
      </div>

      <div class="due-date">
        {{ todo.dueDate }} {{todo.dueTime }}
      </div>

      <v-icon class="edit-button">edit</v-icon>
      <v-icon class="remove-button">close</v-icon>
    </div>

    <div
      class="todo-body hidden"
      ref="todoBody"
      :style="[depth == 0 ? {'padding-bottom': '6px'} : {}]"
    >
      <div
        class="item-row"
        v-for="(item, i) in todo.body"
        v-if="typeof todo.body[i].id == 'undefined'"
        :index="i"
        :key="item[0]"
      >
        <v-checkbox
          v-if="todo.body.length > 1"
          height="0"
          color="#00897b"
          v-model="todo.body[i].completed">
        </v-checkbox>

        <div class="todo-item">
          {{ todo.body[i].item }}
        </div>
      </div>

      <todo
        v-else
        :todo="todo.body[i]"
        :active="active"
      />

    </div>
  </div>
</template>

<script>
import TodoBody from '@/components/TodoBody.vue'

export default {
  name: 'todo',
  props: [
    'todo',
    'depth'
  ],
  components: {
    TodoBody
  },
  data () {
    return {
      active: false
    }
  },
  methods: {
    toggle () {
      if (this.todo.body.length > 0) {
        if (this.active === false) {
          this.active = true
          this.$refs.todoBody.classList.remove('hidden')
        } else {
          this.active = false
          this.$refs.todoBody.classList.add('hidden')
        }
      }
    }
  }
}
</script>

<style scoped>
.title-bar {
  display: flex;
  text-align: left;
  padding-bottom: 6px;
}

.title-bar div {
  flex-grow: 0;
}

.todo-title {
  padding-top: 10px;
  font-weight: bold;
  cursor: pointer;
}

.title-bar .todo-title {
  flex-grow: 3;
}

.due-date {
  flex-grow: 0;
  padding-top: 7px;
  font-size: 1.2em;
}

.edit-button {
  flex-grow: 0;
  padding-left: 10px;
  padding-top: 6px;
}

.remove-button {
  flex-grow: 0;
  padding: 0 5px;
  padding-top: 6px;
}

.expand, .collapse {
  flex-grow: 0;
  padding-top: 12px;
  padding-right: 4px;
  padding-left: 2px;
}

.todo-body {
  padding-left: 28px;
  margin-left: 6px;
  text-align: left;
  border-top: 1px solid rgb(209, 209, 209);
}

.hidden {
  display: none;
  overflow: hidden;
}

.item-row {
  display: flex;
  margin-left: 24px;
  padding-bottom: 5px;
}

.todo-item {
  flex-grow: 3;
  padding-top: 10px;
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
