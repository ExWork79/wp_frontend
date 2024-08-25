/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#f0f9ff",
          200: "#e0f2fe",
          300: "#bae6fd",
          400: "#7dd3fc",
          500: "#38bdf8",
          600: "#0ea5e9",
          700: "#0284c7",
          800: "#0369a1",
          900: "#075985",
        },
        secondary: {
          100: "#f7f0f5",
          200: "#e8d4e8",
          300: "#d4aade",
          400: "#a17ebe",
          500: "#774a9a",
          600: "#653c8d",
          700: "#512d6d",
          800: "#3e1f4f",
          900: "#2a0e2f",
        },
        tertiary: {
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
