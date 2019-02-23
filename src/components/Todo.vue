<template>
  <v-layout>
    <div class="checkbox">
      <v-checkbox
        height="0"
        color="#5b79ff"
        v-model="todo.completed"
        v-on:change="updateCompletedStatus"
      >
      </v-checkbox>
    </div>

    <div
      class="todo-main"
      @click="selectTodo"
    >
      <div class="todo-title">
        {{ todo.title }}
      </div>
      <div class="chip priority"
        v-bind:class="todo.priority"
      >{{ todo.priority }}
      </div>
      <div
        v-for="category in todo.categories"
        :key="category"
        class="chip category"
      >{{ category }}
      </div>
    </div>

    <div
      class="due"
      @click="selectTodo"
    >
      <div class="due-date">
        {{ formattedDate }}
      </div>
      <div class="due-time">
        {{ formattedTime }}
      </div>
    </div>

    <div class="remove">
      <v-dialog
        v-model="confirmRemove"
        width="400"
      >
        <v-icon
          class="remove-button"
          slot="activator"
        >
          close
        </v-icon>
        <v-card>
          <v-card-title
            class="confirm-titlebar"
          >
            <span class="title">Confirm</span>
          </v-card-title>
          <v-card-text>
            <h2>{{ todo.title }}</h2>
            <p>Completed: {{ todo.completed === false ? 'No' : 'Yes' }}</p>
            <h3 class="message">Remove to Archive?</h3><br>
            <div class="dialog-btns">
              <v-btn
                class="cancel-btn"
                @click="cancelDialog"
              >
                Cancel
              </v-btn>
              <v-btn
                class="archive-btn"
                color="#555"
                @click="archiveTodo"
              >
                Remove
              </v-btn>
            </div>
            <div class="tip"><v-icon small class="info-icon">info</v-icon> You can restore or perminently delete archived To-Do's from the Archive page.</div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

  </v-layout>
</template>

<script>
import moment from 'moment'
import TodoService from '@/services/TodoService'

export default {
  props: {
    todo: Object
  },
  data () {
    return {
      confirmRemove: false
    }
  },
  computed: {
    formattedDate: function () {
      const dueDate = this.todo.dueDate
      return dueDate ? moment(dueDate).format('ddd, MMM D') : null
    },
    formattedTime: function () {
      const dueTime = this.todo.dueTime
      return dueTime ? moment(dueTime).format('hh:mm A') : null
    }
  },
  methods: {
    selectTodo: function () {
      this.$emit('select-todo', this.todo)
    },
    cancelDialog: function () {
      this.confirmRemove = false
    },
    // async deleteTodo () {
    //   const todo = this.todo
    //   this.$emit('delete-todo', todo)
    //   try {
    //     await TodoService.delete(todo.id)
    //   } catch (err) {
    //     console.log('An error occurred deleting the todo:', err.message)
    //   }
    // },
    async updateCompletedStatus () {
      try {
        await TodoService.updateCompletedStatus(this.todo)
      } catch (err) {
        console.log('An error occured updating the todo completed status:', err.message)
      }
    },
    async archiveTodo () {
      this.todo.archived = true
      const todo = this.todo
      this.$emit('archive-todo', this.todo)
      try {
        await TodoService.updateArchivedStatus(todo)
      } catch (err) {
        console.log('An error occured updating the todo archived status:', err.message)
      }
    }
  }
}
</script>

<style scoped>
.todo-main {
  flex-grow: 1;
  padding-left: 2px;
  padding-right: 20px;
}

.todo-main, .due {
  cursor: pointer;
}

.todo-spacer {
  flex-grow: 3;
}

.todo-title {
  font-size: 16px;
  padding-top: 2px;
}

.due {
  text-align: center;
  font-size: 1.1em;
  margin-right: 10px;
  min-width: 100px;
}

.chip {
  display: inline-block;
  border-radius: 10px;
  line-height: 18px;
  padding: 0 8px 0;
  margin-right: 4px;
}

.priority {
  margin-right: 4px;
}

.High {
  background-color: rgb(206, 52, 52);
  color: white;
}

.Normal {
  background-color: rgb(42, 148, 130);
  color: white;
}

.Low {
  background-color: rgb(197, 197, 197);
}

.category {
  background-color: rgba(177, 216, 204, 0.733);
  padding: 0 7px 0;
}

.label {
  font-size: 10px;
  position: relative;
  top: -1px;
}

.confirm-titlebar {
  background-color: #555;
  color: white;
}

.message {
  padding: 20px 0 20px;
}

.info-icon {
  color: rgb(73, 130, 184);
}

.tip {
  font-size: .9em;
  padding: 0 50px;
}

.dialog-btns {
  padding-bottom: 25px;
}

.archive-btn {
  margin-left: 30px;
  color: white;
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
