<template>
  <div class="home">
    <messages-table class="table"></messages-table>
  </div>
</template>

<script>
import MessagesTable from "@/components/MessagesTable.vue";

export default {
  name: "VideoMeetingView",
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
  align-items: center;
}
.table {
  width: 90%;
}
</style>
