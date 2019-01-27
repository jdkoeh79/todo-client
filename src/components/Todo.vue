<template>
  <v-layout>
    <div class="checkbox">
      <v-checkbox
        height="0"
        color="#00897b"
        v-model="todo.completed">
      </v-checkbox>
    </div>

    <div class="todo-main" @click="selectTodo">
      <div class="todo-title">
        {{ todo.title }}
      </div>
      <div class="priority">
        <span class="label">Priority: </span>
        <span>
          {{ todo.priority }}
        </span>
      </div>
    </div>

    <div class="due">
      <div class="due-date">
        {{ formattedDate }}
      </div>
      <div class="due-time">
        {{ formattedTime }}
      </div>
    </div>

    <div class="remove">
      <v-icon class="remove-button">close</v-icon>
    </div>
  </v-layout>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    todo: Object
  },
  data () {
    return {
      formattedDate: null,
      formattedTime: null
    }
  },
  mounted: function () {
    if (this.todo.dueDate !== null) {
      this.formattedDate = moment(this.todo.dueDate).format('ddd, MMM D')
    }
    if (this.todo.dueTime !== null) {
      this.formattedTime = moment(this.todo.dueTime).format('h:mm A')
    }
  },
  methods: {
    selectTodo: function () {
      this.$emit('select-todo', this.todo)
    }
  }
}
</script>

<style scoped>
.todo-main {
  flex-grow: 1;
  padding-left: 2px;
  cursor: pointer;
}

.todo-spacer {
  flex-grow: 100;
}

.todo-title {
  font-size: 18px;
}

.due {
  text-align: center;
  font-size: 1.2em;
  padding-right: 30px;
}

.label {
  font-size: 10px;
  position: relative;
  top: -1px;
}

.remove-button {
  cursor: pointer;
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
