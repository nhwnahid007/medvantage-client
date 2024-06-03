/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      openSans: ["Open Sans", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
