import SearchHeader from "@/src/widget/post/Appbar";
import { Metadata } from "next";
import localFont from "next/font/local";
import React, { ReactNode } from "react";
import "./global.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "FE Dump - A blog by byeol_chance",
  description: "A personal blog by byeol_chance",
};

const pretendard = localFont({
  src: "../public/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${pretendard.className}`}>
        <div className="min-h-screen w-full bg-white dark:bg-zinc-700 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
