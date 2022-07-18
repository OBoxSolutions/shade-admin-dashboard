import Vue from "vue";

const baseComponents = require.context("@/components", true, /\.vue$/);

for (const file of baseComponents.keys()) {
  const componentConfig = baseComponents(file);
  const name = file
    .replace(/index.js/, "")
    .replace(/^\.\//, "")
    .replace(/\.\w+$/, "");

  Vue.component(`${name}`, componentConfig.default || componentConfig);
}
