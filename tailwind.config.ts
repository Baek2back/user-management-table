import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      ...defaultTheme.fontSize,
      ["heading-5"]: [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "600",
        },
      ],
      ["lg-normal"]: [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "400",
        },
      ],
      ["lg-strong"]: [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "600",
        },
      ],
      ["base-normal"]: [
        "14px",
        {
          lineHeight: "22px",
          fontWeight: "400",
        },
      ],
      ["base-strong"]: [
        "14px",
        {
          lineHeight: "22px",
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
