import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "ping-slow": {
          "0%": { transform: "scale(1)", opacity: "0.75" },
          "75%, 100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        "ping-slow": "ping-slow 2.2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;