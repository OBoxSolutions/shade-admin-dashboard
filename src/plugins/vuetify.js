import Vue from "vue";
import "@mdi/font/css/materialdesignicons.css";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#0065b8",
        secondary: "#FEAC07",
        action: "#FF4E01",
        accent: "#0065B8",
        contrast: "#ffffff",
        "bg-color": "#11abab",
      },
    },
  },
});
