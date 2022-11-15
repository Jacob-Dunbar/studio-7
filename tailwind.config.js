/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
