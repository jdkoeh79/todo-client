<template>
  <div class="items-container">
    <v-toolbar flat dense class="toolbar" dark>
      <v-toolbar-title class="panel-title">Details</v-toolbar-title>
    </v-toolbar>

    <div class="todo-items">

      <div class="title-container">
         <div class="title">
          {{ todo.title }}
        </div>
      </div>

      <div class="details">
        <v-layout row wrap>
          <v-flex xs11>

            <priority
              :todo="todo"
              :priorities="priorities"
            />

            <categories
              :todo="todo"
              :categoryList="categoryList"
            />

            <date-picker
              :todo="todo"
            />

            <time-picker
              :todo="todo"
            />

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

      <notes
        :todo="todo"
        :watchCount="0"
      />

      <item
        v-for="(item, i) in todo.items"
        :item="item"
        :index="i"
        :key="i"
        @remove-item="removeItem($event)"
        @update-status="updateItem($event)"
      />

      <v-layout
        row
        v-if="enterNewItem == false"
      >
        <v-flex xs10>
          <div
            class="add-item"
            @click="showTextField"
          >
            <v-icon class="add-button">add</v-icon>
              Add Item
          </div>

        </v-flex>
        <v-flex xs2>
          <!--
          Prevents activating the New Item text field after removing the last
          item while maintaining the full width of the text field when activated
          -->
        </v-flex>
      </v-layout>
      <v-layout
        row
        v-else
      >
        <v-flex xs12>
          <div class="enter-new-item">
            <v-text-field
              placeholder="Item name..."
              color="rgb(0, 137, 123)"
              autofocus
              v-model="newItem"
              @blur="addItem"
              @keyup.enter="addItem"
            />
          </div>
        </v-flex>
      </v-layout>
    </div><!-- todo-items -->
  </div>
</template>

<script>
import Priority from './Priority.vue'
import Categories from './Categories.vue'
import DatePicker from './DatePicker.vue'
import TimePicker from './TimePicker.vue'
import Notes from './Notes.vue'
import Item from './Item.vue'
import TodoService from '@/services/TodoService'

export default {
  name: 'TodoItems',
  components: {
    Priority,
    Categories,
    DatePicker,
    TimePicker,
    Notes,
    Item
  },
  props: [
    'todo',
    'categoryList'
  ],
  data () {
    return {
      createdAt: null,
      enterNewItem: false,
      newItem: '',
      priorities: [
        'Low',
        'Normal',
        'High'
      ]
    }
  },
  methods: {
    showTextField () {
      this.enterNewItem = true
    },
    async addItem () {
      if (this.enterNewItem && this.newItem !== '') {
        let item = {
          name: this.newItem,
          completed: false
        }
        if (!this.todo.items) {
          this.todo.items = new Array(item)
        } else {
          this.todo.items.push(item)
        }
        try {
          await TodoService.updateItems(this.todo)
        } catch (err) {
          console.log('An error occurred creating the new item:', err.message)
        }
      } else {
        this.enterNewItem = false
      }
      this.newItem = ''
    },
    async removeItem (item) {
      const index = this.todo.items.indexOf(item)
      this.todo.items.splice(index, 1)
      try {
        await TodoService.updateItems(this.todo)
      } catch (err) {
        console.log('something went wrong updating the item completed status', err.message)
      }
    },
    async updateItem (item) {
      const index = this.todo.items.indexOf(item)
      this.todo.items[index] = item
      try {
        await TodoService.updateItems(this.todo)
      } catch (err) {
        console.log('something went wrong updating the item completed status', err.message)
      }
    }
  }
}
</script>

<style scoped>
.toolbar {
  background-color: #555;
}

.items-container {
  background-color: white;
  border: 1px solid rgb(168, 168, 168);
  min-height: 88vh;
}

.todo-items {
  max-height: 80vh;
  padding: 0 10px;
  overflow: auto;
}

.title-container {
  display: table;
  min-height: 81px;
  width: 100%;
  padding: 0 15px;
}

.title {
  display: table-cell;
  vertical-align: middle;
  font-weight: bold;
  border-bottom: 1px solid rgb(168, 168, 168);
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
  color: #555;
}

.lft {
  flex-grow: 1;
  padding-left: 10px;
}

.label {
  font-size: 12px;
  position: relative;
  top: -1.5px;
}

.add-item {
  color: #111;
  font-size: 16px;
  text-align: left;
  padding: 5px 10px 10px;
  padding-left: 15px;
  cursor: pointer;
}

.add-button {
  position: relative;
  top: 3px;
  padding-right: 5px;
  color: #111;
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
  background-color: rgb(214, 214, 214);
}
</style>
