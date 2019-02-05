<template>
  <v-layout justify-center>
    <v-flex lg4 xl3>
      <div class="panel">
        <v-text-field
          label="Email"
          v-model="email"
        />
        <v-text-field
          label="Password"
          type="password"
          v-on:keyup.enter="login"
          v-model="password"
        />

        <div class="danger-alert" v-html="error" />

        <v-btn
          dark
          class="teal darken-1 btn"
          @click="login"
          v-on:keyup.enter="login"
        >
          Login
        </v-btn>
        <div class="sign-up">
          Not registered?
          <router-link
            :to="{
              name: 'register'
            }"
            tag="span"
          >
          <a>Sign up now for free!</a>
        </router-link>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'home'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.panel {
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 20px 10px;
  margin-top: 10vh;
  margin-bottom: 20px;
}

.btn {
  margin: 50px 0 20px;
  width: 150px;
}

.sign-up {
  margin-top: 10px;
}
</style>
