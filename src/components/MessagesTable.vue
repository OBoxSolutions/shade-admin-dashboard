<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="categoryFilter"
          :items="categories"
          label="Filter by"
          clearable
        ></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="valueFilter"
          append-icon="mdi-magnify"
          @click:append="filter"
          label="Search"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="messages"
      hide-default-footer
      class="elevation-2"
      :loading="loading"
      loading-text="Messages laoding..."
    >
    <template slot="no-data">
      No messages found
    </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="showMessage(item)"> mdi-eye </v-icon>
        <v-icon small @click="deleteMessage(item)"> mdi-delete </v-icon>
      </template>
      </v-data-table
    >
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  name: "MessagesTable",
  data() {
    return {
      categoryFilter: "",
      valueFilter: "",
      categories: ["Name", "Social", "Contact", "Message Text"],
      loading: true,
      headers: [
        { text: "Name", align: "start", value: "name" },
        { text: "Social", value: "social" },
        { text: "Contact", value: "contact" },
        { text: "Message", value: "text" },
        { text: "Date", value: "created_at" },
        { text: "Actions", value: "actions" },
      ],
    }
  },
  computed: {
    ...mapGetters('auth', ['authenticated', 'user']),
    ...mapGetters('messages', ['getAllMessages']),
    messages: {
      get(){
        return this.getAllMessages.data
      }
    }
  },
  methods: {
    ...mapActions('messages', ['loadAllMessages']),
    filter() {
      console.log("filter");
    },
    showMessage(item) {
      console.log(item);
    },
    deleteMessage(item) {
      console.log(item);
    },
  },
  async created(){
    await this.loadAllMessages()
    this.loading = false
  }
}
</script>
