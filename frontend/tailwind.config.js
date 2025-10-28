/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#9333EA",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))"
      },   
    },
  },
  plugins: [],
};
