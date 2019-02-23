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
@import url('https://fonts.googleapis.com/css?family=Dosis:200,400|Kanit:300,400,500,600,800');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgb(223, 223, 223);
}

html, body {
  margin: 0;
  padding: 0;
}

.panel-title {
  font-family: 'Dosis';
  font-weight: 400;
  font-size: 1.9em
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
