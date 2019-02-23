<template>
  <div class="detail-row">
    <v-menu
      ref="menu"
      :close-on-content-click="false"
      v-model="timePicker"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <v-icon slot="activator" class="detail-icon">access_alarm</v-icon>
      <v-time-picker
        color="#555"
        v-model="dueTime"
        full-width
      >
        <v-spacer></v-spacer>
        <v-btn flat @click="timePicker = false">Cancel</v-btn>
        <v-btn flat @click="setTime('')">Clear</v-btn>
        <v-btn flat @click="setTime(dueTime)">OK</v-btn>
      </v-time-picker>
    </v-menu>

    <div class="detail" v-if="todo.dueTime !== null">
      <span class="label"></span> {{ formattedTime }}
    </div>
    <div class="detail not-set" v-else>Set a Time</div>
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
      timePicker: false,
      dueTime: ''
    }
  },
  computed: {
    formattedTime () {
      const { dueTime } = this.todo
      return dueTime ? moment(dueTime).format('h:mm A') : ''
    }
  },
  methods: {
    async setTime (time) {
      time = time === '' ? null : moment(time, 'HH:mm').format()
      this.todo.dueTime = time
      this.$emit('time-update', this.todo)
      this.timePicker = false
      try {
        await TodoService.updateDueTime(this.todo)
      } catch (err) {
        console.log('something went wrong updating the due time:', err.message)
      }
      this.dueTime = null
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
