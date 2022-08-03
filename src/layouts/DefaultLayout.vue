<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <!-- <v-toolbar-title>Messages Table</v-toolbar-title> -->
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer color="primary" height="64" padless> </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "HomeLayout",
};
</script>
