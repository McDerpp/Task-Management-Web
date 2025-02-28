/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
  safelist: [
    {
      pattern:
        /^bg-(red|blue|green|yellow|white)-(200|300|400|500|600|700|800|900)$/,
    },
  ],
};
