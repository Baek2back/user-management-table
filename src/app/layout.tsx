import { pretendard } from "@/app/fonts";
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "User Management Table",
  description: "사용자 정보를 관리하는 테이블입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(pretendard.className, "antialiased")}>
        {children}
      </body>
    </html>
  );
}
