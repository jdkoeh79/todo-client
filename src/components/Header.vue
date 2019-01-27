<template>
  <v-toolbar
    class="teal darken-1"
    fixed
    dark>
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
        :to="{name: 'todos'}">
          My Todo's
      </v-btn>

      <v-btn
        flat
        v-if="$store.state.isUserLoggedIn"
        :to="{name: 'dashboard'}">
          Dashboard
      </v-btn>

      <v-menu
        open-on-hover
        bottom
        left
        offset-y
        min-width="200px"
        open-delay="100"
        close-delay="200"
        v-if="$store.state.isUserLoggedIn"
      >

        <v-avatar
          size="40px"
          class="avatar"
          slot="activator"
        >
          <img
            src="../../public/ProfilePhoto.jpg"
            alt="Avatar"
          >
        </v-avatar>

        <v-list two-line>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-action-text>
                Logged in as
              </v-list-tile-action-text>
              <v-list-tile-title>
                {{ user.firstName }} {{ user.lastName }}
              </v-list-tile-title>
              <v-list-tile-title class="email">
                {{ user.email }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>

        <v-list>
          <v-list-tile
            :to="{name: 'profile'}">
            <v-icon class="menu-icon">account_box</v-icon>
            <v-list-tile-title>
              Edit Profile
            </v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            :to="{name: 'groups'}">
            <v-icon class="menu-icon">people</v-icon>
            <v-list-tile-title>
              My Groups
            </v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            :to="{name: 'settings'}">
            <v-icon class="menu-icon">settings</v-icon>
            <v-list-tile-title>
              Settings
            </v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            @click="logout">
            <!-- <v-icon class="menu-icon">power_settings_new</v-icon> -->
            <!-- <v-icon class="menu-icon">remove_circle</v-icon> -->
            <v-icon class="menu-icon">cancel</v-icon>
            <v-list-tile-title>
              Logout
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => {
    return {
      profilePic: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

.avatar {
  margin-left: 10px;
}

.menu-icon {
  padding-right: 10px;
}

.email {
  font-size: .8em;
  position: relative;
  top: -5px;
}
</style>
