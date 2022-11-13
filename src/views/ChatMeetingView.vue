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
        <crud-actions
          x-small
          disable-edit
          disable-details
          @delete:click="deleteHiringRequest(item)"
        >
          <template #prepend>
            <v-btn x-small icon @click="openImagesDialog(item)" class="mr-3">
              <v-icon color="primary"> mdi-image </v-icon>
            </v-btn>
          </template>
        </crud-actions>
      </template>
    </v-data-table>

    <v-dialog v-model="isDialogImageOpen">
      <v-card class="pt-4">
        <v-card-text>
          <h3>Logo</h3>
          <v-img :src="selectedChatMeeting.logo_file"></v-img>
        </v-card-text>

        <v-card-text>
          <h3>More info images</h3>
          <v-img :src="selectedChatMeeting.more_info_file"></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getChatMeetings } from "@/api/chat-meeting";

import SocialIcon from "@/components/SocialIcon.vue";
import DataTableToolbar from "@/components/DataTableToolbar.vue";
import CrudActions from "@/components/CrudActions.vue";
import Swal from "sweetalert2";

export default {
  name: "ChatMeetingView",
  components: {
    DataTableToolbar,
    SocialIcon,
    CrudActions,
  },
  data() {
    return {
      meetings: [],
      search: "",

      loading: false,
      isDialogImageOpen: false,

      selectedChatMeeting: {},

      headers: [
        { text: "Name", value: "name", width: 160 },
        { text: "Email", value: "email" },
        { text: "Country", value: "country", width: 160 },
        { text: "Birthdate", value: "birthdate", width: 200 },
        { text: "App", value: "app" },
        { text: "About", value: "about", width: 400 },
        { text: "Goals", value: "goals", width: 400 },
        { text: "Budget", value: "budget", width: 300 },
        { text: "Logo Info", value: "logo_info", width: 400 },
        { text: "More Info", value: "more_info", width: 400 },
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
        Swal.fire(error.message, "", "error");
      }
      this.loading = false;
    },
    openImagesDialog(item) {
      this.selectedChatMeeting = item;
      this.isDialogImageOpen = true;
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
