import { Metadata } from "next";
import React, { ReactNode } from "react";
  
export const metadata: Metadata & { publishedAt: string } = {
  title: "RAID",
  publishedAt: "2023-09-16T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}