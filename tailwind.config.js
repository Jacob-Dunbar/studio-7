/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        all: "url('/images/all-bg.jpg')",
        mind: "url('/images/mindfulness-bg.jpg')",
        strength: "url('/images/strength-bg.jpg')",
        mobility: "url('/images/mobility-bg.jpg')",
        cardio: "url('/images/cardio-bg.jpg')",
        combat: "url('/images/combat-bg.jpg')",
      },
      fontFamily: {
        PlayfairDisplay: ["Playfair Display"],
        Montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
  ],
};
