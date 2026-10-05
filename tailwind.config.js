// tailwind.config.js
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./assets/css/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#170d3b", soft: "#241454" },
        cream: "#fffaf0",
        brand: {
          50: "#f5f1ff",
          100: "#e9e0ff",
          200: "#d5c5ff",
          300: "#b99cfc",
          400: "#9b73f6",
          500: "#7e4ff0",
          600: "#6a38e0",
          700: "#5a2cc2",
          800: "#482399",
          900: "#2d1763",
        },
      },
      fontFamily: {
        display: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 32px -14px rgba(23, 13, 59, 0.28)",
      },
    },
  },
  plugins: [],
};
