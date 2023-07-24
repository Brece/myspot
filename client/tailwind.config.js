/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{html,tsx"],
  theme: {
    extend: { 
      colors: {},
      ...colors,
    },
  },
  plugins: [],
}

