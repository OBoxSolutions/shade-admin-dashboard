<template>
  <div class="home">
    <messages-table class="table"></messages-table>
  </div>
</template>

<script>
import MessagesTable from "@/components/MessagesTable.vue";
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {
    MessagesTable,
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table {
  /* height: 90%; */
  width: 90%;
}
</style>
