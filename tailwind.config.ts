import type { Config } from "tailwindcss";

// Les couleurs sont des variables CSS définies dans styles/globals.css :
// le thème clair/sombre suit prefers-color-scheme sans JavaScript.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--text)",
        muted: "var(--muted)",
        line: "var(--border)",
        accent: "var(--accent)",
        "accent-fg": "var(--accent-fg)",
        warn: "var(--warn)",
        code: "var(--code-bg)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      maxWidth: { prose: "68ch" }
    }
  },
  plugins: []
};

export default config;
