<template>
  <v-layout>
    <v-flex>
      <div class="archive-container">
        <v-toolbar flat dense class="toolbar" dark>
          <v-toolbar-title>Archived Todo's</v-toolbar-title>
        </v-toolbar>
        <div class="archive">

        </div>
      </div>

    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Archive',
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  }
}
</script>

<style scoped>
.toolbar {
  background-color: rgb(165, 165, 165);
  color: black;
}

.archive-container {
  background-color: white;
  border: 1px solid rgb(155, 155, 155);
  min-height: 88vh;
}
</style>
