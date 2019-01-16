<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <h1>Sign up now for free!</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center justify-center>
      <v-flex md6 offset-md1 xl4 offset-xl0 class="list">
        <v-layout class="li">
            <v-icon large class="icon">group</v-icon>
            Form groups of co-workers or family members with shared To-Do's
        </v-layout>
        <v-layout class="li">
            <v-icon large class="icon">update</v-icon>
            Create and track re-accuring To-Do's
        </v-layout>
        <v-layout class="li">
            <v-icon large class="icon">format_list_bulleted</v-icon>
            Add lists to your To-Do's
        </v-layout>
        <v-layout class="li">
            <v-icon large class="icon">email</v-icon>
            Get E-mail reminders of To-Do's with approaching due dates
        </v-layout>
        <v-layout class="li">
            <v-icon large class="icon">poll</v-icon>
            Review your productivity on the dashboard
        </v-layout>
      </v-flex>

      <v-flex lg4 xl3>
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
  max-width: 600px;
}

.panel {
  border-radius: 10px;
  background-color: #fff;
  /* margin-left: 30px; */
}

.list {
  text-align: left;
  font-size: 18px;
  padding-right: 70px;
  /* padding-left: 0; */
}

.li {
  margin: 35px 0;
}

.icon, .li, h1 {
  color: #124342;
}

.icon {
  margin-right: 15px;
}

/* .center {
  padding-top: 11px;
} */

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
