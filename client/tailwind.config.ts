import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:"selector",
  theme: {
    extend: {
      fontFamily: {
        Jofefin: ["var(--font-josefin)"],
        Poppins: ["var(--font-poppins)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "1000":"1000px",
        "1100":"1100px",
        "1200":"1200px",
        "1300":"1300px",
        "1500":"1500px",
        "800":"800px",
        "400":"400px"
      },
    },
  },
  plugins: [],
};
export default config