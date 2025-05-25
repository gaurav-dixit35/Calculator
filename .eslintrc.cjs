module.exports = {
  env: {
    browser: true,
    es2021: true,
    vitest: true,  // ✅ this fixes 'describe'/'it'/'expect' errors
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Add custom rules if needed
  },
};
