/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 'primary': '#b68bdcb1',
        // 'secondary': '#2E4CFF',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('daisyui')
  ],
}

