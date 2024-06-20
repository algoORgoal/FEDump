import { Metadata } from "next";
import localFont from "next/font/local";
import React, { ReactNode } from "react";
import "./global.css";

export const metadata: Metadata = {
  title: "FE Dump - A blog by byeol_chance",
  description: "A personal blog by byeol_chance",
};

const pretendard = localFont({
  src: [
    {
      path: "../public/Pretendard-Thin.subset.woff2",
      weight: "100",
    },
    {
      path: "../public/Pretendard-ExtraLight.subset.woff2",
      weight: "200",
    },
    {
      path: "../public/Pretendard-Light.subset.woff2",
      weight: "300",
    },
    {
      path: "../public/Pretendard-Regular.subset.woff2",
      weight: "400",
    },
    {
      path: "../public/Pretendard-Medium.subset.woff2",
      weight: "500",
    },
    {
      path: "../public/Pretendard-SemiBold.subset.woff2",
      weight: "600",
    },
    {
      path: "../public/Pretendard-Bold.subset.woff2",
      weight: "700",
    },
    {
      path: "../public/Pretendard-ExtraBold.subset.woff2",
      weight: "800",
    },
    {
      path: "../public/Pretendard-Black.subset.woff2",
      weight: "900",
    },
  ],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${pretendard.className}`}>
        <div className="flex min-h-screen w-full flex-col bg-white dark:bg-zinc-700">
          {children}
        </div>
      </body>
    </html>
  );
}
