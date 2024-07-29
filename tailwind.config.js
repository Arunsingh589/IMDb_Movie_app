/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.86) 0px 22px 40px 6px',

      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-custom': {
          textShadow: '0px 0px 5px #000000',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
}