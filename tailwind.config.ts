import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#22d3ee",
          dark: "#0891b2",
          light: "#67e8f9",
          50: "#ecfeff",
          100: "#cffafe",
          500: "#22d3ee",
          600: "#0891b2",
          900: "#164e63"
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617"
        },
        accent: {
          purple: "#a855f7",
          pink: "#ec4899",
          blue: "#3b82f6",
          emerald: "#10b981",
          orange: "#f97316"
        }
      },
      boxShadow: {
        "soft-lg": "0 18px 45px rgba(15, 23, 42, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
