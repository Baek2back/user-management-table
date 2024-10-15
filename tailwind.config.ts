import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      ...defaultTheme.fontSize,
      ["lg-normal"]: [
        "4rem",
        {
          lineHeight: "6rem",
          fontWeight: "400",
        },
      ],
      ["lg-strong"]: [
        "4rem",
        {
          lineHeight: "6rem",
          fontWeight: "600",
        },
      ],
      ["base-normal"]: [
        "3.5rem",
        {
          lineHeight: "5.4rem",
          fontWeight: "400",
        },
      ],
      ["base-strong"]: [
        "3.5rem",
        {
          lineHeight: "5.4rem",
          fontWeight: "600",
        },
      ],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
