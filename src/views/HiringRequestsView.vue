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
          @details:click="showSelectedMessage(item)"
          @delete:click="deleteSelectedMessage(item)"
        >
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
          <v-img
            v-for="image in selectedChatMeeting.more_info_file"
            :key="image"
            :src="image"
          ></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getHiringRequests } from "@/api/hiring-requests";

import SocialIcon from "@/components/SocialIcon.vue";
import DataTableToolbar from "@/components/DataTableToolbar.vue";
import CrudActions from "@/components/CrudActions.vue";

export default {
  name: "HiringRequestsView",
  components: {
    DataTableToolbar,
    SocialIcon,
    CrudActions,
  },
  data() {
    return {
      hiringRequests: [],
      search: "",

      loading: false,
      isDialogImageOpen: false,

      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Country", value: "country" },
        { text: "Applying for", value: "applying_for" },
        { text: "Birthdate", value: "birthdate" },
        { text: "Answers", value: "answers" },
        { text: "Files link", value: "files_link" },
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
        this.hiringRequests = (await getHiringRequests()).data?.data ?? [];
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
