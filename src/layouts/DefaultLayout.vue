<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-row justify="end">
        <v-app-bar-nav-icon v-if="authenticated" title="Logout" @click="logoutUser"> 
          <v-icon>mdi-logout</v-icon> 
        </v-app-bar-nav-icon>
      </v-row>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer color="primary" height="64" padless> </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "DefaultLayout",
   computed: {
        ...mapGetters('auth', ['authenticated', 'user']),
   },
   methods: {
    ...mapActions('auth', ['logout']),
    async logoutUser(){
      const resp = await this.logout()
      if(resp){
        this.$router.replace({ name: "Login" })
      }
    }
   },
}
</script>
