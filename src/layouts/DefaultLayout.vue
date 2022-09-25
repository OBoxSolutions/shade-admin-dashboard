<template>
  <v-app>
    <v-app-bar color="primary" dark app>
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
    <v-navigation-drawer app>
      <div class="ma-4">
        <img src="@/assets/logo.svg" class="logo" />
      </div>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.viewName"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DefaultLayout",

  data() {
    return {
      items: [
        {
          title: "Contact me",
          icon: "mdi-account-alert",
          viewName: "Dashboard",
        },
        {
          title: "Work requests",
          icon: "mdi-briefcase",
          viewName: "WorkRequests",
        },
      ],
    };
  },
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
  height: auto;
  width: 100%;
}
</style>
