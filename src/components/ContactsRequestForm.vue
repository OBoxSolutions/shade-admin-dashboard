<template>
  <v-form @submit.prevent="onEnter">
    <v-select
      v-model="filterData.category"
      :items="categories"
      label="Filter by"
      clearable
    ></v-select>
    <v-text-field
      v-model="filterData.value"
      append-icon="mdi-magnify"
      label="Search"
    ></v-text-field>
    <div class="d-flex flex-column">
      <v-label> Social </v-label>
      <v-btn-toggle v-model="filterData.value" multiple>
        <v-btn value="facebook">
          <v-icon>mdi-facebook-messenger</v-icon>
        </v-btn>

        <v-btn value="instagram">
          <v-icon>mdi-instagram</v-icon>
        </v-btn>

        <v-btn value="discord">
          <v-icon>mdi-discord</v-icon>
        </v-btn>

        <v-btn value="email">
          <v-icon>mdi-email</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>
  </v-form>
</template>

<script>
export default {
  name: "ContactsRequestsForm",
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      categories: [
        { text: "Name", value: "name" },
        { text: "Social", value: "social" },
        { text: "Contact", value: "contact" },
        { text: "Message Text", value: "text" },
      ],
    };
  },
  computed: {
    filterData: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    onEnter() {
      this.$emit("enter");
    },
  },
};
</script>

<style></style>
