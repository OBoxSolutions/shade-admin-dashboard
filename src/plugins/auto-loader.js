import Vue from "vue";

const baseComponents = import.meta.glob("@/components/*.vue");

for (const key in baseComponents) {
  if (Object.hasOwnProperty.call(baseComponents, key)) {
    const name = key
      .replace(/index.js/, "")
      .replace(/^\.\//, "")
      .replace(/\.\w+$/, "")
      .replace("../components/", "");

    Vue.component(`${name}`, baseComponents[key]);
  }
}
