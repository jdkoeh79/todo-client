<template>
  <div id="app">
    <v-app>
      <page-header />
      <v-content>
        <v-container>
          <router-view />
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #DFF1F0;
}

html, body {
  margin: 0;
  padding: 0;
}

.v-content {
  margin-top: 58px;
}

.danger-alert {
  color: red;
}

a {
  text-decoration: none;
}
</style>
