/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cwhite: {
          100: "#fafbfd",
        },
        cblue: {
          100: "rgba(17,27,54)",
        },
        cgray: {
          100: "#6c757d",
        },
      },
    },
  },
  plugins: [],
};
