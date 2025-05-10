module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "unused-imports"], // Add 'unused-imports' plugin here
  rules: {
    "react-refresh/only-export-components": "warn",
    "unused-imports/no-unused-imports": "error", // Add rule to flag unused imports
    "unused-imports/no-unused-vars": [
      "warn", // Warn about unused variables
      {
        vars: "all",
        varsIgnorePattern: "^_", // Ignore variables starting with '_'
        args: "after-used",
        argsIgnorePattern: "^_", // Ignore function arguments starting with '_'
      },
    ],
  },
};
