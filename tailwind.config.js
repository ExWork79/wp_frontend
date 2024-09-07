/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          100: "#f9f9f9",
          200: "#f2f2f2",
          300: "#e6e6e6",
          400: "#d9d9d9",
          500: "#bfbfbf",
          600: "#8c8c8c",
          700: "#595959",
          800: "#363636",
          900: "#141414",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
