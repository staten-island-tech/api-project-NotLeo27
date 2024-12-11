/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./main.js", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/*.{html,js}"],
  safelist: ['border-4', 'border-neutral-950', 'image'],
  theme: {
    extend: {
      size:{
        '128': '32 rem'
      }
    },
  },
  plugins: [],
};