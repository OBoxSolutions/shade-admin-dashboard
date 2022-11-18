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
        <crud-actions
          x-small
          disable-details
          disable-edit
          @click:delete="openConfirmationAlert(item)"
        ></crud-actions>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { getVideoMeetings, deleteVideoMeeting } from "@/api/video-meeting";

import CrudActions from "@/components/CrudActions.vue";
import SocialIcon from "@/components/SocialIcon.vue";
import DataTableToolbar from "@/components/DataTableToolbar.vue";

import { errorMessage } from "@/utils/commonSwalMessages";

import Swal from "sweetalert2";

export default {
  name: "VideoMeetingView",
  components: {
    CrudActions,
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
        { text: "Meeting Date", value: "meeting_date" },
        { text: "Time Before Meeting", value: "time_before_meeting" },
        { text: "Meeting Link", value: "meeting_link" },
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
      const { success, msg } = await deleteVideoMeeting(item.id);

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
