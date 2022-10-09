<template>
  <div class="home">
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
  </div>
</template>

<script>
import { getChatMeetings } from "@/api/chat-meeting";

import DataTableToolbar from "@/components/DataTableToolbar.vue";

export default {
  name: "ChatMeetingView",
  components: {
    DataTableToolbar,
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
        { text: "About", value: "about" },
        { text: "Goals", value: "goals" },
        { text: "Budget", value: "budget" },
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
