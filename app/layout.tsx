import { Metadata } from "next";
import localFont from "next/font/local";
import React, { ReactNode } from "react";
import "./global.css";

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
      <body className={`${pretendard.className}`}>
        <div className="flex min-h-screen w-full flex-col bg-white dark:bg-zinc-700">
          {children}
        </div>
      </body>
    </html>
  );
}
