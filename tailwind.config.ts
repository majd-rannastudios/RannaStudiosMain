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
        ranna: {
          purple:     "#462969",
          burgundy:   "#6D0E4E",
          orange:     "#FB9203",
          deepOrange: "#E3500A",
          navy:       "#1B1941",
          indigo:     "#2A2B6B",
          black:      "#000000",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        prompts:  ["var(--font-prompts)",  "var(--font-dm-sans)", "sans-serif"],
      },
      backgroundImage: {
        "ranna-gradient":
          "linear-gradient(135deg, #462969 0%, #6D0E4E 20%, #FB9203 45%, #E3500A 60%, #1B1941 80%, #2A2B6B 100%)",
        "ranna-gradient-v":
          "linear-gradient(180deg, #462969 0%, #6D0E4E 20%, #FB9203 45%, #E3500A 60%, #1B1941 80%, #2A2B6B 100%)",
      },
      animation: {
        "pulse-slow":    "pulse 3s ease-in-out infinite",
        "spin-slow":     "spin 8s linear infinite",
        "float":         "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
