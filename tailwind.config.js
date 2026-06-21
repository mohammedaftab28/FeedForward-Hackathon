/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "system-ui", "-apple-system", "BlinkMacSystemFont",
          "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif",
        ],
      },
      colors: {
        brand: {
          orange: "#F97316",
          green: "#22c55e",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.18s ease-out",
      },
    },
  },
  plugins: [],
};
