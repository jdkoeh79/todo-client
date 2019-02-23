<template>
  <div class="item">

    <v-checkbox
      height="0"
      color="#5b79ff"
      :label="item.name"
      v-model="item.completed"
      v-on:change="updateCompletedStatus"
    >
    </v-checkbox>

    <v-icon
      class="remove-button"
      @click="removeItem"
    >close</v-icon>

  </div>
</template>

<script>
export default {
  name: 'Item',
  props: [
    'item'
  ],
  methods: {
    updateCompletedStatus () {
      this.$emit('update-status', this.item)
    },
    removeItem () {
      this.$emit('remove-item', this.item)
    }
  }
}
</script>

<style scoped>
.item {
  text-align: left;
  padding: 5px;
  margin: 0 10px;
  display: flex;
  flex-grow: 0;
  cursor: pointer;
}

.row {
flex-grow: 1;
}

.item:hover {
  border-top: 1px solid rgb(168, 168, 168);
  border-bottom: 1px solid rgb(168, 168, 168);
  margin-top: -1px;
  margin-bottom: -1px;
}

.item-name {
  flex-grow: 3;
  margin-top: 3px;
}

.remove-button {
  flex-grow: 0;
  padding-left: 10px;
  padding-top: 4px;
  font-size: 16px;
}

>>>.v-label {
  padding-top: 2px;
  color: black;
}

>>>.v-messages {
  min-height: 0;
}

>>>.v-input--selection-controls {
  padding-top: 0;
  margin-top: 13px;
}
</style>
