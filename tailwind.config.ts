import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ecff",
          200: "#bcdcff",
          300: "#8ec4ff",
          400: "#59a3ff",
          500: "#3181ff",
          600: "#1c60f5",
          700: "#154ae0",
          800: "#183db4",
          900: "#1a388c",
          950: "#142253",
        },
        accent: {
          DEFAULT: "#ff7a30",
          dark: "#e8611b",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(20, 34, 83, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
