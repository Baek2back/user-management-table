import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
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
        ...defaultTheme.colors,
        background: "var(--background)",
        foreground: "var(--foreground)",
        colorPrimary: "rgba(74, 124, 254, 1)",
        colorText: "rgba(0, 0, 0, 0.88)",
        colorTextSecondary: "rgba(0, 0, 0, 0.65)",
        colorTextTertiary: "rgba(0, 0, 0, 0.45)",
        colorTextPlaceholder: "rgba(0, 0, 0, 0.25)",
        colorTextDisabled: "rgba(0, 0, 0, 0.25)",
        colorTextLightSolid: "rgba(255, 255, 255, 1)",
        colorBgTextHover: "rgba(0, 0, 0, 0.06)",
        colorPrimaryHover: "rgba(115, 159, 255, 1)",
        colorPrimaryActive: "rgba(52, 93, 217, 1)",
        colorBorder: "rgba(227, 227, 227, 1)",
        colorBorderSecondary: "rgba(240, 240, 240, 1)",
        colorBgContainerDisabled: "rgba(0, 0, 0, 0.04)",
        colorBgContainer: "rgba(255, 255, 255, 1)",
        controlItemBgHover: "rgba(0, 0, 0, 0.04)",
        controlItemBgActive: "rgba(240, 247, 255, 1)",
        colorBgMask: "rgba(0, 0, 0, 0.45)",
        colorFillAlter: "rgba(0, 0, 0, 0.02)",
        colorSplit: "rgba(0, 0, 0, 0.06)",
        colorError: "rgba(255, 77, 79, 1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        focusPrimary: "0px 0px 0px 2px rgba(74, 124, 254, 0.15)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
