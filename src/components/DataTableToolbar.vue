<template>
  <div class="d-flex justify-end w-full">
    <v-text-field
      v-model="searchComputed"
      prepend-inner-icon="mdi-magnify"
      class="search-bar mr-2"
    ></v-text-field>
    <v-btn
      @click="onReload"
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
</template>

<script>
export default {
  name: "DataTableToolbar",
  props: {
    search: {
      type: String,
      default: "",
    },
  },
  computed: {
    searchComputed: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("update:search", val);
      },
    },
  },
  methods: {
    onReload() {
      this.$emit("click:reload");
    },
  },
};
</script>

<style scoped>
.search-bar {
  max-width: 400px;
}

.w-full {
  width: 100%;
}
</style>
