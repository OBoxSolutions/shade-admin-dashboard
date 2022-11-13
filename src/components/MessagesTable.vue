<template>
  <v-container fluid>
    <data-table-toolbar
      :search.sync="search"
      @click:reload="clearFilter"
    ></data-table-toolbar>

    <v-data-table
      :headers="headers"
      :items="messages"
      class="elevation-2"
      :loading="loading"
      loading-text="Loading messages..."
      :search="search"
    >
      <template slot="no-data"> No messages found </template>

      <template v-slot:[`item.social`]="{ item }">
        <social-icon :social="item.social"></social-icon>
      </template>

      <template v-slot:[`item.text`]="{ item }">
        <p v-if="item.text.length > 150">
          {{ item.text.substring(0, 150) }}...
        </p>
        <p v-else>{{ item.text }}</p>
      </template>

      <template v-slot:[`item.created_at`]="{ item }">
        <p>{{ getDate(item.created_at) }}</p>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <crud-actions
          x-small
          disable-edit
          disable-details
          @click:delete="openConfirmationAlert(item)"
        ></crud-actions>
      </template>
    </v-data-table>

    <v-dialog
      v-model="viewDialog"
      transition="dialog-top-transition"
      max-width="500px"
    >
      <view-message
        :message="selectedMessage"
        @close="closeViewMessage"
      ></view-message>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Swal from "sweetalert2";

import getDate from "@/helpers/getDate";

import ViewMessage from "./ViewMessage.vue";
import SocialIcon from "./SocialIcon.vue";
import DataTableToolbar from "./DataTableToolbar.vue";

import { errorMessage } from "@/utils/commonSwalMessages";

import CrudActions from "@/components/CrudActions.vue";

export default {
  name: "MessagesTable",
  components: {
    ViewMessage,
    SocialIcon,
    DataTableToolbar,
    CrudActions,
  },
  data() {
    return {
      getDate,
      filterData: {
        category: "",
        value: "",
      },

      search: "",

      loading: true,
      headers: [
        { text: "Name", align: "start", value: "name", sortable: false },
        { text: "Social", value: "social", sortable: false },
        { text: "Contact", value: "contact", sortable: false },
        { text: "Message", value: "text", sortable: false },
        { text: "Date", value: "created_at", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      viewDialog: false,
      selectedMessage: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["authenticated", "user"]),
    ...mapGetters("messages", [
      "getAllMessages",
      "getCurrentPage",
      "getFilterData",
    ]),
    messages: {
      get() {
        return this.getAllMessages.data;
      },
    },
  },
  methods: {
    ...mapActions("messages", [
      "loadAllMessages",
      "deleteMessage",
      "filterMessages",
    ]),

    closeViewMessage() {
      this.viewDialog = false;
    },
    async filter() {
      this.loading = true;
      await this.filterMessages(this.filterData);
      this.loading = false;
    },
    async clearFilter() {
      this.loading = true;
      await this.loadAllMessages();
      this.filterData.category = "";
      this.filterData.value = "";
      this.loading = false;
    },
    showSelectedMessage(item) {
      this.selectedMessage = item;
      this.viewDialog = true;
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
          this.loadAllMessages();
        }
      } catch (error) {
        Swal.fire(error?.message ?? "Error deleting item: ", "", "error");
      }
      Swal.hideLoading();
    },

    async deleteItem(item) {
      const { success, msg } = await this.deleteMessage(item.id);

      success
        ? Swal.fire(msg ?? "Success", "", "success")
        : Swal.fire(msg ?? "Error", "", "error");
    },
  },
  async created() {
    await this.loadAllMessages(1);
    this.loading = false;
  },
};
</script>
