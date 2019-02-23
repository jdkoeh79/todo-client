<template>
  <div class="detail-row">
    <v-menu
      ref="menu"
      :close-on-content-click="false"
      v-model="datePicker"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <v-icon slot="activator" class="detail-icon">date_range</v-icon>

      <v-date-picker
        color="#555"
        v-model="dueDate"
      >
        <v-spacer></v-spacer>
        <v-btn flat @click="datePicker = false">Cancel</v-btn>
        <v-btn flat @click="setDate('')">Clear</v-btn>
        <v-btn flat @click="setDate(dueDate)">OK</v-btn>
      </v-date-picker>
    </v-menu>

    <div class="detail" v-if="todo.dueDate !== null">
      <span class="label"></span> {{ formattedDate }}
    </div>

    <div class="detail not-set" v-else>Set a Date</div>
  </div>
</template>

<script>
import moment from 'moment'
import TodoService from '@/services/TodoService'

export default {
  props: [
    'todo'
  ],
  data () {
    return {
      datePicker: false,
      dueDate: ''
    }
  },
  computed: {
    formattedDate () {
      const { dueDate } = this.todo
      return dueDate ? moment(dueDate).format('ddd, MMM D') : ''
    }
  },
  methods: {
    async setDate (date) {
      date = date === '' ? null : date
      this.todo.dueDate = date
      this.$emit('date-update', this.todo)
      this.datePicker = false
      try {
        await TodoService.updateDueDate(this.todo)
      } catch (err) {
        console.log('something went wrong updating the due date:', err.message)
      }
      this.dueDate = null
    }
  }
}
</script>

<style scoped>
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

.not-set {
  font-size: 12px;
  margin-top: 3px;
  margin-left: 2px;
  color: rgb(99, 99, 99);
}
</style>
