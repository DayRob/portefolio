import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#22d3ee",
          dark: "#0891b2"
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
