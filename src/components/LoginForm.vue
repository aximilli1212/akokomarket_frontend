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
          sm6
          md2>
            <v-card
                    style="border-radius:20px"
                    class="elevation-8 pt-8"
                    height="600"
                    width="400"
            >
                <v-img
                        class="white--text align-center mx-auto"
                        height="160px"
                        width="120px"
                        :src="require('../assets/img/chicken.jpg')"
                >
                </v-img>
                <div class="align-center" style="text-align:center">
                    <span class="grey--text text--darken-1 mr-4"><v-icon>mdi-copyright</v-icon>Enterprise Edition</span>
                </div>
                <v-card-text class="mx-15 mt-5">
              <v-form class="mx-10">
                <v-text-field
                        box
                  ref="email"
                  v-model="email"
                  :rules="[() => !!email || 'This field is required']"
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
                <v-card-actions class="mx-auto">
                    <v-btn
                            align-center
                            justify-center
                            color="primary"
                            dark
                            large
                            round
                            :loading="loader"
                            class="px-12 mx-auto"
                            @click="login"><v-icon left color="white">mdi-lock-open-variant</v-icon>Login
                    </v-btn>
                </v-card-actions>
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
      email: '',
      password: '',
      showPassword: false,
      loader:false,
    }
  },

  // Sends action to Vuex that will log you in and redirect to the dash otherwise, error
  methods: {
    login: function () {
      this.loader = true;
      let email = this.email
      let password = this.password
      this.$store.dispatch('login', { email, password })
        .then(() => {
          this.loader = false;
          this.$router.push('/dashboard');

          this.$store.commit('setSnack',{color:"success",status_msg:"Success", added_msg:`${email} Successfully logged In` })
        })
        .catch(err => {
          this.loader = false;
        console.log(err)
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
    /*background-image:url('../assets/img/akoko1.jpg');*/
  }
</style>
