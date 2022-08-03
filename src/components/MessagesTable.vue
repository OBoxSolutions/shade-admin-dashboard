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
          v-model="search"
          append-icon="mdi-magnify"
          @click:append="filter"
          label="Search"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      disable-sort
      class="elevation-2"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="showMessage(item.id)">
          mdi-eye
        </v-icon>
        <v-icon small @click="deleteMessage(item.id)"> mdi-delete </v-icon>
      </template></v-data-table
    >
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      categories: ["Name", "Social", "Contact", "Message Text"],
      headers: [
        { text: "Name", align: "start", value: "name" },
        { text: "Social", value: "social" },
        { text: "Contact", value: "contact" },
        { text: "Message", value: "message" },
        { text: "Date", value: "date" },
        { text: "Actions", value: "actions" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          social: 159,
          contact: 6.0,
          message: 24,
          date: 4.0,
        },
        {
          name: "Ice cream sandwich",
          social: 237,
          contact: 9.0,
          message: 37,
          date: 4.3,
        },
        {
          name: "Eclair",
          social: 262,
          contact: 16.0,
          message: 23,
          date: 6.0,
        },
        {
          name: "Cupcake",
          social: 305,
          contact: 3.7,
          message: 67,
          date: 4.3,
        },
        {
          name: "Gingerbread",
          social: 356,
          contact: 16.0,
          message: 49,
          date: 3.9,
        },
        {
          name: "Jelly bean",
          social: 375,
          contact: 0.0,
          message: 94,
          date: 0.0,
        },
        {
          name: "Lollipop",
          social: 392,
          contact: 0.2,
          message: 98,
          date: 0,
        },
        {
          name: "Honeycomb",
          social: 408,
          contact: 3.2,
          message: 87,
          date: 6.5,
        },
        {
          name: "Donut",
          social: 452,
          contact: 25.0,
          message: 51,
          date: 4.9,
        },
        {
          name: "KitKat",
          social: 518,
          contact: 26.0,
          message: 65,
          date: 7,
        },
      ],
    };
  },
  methods: {
    filter() {
      console.log("filter");
    },
  },
};
</script>
