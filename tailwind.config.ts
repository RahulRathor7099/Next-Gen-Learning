import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surf: "var(--surf)",
        panel: "var(--panel)",
        panel2: "var(--panel2)",
        border: "var(--border)",
        border2: "var(--border2)",
        blue: "var(--blue)",
        violet: "var(--violet)",
        cyan: "var(--cyan)",
        green: "var(--green)",
        amber: "var(--amber)",
        rose: "var(--rose)",
        text: "var(--text)",
        muted: "var(--muted)",
        muted2: "var(--muted2)",
      },
      fontFamily: {
        space: ["var(--font-space)", "sans-serif"],
        jetbrains: ["var(--font-jetbrains)", "monospace"],
        syne: ["var(--font-syne)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
