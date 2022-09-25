<template>
  <v-container fluid>
    <div class="d-flex justify-end">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        class="search-bar mr-2"
      ></v-text-field>
      <v-btn
        @click="clearFilter"
        icon
        class="ma-2"
        outlined
        fab
        small
        color="primary"
      >
        <v-icon>mdi-cached</v-icon>
      </v-btn>
    </div>

    <v-data-table
      :headers="headers"
      :items="messages"
      class="elevation-2"
      :loading="loading"
      loading-text="Loading messages..."
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
        <v-icon small class="mr-2" @click="showSelectedMessage(item)">
          mdi-eye
        </v-icon>
        <v-icon small @click="deleteSelectedMessage(item)"> mdi-delete </v-icon>
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

export default {
  name: "MessagesTable",
  components: {
    ViewMessage,
    SocialIcon,
  },
  data() {
    return {
      getDate,
      filterData: {
        category: "",
        value: "",
        pageNumber: this.getCurrentPage || 1,
      },

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
      "isFiltered",
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
      await this.loadAllMessages(1);
      this.filterData.category = "";
      this.filterData.value = "";
      this.loading = false;
    },
    showSelectedMessage(item) {
      this.selectedMessage = item;
      this.viewDialog = true;
    },
    async deleteSelectedMessage(item) {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, it cannot be restored",
        showDenyButton: true,
        confirmButtonText: "Yes, I am sure",
      });
      if (isConfirmed) {
        new Swal({
          title: "Wait please",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        const { success, msg } = await this.deleteMessage(item.id);
        if (!this.isFiltered) {
          this.loadAllMessages(this.getCurrentPage);
        } else {
          this.filterMessages(this.getFilterData);
        }
        if (success === 1) {
          Swal.fire(msg, "", "success");
        } else {
          Swal.fire(msg, "", "error");
        }
      }
    },
  },
  async created() {
    await this.loadAllMessages(1);
    this.loading = false;
  },
};
</script>

<style scoped>
.search-bar {
  max-width: 400px;
}
</style>
