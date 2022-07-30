<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>
    </v-app-bar>

    <v-main class="mt-5 ml-5 pr-5 main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "HomeLayout",
};
</script>
