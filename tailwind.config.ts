import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#4F5FE0",
          600: "#3A46C4",
          700: "#2C3499",
          800: "#1F2570",
          900: "#161A4E",
          950: "#0B0E2E",
        },
        accent: {
          purple: "#7C5CFC",
          cyan: "#22D3EE",
        },
        surface: {
          light: "#F8FAFC",
          dark: "#0B1120",
          darkcard: "#121A2E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(22, 26, 78, 0.08), 0 8px 24px -8px rgba(22, 26, 78, 0.10)",
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 6px 20px -6px rgba(15, 23, 42, 0.08)",
        glow: "0 0 0 1px rgba(124, 92, 252, 0.15), 0 12px 40px -12px rgba(79, 95, 224, 0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out forwards",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
