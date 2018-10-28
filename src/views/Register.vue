<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <h1>Sign up now for free!</h1>
      </v-flex>
    </v-layout>
    <v-layout align-center>
      <v-flex xs5 xl4 offset-xs1 offset-xl2 class="list">
        <v-layout row wrap class="li">
          <v-flex xs2>
            <v-icon large align-center class="icon-color">group</v-icon>
          </v-flex>
          <v-flex xs10>
            Form groups of co-workers or family members with shared To-Do's!
          </v-flex>
        </v-layout>
        <v-layout row wrap class="li">
          <v-flex xs2>
            <v-icon large class="icon-color">update</v-icon>
          </v-flex>
          <v-flex xs10 class="center">
            Create and track re-accuring To-Do's!
          </v-flex>
        </v-layout>
        <v-layout row wrap class="li">
          <v-flex xs2>
            <v-icon large class="icon-color">playlist_add_check</v-icon>
          </v-flex>
          <v-flex xs10 class="center">
            Create To-Do's with multiple sub-tasks!
          </v-flex>
        </v-layout>
        <v-layout row wrap class="li">
          <v-flex xs2>
            <v-icon large class="icon-color">email</v-icon>
          </v-flex>
          <v-flex xs10>
            Get E-mail reminders of To-Do's with approaching due dates!
          </v-flex>
        </v-layout>
        <v-layout row wrap class="li">
          <v-flex xs2>
            <v-icon large class="icon-color">poll</v-icon>
          </v-flex>
          <v-flex xs10>
            Review your productivity on the dashboard!
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs5 xl4 class="ml-4">
        <div class="panel">
          <form
            name="todo-registration"
            autocomplete="off">
          <v-text-field
            label="First Name"
            v-model="firstName" />
          <v-text-field
            label="Last Name"
            v-model="lastName" />
          <v-text-field
            label="Email"
            v-model="email" />
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            autocomplete="new-password" />
            <v-text-field
            label="Confirm Password"
            type="password"
            v-model="passwordConfirm" />
          </form>

          <div class="danger-alert" v-html="error" />

          <v-btn
            dark
            class="teal darken-1 btn"
            @click="register">
            Register
          </v-btn>
          <div class="login">
            Already registered?
            <router-link
              :to="{
                name: 'login'
              }"
              tag="span">
              <a>Login here.</a>
            </router-link>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'dashboard'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.list, .panel {
  padding: 20px;
  margin-top: 5vh;
}

.panel {
  border-radius: 10px;
  background-color: #fff;
}

.list {
  text-align: left;
  font-size: 18px;
  padding-right: 70px;
  padding-left: 0;
}

.li {
  margin: 35px 0;
}

.icon-color, .li, h1 {
  color: #124342;
}

.icon-color {
  padding-top: 10%;
}

.center {
  padding-top: 13px;
}

.btn {
  margin: 50px 0 20px;
  width: 150px;
}

.login {
  margin-top: 10px;
}

h1 {
  margin-top: 3vh;
}
</style>
