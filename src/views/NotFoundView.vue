<template>
  <v-app>
    <section>
      <v-container
        class="d-flex flex-column justify-center items-center content-center align-center"
      >
        <v-img class="mb-12" contain src="@/assets/404-not-found.svg" />

        <h1>404 - Página no encontrada</h1>
        <h2>Lo sentimos, no hemos podido encontrar la página que buscas</h2>

        <div class="text-center">
          <v-btn
            :to="{ name: 'Dashboard' }"
            color="#0f7fe1"
            class="white--text"
          >
            Ir a Inicio
          </v-btn>
        </div>
      </v-container>
    </section>
  </v-app>
</template>

<script>
export default {
  name: "NotFoundView",
  provide: {
    heading: { align: "center" },
  },
};
</script>
