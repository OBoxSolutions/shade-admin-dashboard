<template>
  <v-app>
    <v-app-bar color="white" dark app>
      <v-row>
        <v-app-bar-nav-icon @click="toggleDrawer">
          <v-icon color="grey-4">mdi-menu</v-icon>
        </v-app-bar-nav-icon>

        <v-app-bar-nav-icon
          class="ml-auto"
          v-if="authenticated"
          title="Logout"
          @click="logoutUser"
        >
          <v-icon color="grey-4">mdi-logout</v-icon>
        </v-app-bar-nav-icon>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" color="bg-color">
      <div class="ma-4">
        <img src="@/assets/logo.svg" class="logo" />
      </div>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="{ name: item.viewName }"
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
      drawer: true,
      items: [
        {
          title: "Contact me",
          icon: "mdi-account-alert",
          viewName: "Dashboard",
        },
        {
          title: "Hiring requests",
          icon: "mdi-briefcase",
          viewName: "Hiring",
        },
        {
          title: "Chat meeting",
          icon: "mdi-chat",
          viewName: "ChatMeeting",
        },
        {
          title: "Video Meeting",
          icon: "mdi-video",
          viewName: "VideoMeeting",
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
    toggleDrawer() {
      this.drawer = !this.drawer;
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
