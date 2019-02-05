<template>
  <div class="items-container">

    <v-toolbar flat dense class="toolbar" dark>
      <v-toolbar-title>Details</v-toolbar-title>
    </v-toolbar>

    <div class="todo-items">

      <div class="title">
        {{ todo.title }}
      </div>

      <div class="details">
        <v-layout row wrap>
          <v-flex xs11>
            <div class="detail-row">
              <v-menu
                offset-y
                :nudge-right="40"
                transition="scale-transition"
                min-width="200"
              >
                <v-icon
                  class="detail-icon"
                  slot="activator"
                >
                swap_vert</v-icon>
                <div class="menu-header">
                  <div class="menu-title">
                    Priority
                  </div>
                </div>
                <v-list>
                  <v-list-tile
                    v-for="(priority, i) in priorities"
                    :key="i"
                    @click="updatePriority(priority)"
                    :class="{'selected': priorityCheck(priority)}"
                  >
                    <v-list-tile-title>{{ priority }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <div class="detail">
                <span class="label"></span> {{ todo.priority }}
              </div>
            </div>

            <div class="detail-row">
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                :return-value.sync="dueDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-icon slot="activator" class="detail-icon">date_range</v-icon>

                <v-date-picker color="rgb(0, 137, 123)" v-model="dueDate">
                  <v-spacer></v-spacer>
                  <v-btn flat @click="menu = false">Cancel</v-btn>
                  <v-btn flat @click="setDate('')">Clear</v-btn>
                  <v-btn flat @click="setDate(dueDate)">OK</v-btn>
                </v-date-picker>
              </v-menu>

              <div class="detail" v-if="todo.dueDate !== null">
                <span class="label"></span> {{ formattedDate }}
              </div>

              <div class="detail not-set" v-else>Set a Date</div>

            </div>

            <div class="detail-row">
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="todo.dueTime"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-icon slot="activator" class="detail-icon">access_alarm</v-icon>
                <v-time-picker
                  color="rgb(0, 137, 123)"
                  v-model="todo.dueTime"
                  full-width
                />
              </v-menu>
              <div class="detail" v-if="todo.dueTime !== null">
                <span class="label"></span> {{ todo.dueTime }}
              </div>
              <div class="detail not-set" v-else>Set a Time</div>
            </div>

            <div class="detail-row">
              <v-icon class="detail-icon">autorenew</v-icon>
              <div class="detail" v-if="todo.recurring !== null">
                <span class="label"></span> {{ todo.recurring }}
              </div>
              <div class="detail not-set" v-else>Make this a recurring To-Do</div>
            </div>

            <div class="detail">
              <span class="label">Added by:</span> Justin Koehler
            </div>

            <div class="detail">
              <span class="label">Timestamp:</span> {{ createdAt }}
            </div>

          </v-flex>
        </v-layout>
      </div>

      <div class="text-area-container">
        <div class="text-area-header">
          <div class="text-area-label">
            Notes
          </div>
          <v-icon class="clear-note">close</v-icon>
        </div>

        <div class="text-area">
          <textarea-autosize
            class="note"
            placeholder="Add a note..."
            v-model="todo.note"
            :min-height="50"
          />

        </div>
      </div>

      <item
        v-for="(item, i) in todo.items"
        :item="item"
        :index="i"
        :key="i"
      />

      <div
        v-if="enterNewItem == false"
        class="add-item"
        @click="showTextField"
      >
        <v-icon class="add-button">add</v-icon>
          Add Item
      </div>
      <div
        v-else
        class="enter-new-item"
      >
        <v-text-field
          placeholder="Item name..."
          color="rgb(0, 137, 123)"
          autofocus
          @blur="enterNewItem = false"
        />
      </div>

    </div>

  </div>
</template>

<script>
import Item from './Item.vue'
import moment from 'moment'
import TodoService from '@/services/TodoService'

export default {
  name: 'TodoItems',
  components: {
    Item
  },
  props: [
    'todo'
  ],
  data () {
    return {
      menu: false,
      dueDate: null,
      dueTime: null,
      createdAt: null,
      enterNewItem: false,
      priorities: [
        'Low',
        'Normal',
        'High'
      ]
    }
  },
  computed: {
    formattedDate: function () {
      const dueDate = this.todo.dueDate
      return dueDate ? moment(dueDate).format('ddd, MMM D') : ''
    },
    date: {
      get: function () {
        const dueDate = this.todo.dueDate
        return dueDate ? moment(dueDate).format('YYYY-MM-DD') : ''
      },
      set: function (date) {
        this.dueDate = moment(date).format('YYYY-MM-DD')
      }
    }
  },
  methods: {
    async setDate (date) {
      date = (date === '') ? null : date
      this.todo.dueDate = date
      this.$emit('date-update', this.todo)
      this.menu = false
      try {
        await TodoService.updateDueDate(this.todo)
      } catch (err) {
        console.log('something went wrong updating the due date:', err.message)
      }
    },
    showTextField: function () {
      this.enterNewItem = true
    },
    priorityCheck: function (priority) {
      return priority === this.todo.priority
    },
    async updatePriority (priority) {
      this.todo.priority = priority
      this.$emit('priority-update', this.todo)
      try {
        await TodoService.updatePriority(this.todo)
      } catch (err) {
        console.log('something went wrong updating the priority:', err.message)
      }
    }
  }
}
</script>

<style scoped>
.toolbar {
  background-color: #00897b;
}

.items-container {
  background-color: white;
  border: 1px solid rgb(176, 212, 200);
  min-height: 88vh;
}
.title {
  padding: 10px 0 20px;
  font-weight: bold;
  border-bottom: 1px solid rgb(176, 212, 200);
}

.details {
  text-align: left;
  font-size: 16px;
  padding: 10px 30px 0;
  margin-bottom: 5px;
}

.detail-row {
  display: flex;
  flex-direction: row;
  padding: 2px 0 3px;
}

.detail {
  padding-top: 2px;
}

.detail-icon {
  font-size: 25px;
  padding-right: 5px;
  padding-top: 1px;
  cursor: pointer;
  color: rgb(0, 137, 123);
}

.not-set {
  font-size: 12px;
  margin-top: 3px;
  margin-left: 2px;
  color: rgb(99, 99, 99);
}

.menu-header {
  background-color: #00897b;
  color: white;
}

.menu-title {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: .02em;
  text-align: left;
  padding: 9px 25px;
}

.selected {
  color: #00897b;
  /* background-color: #dff1f0; */
}

.lft {
  flex-grow: 1;
  padding-left: 10px;
}

.todo-items {
  max-height: 80vh;
  padding: 10px 10px 0;
  overflow: auto;
}

.text-area-container {
  border: 1px solid rgb(176, 212, 200);
  border-radius: 8px;
  margin: 10px 0 10px;
  text-align: left;
}

.text-area-header {
  display: flex;
  flex-direction: row;
}

.text-area-label {
  font-size: 12px;
  padding-top: 6px;
  padding-left: 10px;
  color: grey;
  flex-grow: 1;

}

.clear-note {
  flex-grow: 0;
  cursor: pointer;
  position: relative;
  top: 4px;
  right: 4px;
}

.note {
  flex-grow: 10;
  outline: none;
  width: 100%;
  padding: 0 10px;
}

.label {
  font-size: 12px;
  position: relative;
  top: -1.5px;
}

.add-item {
  color: rgb(0, 137, 123);
  font-size: 16px;
  text-align: left;
  padding: 5px 10px 10px;
  padding-left: 15px;
  cursor: pointer;
}

.more-top-margin {
  margin-top: 5px;
}

.less-top-margin {
  margin-top: 0px;
}

.add-button {
  position: relative;
  top: 3px;
  padding-right: 5px;
  color: rgb(0, 137, 123);
}

.enter-new-item {
  padding: 3px 10px 0 25px;
}

.panel {
  padding: 10px 20px 0;
}

>>>.v-messages {
  min-height: 0;
}

>>>.v-text-field {
    margin-top: 0;
    padding-top: 0;
    padding-left: 20px;
    padding-right: 27px;
}

>>>.v-text-field--box input {
  margin-top: 0;
}

>>>.v-text-field--box .v-input__slot {
  min-height: 0;
  padding-left: 5px;
}

>>>.theme--light.v-list .v-list__tile--link:hover {
  background-color: #dff1f0;
}
</style>
