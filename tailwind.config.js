/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <- importante: ahora "dark:" responde a html.dark
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
