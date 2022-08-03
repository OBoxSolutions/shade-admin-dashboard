<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <form ref="form" @submit.prevent="loginUser()">
              <v-text-field
                v-model="loginForm.email"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email here"
                required
              ></v-text-field>

              <v-text-field
                v-model="loginForm.password"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password here"
                required
              ></v-text-field>
              <v-btn type="submit" class="mt-4" color="primary" value="login"
                >Login</v-btn
              >
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Swal from 'sweetalert2'

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
    async loginUser() {
      new Swal({
          width: '30%',
          title: 'Wait please',
          allowOutsideClick: false
      })
      Swal.showLoading()

      const {status, msg} = await this.login(this.loginForm);
      if (status) {
        Swal.close()
        this.$router.push({ name: "Dashboard" });
      }
      else{
        Swal.fire({
          width: '40%',
          icon: 'error',
          title: 'Error',
          text: msg,
        })
      }
    },
  },
};
</script>
