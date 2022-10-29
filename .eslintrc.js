export default {
  root: true,
  env: {
    es2021: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],

  rules: {
    "no-console": import.meta.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": import.meta.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    // "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
