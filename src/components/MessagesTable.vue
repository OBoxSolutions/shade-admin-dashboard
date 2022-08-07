<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="filterData.category"
          :items="categories"
          label="Filter by"
          clearable
        ></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="filterData.value"
          append-icon="mdi-magnify"
          @keyup.enter="filter"
          @click:append="filter"
          label="Search"
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
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="messages"
      hide-default-footer
      class="elevation-2"
      :loading="loading"
      loading-text="Loading messages..."
    >

      <template slot="no-data">
        No messages found
      </template>

      <template v-slot:[`item.social`]="{ item }">
        <v-icon v-if="item.social === 'Messanger'">mdi-facebook-messenger</v-icon>
        <v-icon v-if="item.social === 'Instagram'">mdi-instagram</v-icon>
        <v-icon v-if="item.social === 'Discord'">mdi-discord</v-icon>
        <v-icon v-if="item.social === 'Email'">mdi-email</v-icon>
      </template>

      <template v-slot:[`item.text`]="{ item }">
        <p v-if="item.text.length > 200">{{item.text.substring(0, 200)}}...</p>
        <p v-else>{{item.text}}</p>
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
      filterData: {
        category: "",
        value: "",
        pageNumber: this.getCurrentPage || 1
      },
      categories: [
        { text: "Name", value: "name" },
        { text: "Social", value: "social" },
        { text: "Contact", value: "contact" },
        { text: "Message Text", value: "text" },
        ],
      loading: true,
      headers: [
        { text: "Name", align: "start", value: "name", sortable: false },
        { text: "Social", value: "social", sortable: false },
        { text: "Contact", value: "contact", sortable: false },
        { text: "Message", value: "text", sortable: false },
        { text: "Date", value: "created_at", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
    }
  },
  computed: {
    ...mapGetters('auth', ['authenticated', 'user']),
    ...mapGetters('messages', ['getAllMessages', 'getCurrentPage', 'isFiltered', 'getFilterData']), 
    messages: {
      get(){
        return this.getAllMessages.data
      }
    }
  },
  methods: {
    ...mapActions('messages', ['loadAllMessages', 'deleteMessage', 'filterMessages']),

    async filter() {
      this.loading = true
      await this.filterMessages(this.filterData)
      this.loading = false

    },
    async clearFilter(){
      this.loading = true
      await this.loadAllMessages(1)
      this.filterData.category = ''
      this.filterData.value = ''
      this.loading = false
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
        if(!this.isFiltered){
          this.loadAllMessages(this.getCurrentPage)
        }
        else{
          this.filterMessages(this.getFilterData)
        }
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
