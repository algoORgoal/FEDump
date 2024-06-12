import SearchHeader from "@/src/widget/post/Appbar";
import { Metadata } from "next";
import React, { ReactNode } from "react";
import localFont from "next/font/local";

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
        <div id="root">
          {/* <div className="min-h-screen w-screen bg-white dark:bg-zinc-700 flex flex-col"></div>
          <div className="min-h-screen w-screen bg-white dark:bg-zinc-700 text-black dark:text-white flex flex-col"></div>
          <div className="min-h-screen w-screen bg-white flex flex-col px-8"></div> */}
          {/* <SearchHeader /> */}
          {children}
        </div>
      </body>
    </html>
  );
}
