import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
      },
      colors: {
        ink: "#151515",
        ivory: "#f7f3ec",
        champagne: "#d8bf93",
        pearl: "#fffaf1",
        night: "#090909",
        smoke: "#8f8a82",
        rosewood: "#6f3035",
      },
      boxShadow: {
        luxury: "0 32px 100px rgba(0,0,0,0.18)",
      },
      backgroundImage: {
        "fine-noise":
          "radial-gradient(circle at 20% 20%, rgba(216,191,147,0.18), transparent 32%), radial-gradient(circle at 80% 12%, rgba(111,48,53,0.12), transparent 28%), radial-gradient(circle at 56% 76%, rgba(255,255,255,0.16), transparent 30%)",
      },
    },
  },
  plugins: [],
};

export default config;
