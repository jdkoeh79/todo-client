<template>
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
        spellcheck="false"
        v-model="todo.note"
        :min-height="50"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import TodoService from '@/services/TodoService'

export default {
  props: [
    'todo'
  ],
  computed: {
    note () {
      return this.todo.note
    }
  },
  data () {
    return {
      watchCount: 0
    }
  },
  watch: {
    note: debounce(async function (text) {
      this.watchCount += 1
      if (this.watchCount > 1) {
        text = text === '' ? null : text
        this.todo.note = text
        try {
          await TodoService.updateNote(this.todo)
        } catch (err) {
          console.log('something went wrong updating the note:', err.message)
        }
      }
    }, 1000)
  }
}
</script>

<style scoped>
.text-area-container {
  border: 1px solid rgb(168, 168, 168);
  border-radius: 8px;
  margin: 10px 15px 10px;
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
</style>
