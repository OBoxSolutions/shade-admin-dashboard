<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <img src="@/assets/logo.svg" class="logo" />

      <v-row justify="end">
        <v-app-bar-nav-icon
          v-if="authenticated"
          title="Logout"
          @click="logoutUser"
        >
          <v-icon>mdi-logout</v-icon>
        </v-app-bar-nav-icon>
      </v-row>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DefaultLayout",
  computed: {
    ...mapGetters("auth", ["authenticated", "user"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    async logoutUser() {
      const resp = await this.logout();
      if (resp) {
        this.$router.replace({ name: "Login" });
      }
    },
  },
};
</script>

<style scoped>
.logo {
  height: 100%;
  width: auto;
}
</style>
