<template>
  <div class="detail-row">
    <v-menu
      offset-y
      :nudge-right="40"
      transition="scale-transition"
      min-width="150"
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
          :class="{'selected': matchCheck(priority)}"
        >
          <v-list-tile-title>{{ priority }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <div class="detail">
      <span class="label"></span> {{ todo.priority }}
    </div>
  </div>
</template>

<script>
import TodoService from '@/services/TodoService'

export default {
  props: [
    'todo'
  ],
  data () {
    return {
      priorities: [
        'Low',
        'Normal',
        'High'
      ]
    }
  },
  methods: {
    async updatePriority (priority) {
      this.todo.priority = priority
      this.$emit('priority-update', this.todo)
      try {
        await TodoService.updatePriority(this.todo)
      } catch (err) {
        console.log('something went wrong updating the priority:', err.message)
      }
    },
    matchCheck (property) {
      return property === this.todo[property]
    }
  }
}
</script>

<style scoped>
.menu-header {
  background-color: #555;
  color: white;
  height: 32px;
}

.menu-title {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: .02em;
  text-align: left;
  padding: 3px 15px;
}

.selected {
  color: #555;
  /* background-color: #dff1f0; */
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

>>>.theme--light.v-list .v-list__tile--link:hover {
  background-color: rgb(214, 214, 214);
}

>>>.v-list__tile {
  height: 32px;
}
</style>
