<template>
  <v-container class="home">
    <data-table-toolbar
      :search.sync="search"
      @click:reload="loadData"
    ></data-table-toolbar>

    <v-data-table
      :headers="headers"
      :items="hiringRequests"
      class="elevation-2"
      :loading="loading"
      loading-text="Loading chat meetings..."
      no-data-text="No chat meetings found"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <crud-actions
          x-small
          disable-edit
          @click:details="openDetails(item)"
          @click:delete="deleteHiringRequest(item)"
        >
        </crud-actions>
      </template>
    </v-data-table>
    <v-dialog v-model="isDialogOpen">
      <v-card>
        <v-card-title> Questions </v-card-title>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getHiringRequests, deleteHiringRequest } from "@/api/hiring-requests";

import SocialIcon from "@/components/SocialIcon.vue";
import DataTableToolbar from "@/components/DataTableToolbar.vue";
import CrudActions from "@/components/CrudActions.vue";

import { questionsMap } from "@/utils/mapper.js";

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

      selectedHiringRequest: null,

      loading: false,
      isDialogOpen: false,

      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Country", value: "country" },
        { text: "Applying for", value: "applying_for" },
        { text: "Birthdate", value: "birthdate" },
        { text: "Files link", value: "files_link" },
        { text: "Actions", value: "actions" },
      ],
    };
  },

  computed: {
    questions() {
      if (!this.selectedHiringRequest) return;

      const keys = Object.keys(this.selectedHiringRequest);

      const questionsKeys = keys.filter((key) => {
        return key.includes("question");
      });

      const questions = questionsKeys.map((questionKey) => {
        return {
          question: questionsMap[questionKey],
          answer: this.selectedHiringRequest[questionKey],
        };
      });

      return questions;
    },
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

    openDetails(item) {
      this.selectedHiringRequest = { ...item };
      this.isDialogOpen = true;
    },
    async deleteHiringRequest(item) {
      await deleteHiringRequest(item.id);
      this.loadData();
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
