<template>
  <v-app>
    <v-app-bar app color="primary" dark> </v-app-bar>

    <v-main class="main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "HomeLayout",
};
</script>
<style scoped>
.main {
  padding: 0 !important;
}
</style>
