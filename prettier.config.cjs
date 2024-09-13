/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 80,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
