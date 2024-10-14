import localFont from "next/font/local";

export const pretendard = localFont({
  variable: "--font-pretendard",
  src: [
    {
      path: "./Pretendard-Black.subset.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./Pretendard-ExtraBold.subset.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Pretendard-Light.subset.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Pretendard-ExtraLight.subset.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./Pretendard-Thin.subset.woff2",
      weight: "100",
      style: "normal",
    },
  ],
});
