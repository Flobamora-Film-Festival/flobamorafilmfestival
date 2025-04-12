/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended" // ✅ Menambahkan konfigurasi Prettier
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "prettier"], // ✅ Menambahkan plugin Prettier
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "prettier/prettier": ["error", { singleQuote: false, semi: true }], // ✅ Menambahkan aturan Prettier
    "no-unused-vars": "warn", // Opsional: agar variabel tak terpakai hanya memberi peringatan, bukan error
  }
};
