import { Metadata } from "next";
import localFont from "next/font/local";
import React, { ReactNode } from "react";
import "./global.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "FE Dump - A blog by byeol_chance",
  description: "A personal blog by byeol_chance",
};

const suit = localFont({
  src: "../public/SUIT-Variable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${suit.className}`}>
        <div className="flex min-h-screen w-full flex-col items-start justify-start bg-white dark:bg-zinc-700">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
