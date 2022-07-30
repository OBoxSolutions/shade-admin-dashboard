<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <form ref="form" @submit.prevent="login()">
              <v-text-field
                v-model="email"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email here"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password here"
                required
              ></v-text-field>
              <v-btn type="submit" class="mt-4" color="primary" value="log in"
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
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const { email } = this;
      console.log(email + "logged in");
    },
  },
};
</script>
