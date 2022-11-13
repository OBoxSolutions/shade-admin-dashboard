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
          disable-details
          @click:delete="openConfirmationAlert(item)"
        >
        </crud-actions>
      </template>
    </v-data-table>
    <v-dialog v-model="isDialogOpen">
      <v-card>
        <v-card-title> Questions </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item
              two-line
              v-for="(question, index) in questions"
              :key="`question-${index}`"
            >
              <v-list-item-content>
                <v-list-item-title>{{ question.question }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  question.answer
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getHiringRequests, deleteHiringRequest } from "@/api/hiring-requests";

import SocialIcon from "@/components/SocialIcon.vue";
import DataTableToolbar from "@/components/DataTableToolbar.vue";
import CrudActions from "@/components/CrudActions.vue";

import Swal from "sweetalert2";

import { errorMessage } from "@/utils/commonSwalMessages";

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

    async openConfirmationAlert(item) {
      try {
        const { isConfirmed } = await Swal.fire(errorMessage);
        if (isConfirmed) {
          new Swal({
            title: "Wait please",
            allowOutsideClick: false,
          });

          Swal.showLoading();

          await this.deleteItem(item);
          this.loadData();
        }
      } catch (error) {
        Swal.fire(error?.message ?? "Error deleting item: ", "", "error");
      }
      Swal.hideLoading();
    },

    async deleteItem(item) {
      const { success, msg } = await deleteHiringRequest(item.id);

      success
        ? Swal.fire(msg ?? "Success", "", "success")
        : Swal.fire(msg ?? "Error", "", "error");
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
