<template>
  <v-btn class="base-button" v-bind="$attrs" v-on="$listeners" color="action">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "BaseButton",
};
</script>

<style scoped>
.base-button {
  font-family: "Press Start 2P", "Franklin Gothic Medium", "Arial Narrow", Arial,
    sans-serif;
}
</style>
