<template>
  <v-content class="cbg">
    <v-container
      fill-height
      fluid

    >
      <v-layout
        align-center
        justify-center>
        <v-flex
          xs12
          sm8
          md4>
          <v-card
            class="elevation-12"
          >
            <v-toolbar dark
              color="primary"
            >
              <v-toolbar-title dark class="white--text text-align-center"><v-icon left>mdi-lock</v-icon> AKOKOMARKET LOGIN</v-toolbar-title>
              <v-spacer/>
            </v-toolbar>
            <v-card-text class="px-5">
              <v-form >
                <v-text-field
                        box
                  ref="username"
                  v-model="username"
                  :rules="[() => !!username || 'This field is required']"
                  prepend-inner-icon="mdi-account"
                  label="Email"
                  placeholder="Email"
                  required
                />
                <v-text-field
                        box
                  ref="password"
                  v-model="password"
                  :rules="[() => !!password || 'This field is required']"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-inner-icon="mdi-lock"
                  label="Password"
                  placeholder="*********"
                  counter
                  required
                  @keydown.enter="login"
                  @click:append="showPassword = !showPassword"
                />
              </v-form>
            </v-card-text>
            <v-divider class="mt-5"/>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                align-center
                justify-center
                color="primary"
                @click="login">Login
              </v-btn>
            </v-card-actions>
            <v-snackbar
              v-model="snackbar"
              :color="color"
              :top='true'
            >
              {{ errorMessages }}
              <v-btn
                flat
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </v-snackbar>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: function () {
    return {
      username: '',
      password: '',
      errorMessages: 'Incorrect login info',
      snackbar: false,
      color: 'general',
      showPassword: false
    }
  },

  // Sends action to Vuex that will log you in and redirect to the dash otherwise, error
  methods: {
    login: function () {
      let username = this.username
      let password = this.password
      this.$store.dispatch('login', { username, password })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => {
        console.log(err)
        this.snackbar= true
        }
        )
    }
  },
  metaInfo () {
    return {
      title: 'Akokomarket | Login'
    }
  }
}
</script>

<style scoped lang="scss">
  .cbg{
    border:1px solid #e3e3e3;
    background: #e3e3e3;
    background-image:url('../assets/img/akoko1.jpg');
  }
</style>
