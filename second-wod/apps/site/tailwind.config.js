const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: [join(__dirname, 'pages/**/*.{js,jsx,ts,tsx}')],
  presets: [require('../../tailwind-workspace-preset')],
};
