import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Синий — основной «рабочий» цвет доверия.
        brand: {
          50: "#eef4ff",
          100: "#dbe6ff",
          200: "#bed3ff",
          300: "#91b6ff",
          400: "#5d8dff",
          500: "#3466f6",
          600: "#1c60f5",
          700: "#1546d0",
          800: "#173aa8",
          900: "#183685",
          950: "#0f1f4d",
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
          400: "#7b849b",
          500: "#5c6480",
          700: "#333c56",
          900: "#151d33",
          // Тёмные секции сайта (Hero, «Почему нам доверяют», подвал) —
          // почти чёрный, а не насыщенно-синий: спокойнее и «дороже».
          950: "#0b0e14",
        },
        mist: {
          50: "#f7f9fc",
          100: "#eef2f9",
          200: "#e2e8f3",
        },
        line: "#e1e7f2",
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
        cta: "0 8px 24px -10px rgba(234, 88, 12, 0.6)",
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
