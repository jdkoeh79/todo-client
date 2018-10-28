<template>
  <v-toolbar
    class="teal darken-1"
    fixed
    dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link
        :to="{
          name: 'home'
        }"
        class="home"
        tag="span">
        To-Do's
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        flat
        v-if="!$store.state.isUserLoggedIn"
        :to="{name: 'login'}">
          Login
      </v-btn>

      <v-btn
        flat
        v-if="!$store.state.isUserLoggedIn"
        :to="{name: 'register'}">
          Sign Up
      </v-btn>

      <v-btn
        flat
        v-if="$store.state.isUserLoggedIn"
        @click="logout"
        :to="{name: 'register'}">
          Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>
