import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FE Dump - A blog by byeol_chance",
  description: "A personal blog by byeol_chance",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
