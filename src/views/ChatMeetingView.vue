<template>
  <v-container class="home">
    <data-table-toolbar
      :search.sync="search"
      @click:reload="loadData"
    ></data-table-toolbar>

    <v-data-table
      :headers="headers"
      :items="meetings"
      class="elevation-2"
      :loading="loading"
      loading-text="Loading chat meetings..."
      no-data-text="No chat meetings found"
      :search="search"
    >
      <template v-slot:[`item.logo-file`]="{ item }">
        <img :src="item['logo-file']" />
      </template>
      <template v-slot:[`item.app`]="{ item }">
        <social-icon :social="item.app"></social-icon>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="showSelectedMessage(item)"
          color="primary"
        >
          mdi-eye
        </v-icon>
        <v-icon small @click="deleteSelectedMessage(item)" color="error">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { getChatMeetings } from "@/api/chat-meeting";

import SocialIcon from "@/components/SocialIcon.vue";

import DataTableToolbar from "@/components/DataTableToolbar.vue";

export default {
  name: "ChatMeetingView",
  components: {
    DataTableToolbar,
    SocialIcon,
  },
  data() {
    return {
      meetings: [],
      search: "",
      loading: false,
      headers: [
        { text: "Name", value: "name", width: 160 },
        { text: "Email", value: "email" },
        { text: "Country", value: "country", width: 160 },
        { text: "Birthdate", value: "birthdate", width: 200 },
        { text: "App", value: "app" },
        { text: "About", value: "about", width: 400 },
        { text: "Goals", value: "goals", width: 400 },
        { text: "Budget", value: "budget", width: 300 },
        { text: "Logo Info", value: "logo-info" },
        { text: "Logo File", value: "logo-file" },
        { text: "More Info", value: "more-info" },
        { text: "More Info Files", value: "more-info-files" },
        { text: "Actions", value: "actions" },
      ],
    };
  },

  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        this.meetings = (await (await getChatMeetings()).data?.data) ?? [];
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
