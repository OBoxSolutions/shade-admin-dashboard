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
        <v-icon small class="mr-2" @click="showSelectedMessage(item)"> mdi-eye </v-icon>
        <v-icon small @click="deleteSelectedMessage(item)"> mdi-delete </v-icon>
      </template>
      </v-data-table>
      <paginate v-if="!loading" />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import Paginate from './Paginate.vue'
import Swal from 'sweetalert2'


export default {
  name: "MessagesTable",
  components: {
    Paginate
  },
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
    ...mapGetters('messages', ['getAllMessages', 'getCurrentPage']), 
    messages: {
      get(){
        return this.getAllMessages.data
      }
    }
  },
  methods: {
    ...mapActions('messages', ['loadAllMessages', 'deleteMessage']),
    filter() {
      console.log("filter")
    },
    showSelectedMessage(item) {
      console.log(item)
    },
    async deleteSelectedMessage(item) {
      const {isConfirmed} = await Swal.fire({
                title: 'Are you sure?',
                text: 'Once deleted, it cannot be restored',
                showDenyButton: true,
                confirmButtonText: 'Yes, I am sure'
            })
      if(isConfirmed){
        new Swal({
            title: 'Wait please',
            allowOutsideClick: false
        })
        Swal.showLoading()
        const {success, msg} = await this.deleteMessage(item.id)
        this.loadAllMessages(this.getCurrentPage)
        if(success === 1){
          Swal.fire(msg,'', 'success')
        }
        else{
          Swal.fire(msg,'', 'error')
        }
      }
    },
  },
  async created(){
    await this.loadAllMessages(1)
    this.loading = false
  }
}
</script>
