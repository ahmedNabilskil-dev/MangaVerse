/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        manga: {
          pink: "#ec4899",
          purple: "#a855f7",
          blue: "#3b82f6",
        },
      },
      fontFamily: {
        comic: ["Comic Neue", "cursive"],
        heading: ["Poppins", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
