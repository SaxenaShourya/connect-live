import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        calSans: ["Cal-Sans", "sans-serif"],
      },
      colors: {
        dark: {
          1: "#131924",
          2: "#132845",
        },
        primary: {
          1: "#7A3CE3",
          2: "#EA336F",
          3: "#E8622C",
          4: "#F5C144",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
