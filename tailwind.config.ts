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
          emberDawn:      "var(--ember-dawn)",
          burntHorizon:   "var(--burnt-horizon)",
          crimsonBloom:   "var(--crimson-bloom)",
          veilBecoming:   "var(--veil-becoming)",
          duskMatter:     "var(--dusk-matter)",
          abyssalBlack:   "var(--abyssal-black)",
        },
      },
      fontFamily: {
        poppins: ["var(--font-display)", "sans-serif"],
        prompts: ["var(--font-support)", "sans-serif"],
      },
      backgroundImage: {
        "ranna-gradient":
          "linear-gradient(135deg, var(--ember-dawn) 0%, var(--burnt-horizon) 35%, var(--crimson-bloom) 65%, var(--veil-becoming) 100%)",
        "ranna-gradient-v":
          "linear-gradient(180deg, var(--ember-dawn) 0%, var(--burnt-horizon) 35%, var(--crimson-bloom) 65%, var(--veil-becoming) 100%)",
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
