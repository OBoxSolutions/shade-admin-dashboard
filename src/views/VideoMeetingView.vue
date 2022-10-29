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
      loading-text="Loading video meetings..."
      no-data-text="No video meetings found"
      :search="search"
    >
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
import { getVideoMeetings } from "@/api/video-meeting";

import SocialIcon from "@/components/SocialIcon.vue";
import DataTableToolbar from "@/components/DataTableToolbar.vue";

export default {
  name: "VideoMeetingView",
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
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Country", value: "country" },
        { text: "Birthdate", value: "birthdate" },
        { text: "App", value: "app" },
        { text: "Meeting Date", value: "meeting-date" },
        { text: "Time Before Meeting", value: "time-before-meeting" },
        { text: "Meeting Link", value: "meeting-link" },
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
        this.meetings = (await (await getVideoMeetings()).data?.data) ?? [];
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
