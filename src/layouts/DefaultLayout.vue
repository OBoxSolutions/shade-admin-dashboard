<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <!-- <v-toolbar-title>Messages Table</v-toolbar-title> -->
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer color="primary" height="64" padless> </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "HomeLayout",
};
</script>
<style scoped>
.content {
  padding: 0 !important;
}
</style>
