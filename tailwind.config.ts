import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Тёплый оранжевый из выбранного премиального макета.
        brand: {
          50: "#fff4ed",
          100: "#ffe5d2",
          200: "#ffc6a4",
          300: "#ff9e67",
          400: "#ff7433",
          500: "#ff5a0a",
          600: "#ed4700",
          700: "#c53500",
          800: "#9c2c08",
          900: "#7d280d",
          950: "#441006",
        },
        // Оранжевый — только для главного действия, нигде больше.
        accent: {
          DEFAULT: "#ea580c",
          500: "#f2740f",
          600: "#d24a06",
        },
        // Нейтральные с лёгким синим подтоном — под цвет бренда,
        // а не безликий серый.
        ink: {
          400: "#7a8290",
          500: "#5f6877",
          700: "#303846",
          900: "#111827",
          // Тёмные секции сайта (Hero, «Почему нам доверяют», подвал) —
          // почти чёрный, а не насыщенно-синий: спокойнее и «дороже».
          950: "#0c111b",
        },
        mist: {
          50: "#f7f9fc",
          100: "#eef2f9",
          200: "#e2e8f3",
        },
        line: "#e4e7ec",
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        lift: "0 1px 2px rgba(21, 29, 51, 0.04), 0 12px 32px -16px rgba(21, 29, 51, 0.22)",
        cta: "0 12px 28px -12px rgba(255, 90, 10, 0.55)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
