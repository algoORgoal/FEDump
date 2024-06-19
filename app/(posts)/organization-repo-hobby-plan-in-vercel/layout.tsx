import { Metadata } from "next";
import React, { ReactNode } from "react";
  
export const metadata: Metadata & { publishedAt: string } = {
  title: "Organization repo + hobby plan in Vercel",
  publishedAt: "2024-05-02T15:00:00.000Z",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}